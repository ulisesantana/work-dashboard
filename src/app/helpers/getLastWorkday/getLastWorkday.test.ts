import { getLastWorkday } from "./index";

describe("getLastDay", () => {
  it("given a day between tuesday and friday should return the previous day", () => {
    const tuesday = new Date("2020-5-19");
    const tuesdayFirstDayOfTheMonth = new Date("2020-4-1");
    const friday = new Date("2020-5-1");

    expect(getLastWorkday(tuesday)).toBe("2020-5-18");
    expect(getLastWorkday(tuesdayFirstDayOfTheMonth)).toBe("2020-3-31");
    expect(getLastWorkday(friday)).toBe("2020-4-30");
  });
  it("given a monday, saturday or sunday should return the previous friday", () => {
    const monday = new Date("2020-5-23");
    const saturday = new Date("2020-5-24");
    const sunday = new Date("2020-5-25");

    expect(getLastWorkday(monday)).toBe("2020-5-22");
    expect(getLastWorkday(saturday)).toBe("2020-5-22");
    expect(getLastWorkday(sunday)).toBe("2020-5-22");
  });

  it("given a date in a leap year should work in the same way", () => {
    const leapYearFriday = new Date("2012-3-1");
    const leapYearMonday = new Date("2008-3-3");

    expect(getLastWorkday(leapYearFriday)).toBe("2012-2-29");
    expect(getLastWorkday(leapYearMonday)).toBe("2008-2-29");
  });

  it("given a date in the first workday of the year should work in the same way", () => {
    const firstDayOfTheYear = new Date("2021-1-1");
    const firstMondayOfTheYear = new Date("2017-1-2");

    expect(getLastWorkday(firstDayOfTheYear)).toBe("2020-12-31");
    expect(getLastWorkday(firstMondayOfTheYear)).toBe("2016-12-30");
  });
});
