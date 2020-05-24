export interface HoursAndMinutes {
  hours: number;
  minutes: number;
}

const oneHour = 1000 * 60 * 60;
const oneMinute = 1000 * 60;

const fromMinutesInHourScaleToMinutes = (minuteInHourScale: number) => {
  const result = Math.ceil(
    ((minuteInHourScale > 10 ? minuteInHourScale : minuteInHourScale * 10) /
      100) *
      60,
  );

  if (Number.isNaN(result)) {
    return 0;
  } else {
    return result;
  }
};

const fromMsToHoursAndMinutes = (milliseconds: number): HoursAndMinutes => {
  const [hours, minutesInHourScale] = (milliseconds / oneHour)
    .toString()
    .split(".")
    .map((x: string) => Number(x.substring(0, 2)));

  return {
    hours,
    minutes: fromMinutesInHourScaleToMinutes(minutesInHourScale),
  };
};

export function fromMsToHumanTime(milliseconds: number): string {
  if (milliseconds < 0) {
    return "-" + fromMsToHumanTime(milliseconds * -1);
  }

  if (milliseconds >= oneMinute) {
    const { hours, minutes } = fromMsToHoursAndMinutes(milliseconds);

    if (milliseconds >= oneHour) {
      return `${hours} h ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  } else {
    return "0 min";
  }
}
