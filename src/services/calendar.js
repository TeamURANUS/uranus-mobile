import _ from 'lodash';

export function filterEventsOnGivenDate({day, events}) {
  return _.filter(events, {dateString: day.dateString});
}

export function setEventListView({
  day,
  events,
  markedDates,
  setMarkedDates,
  setEventList,
}) {
  if (day.dateString in markedDates) {
    setMarkedDates({});
    setEventList(events);
    return;
  }
  const marks = {};
  marks[day.dateString] = {selected: true, selectedColor: '#2994ff'};
  setMarkedDates(marks);
  setEventList(filterEventsOnGivenDate({day: day, events}));
}
