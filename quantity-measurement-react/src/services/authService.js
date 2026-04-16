import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5020/api";
console.log("BASE_URL =", BASE_URL);
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const CURRENT_USER_KEY = "currentUser";

// Login user with email and password
export const loginUser = async (credentials) => {
  try {
    const response = await authApi.post("/Auth/login", {
      email: credentials.email,
      password: credentials.password
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Signup user with name, email and password
export const signupUser = async (userData) => {
  try {
    const response = await authApi.post("/Auth/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

// Save current user to localStorage
export const saveCurrentUser = (user) => {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving current user:", error);
  }
};

// Get current user from localStorage
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Logout user - clear from localStorage
export const logoutUser = () => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error("Error logging out user:", error);
  }
};
