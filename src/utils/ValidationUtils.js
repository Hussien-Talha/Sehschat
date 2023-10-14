// ValidationUtils.js

// Function to validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate password strength
export const validatePassword = (password) => {
  // Password should be at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  // Password should contain at least one uppercase letter, one lowercase letter, and one digit
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !digitRegex.test(password)) {
    return false;
  }

  return true;
};

// Function to validate name format
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
};

// Function to validate image file format
export const validateImageFile = (file) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return allowedExtensions.includes(fileExtension);
};

// Function to validate video file format
export const validateVideoFile = (file) => {
  const allowedExtensions = ["mp4", "mov", "avi"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return allowedExtensions.includes(fileExtension);
};

// Function to validate document file format
export const validateDocumentFile = (file) => {
  const allowedExtensions = ["pdf", "doc", "docx", "txt"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return allowedExtensions.includes(fileExtension);
};
