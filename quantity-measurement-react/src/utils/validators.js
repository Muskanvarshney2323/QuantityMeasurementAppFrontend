export const validateAuthForm = (formData, isSignup) => {
  if (isSignup && !formData.name.trim()) {
    return "Name is required";
  }

  if (!formData.email.trim()) {
    return "Email is required";
  }

  if (!formData.password.trim()) {
    return "Password is required";
  }

  if (formData.password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};

export const validateMeasurementForm = (operation, formData) => {
  if (operation === "convert") {
    if (formData.value === "") return "Please enter a value";
    if (!formData.fromUnit) return "Please select from unit";
    if (!formData.toUnit) return "Please select to unit";
    return "";
  }

  if (formData.value1 === "") return "Please enter first value";
  if (formData.value2 === "") return "Please enter second value";
  if (!formData.unit1) return "Please select first unit";
  if (!formData.unit2) return "Please select second unit";

  return "";
};