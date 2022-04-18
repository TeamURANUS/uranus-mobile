import _ from 'lodash';
import {eventsAPI} from '../api/utils';
import {getFormattedDateFromTimestamp} from './time';

export function filterEventsOnGivenDate({day, events}) {
  return _.filter(events, {dateString: day.dateString});
}

function getEventDateString(seconds) {
  const date = new Date(seconds * 1000);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month.toString().length === 1) {
    month = '0' + month;
  }

  if (day.toString().length === 1) {
    day = '0' + day;
  }
  return date.getFullYear() + '-' + month + '-' + day;
}

export function getEventDayObjects(events) {
  const days = {};
  for (let i = 0; i < events.length; i++) {
    days[getEventDateString(events[i].eventDate.seconds)] = {
      selected: true,
      selectedColor: '#fcba2a',
    };
  }
  return days;
}

export function setEventListView({
  day,
  markedDates,
  setMarkedDates,
  setVisibleEventsData,
  events,
}) {
  if (
    day.dateString in markedDates &&
    markedDates[day.dateString].selectedColor === '#2994ff'
  ) {
    //setMarkedDates({});
    setVisibleEventsData(events);
    const datesToMark = getEventDayObjects(events);
    setMarkedDates(datesToMark);
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
  const sorted = response.data.sort((a, b) =>
    a.eventDate.seconds > b.eventDate.seconds
      ? -1
      : b.eventDate.seconds > a.eventDate.seconds
      ? 1
      : 0,
  );
  return sorted;
}
