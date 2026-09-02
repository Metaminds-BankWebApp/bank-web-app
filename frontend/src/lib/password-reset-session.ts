const PASSWORD_RESET_TOKEN_KEY = "primecore:password-reset-token";
const PASSWORD_RESET_KIND_KEY = "primecore:password-reset-kind";

export type PasswordResetSessionKind = "PASSWORD_RESET" | "OFFICER_ACTIVATION";

export function savePasswordResetToken(
  resetToken: string,
  kind: PasswordResetSessionKind = "PASSWORD_RESET"
) {
  window.sessionStorage.setItem(PASSWORD_RESET_TOKEN_KEY, resetToken);
  window.sessionStorage.setItem(PASSWORD_RESET_KIND_KEY, kind);
}

export function getPasswordResetToken() {
  return window.sessionStorage.getItem(PASSWORD_RESET_TOKEN_KEY) ?? "";
}

export function getPasswordResetSessionKind(): PasswordResetSessionKind {
  return window.sessionStorage.getItem(PASSWORD_RESET_KIND_KEY) === "OFFICER_ACTIVATION"
    ? "OFFICER_ACTIVATION"
    : "PASSWORD_RESET";
}

export function clearPasswordResetToken() {
  window.sessionStorage.removeItem(PASSWORD_RESET_TOKEN_KEY);
  window.sessionStorage.removeItem(PASSWORD_RESET_KIND_KEY);
}
