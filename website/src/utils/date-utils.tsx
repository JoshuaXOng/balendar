export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const generateMondays = (currentMonday: Date, forFuture: boolean) => {
  const generatedMonday = new Date(currentMonday);
  forFuture ? 
    generatedMonday.setDate(currentMonday.getDate() + 7) :
    generatedMonday.setDate(currentMonday.getDate() - 7);
  return generatedMonday;
}

export const getClosestPrevMonday =  () => {
  const closestMonday = new Date();
  closestMonday.setDate(closestMonday.getDate() - (closestMonday.getDay() + 6) % 7);
  return closestMonday;
}

export const toDateFromYyyyMmDd = (apiDate: string) => {
  const [year, month, day] = apiDate.split("-");

  const date = new Date();
  date.setFullYear(parseInt(year));
  date.setMonth(parseInt(month) - 1);
  date.setDate(parseInt(day));
  return date;
}

export const toYyyyMmDdFromDate = (date: Date) => {
  return `${(date.getFullYear()).toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}` 
}
