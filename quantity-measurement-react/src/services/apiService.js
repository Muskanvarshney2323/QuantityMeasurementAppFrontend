import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const quantityApi = axios.create({
  baseURL: `${BASE_URL}/Quantity`,
  headers: {
    "Content-Type": "application/json"
  }
});

// Helper function to format quantity type to match backend expectations
const formatQuantityType = (type) => {
  return type.toLowerCase();
};

// Helper function to format unit names (keep lowercase as per backend)
const formatUnit = (unit) => {
  return unit.toLowerCase();
};

export const convertQuantity = async (payload) => {
  const response = await quantityApi.post("/convert", {
    value: Number(payload.value),
    fromUnit: formatUnit(payload.fromUnit),
    toUnit: formatUnit(payload.toUnit),
    quantityType: formatQuantityType(payload.quantityType)
  });
  return response.data;
};

export const compareQuantity = async (payload) => {
  const response = await quantityApi.post("/compare", {
    value1: Number(payload.value1),
    unit1: formatUnit(payload.unit1),
    value2: Number(payload.value2),
    unit2: formatUnit(payload.unit2),
    quantityType: formatQuantityType(payload.quantityType)
  });
  return response.data;
};

export const addQuantity = async (payload) => {
  const response = await quantityApi.post("/add", {
    value1: Number(payload.value1),
    unit1: formatUnit(payload.unit1),
    value2: Number(payload.value2),
    unit2: formatUnit(payload.unit2),
    quantityType: formatQuantityType(payload.quantityType)
  });
  return response.data;
};

export const subtractQuantity = async (payload) => {
  const response = await quantityApi.post("/subtract", {
    value1: Number(payload.value1),
    unit1: formatUnit(payload.unit1),
    value2: Number(payload.value2),
    unit2: formatUnit(payload.unit2),
    quantityType: formatQuantityType(payload.quantityType)
  });
  return response.data;
};

export const divideQuantity = async (payload) => {
  const response = await quantityApi.post("/divide", {
    value1: Number(payload.value1),
    unit1: formatUnit(payload.unit1),
    value2: Number(payload.value2),
    unit2: formatUnit(payload.unit2),
    quantityType: formatQuantityType(payload.quantityType)
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await quantityApi.get("/history");
  return response.data;
};

export const getHistoryCount = async () => {
  const response = await quantityApi.get("/count");
  return response.data;
};

export const getOperationTypes = async () => {
  const response = await quantityApi.get("/operationtype");
  return response.data;
};

export const getMeasurementTypes = async () => {
  const response = await quantityApi.get("/measurementtype");
  return response.data;
};