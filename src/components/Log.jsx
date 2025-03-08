export default function Log({ turns }) {
  console.log(turns);
  return (
    <ol id="log">
      {turns.map(
        (message, index) => (
          console.log("inside map", message),
          (
            <li key={index}>
              {message.player} selected {message.square.col},{" "}
              {message.square.row}
            </li>
          )
        )
      )}
    </ol>
  );
}
