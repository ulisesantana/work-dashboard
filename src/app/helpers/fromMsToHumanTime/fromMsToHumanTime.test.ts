import { fromMsToHumanTime } from "./index";

describe("fromMsToHumanTime given milliseconds", () => {
  it('less than a minute should return "0 min"', () => {
    const halfMinute = 1000 * 30;
    expect(fromMsToHumanTime(halfMinute)).toBe("0 min");
  });
  it('more than a minute should return the amount of minutes with "min"', () => {
    const tenMinutes = 1000 * 60 * 10;
    expect(fromMsToHumanTime(tenMinutes)).toBe("10 min");
  });
  it('more than an hour should return the amount of hours and minutes with "h" and "min"', () => {
    const oneHourAndAHalf = 1000 * 60 * 90;
    const twoHoursAndAHalf = 1000 * 60 * 150;
    const oneHour = 1000 * 60 * 60;
    expect(fromMsToHumanTime(oneHourAndAHalf)).toBe("1 h 30 min");
    expect(fromMsToHumanTime(twoHoursAndAHalf)).toBe("2 h 30 min");
    expect(fromMsToHumanTime(oneHour)).toBe("1 h 0 min");
  });
  it("in negative should return negative time", () => {
    const oneHourAndAHalf = 1000 * 60 * 90;
    const twoHoursAndAHalf = 1000 * 60 * 150;
    expect(fromMsToHumanTime(oneHourAndAHalf * -1)).toBe("-1 h 30 min");
    expect(fromMsToHumanTime(twoHoursAndAHalf * -1)).toBe("-2 h 30 min");
  });
});
