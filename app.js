const turnDisplay = document.querySelector('.turnDisplay');
const Gameboard = (function() {
	console.log('making gameboard');
	let board = document.getElementById('boardContainer');
	// let boardArray = [ 'X', 'O', 'O', 'O', 'X', 'O', 'X', 'O', 'O' ];
	let boardArray = [];

	const makeBoard = (function() {
		for (let i = 0; i < 9; i++) {
			let cell = document.createElement('div');
			cell.classList.add('cell');
			cell.textContent = boardArray[i];
			cell.dataset.value = i;
			board.append(cell);
		}
	})();

	const winningBoards = [
		[ 0, 1, 2 ],
		[ 3, 4, 5 ],
		[ 6, 7, 8 ],
		[ 0, 3, 6 ],
		[ 0, 4, 8 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 2, 4, 6 ]
	];

	return {
		boardArray,
		winningBoards,
		makeBoard
	};
})();

const Player = (name, symbol, turn) => {
	return { name, symbol, turn };
};

const Game = (function() {
	const player1Name = document.querySelector('#name-p1');
	const player2Name = document.querySelector('#name-p2');
	const submitBtn = document.querySelector('#submit');
	const form = document.getElementById('nameform');
	const playersDisplay = document.querySelector('.nameDisplay');
	const resetBtn = document.querySelector('#resetBtn');
	// let cells = document.querySelectorAll('.cell');
	const cells = document.querySelectorAll('.cell');
	const startBtn = document.querySelector('#startBtn');

	let player1;
	let player2;

	let winner;
	const checkWinner = function() {
		for (let i = 0; i < 8; i++) {
			let curr = Gameboard.winningBoards[i];
			if (
				Gameboard.boardArray[curr[0]] === 'X' &&
				Gameboard.boardArray[curr[1]] === 'X' &&
				Gameboard.boardArray[curr[2]] === 'X'
			) {
				winner = player1;
				turnDisplay.textContent = `${winner.name} wins!`;
				player1.turn = false;
				player2.turn = false;
				return winner;
			} else if (
				Gameboard.boardArray[curr[0]] === 'O' &&
				Gameboard.boardArray[curr[1]] === 'O' &&
				Gameboard.boardArray[curr[2]] === 'O'
			) {
				winner = player2;
				turnDisplay.textContent = `${winner.name} wins!`;
				player1.turn = false;
				player2.turn = false;
				return winner;
			}
		}
	};

	submitBtn.addEventListener('click', () => {
		player1 = Player(player1Name.value, 'X', true);
		player2 = Player(player2Name.value, 'O', false);
		playersDisplay.textContent = `${player1.name} vs. ${player2.name}`;
		form.style.display = 'none';
		turnDisplay.textContent = `${player1.name}'s turn`;

		return {
			player1,
			player2
		};
	});

	resetBtn.addEventListener('click', () => {
		Gameboard.boardArray = [];
		cells.forEach((cell) => {
			cell.textContent = '';
		});
		winner = null;
		turnDisplay.textContent = 'start again!';
		player1.turn = true;
		player2.turn = false;
	});

	const playerTurn = (function() {
		cells.forEach((cell) => {
			cell.addEventListener('click', function(e) {
				if (player1.turn && !e.target.textContent) {
					cell.textContent = player1.symbol;
					turnDisplay.textContent = `${player2.name}'s turn`;
					Gameboard.boardArray[e.target.dataset.value] = player1.symbol;
					player1.turn = false;
					player2.turn = true;
				} else if (player2.turn && !e.target.textContent) {
					cell.textContent = player2.symbol;
					turnDisplay.textContent = `${player1.name}'s turn`;
					Gameboard.boardArray[e.target.dataset.value] = player2.symbol;
					player1.turn = true;
					player2.turn = false;
				}
				checkWinner();
			});
		});
	})();
})();
