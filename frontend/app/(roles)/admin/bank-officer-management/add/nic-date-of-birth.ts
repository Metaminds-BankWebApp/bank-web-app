const oldNicRegex = /^\d{9}[VX]$/i;
const newNicRegex = /^\d{12}$/;
const fixedNicMonthLengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;

export function hasSriLankanNicFormat(nic: string): boolean {
  const normalizedNic = nic.trim();
  return oldNicRegex.test(normalizedNic) || newNicRegex.test(normalizedNic);
}

export function deriveDateOfBirthFromNic(nic: string): string | null {
  const normalizedNic = nic.trim().toUpperCase();
  if (!hasSriLankanNicFormat(normalizedNic)) {
    return null;
  }

  const isOldNic = oldNicRegex.test(normalizedNic);
  const year = isOldNic
    ? 1900 + Number(normalizedNic.slice(0, 2))
    : Number(normalizedNic.slice(0, 4));
  const encodedDay = Number(
    isOldNic ? normalizedNic.slice(2, 5) : normalizedNic.slice(4, 7)
  );
  const dayOfFixedYear = encodedDay > 500 ? encodedDay - 500 : encodedDay;

  if (year < 1900 || dayOfFixedYear < 1 || dayOfFixedYear > 366) {
    return null;
  }

  let remainingDays = dayOfFixedYear;
  let monthIndex = 0;
  while (
    monthIndex < fixedNicMonthLengths.length &&
    remainingDays > fixedNicMonthLengths[monthIndex]
  ) {
    remainingDays -= fixedNicMonthLengths[monthIndex];
    monthIndex += 1;
  }

  if (monthIndex >= fixedNicMonthLengths.length) {
    return null;
  }

  const month = monthIndex + 1;
  if (month === 2 && remainingDays === 29 && !isLeapYear(year)) {
    return null;
  }

  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(
    remainingDays
  ).padStart(2, "0")}`;
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
