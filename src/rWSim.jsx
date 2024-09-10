import React, { useState, useRef } from 'react';

function RandomWalkSim() {
  const [steps, setSteps] = useState(100); // default number of steps
  const [minStepLength, setMinStepLength] = useState(1); // minimum step length
  const [maxStepLength, setMaxStepLength] = useState(5); // maximum step length
  const [useBounds, setUseBounds] = useState(false); // bounded or unbounded walk
  const [width, setWidth] = useState(200); // bounding box width
  const [height, setHeight] = useState(200); // bounding box height
  const canvasRef = useRef(null); // canvas reference

  // Function to start the random walk simulation
  const startSimulation = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous walk

    // Initial position at center
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    ctx.moveTo(x, y);
    ctx.beginPath();
    ctx.strokeStyle = 'blue';

    for (let i = 0; i < steps; i++) {
      let stepLength = Math.random() * (maxStepLength - minStepLength) + minStepLength;

      // Randomly select a direction (NSWE)
      const direction = Math.floor(Math.random() * 4);

      // Adjust movement based on direction
      switch (direction) {
        case 0: // North
          y -= stepLength;
          break;
        case 1: // South
          y += stepLength;
          break;
        case 2: // West
          x -= stepLength;
          break;
        case 3: // East
          x += stepLength;
          break;
        default:
          break;
      }

      // Handle boundary conditions
      if (useBounds) {
        if (x <= 0 || x >= width || y <= 0 || y >= height) {
          // Adjust position and change direction (45-degree angle)
          x = Math.max(0, Math.min(x, width));
          y = Math.max(0, Math.min(y, height));
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.closePath();
          return; // Stop once it hits bounds
        }
      }

      ctx.lineTo(x, y); // Continue walk
    }
    ctx.stroke();
    ctx.closePath();
  };

  return (
    <div>
      <h1>Random Walk Simulation</h1>

      <label>
        Number of Steps:
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </label>

      <label>
        Min Step Length:
        <input
          type="number"
          value={minStepLength}
          onChange={(e) => setMinStepLength(e.target.value)}
        />
      </label>

      <label>
        Max Step Length:
        <input
          type="number"
          value={maxStepLength}
          onChange={(e) => setMaxStepLength(e.target.value)}
        />
      </label>

      <label>
        Use Bounds:
        <input
          type="checkbox"
          checked={useBounds}
          onChange={(e) => setUseBounds(e.target.checked)}
        />
      </label>

      {useBounds && (
        <>
          <label>
            Width:
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </label>

          <label>
            Height:
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
        </>
      )}

      <button onClick={startSimulation}>Start Walk</button>

      <canvas
        ref={canvasRef}
        width={useBounds ? width : 400}
        height={useBounds ? height : 400}
        style={{
          border: useBounds ? '2px solid black' : 'none',
        }}
      />
    </div>
  );
}

export default RandomWalkSim;
