import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppNavbar from "../components/common/AppNavbar";
import UnitsSidebar from "../components/measurement/UnitsSidebar";
import QuantitySelector from "../components/measurement/QuantitySelector";
import OperationTabs from "../components/measurement/OperationTabs";
import MeasurementForm from "../components/measurement/MeasurementForm";
import ResultCard from "../components/measurement/ResultCard";
import OperationInfo from "../components/measurement/OperationInfo";
import SaveResultButton from "../components/measurement/SaveResultButton";
import useTheme from "../hooks/useTheme";
import useMeasurement from "../hooks/useMeasurement";
import { getCurrentUser } from "../services/authService";

function Dashboard() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    quantityType,
    operation,
    result,
    error,
    loading,
    formData,
    availableUnits,
    availableOperations,
    handleQuantityChange,
    handleOperationChange,
    handleInputChange,
    calculate
  } = useMeasurement();

  const handleSave = () => {
    const user = getCurrentUser();

    if (!user) {
      alert("Please login or signup to access history.");
      navigate("/auth");
      return;
    }

    alert("If your backend stores operations automatically, this result will appear in history.");
  };

  return (
    <div className="page-container">
      <AppNavbar theme={theme} toggleTheme={toggleTheme} />

      <main className="dashboard-page">
        <section className="hero-box">
          <h1>🎯 Quantity Measurement</h1>
          <p>
            A modern React-based solution for converting, comparing, adding, subtracting, and dividing multiple measurement quantities with precision.
          </p>
        </section>

        <div className="dashboard-with-sidebar">
          <UnitsSidebar
            quantityType={quantityType}
            onSelectQuantity={handleQuantityChange}
          />

          <div className="dashboard-main">
            <QuantitySelector
              quantityType={quantityType}
              onChange={handleQuantityChange}
            />

            <OperationTabs
              operations={availableOperations}
              selectedOperation={operation}
              onChange={handleOperationChange}
            />

            <div className="dashboard-grid">
              <MeasurementForm
                operation={operation}
                formData={formData}
                units={availableUnits}
                handleInputChange={handleInputChange}
                onCalculate={calculate}
                loading={loading}
              />

              <div className="result-wrapper">
                <OperationInfo
                  quantityType={quantityType}
                  operation={operation}
                  formData={formData}
                />
                <ResultCard result={result} error={error} />
                <SaveResultButton onSave={handleSave} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;