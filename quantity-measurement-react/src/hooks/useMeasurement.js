import { useMemo, useState } from "react";
import { quantityConfig } from "../utils/quantityConfig";
import { validateMeasurementForm } from "../utils/validators";
import {
  addQuantity,
  compareQuantity,
  convertQuantity,
  divideQuantity,
  subtractQuantity
} from "../services/apiService";

function useMeasurement() {
  const [quantityType, setQuantityType] = useState("length");
  const [operation, setOperation] = useState("compare");
  const [result, setResult] = useState("Result will appear here");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    value: "",
    fromUnit: "meter",
    toUnit: "kilometer",
    value1: "",
    unit1: "meter",
    value2: "",
    unit2: "kilometer"
  });

  const availableUnits = useMemo(() => {
    return quantityConfig[quantityType].units;
  }, [quantityType]);

  const availableOperations = useMemo(() => {
    return quantityConfig[quantityType].operations;
  }, [quantityType]);

  const handleQuantityChange = (selectedQuantity) => {
    const units = quantityConfig[selectedQuantity].units;
    const operations = quantityConfig[selectedQuantity].operations;

    setQuantityType(selectedQuantity);
    setOperation(operations[0]);
    setResult("Result will appear here");
    setError("");

    setFormData({
      value: "",
      fromUnit: units[0],
      toUnit: units[1] || units[0],
      value1: "",
      unit1: units[0],
      value2: "",
      unit2: units[1] || units[0]
    });
  };

  const handleOperationChange = (selectedOperation) => {
    setOperation(selectedOperation);
    setResult("Result will appear here");
    setError("");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const getResultText = (response) => {
    if (typeof response === "string") {
      return response;
    }

    if (response?.result) {
      return response.result;
    }

    if (response?.message) {
      return response.message;
    }

    if (response?.data) {
      return response.data;
    }

    return JSON.stringify(response);
  };

  const calculate = async () => {
    const validationMessage = validateMeasurementForm(operation, formData);

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLoading(true);
    setError("");

    try {
      let response = null;

      if (operation === "convert") {
        response = await convertQuantity({
          value: formData.value,
          fromUnit: formData.fromUnit,
          toUnit: formData.toUnit,
          quantityType
        });
      }

      if (operation === "compare") {
        response = await compareQuantity({
          value1: formData.value1,
          unit1: formData.unit1,
          value2: formData.value2,
          unit2: formData.unit2,
          quantityType
        });
      }

      if (operation === "add") {
        response = await addQuantity({
          value1: formData.value1,
          unit1: formData.unit1,
          value2: formData.value2,
          unit2: formData.unit2,
          quantityType
        });
      }

      if (operation === "subtract") {
        response = await subtractQuantity({
          value1: formData.value1,
          unit1: formData.unit1,
          value2: formData.value2,
          unit2: formData.unit2,
          quantityType
        });
      }

      if (operation === "divide") {
        response = await divideQuantity({
          value1: formData.value1,
          unit1: formData.unit1,
          value2: formData.value2,
          unit2: formData.unit2,
          quantityType
        });
      }

      setResult(getResultText(response));

      // Auto-save to history
      const historyItem = {
        id: Date.now(),
        operation: operation,
        quantityType: quantityType,
        inputValues: operation === "convert" 
          ? `${formData.value} ${formData.fromUnit} → ${formData.toUnit}`
          : `${formData.value1} ${formData.unit1} & ${formData.value2} ${formData.unit2}`,
        result: getResultText(response),
        timestamp: new Date().toISOString()
      };

      // Get existing history
      const existingHistory = localStorage.getItem("calculationHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      
      // Add new item and save
      history.push(historyItem);
      localStorage.setItem("calculationHistory", JSON.stringify(history));
    } catch (err) {
      setError(err?.response?.data?.message || "Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}

export default useMeasurement;