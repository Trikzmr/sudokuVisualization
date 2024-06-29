import React from 'react'
import LeftArea from './LeftArea'


const SudokuArea = () => {

    let puzzle= 
    [
        [0, 9, 0, 3, 0, 6, 0, 4, 0],
        [7, 0, 0, 9, 0, 4, 0, 0, 1],
        [0, 2, 0, 0, 0, 0, 0, 5, 0],
        [9, 0, 0, 0, 1, 0, 0, 0, 6],
        [0, 0, 8, 0, 0, 0, 7, 0, 0],
        [0, 5, 1, 0, 0, 0, 4, 8, 0],
        [0, 0, 0, 1, 9, 3, 0, 0, 0],
        [0, 0, 0, 5, 0, 7, 0, 0, 0],
        [0, 7, 0, 0, 8, 0, 0, 6, 0]
    ]
  return (
    <>
        <div className='area'>
            <div className='left'>
                <LeftArea puzle = {puzzle}></LeftArea>
            </div>

        </div>
    </>
  )
}

export default SudokuArea
