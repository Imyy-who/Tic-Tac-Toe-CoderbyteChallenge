import React, { useState }  from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}




function Square({onClick, value}) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick = {onClick} 
    >
    {value}
    </div>
  );
}

function Board() {
const [player , setPlayer] = useState('X');
const [squares, setSquares] = useState(Array(9).fill(null));
const [winner, setWinner] = useState(null);


const onClick = (i) => {
  if(!squares[i] && !winner) {  
    let newSquares = squares.slice();
    newSquares[i] = player;
    setSquares(newSquares);
    checkWinner(newSquares);
    setPlayer(player === 'X' ? 'O' : 'X');
  }
}

const handleReset= () => {
  setSquares(Array(9).fill(null));
  setPlayer('X');
  setWinner(null);

}

 const checkWinner = (currentBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        setWinner(currentBoard[a]);
        return;
      }
    }
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{player}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>
      <button style={buttonStyle} onClick={handleReset}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value = {squares[0]} onClick={() =>onClick(0)} /> 
          <Square value = {squares[1]} onClick={() =>onClick(1)} />
          <Square value = {squares[2]} onClick={() =>onClick(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value = {squares[3]}  onClick={() =>onClick(3)}/>
          <Square value = {squares[4]}  onClick={() =>onClick(4)}/>
          <Square value = {squares[5]}  onClick={() =>onClick(5)}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value = {squares[6]}  onClick ={ () =>onClick(6)}/>
          <Square value = {squares[7]}  onClick={() =>onClick(7)}/>
          <Square value = {squares[8]}  onClick={() =>onClick(8)}/>
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
