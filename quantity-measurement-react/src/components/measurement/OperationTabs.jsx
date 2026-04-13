const operationIcons = {
  compare: "⚖️",
  convert: "🔄",
  add: "➕",
  subtract: "➖",
  divide: "➗"
};

function OperationTabs({ operations, selectedOperation, onChange }) {
  return (
    <div className="operation-grid">
      {operations.map((item) => (
        <button
          key={item}
          className={selectedOperation === item ? "operation-btn active" : "operation-btn"}
          onClick={() => onChange(item)}
          title={`${item.charAt(0).toUpperCase() + item.slice(1)} operation`}
        >
          <span className="operation-icon">{operationIcons[item]}</span>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default OperationTabs;