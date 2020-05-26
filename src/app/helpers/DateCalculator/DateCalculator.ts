export class DateCalculator {
  readonly Days = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  readonly Months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  static calcLastWorkday(day: Date): string {
    const weekDay = day.getDay();

    if (weekDay === 0) {
      return getDate(day, 2);
    }

    if (weekDay === 1) {
      return getDate(day, 3);
    }

    return getDate(day, 1);
  }
}
