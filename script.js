const form = document.getElementById("settings-form");

const fields = {
  fullName: document.getElementById("full-name"),
  email: document.getElementById("email"),
  language: document.getElementById("language"),
  newPassword: document.getElementById("new-password"),
  confirmPassword: document.getElementById("confirm-password")
};

const errors = {
  fullName: document.getElementById("full-name-error"),
  email: document.getElementById("email-error"),
  language: document.getElementById("language-error"),
  newPassword: document.getElementById("new-password-error"),
  confirmPassword: document.getElementById("confirm-password-error")
};

const successMessage = document.getElementById("form-success");

function setError(field, errorElement, message) {
  field.setAttribute("aria-invalid", "true");
  errorElement.textContent = message;
}

function clearError(field, errorElement) {
  field.removeAttribute("aria-invalid");
  errorElement.textContent = "";
}

function validateFullName() {
  const value = fields.fullName.value.trim();

  if (value === "") {
    setError(
      fields.fullName,
      errors.fullName,
      "Please enter your full name."
    );
    return false;
  }

  if (value.length < 2) {
    setError(
      fields.fullName,
      errors.fullName,
      "Full name must be at least 2 characters."
    );
    return false;
  }

  clearError(fields.fullName, errors.fullName);
  return true;
}

function validateEmail() {
  const value = fields.email.value.trim();

  if (value === "") {
    setError(
      fields.email,
      errors.email,
      "Please enter your email address."
    );
    return false;
  }

  if (!fields.email.validity.valid) {
    setError(
      fields.email,
      errors.email,
      "Please enter a valid email address."
    );
    return false;
  }

  clearError(fields.email, errors.email);
  return true;
}

function validateLanguage() {
  if (fields.language.value === "") {
    setError(
      fields.language,
      errors.language,
      "Please select a language."
    );
    return false;
  }

  clearError(fields.language, errors.language);
  return true;
}

function validateNewPassword() {
  const value = fields.newPassword.value;

  // New password is optional.
  if (value === "") {
    clearError(fields.newPassword, errors.newPassword);
    return true;
  }

  if (value.length < 8) {
    setError(
      fields.newPassword,
      errors.newPassword,
      "New password must be at least 8 characters."
    );
    return false;
  }

  clearError(fields.newPassword, errors.newPassword);
  return true;
}

function validateConfirmPassword() {
  const newPassword = fields.newPassword.value;
  const confirmPassword = fields.confirmPassword.value;

  /*
   * If no new password was entered, confirmation does not need
   * to be validated. This also means an empty confirmation field
   * will not block submission when changing no password.
   */
  if (newPassword === "") {
    clearError(fields.confirmPassword, errors.confirmPassword);
    return true;
  }

  if (confirmPassword !== newPassword) {
    setError(
      fields.confirmPassword,
      errors.confirmPassword,
      "Passwords do not match."
    );
    return false;
  }

  clearError(fields.confirmPassword, errors.confirmPassword);
  return true;
}

function validateAll() {
  const results = [
    validateFullName(),
    validateEmail(),
    validateLanguage(),
    validateNewPassword(),
    validateConfirmPassword()
  ];

  return results.every(Boolean);
}

function getFirstInvalidField() {
  return Object.values(fields).find(
    (field) => field.getAttribute("aria-invalid") === "true"
  );
}

/*
 * Validate individual fields when the user leaves them.
 */
fields.fullName.addEventListener("blur", validateFullName);
fields.email.addEventListener("blur", validateEmail);
fields.language.addEventListener("blur", validateLanguage);
fields.newPassword.addEventListener("blur", validateNewPassword);
fields.confirmPassword.addEventListener("blur", validateConfirmPassword);

/*
 * If the user changes the new password after leaving the
 * confirmation field, the confirmation should be re-checked
 * when it is subsequently blurred or when the form is submitted.
 */
fields.newPassword.addEventListener("blur", () => {
  validateNewPassword();
  validateConfirmPassword();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  successMessage.textContent = "";

  const isValid = validateAll();

  if (!isValid) {
    const firstInvalidField = getFirstInvalidField();

    if (firstInvalidField) {
      firstInvalidField.focus();
    }

    return;
  }

  successMessage.textContent = "Your settings have been saved successfully.";
});