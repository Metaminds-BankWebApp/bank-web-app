const PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$%&*!";

export function generateOfficerUsername(firstName: string, lastName: string): string {
  const normalizedFirstName = firstName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  const normalizedLastName = lastName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  const randomSeed = String(Math.floor(100 + Math.random() * 900));
  const base = `${normalizedFirstName}${normalizedLastName}` || normalizedFirstName || normalizedLastName || "officer";

  return `${base}${randomSeed}`.slice(0, 20);
}

export function generateOfficerPassword(length = 10): string {
  const size = Math.max(8, length);
  let value = "";

  for (let i = 0; i < size; i += 1) {
    const randomIndex = Math.floor(Math.random() * PASSWORD_CHARS.length);
    value += PASSWORD_CHARS[randomIndex];
  }

  return value;
}
