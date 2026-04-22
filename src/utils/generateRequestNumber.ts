export function generateRequestNumber(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const seq = Math.floor(1000 + Math.random() * 9000);
  return `BRU-${year}-${month}-${seq}`;
}
