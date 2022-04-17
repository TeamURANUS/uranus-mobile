const OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export function getTimeDate(timestamp) {
  const d = new Date(timestamp * 1000);
  const year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let hour = d.getHours();
  let min = d.getMinutes();

  if (month.toString().length == 1) {
    month = '0' + month;
  }

  if (day.toString().length == 1) {
    day = '0' + day;
  }

  if (min.toString().length == 1) {
    min = '0' + min;
  }

  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }

  const date = day + '.' + month + '.' + year;
  const time = hour + ':' + min;
  const result = [time, date];
  return result;
}

export function getMaybeDate(timestamp) {
  if (typeof timestamp === 'string') {
    return timestamp;
  }
  return new Date(timestamp.seconds * 1000).toLocaleDateString(
    'tr-TR',
    OPTIONS,
  );
}

export function getFormattedDateFromTimestamp(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString('tr-TR', OPTIONS);
}

export function getDateFromTimestamp(timestamp) {
  return new Date(timestamp * 1000);
}

export const monthToStringDict = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
