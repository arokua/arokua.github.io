import { useState } from 'react'
// import './App.css'
import RandomWalkSim from './rWSim';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Main page</h1>
      <div style={{border: '1px solid red', padding: '10px', margin: '10px 0'}}>
        <h2>RandomWalk Simulation part</h2>
        <RandomWalkSim />
      </div>
    </>
  )
}

export default App