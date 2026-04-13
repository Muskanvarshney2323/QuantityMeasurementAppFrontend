import { quantityConfig } from "../../utils/quantityConfig";

const quantityIcons = {
  length: "📏",
  weight: "⚖️",
  volume: "💧",
  temperature: "🌡️"
};

function QuantitySelector({ quantityType, onChange }) {
  return (
    <div className="quantity-grid">
      {Object.keys(quantityConfig).map((key) => (
        <button
          key={key}
          className={quantityType === key ? "quantity-card active" : "quantity-card"}
          onClick={() => onChange(key)}
        >
          <span className="quantity-icon">{quantityIcons[key]}</span>
          {quantityConfig[key].label}
        </button>
      ))}
    </div>
  );
}

export default QuantitySelector;