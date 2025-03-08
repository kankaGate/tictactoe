export default function GameOver({ winner, onResetGame }) {
  console.log("masuk game over", winner);
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner}, wins! Congratulations</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      {/*<h3>{winner} wins!</h3>*/}
      <button onClick={onResetGame}>Play Again</button>
    </div>
  );
}
