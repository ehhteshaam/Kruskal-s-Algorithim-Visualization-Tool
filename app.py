from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def find(parent, i):
    if parent[i] == i:
        return i
    return find(parent, parent[i])


def union(parent, rank, x, y):
    xroot = find(parent, x)
    yroot = find(parent, y)

    if xroot != yroot:
        if rank[xroot] < rank[yroot]:
            parent[xroot] = yroot
        elif rank[xroot] > rank[yroot]:
            parent[yroot] = xroot
        else:
            parent[yroot] = xroot
            rank[xroot] += 1


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/kruskal', methods=['POST'])
def kruskal():
    data = request.json
    graph = data['graph']

    edges = []
    for u in graph:
        for v in graph[u]:
            if u < v:
                edges.append((graph[u][v], u, v))

    edges.sort(key=lambda x: x[0])
    parent = {}
    rank = {}

    for node in graph:
        parent[node] = node
        rank[node] = 0

    mst = []
    steps = []

    for edge in edges:
        weight, u, v = edge
        uroot = find(parent, u)
        vroot = find(parent, v)

        if uroot != vroot:
            mst.append(edge)
            union(parent, rank, uroot, vroot)
            steps.append({'edge': edge, 'mst': mst})

    return jsonify({'mst': mst, 'steps': steps})


if __name__ == '__main__':
    app.run(debug=True)
