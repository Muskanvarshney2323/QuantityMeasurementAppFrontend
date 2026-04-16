import { quantityConfig } from "../../utils/quantityConfig";

function OperationInfo({ quantityType, operation, formData }) {
  const quantityLabel = quantityConfig[quantityType]?.label || quantityType;
  const operationLabel = operation?.charAt(0).toUpperCase() + operation?.slice(1);

  const getUnitDisplay = () => {
    if (operation === "convert") {
      const fromUnit = formData.fromUnit?.charAt(0).toUpperCase() + formData.fromUnit?.slice(1);
      const toUnit = formData.toUnit?.charAt(0).toUpperCase() + formData.toUnit?.slice(1);
      return `${fromUnit} → ${toUnit}`;
    } else {
      const unit1 = formData.unit1?.charAt(0).toUpperCase() + formData.unit1?.slice(1);
      const unit2 = formData.unit2?.charAt(0).toUpperCase() + formData.unit2?.slice(1);
      return `${unit1} & ${unit2}`;
    }
  };

  return (
    <div className="operation-info-box">
      <div className="info-header">
        <h4>📊 Working Info</h4>
      </div>

      <div className="info-content">
        <div className="info-item">
          <span className="info-label">Quantity:</span>
          <span className="info-value">{quantityLabel}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Operation:</span>
          <span className="info-value">{operationLabel}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Units:</span>
          <span className="info-value units-display">{getUnitDisplay()}</span>
        </div>
      </div>
    </div>
  );
}

export default OperationInfo;
