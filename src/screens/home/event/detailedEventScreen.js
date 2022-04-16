import React from 'react';
import DefaultBackground from '../../../shared/defaultBackground';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {getFormattedDateFromTimestamp} from '../../../services/time';

export default function DetailedEventScreen({route}) {
  const {event} = route.params;

  const subContainer = (header, content) => {
    return (
      <View style={styles.subContainer}>
        <Text style={styles.subHeader}>{header}</Text>
        <Text style={styles.subContent}>{content}</Text>
      </View>
    );
  };

  return (
    <DefaultBackground>
      <Text style={styles.eventTitle}>{event.eventDescription}</Text>
      <Text style={styles.eventDate}>
        {getFormattedDateFromTimestamp(event.eventDate.seconds)}
      </Text>
      <View style={styles.placeContainer}>
        <Text
          style={styles.eventPlace}
          onPress={() => Linking.openURL(event.eventLink)}>
          Original Event Link
        </Text>
      </View>
      {subContainer('Event Place', event.eventPlace)}
      {subContainer('Currently Enrolled', event.eventParticipants.length)}
      {subContainer('Event Capacity', event.eventCapacity)}
      {subContainer('Event Duration', event.eventDuration + ' min')}
      {subContainer('Event Organizer', event.organizerName)}
    </DefaultBackground>
  );
}

/*
{
    "eventCapacity": 31,
    "eventDate": [Object],
    "eventDescription": "Event with link",
    "eventDuration": 35,
    "eventId": "f90d814e-3b73-4273-9efd-878dae17f4c1",
    "eventLink": "https://www.google.com/calendar/event?eid=dGtvaTRhZTczNnNldGgzODJqMnI0MnIyamcgMGMwcDM5NmMza3RiMmRuMzkxamg2cDJxaWtAZw",
    "eventOrganizers": [Array],
    "eventParticipants": [Array],
    "eventPlace": "TM-217",
    "id": "f90d814e-3b73-4273-9efd-878dae17f4c1",
    "organizerName": "Bil264L"
}
 */

const styles = StyleSheet.create({
  eventTitle: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  eventDate: {
    fontSize: 13,
    color: 'gray',
    alignSelf: 'center',
    textAlign: 'center',
  },
  eventPlace: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  subContainer: {
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 16,
    borderColor: '#2e4a8f',
    borderRadius: 10,
    borderWidth: 2.5,
    width: '70%',
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  subContent: {
    marginTop: 5,
  },
  placeContainer: {
    marginTop: 20,
    backgroundColor: '#2e4a8f',
    padding: 5,
    width: '100%',
    alignItems: 'center',
  },
});
