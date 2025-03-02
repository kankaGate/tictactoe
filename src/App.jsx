import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

const PLAYERS = { X: "Player 1", O: "Player 2" };
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard() {
  //copy the whole array
  let gameBoard = [...INITIAL_GAME_BOARD].map((innerArray) => [...innerArray]);

  //   const gameTurns = [
  //     { square: { row: 0, col: 0 }, player: "X" },
  //     { square: { row: 1, col: 1 }, player: "O" },
  //     { square: { row: 0, col: 2 }, player: "X" }
  // ];
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={players.X} symbol="X" isActive={true} />
          <Player name={players.O} symbol="O" isActive={false} />
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
