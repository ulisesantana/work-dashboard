import { DateCalculator } from "./DateCalculator";

describe("DateCalculator", () => {
  describe("calcLastWorkday", () => {
    it("given a day between tuesday and friday should return the previous day", () => {
      const tuesday = new Date("2020-5-19");
      const tuesdayFirstDayOfTheMonth = new Date("2020-4-1");
      const friday = new Date("2020-5-1");

      expect(DateCalculator.calcLastWorkday(tuesday)).toBe("2020-5-18");
      expect(DateCalculator.calcLastWorkday(tuesdayFirstDayOfTheMonth)).toBe(
        "2020-3-31",
      );
      expect(DateCalculator.calcLastWorkday(friday)).toBe("2020-4-30");
    });
    it("given a monday, saturday or sunday should return the previous friday", () => {
      const monday = new Date("2020-5-23");
      const saturday = new Date("2020-5-24");
      const sunday = new Date("2020-5-25");

      expect(DateCalculator.calcLastWorkday(monday)).toBe("2020-5-22");
      expect(DateCalculator.calcLastWorkday(saturday)).toBe("2020-5-22");
      expect(DateCalculator.calcLastWorkday(sunday)).toBe("2020-5-22");
    });

    it("given a date in a leap year should work in the same way", () => {
      const leapYearFriday = new Date("2012-3-1");
      const leapYearMonday = new Date("2008-3-3");

      expect(DateCalculator.calcLastWorkday(leapYearFriday)).toBe("2012-2-29");
      expect(DateCalculator.calcLastWorkday(leapYearMonday)).toBe("2008-2-29");
    });

    it("given a date in the first workday of the year should work in the same way", () => {
      const firstDayOfTheYear = new Date("2021-1-1");
      const firstMondayOfTheYear = new Date("2017-1-2");

      expect(DateCalculator.calcLastWorkday(firstDayOfTheYear)).toBe(
        "2020-12-31",
      );
      expect(DateCalculator.calcLastWorkday(firstMondayOfTheYear)).toBe(
        "2016-12-30",
      );
    });
  });

  describe("calcLastWeekday", function () {
    it("given a weekday should return the date for the latest weekday", function () {
      expect(DateCalculator.calcLastWeekday(0, new Date("2020-05-25"))).toBe(
        "2020-05-24",
      );
      expect(DateCalculator.calcLastWeekday(1, new Date("2020-05-25"))).toBe(
        "2020-05-25",
      );
      expect(DateCalculator.calcLastWeekday(2, new Date("2020-05-25"))).toBe(
        "2020-05-19",
      );

      expect(DateCalculator.calcLastWeekday(3, new Date("2020-05-25"))).toBe(
        "2020-05-20",
      );

      expect(DateCalculator.calcLastWeekday(4, new Date("2020-05-25"))).toBe(
        "2020-05-21",
      );

      expect(DateCalculator.calcLastWeekday(5, new Date("2020-05-25"))).toBe(
        "2020-05-22",
      );

      expect(DateCalculator.calcLastWeekday(6, new Date("2020-05-25"))).toBe(
        "2020-05-23",
      );
    });
  });

  console.log();
});
