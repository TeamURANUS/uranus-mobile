const OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export function getFormattedDateFromTimestamp(timestamp) {
  return new Date(timestamp).toLocaleDateString('tr-TR', OPTIONS);
}
