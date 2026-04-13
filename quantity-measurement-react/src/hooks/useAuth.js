import { useState } from "react";
import {
  loginUser,
  signupUser,
  saveCurrentUser,
  getCurrentUser,
  logoutUser
} from "../services/authService";

function useAuth() {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (formData) => {
    setLoading(true);

    try {
      const response = await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      saveCurrentUser(response);

      return {
        success: true,
        data: response
      };
    } catch (error) {
      const errorMessage = 
        error?.response?.data?.message || 
        error?.response?.data?.error || 
        error?.message || 
        "Signup failed";
      console.error("Signup failed:", errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formData) => {
    setLoading(true);

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });

      saveCurrentUser(response);

      return {
        success: true,
        data: response
      };
    } catch (error) {
      const errorMessage = 
        error?.response?.data?.message || 
        error?.response?.data?.error || 
        error?.message || 
        "Login failed";
      console.error("Login failed:", errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSignup,
    handleLogin,
    currentUser: getCurrentUser(),
    logoutUser
  };
}

export default useAuth;