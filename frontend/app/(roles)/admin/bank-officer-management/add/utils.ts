const PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$%&*!";

export function generateOfficerId(date = new Date()): string {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(100 + Math.random() * 900);

  return `OFF-${year}${month}${day}-${random}`;
}

export function generateOfficerUsername(officerName: string, officerId: string): string {
  const normalizedName = officerName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  const idSeed = officerId.replace(/[^0-9]/g, "").slice(-4);
  const base = normalizedName || "officer";

  return `${base}${idSeed}`.slice(0, 20);
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
