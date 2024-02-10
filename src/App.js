import { useState } from 'react'; 

function Square({ value, onSquareClick }) {

	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	)
}
function calculateWinner(squares) {
	console.log(squares)
	let lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (let i = 0; i < lines.length; i++) {

		const [a, b, c] = lines[i];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

			return squares[a];
		}
	}
	return null;
}

function Board({ turnX, squares, onPlay }) {

	//const [squares, setSquares] = useState(Array(9).fill(null))


	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		const turn = turnX
		if (turn) { nextSquares[i] = "X" } else { nextSquares[i] = "O" }

		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares)
	let status;
	if (winner) {
		status = "The winner is: " + winner
	} else {
		status = "Turn: " + (turnX ? 'X' : 'O');
	}

	return (
		<>

			<h1>{status}</h1>
			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}

export default function Game() {

	const [turnX, setTurnX] = useState(true)
	const [history, setHistory] = useState([Array(9).fill(null)])
	const currentSquares = history[history.length - 1]

	function handlePlay(nextSquares) {
		setHistory([...history, nextSquares])
		setTurnX(!turnX);
	}

	const moves = history.map((squares, i) => {
		return (
		<li><button
			key={squares.indexOf}
			value={i}>Mossa n. {i}</button>
		</li> 
		)
	})

	return (
		<div className='game'>
			<div className='game-board'>
				<Board turnX={turnX} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}