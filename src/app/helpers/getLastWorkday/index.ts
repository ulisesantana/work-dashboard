enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

const isLeapYear = (year: number) =>
  (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

const longestMonths = [
  Month.January,
  Month.March,
  Month.May,
  Month.July,
  Month.August,
  Month.October,
  Month.December,
];

const getLastDayOfThePreviousMonth = (d: Date) => {
  const year = d.getFullYear();
  const month = d.getMonth();
  const previousMonth = month === Month.January ? Month.December : month - 1;

  if (previousMonth === Month.February) {
    return isLeapYear(year) ? 29 : 28;
  }

  if (longestMonths.includes(previousMonth)) {
    return 31;
  }

  return 30;
};

const getDate = (d: Date, removeDays = 0) => {
  const year = d.getFullYear();
  const month = d.getMonth();
  const dayOfTheMonth = d.getDate() - removeDays;

  if (dayOfTheMonth < 1) {
    const lastDayOfTheMonth = getLastDayOfThePreviousMonth(d);

    if (month === 0) {
      return `${year - 1}-12-${lastDayOfTheMonth - dayOfTheMonth}`;
    } else {
      return `${year}-${month}-${lastDayOfTheMonth - dayOfTheMonth}`;
    }
  }

  return `${year}-${month + 1}-${dayOfTheMonth}`;
};

export function getLastWorkday(day: Date): string {
  const weekDay = day.getDay();

  if (weekDay === 0) {
    return getDate(day, 2);
  }

  if (weekDay === 1) {
    return getDate(day, 3);
  }

  return getDate(day, 1);
}
