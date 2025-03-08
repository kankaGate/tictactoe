import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = { X: "Player 1", O: "Player 2" };
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  //copy the whole array
  let gameBoard = INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]);
  console.log("##gameBoard before ", gameBoard);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    gameBoard[square.row][square.col] = player;
  }

  console.log("##gameBoard after ", gameBoard);
  return gameBoard;
}

function getActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

function calculateWinner(gameBoard, players) {
  console.log("player:=====>", players);
  let winner = null;
  let loser = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
      if (firstSquareSymbol === "X") {
        loser = players["O"];
      } else {
        loser = players["X"];
      }
    }
    console.log("winner : ", winner);
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = calculateWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleResetGame() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  }
  const activePlayer = getActivePlayer(gameTurns);

  function handleSquareClick(rowIndex, columnIndex) {
    console.log(rowIndex, columnIndex);
    setGameTurns((prevGameTurns) => {
      const currentPlayer = getActivePlayer(prevGameTurns);
      return [
        { square: { row: rowIndex, col: columnIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onResetGame={handleResetGame} />
        )}
        <GameBoard board={gameBoard} onSelectSquare={handleSquareClick} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
