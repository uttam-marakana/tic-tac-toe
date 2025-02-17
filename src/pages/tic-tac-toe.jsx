import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="w-24 h-24 text-5xl font-bold border border-gray-300 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "1" : "2");

  return (
    <div className="flex flex-col items-center">
      <div className="status text-lg mb-4">{status}</div>
      <div className="board-row flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const winner = calculateWinner(currentSquares);
  const moves = history.map((squares, move) => {
    const description = move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <tr key={move}>
        <td className="border px-4 py-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => jumpTo(move)}
          >
            {description}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="game flex flex-col items-center p-4">
      <div className="game-board mb-4">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {winner && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Winner is: {winner}</h2>
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-xl active:scale-95 cursor-pointer"
        onClick={restartGame}
      >
        Start A New Game
      </button>
      <div className="mt-4 w-full max-w-md">
        <h3 className="text-xl font-bold mb-2">Game History</h3>
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Moves</th>
            </tr>
          </thead>
          <tbody>
            {moves}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}