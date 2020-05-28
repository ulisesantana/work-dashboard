export enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
enum Months {
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

export class DateCalculator {
  static longestMonths = [
    Months.January,
    Months.March,
    Months.May,
    Months.July,
    Months.August,
    Months.October,
    Months.December,
  ];
  static oneDayInMs = 86400000;

  static calcLastWorkday(date: Date = new Date()): string {
    const weekDay = date.getDay();

    if (weekDay === Days.Sunday) {
      return this.calcDay(date, 2);
    }

    if (weekDay === Days.Monday) {
      return this.calcDay(date, 3);
    }

    return this.calcDay(date, 1);
  }

  static calcLastWeekday(weekday: Days, date = new Date()) {
    const week = this.calcDatesForLastWeek(date);
    return week.find(([day]) => weekday === day)![1];
  }

  private static calcDatesForLastWeek(date = new Date()): [Days, string][] {
    return Array.from({ length: 7 })
      .map((irrelevant, i) => new Date(date.getTime() - this.oneDayInMs * i))
      .map((date) => [date.getDay() as Days, this.toISODate(date)]);
  }

  private static calcDay(date: Date, removeDays = 0): string {
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayOfTheMonth = this.calcDaysToRemove(date, removeDays);

    if (dayOfTheMonth <= removeDays) {
      const lastDayOfTheMonth = this.calcLastDayOfThePreviousMonth(date);

      if (month === Months.January) {
        return `${year - 1}-12-${lastDayOfTheMonth - dayOfTheMonth}`;
      } else {
        return `${year}-${month}-${lastDayOfTheMonth - dayOfTheMonth}`;
      }
    } else {
      return `${year}-${month + 1}-${dayOfTheMonth}`;
    }
  }

  private static calcDaysToRemove(d: Date, removeDays: number): number {
    return d.getDate() < removeDays
      ? removeDays - d.getDate()
      : d.getDate() - removeDays;
  }

  private static calcLastDayOfThePreviousMonth(d: Date): number {
    const year = d.getFullYear();
    const month = d.getMonth();
    const previousMonth = this.calcPreviousMonth(month);

    if (previousMonth === Months.February) {
      return this.isLeapYear(year) ? 29 : 28;
    }

    if (this.isLongMonth(previousMonth)) {
      return 31;
    }

    return 30;
  }

  private static calcPreviousMonth(month: number): number {
    return month === Months.January ? Months.December : month - 1;
  }

  private static isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  private static isLongMonth(month: number): boolean {
    return this.longestMonths.includes(month);
  }

  private static toISODate = (d: Date) => d.toISOString().split("T")[0];
}
