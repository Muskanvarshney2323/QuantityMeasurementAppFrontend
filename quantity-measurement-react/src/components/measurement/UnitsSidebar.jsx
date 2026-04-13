import { quantityConfig } from "../../utils/quantityConfig";

const quantityIcons = {
  length: "📏",
  weight: "⚖️",
  volume: "💧",
  temperature: "🌡️"
};

function UnitsSidebar({ quantityType, onSelectQuantity }) {
  return (
    <aside className="units-sidebar">
      <div className="units-header">
        <h3>📦 Quantities</h3>
        <p className="units-subtitle">Choose a type</p>
      </div>

      <div className="units-list">
        {Object.keys(quantityConfig).map((key) => (
          <div
            key={key}
            className={`unit-item ${quantityType === key ? "active" : ""}`}
            onClick={() => onSelectQuantity(key)}
            title={`Select ${quantityConfig[key].label}`}
          >
            <span className="unit-icon">{quantityIcons[key]}</span>
            <span className="unit-name">{quantityConfig[key].label}</span>
          </div>
        ))}
      </div>

      <div className="units-info">
        <p className="info-text">
          💡 Click to switch between measurement types
        </p>
      </div>
    </aside>
  );
}

export default UnitsSidebar;
