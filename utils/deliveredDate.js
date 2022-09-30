export function deliveredDate(){
  const month = [{month:"January", days: 31},{month:"February", days: 28},{month:"March", days:31},{month:"April", days:30},{month:"May", days:31},{month:"June", days:30},{month:"July", days:31},{month:"August",days:31},{month:"September",days:30},{month:"October",days:31},{month:"November",days:30},{month:"December",days:31}];
  let minDaysToAdd = 14; //Max amount of days
  let maxDaysToAdd = 7; //Max amount of days

  //Estimate delivery date from today   
  let todaysDate = new Date();
  
  let minDeliveryDate = todaysDate.setDate(todaysDate.getDate() + minDaysToAdd);
  let maxDeliveryDate = todaysDate.setDate(todaysDate.getDate() + maxDaysToAdd);
  const minDate = new Date(minDeliveryDate)
  const maxDate = new Date(maxDeliveryDate)


  //Min delivery date   
  let minMonth = month[minDate.getMonth()].month
  let minDays = minDate.getDate() > month[minDate.getMonth()].days ? minDate.getDate() - month[minDate.getMonth()].days : minDate.getDate()
  let minYear = minDate.getFullYear()

  //Max delivery date  
  let maxMonth = month[maxDate.getMonth()].month
  let maxDays = maxDate.getDate() > month[maxDate.getMonth()].days ? maxDate.getDate() - month[maxDate.getMonth()].days : maxDate.getDate()
  let maxYear = maxDate.getFullYear()
  return {minMonth, minDays, minYear, maxMonth, maxDays, maxYear}
}