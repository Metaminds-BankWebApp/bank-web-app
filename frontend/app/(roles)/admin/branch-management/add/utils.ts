export function generateBranchId(date = new Date()): string {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(100 + Math.random() * 900);

  return `BR-${year}${month}${day}-${random}`;
}
