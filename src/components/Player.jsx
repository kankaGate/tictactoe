import { useState, useRef } from "react";
export default function Player({ name, symbol, isActive, onChangeName }) {
  // let isEdit = false;
  const [isEdit, setIsEdit] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  const inputRef = useRef(null);

  console.log("============");
  console.log("isEdit ", isEdit);
  console.log("============");

  //html element to display the player name
  let playerElement = <span className="player-name">{playerName}</span>;
  if (isEdit) {
    playerElement = (
      <input
        ref={inputRef}
        type="text"
        className="player-name"
        required
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("Enter key pressed");
            handleToggleEdit();
          }
        }}
      />
    );
  }

  const handleToggleEdit = () => {
    setIsEdit((prev) => !prev);
    console.log("isEdit in handleToggleEdit", isEdit);
    if (isEdit) {
      setPlayerName((prevName) => prevName.trim() || name); // Prevent empty name
      onChangeName(symbol, playerName);
    } else {
      setTimeout(() => inputRef.current?.focus(), 0); // Auto-focus input
    }
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerElement}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleToggleEdit}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
}
