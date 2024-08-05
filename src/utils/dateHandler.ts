export const getCurrentDate = (): string => {
  let now = new Date();
  let currentDate = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Guatemala" })
  );

  let formattedDate = currentDate.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return formattedDate;
};
