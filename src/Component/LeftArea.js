import Suduko from './Suduko';

const LeftArea = (props) => {

    let leftPuzzle= [...props.puzle];
    
    
    //solver(leftPuzzle);
  return (
    <div>
      <h1>Sudoku Solver Visualization</h1>
      <Suduko arr = {leftPuzzle}></Suduko>
    </div>
  )
}

export default LeftArea
