# Kruskal's Algorithm Visualization Tool

This project is a visualization tool for finding the Minimum Spanning Tree (MST) using Kruskal's algorithm. It provides a graphical interface to add vertices, edges, and visualize the MST interactively.

## Features
- Add vertices and edges interactively on a canvas.
- Assign weights to edges.
- Compute and visualize the Minimum Spanning Tree (MST) using Kruskal's algorithm.
- Backend functionality implemented in Python using Flask.

## Installation and Usage

### Prerequisites
- Python 3.x
- Flask
- Flask-CORS

### Steps to Run the Project
1. Clone this repository:
   ```bash
   git clone https://github.com/YourUsername/Kruskal-s-Algorithm-Visualization-Tool.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Kruskal-s-Algorithm-Visualization-Tool
   ```
3. Install the required dependencies:
   ```bash
   pip install flask flask-cors
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```
5. Open your browser and go to:
   ```
   http://127.0.0.1:5000/
   ```

## Folder Structure
```
Kruskal-s-Algorithm-Visualization-Tool/
├── app.py          # Flask backend
├── script.js       # Frontend logic
├── styles.css      # Frontend styling
├── templates/
│   └── index.html  # Main HTML file
```

## How to Use
1. Click **"Add Vertex"** to place vertices on the canvas.
2. Click **"Add Edge"** to connect vertices with edges and assign weights.
3. Click **"Find MST"** to compute and visualize the Minimum Spanning Tree.
4. Use **"Clear"** to reset the canvas and start over.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)



