import _ from 'lodash';
import {eventsAPI} from '../api/utils';
import {getFormattedDateFromTimestamp} from './time';

export function filterEventsOnGivenDate({day, events}) {
  return _.filter(events, {dateString: day.dateString});
}

export function setEventListView({
  day,
  markedDates,
  setMarkedDates,
  setVisibleEventsData,
  events,
}) {
  if (day.dateString in markedDates) {
    setMarkedDates({});
    setVisibleEventsData(events);
    return;
  }
  const marks = {};
  marks[day.dateString] = {selected: true, selectedColor: '#2994ff'};
  setMarkedDates(marks);
  setVisibleEventsData(
    events.filter(
      event =>
        getFormattedDateFromTimestamp(event.eventDate.seconds) ===
        getFormattedDateFromTimestamp(day.timestamp / 1000),
    ),
  );
}

export async function getUserEvents(userid) {
  const response = await eventsAPI.get('userEventLog/' + userid);
  return response.data;
}
