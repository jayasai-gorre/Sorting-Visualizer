import React from "react";
import "./App.css";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Sorting Visualizer</h1>
        <p>Visualize different sorting algorithms in action</p>
      </header>

      <main>
        <SortingVisualizer />
      </main>
      <footer className="app-footer">
        <p>Made with ❤️ by JS</p>
      </footer>

    </div>
  );
}

export default App;
