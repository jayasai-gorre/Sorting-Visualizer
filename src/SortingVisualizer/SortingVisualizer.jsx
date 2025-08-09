import React, { useState, useEffect, useRef } from "react";
import {
  getMergeSortAnimations,
  mergeSortArray,
  getQuickSortAnimations,
  quickSortArray,
  getHeapSortAnimations,
  heapSortArray,
  getBubbleSortAnimations,
  bubbleSortArray,
} from "../SortingAlgorithms/sortingAlgorithms.jsx";

import "./SortingVisualizer.css";

const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";
const RAW_MAX_HEIGHT = 730;

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(110);
  const [animationSpeed, setAnimationSpeed] = useState(12);
  const [selectedAlgo, setSelectedAlgo] = useState("Merge Sort");
  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(false);
  const timeoutsRef = useRef([]);
  const containerRef = useRef(null);
  // Increased default container height from 420 to 600
  const [containerHeight, setContainerHeight] = useState(600);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    measureContainer();
    const onResize = () => measureContainer();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    resetArray(arraySize);
  }, [arraySize, containerHeight]);

  function measureContainer() {
    const el = containerRef.current;
    if (!el) return;
    // Increased minimum height from 120 to 200 and reduced padding from 36 to 20
    const h = Math.max(200, el.clientHeight - 20);
    setContainerHeight(h);
  }

  const resetArray = (size = arraySize) => {
    if (runningRef.current) return;
    const newArray = Array.from({ length: size }, () =>
      randomIntFromInterval(5, RAW_MAX_HEIGHT)
    );
    setArray(newArray);
    requestAnimationFrame(() => {
      const bars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < bars.length; i++) {
        const h = scaleHeight(newArray[i]);
        bars[i].style.height = `${h}px`;
        bars[i].style.background = "var(--primary-bar)";
        bars[i].classList.remove("sorted");
      }
    });
  };

  const scaleHeight = (rawValue) => {
    const scaled = Math.round((rawValue / RAW_MAX_HEIGHT) * containerHeight);
    // Increased minimum height from 3 to 8 pixels
    return Math.max(8, scaled);
  };

  const clearAllTimeouts = () => {
    const arr = timeoutsRef.current;
    for (let id of arr) {
      try {
        clearTimeout(id);
      } catch (e) {}
    }
    timeoutsRef.current = [];
  };

  const runAnimations = (animations) => {
    if (!animations || animations.length === 0) return;
    clearAllTimeouts();

    setIsRunning(true);
    runningRef.current = true;

    const arrayBars = document.getElementsByClassName("array-bar");
    const nBars = arrayBars.length;

    const sameAnim = (a, b) => {
      if (!a || !b || a.length !== b.length) return false;
      return a[0] === b[0] && a[1] === b[1];
    };

    const finish = () => {
      runningRef.current = false;
      setIsRunning(false);
      const bars = Array.from(document.getElementsByClassName("array-bar"));
      bars.forEach((b) => b.classList.add("sorted"));
      const clearSortedId = setTimeout(() => bars.forEach((b) => b.classList.remove("sorted")), 900);
      timeoutsRef.current.push(clearSortedId);
      timeoutsRef.current = timeoutsRef.current.filter((t) => t === clearSortedId);
    };

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      if (!Array.isArray(animation) || animation.length < 2) continue;

      const a0 = animation[0];
      const a1 = animation[1];

      const isColorPair = Number.isInteger(a0) && Number.isInteger(a1) && a0 >= 0 && a0 < nBars && a1 >= 0 && a1 < nBars;

      if (isColorPair) {
        const next = animations[i + 1];
        const useSecondary = sameAnim(animation, next);
        const color = useSecondary ? SECONDARY_COLOR : PRIMARY_COLOR;

        const id = setTimeout(() => {
          if (!runningRef.current) return;
          const [barOneIdx, barTwoIdx] = animation;
          if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.background = color;
          if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.background = color;
          if (i === animations.length - 1) finish();
        }, i * animationSpeed);
        timeoutsRef.current.push(id);
      } else {
        const id = setTimeout(() => {
          if (!runningRef.current) return;
          const [barOneIdx, newRawHeight] = animation;
          const h = scaleHeight(newRawHeight);
          if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.height = `${h}px`;
          if (i === animations.length - 1) finish();
        }, i * animationSpeed);
        timeoutsRef.current.push(id);
      }
    }
  };

  const handleSort = () => {
    if (runningRef.current) return;

    Array.from(document.getElementsByClassName("array-bar")).forEach((b) =>
      b.classList.remove("sorted")
    );

    let animations;
    const arrCopy = array.slice();

    if (selectedAlgo === "Merge Sort") animations = getMergeSortAnimations(arrCopy);
    else if (selectedAlgo === "Quick Sort") animations = getQuickSortAnimations(arrCopy);
    else if (selectedAlgo === "Heap Sort") animations = getHeapSortAnimations(arrCopy);
    else if (selectedAlgo === "Bubble Sort") animations = getBubbleSortAnimations(arrCopy);
    else animations = getMergeSortAnimations(arrCopy);

    runAnimations(animations);
  };

  const handleStop = () => {
    clearAllTimeouts();
    runningRef.current = false;
    setIsRunning(false);

    const bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < bars.length; i++) {
      const b = bars[i];
      b.style.background = "var(--primary-bar)";
      const h = array[i] !== undefined ? scaleHeight(array[i]) : 8; // Changed from 3 to 8
      b.style.height = `${h}px`;
      b.classList.remove("sorted");
    }
  };

  const testSortingAlgorithms = () => {
    if (isRunning) return;
    const sortingAlgorithms = [
      { name: "Merge Sort", func: mergeSortArray },
      { name: "Quick Sort", func: quickSortArray },
      { name: "Heap Sort", func: heapSortArray },
      { name: "Bubble Sort", func: bubbleSortArray },
    ];

    sortingAlgorithms.forEach(({ name, func }) => {
      for (let i = 0; i < 50; i++) {
        const testArray = Array.from(
          { length: randomIntFromInterval(1, 150) },
          () => randomIntFromInterval(-1000, 1000)
        );

        const expected = testArray.slice().sort((a, b) => a - b);
        const actual = func(testArray.slice());

        if (!arraysAreEqual(expected, actual)) {
          console.error(`${name} failed on test case`, testArray);
          return;
        }
      }
      console.log(`${name} passed all tests`);
    });
  };

  return (
    // Increased overall height from calc(90vh - 90px) to calc(95vh - 60px)
    <div className="app-shell" style={{ height: "calc(90vh - 90px)" }}>
      
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle controls menu"
      >
        &#9776;
      </button>

      <div className={`top-row ${menuOpen ? "open" : ""}`}>
        <div>
          <div className="buttons" style={{ alignItems: "flex-start" }}>
            <button onClick={() => resetArray(arraySize)} className="ghost" disabled={isRunning}>
              Generate New Array
            </button>

            <button onClick={handleSort} className="primary" style={{ marginTop: 8 }} disabled={isRunning}>
              Sort!
            </button>

            <button
              onClick={handleStop}
              className="primary"
              style={{ marginTop: 8, background: "#ff5c5c", borderColor: "rgba(255,90,90,0.1)" }}
              disabled={!isRunning}
            >
              Stop
            </button>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div className="title">Change Size & Speed</div>

            <div className="speed-range" style={{ width: 260 }}>
              <div className="slider-row" aria-hidden>
                <span className="subtle slider-min">20</span>
                <input
                  type="range"
                  min="20"
                  max="150"
                  value={arraySize}
                  onChange={(e) => setArraySize(Number(e.target.value))}
                  aria-label="Array size"
                  disabled={isRunning}
                />
                <span className="subtle slider-max">150</span>
              </div>
            </div>

            <div className="speed-range" style={{ width: 200 }}>
              <div className="slider-row" aria-hidden>
                <span className="subtle slider-min">Fast (4)</span>
                <input
                  type="range"
                  min="4"
                  max="40"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  aria-label="Animation speed"
                  disabled={isRunning}
                />
                <span className="subtle slider-max">Slow (40)</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="buttons" style={{ gap: 18 }}>
            {["Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort"].map((algo) => (
              <button
                key={algo}
                onClick={() => setSelectedAlgo(algo)}
                className={selectedAlgo === algo ? "primary" : "ghost"}
                disabled={isRunning}
              >
                {algo}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="array-container"
        ref={containerRef}
        aria-hidden
      >
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              background: "var(--primary-bar)",
              height: `${scaleHeight(value)}px`,
              width: "var(--bar-width)",
            }}
          />
        ))}
      </div>

      <div style={{ padding: "12px 18px", display: "flex", justifyContent: "center" }}>
        <div className="buttons">
          <button onClick={testSortingAlgorithms} className="ghost" disabled={isRunning}>
            Test Sorting Algorithms
          </button>
        </div>
      </div>

      <aside className="panel" aria-hidden>
      </aside>
    </div>
  );
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}