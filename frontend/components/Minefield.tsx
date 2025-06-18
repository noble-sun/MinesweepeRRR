import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Minefield() {
  const [minefield, setMinefield] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/minesweepers/generate')
      .then(response => {
        setMinefield(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="block">
      {minefield.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => ( 
            <button key={colIndex} id={`cell-${rowIndex}-${colIndex}`}
              className="!w-6 h-6 !p-0 !m-0 !border !rounded-none !border-gray-700 flex items-center justify-center"
              onClick={() => { console.log(`x: ${rowIndex}, y: ${colIndex}, value: ${JSON.stringify(cell)}`) } }
            >
              { cell.mine ? '*' : '0' }
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
