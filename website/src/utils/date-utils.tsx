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
