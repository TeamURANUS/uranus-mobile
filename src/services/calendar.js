import _ from 'lodash';
import {eventsAPI} from '../api/utils';

export function filterEventsOnGivenDate({day, events}) {
  return _.filter(events, {dateString: day.dateString});
}

export async function setEventListView({
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

export async function getUserEvents(userid) {
  const response = await eventsAPI.get('userEventLog/' + userid);
  return response.data;
}
