import React, { useState } from 'react';
import { solver } from '../Functions/LeftSolver';

const Suduko = (props) => {
  const [leftpuz, setleftpuz] = useState(props.arr);
  const [leftcopy, leftsetCopy] = useState([...leftpuz]);

  const dosolve = async () => {
    await solver(leftcopy, setleftpuz, leftsetCopy);
    leftsetCopy(leftcopy); // Get the solved leftpuzzle from the solver function
    setleftpuz(leftcopy);
  };

  const test = () => {
    console.log(leftcopy);
  };

  return (
    <div className="sudoku-container">
      {Array.from({ length: 3 }, (_, boxRowIndex) => (
        <div className="box-row" key={boxRowIndex}>
          {Array.from({ length: 3 }, (_, boxColIndex) => (
            <div className="box" key={boxColIndex}>
              {Array.from({ length: 3 }, (_, rowIndex) => (
                <div className="row" key={rowIndex}>
                  {Array.from({ length: 3 }, (_, colIndex) => {
                    const value = leftpuz[boxRowIndex * 3 + rowIndex][boxColIndex * 3 + colIndex];
                    return (
                      <div className="col" key={colIndex} onClick={test}>
                        {value === 0 ? '' : value}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={dosolve}>Solve on a Click!!</button>
    </div>
  );
};

export default Suduko;
