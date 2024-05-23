import React, { useState, useEffect } from 'react';
import '../App.css';

function Four({ n, setN, element, setElement }) {
  const [arr, setArr] = useState(
    Array(n).fill().map(() => Array(n).fill(0))
  );
  let a = 2;
  let b = 2;
  const [coordinates, setCoordinates] = useState({ x: null, y: null });

  useEffect(() => {
    const newArr = Array(n).fill().map(() => Array(n).fill(0));
    setArr(newArr);
  }, [n]);

  const handleClick = (x, y) => {
    setCoordinates({ x, y });
  };

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setError('');
  };

  const handleSave = () => {
    const value = parseInt(inputValue, 10);
    if (value <= n) {
      setElement(value);
      if (coordinates.x !== null && coordinates.y !== null) {
        const newArr = arr.map((row, rowIndex) =>
          row.map((box, colIndex) =>
            rowIndex === coordinates.x && colIndex === coordinates.y ? value : box
          )
        );
        setArr(newArr);
      }
      setError('');
    } else {
      setError(`Value must be less than or equal to ${n}`);
    }
  };
  const countEmptyCells = () => {
    let count = 0;
    arr.forEach(row => {
      row.forEach(cell => {
        if (cell === 0) count++;
      });
    });
    return count;
  };
  const subgrid = (x, y, num) => {

    if(x>=6 && y >=6 && y< 9)
    {
        console.log("gr 9");
        // 9th grid
        for(let i = 6; i<9; i++)
        {
            for(let j = 6; j<9; j++)
            {
                if(arr[i][j] == num)
                    return false;
            }
        }
    }
    else if(x>=6 && y>=3 && y<6)
    {
        //console.log("gr 8");
        //8th grid
        for(let i = 6; i<9; i++)
        {
            for(let j = 3; j<6; j++)
            {
                if(arr[i][j] == num)
                    return false;
            }
        }
    }
    else if(x>=6 && y>=0 && y<3)
    {
        //console.log("gr 7");
        //7th grid
        for(let i = 6; i<9; i++)
        {
            for(let j = 0; j<3; j++)
            {
                if(arr[i][j] == num)
                    return false;
            }
        }
    }

    else if(x>=3 && x<6 && y >=6 && y< 9)
    {
        //console.log("gr 6");
        // 9th grid
        for(let i = 3; i<6; i++)
        {
            for(let j = 6; j<9; j++)
            {
                if(arr[i][j] == num)
                    return false;
            }
        }
    }
    else if(x>=3 && x<6 && y>=3 && y<6)
    {
        //console.log("gr 5");
        //8th grid
        for(let i = 3; i<6; i++)
        {
            for(let j = 3; j<6; j++)
            {
                if(arr[i][j] == num)
                    return false;
            }
        }
    }
    else if(x>=3 && x<6 && y>=0 && y<3)
    {
        //console.log("gr 4");
        //7th grid
        for(let i = 3; i<6; i++)
        {
            for(let j = 0; j<3; j++)
            {
                if(arr[i][j] == num)
                    return false;
            }
        }
    }

    else if(x>=0 && x<3 && y >=6 && y< 9)
    {
        //console.log("gr 3");
        // 9th grid
        for(let i = 0; i<3; i++)
        {
            for(let j = 6; j<9; j++)
            {
                if(arr[i][j] == num)
                    return false;
            }
        }
    }
    else if(x>=0 && x<3 && y>=3 && y<6)
    {
        //console.log("gr 2");
        //8th grid
        for(let i = 0; i<3; i++)
        {
            for(let j = 3; j<6; j++)
            {
                if(arr[i][j] == num)
                    return false;
            }
        }
    }
    else if(x>=0 && x<3 && y>=0 && y<3)
    {
        
        //7th grid
        for(let i = 0; i<3; i++)
        {
            for(let j = 0; j<3; j++)
            {
                if(arr[i][j] == num)
                    return false;
            }
            
        }
    }
    return true;
  }
  const isPossible = (x, y, num) => {
    for (let i = 0; i < n; i++) {
      if (arr[x][i] === num || arr[i][y] === num) {
        return false;
      }
    }
    if(n === 9 && subgrid(x, y, num) == false)
    {
        return false;
    }
    return true;
  };
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const solver = () => {
    const emptyCells = countEmptyCells();
    let c = 0;

    const solve = async() => {
      if (c === emptyCells) {
        console.log("Solution found:");
        console.log(arr);
        return;
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (arr[i][j] === 0) {
            for (let k = 1; k <= n; k++) {
              if (isPossible(i, j, k)) {
                arr[i][j] = k;
                setArr([...arr]); 
                c++;
                await delay(0.5);
                await solve();
                if(c === emptyCells)
                {
                    break;
                }
                await delay(0.5);
                arr[i][j] = 0;
                setArr([...arr]); 
                c--;
              }
            }
            return;
          }
        }
      }
    };

     solve();
  };

  // Define handleSolve function
  const handleSolve = () => {
      solver();  // Call SudokuSolver function with the current grid and size
  };

  return (
    <>
      <div className="gridContainer">
        {arr.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((box, colIndex) => (
              <div
                className='box'
                key={colIndex}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {box !== 0 && box}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <p>Clicked coordinates: x = {coordinates.x}, y = {coordinates.y}</p>
      </div>
      <div className="right-container">
        <div className="size">Enter The Number to insert in Array</div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="input-field"
        />
        <button onClick={handleSave} className="save-button">Save</button>
        {error && <div className="error-message">{error}</div>}
        {element !== null && (
          <div className="element-message">Saved Element: {element}</div>
        )}
      </div>
      {/* Button to trigger solving */}
      <button onClick={handleSolve} className="solve-button">Solve</button>
    </>
  );
}

export default Four;
