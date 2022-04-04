const OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

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
