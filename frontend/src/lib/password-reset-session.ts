const PASSWORD_RESET_TOKEN_KEY = "primecore:password-reset-token";

export function savePasswordResetToken(resetToken: string) {
  window.sessionStorage.setItem(PASSWORD_RESET_TOKEN_KEY, resetToken);
}

export function getPasswordResetToken() {
  return window.sessionStorage.getItem(PASSWORD_RESET_TOKEN_KEY) ?? "";
}

export function clearPasswordResetToken() {
  window.sessionStorage.removeItem(PASSWORD_RESET_TOKEN_KEY);
}
