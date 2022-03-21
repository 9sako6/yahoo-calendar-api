export const beginningOfMonth = (year: number, month: number) =>
  `${year}${String(month).padStart(2, "0")}01`;
