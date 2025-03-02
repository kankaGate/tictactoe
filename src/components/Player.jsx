export default function Player({ name, symbol, isActive }) {
  let isEdit = false;
  //   let isActive = true;
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {name}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
}
