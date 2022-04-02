import _ from 'lodash';
import {eventsAPI} from '../api/utils';
import {getDateFromTimestamp} from './time';

export function filterEventsOnGivenDate({day, events}) {
  //return _.filter(events.eventDate, {seconds: ~~(day.timestamp / 10000000)});
  return events.filter(
    event =>
      getDateFromTimestamp(event.eventDate.seconds) ==
      getDateFromTimestamp(day.timestamp / 100),
  );
}

export function setEventListView({
  day,
  events,
  markedDates,
  setMarkedDates,
  setEventList,
}) {
  console.log(day);
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
  //console.log('hey1');
  //const response = await eventsAPI.get(userid);
  //return response.data.data;
  return response.data;
}
