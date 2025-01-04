let vertices = [];
let edges = [];
let addingEdge = false;
let startVertex = null;

const canvas = document.getElementById('canvas');
const addVertexButton = document.getElementById('addVertex');
const addEdgeButton = document.getElementById('addEdge');
const findMSTButton = document.getElementById('findMST');
const clearButton = document.getElementById('clear');
const result = document.getElementById('result');

addVertexButton.addEventListener('click', () => {
    canvas.style.cursor = 'crosshair';
    canvas.addEventListener('click', addVertexHandler);
});

function addVertexHandler(event) {
    const rect = canvas.getBoundingClientRect();
    const vertex = document.createElement('div');
    vertex.className = 'vertex';
    vertex.innerText = vertices.length;
    vertex.style.left = `${event.clientX - rect.left}px`;
    vertex.style.top = `${event.clientY - rect.top}px`;
    vertex.style.backgroundColor = getRandomColor();
    canvas.appendChild(vertex);
    vertex.addEventListener('click', (e) => onVertexClick(e, vertex));
    vertices.push(vertex);
    canvas.style.cursor = 'pointer';
    canvas.removeEventListener('click', addVertexHandler);
}

addEdgeButton.addEventListener('click', () => {
    addingEdge = !addingEdge;
    addEdgeButton.innerText = addingEdge ? 'Cancel Edge' : 'Add Edge';
});

function onVertexClick(event, vertex) {
    event.stopPropagation();
    if (addingEdge) {
        if (startVertex) {
            const weight = prompt('Enter edge weight:');
            if (weight !== null) {
                edges.push({
                    from: parseInt(startVertex.innerText),
                    to: parseInt(vertex.innerText),
                    weight: parseFloat(weight)
                });
                drawEdge(startVertex, vertex, weight);
            }
            startVertex = null;
            addingEdge = false;
            addEdgeButton.innerText = 'Add Edge';
        } else {
            startVertex = vertex;
        }
    }
}

function drawEdge(start, end, weight) {
    const line = document.createElement('div');
    const x1 = start.offsetLeft;
    const y1 = start.offsetTop;
    const x2 = end.offsetLeft;
    const y2 = end.offsetTop;
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    line.className = 'edge';
    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${angle}deg)`;
    canvas.appendChild(line);

    const label = document.createElement('div');
    label.className = 'label';
    label.innerText = weight;
    label.style.left = `${(x1 + x2) / 2}px`;
    label.style.top = `${(y1 + y2) / 2}px`;
    canvas.appendChild(label);
}

findMSTButton.addEventListener('click', async () => {
    const graph = {};
    vertices.forEach((v, i) => {
        graph[i] = {};
    });
    edges.forEach(edge => {
        graph[edge.from][edge.to] = edge.weight;
        graph[edge.to][edge.from] = edge.weight;
    });

    const response = await fetch('/kruskal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            graph: graph
        })
    });

    const mst = await response.json();
    result.textContent = JSON.stringify(mst, null, 2);
});

clearButton.addEventListener('click', () => {
    vertices = [];
    edges = [];
    startVertex = null;
    addingEdge = false;
    addEdgeButton.innerText = 'Add Edge';
    canvas.innerHTML = '';
    result.textContent = '';
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
