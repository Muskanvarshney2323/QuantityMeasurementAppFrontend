import UnitDropdown from "./UnitDropdown";

function MeasurementForm({
  operation,
  formData,
  units,
  handleInputChange,
  onCalculate,
  loading
}) {
  const handleClear = () => {
    // Clear all form fields
    handleInputChange("value", "");
    handleInputChange("value1", "");
    handleInputChange("value2", "");
  };

  return (
    <div className="form-panel">
      {operation === "convert" ? (
        <div className="form-row">
          <input
            type="number"
            placeholder="Enter value"
            value={formData.value}
            onChange={(e) => handleInputChange("value", e.target.value)}
          />

          <UnitDropdown
            value={formData.fromUnit}
            options={units}
            onChange={(value) => handleInputChange("fromUnit", value)}
          />

          <UnitDropdown
            value={formData.toUnit}
            options={units}
            onChange={(value) => handleInputChange("toUnit", value)}
          />
        </div>
      ) : (
        <>
          <div className="form-row two-lines">
            <input
              type="number"
              placeholder="Enter first value"
              value={formData.value1}
              onChange={(e) => handleInputChange("value1", e.target.value)}
            />

            <UnitDropdown
              value={formData.unit1}
              options={units}
              onChange={(value) => handleInputChange("unit1", value)}
            />
          </div>

          <div className="form-row two-lines">
            <input
              type="number"
              placeholder="Enter second value"
              value={formData.value2}
              onChange={(e) => handleInputChange("value2", e.target.value)}
            />

            <UnitDropdown
              value={formData.unit2}
              options={units}
              onChange={(value) => handleInputChange("unit2", value)}
            />
          </div>
        </>
      )}

      <div className="form-buttons">
        <button className="primary-btn full-width" onClick={onCalculate}>
          {loading ? "Calculating..." : "Calculate"}
        </button>
        <button className="secondary-btn full-width" onClick={onCalculate}>
          ⟲ Recalculate
        </button>
        <button className="clear-btn full-width" onClick={handleClear}>
          🗑️ Clear
        </button>
      </div>
    </div>
  );
}

export default MeasurementForm;