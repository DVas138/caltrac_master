export default function getCurrentTime(): string {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  let day = String(currentDate.getDate()).padStart(2, "0");
  let hours = String(currentDate.getHours()).padStart(2, "0");
  let minutes = String(currentDate.getMinutes()).padStart(2, "0");
  let seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
}
