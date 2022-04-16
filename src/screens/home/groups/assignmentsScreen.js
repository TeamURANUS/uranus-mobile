import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DefaultBackground from '../../../shared/defaultBackground';
import {eventsAPI} from '../../../api/utils';
import {getFormattedDateFromTimestamp} from '../../../services/time';

const ListItem = ({item, navigation}) => (
  <TouchableOpacity style={styles.eventContainer}>
    <Text style={styles.eventDescription}>{item.eventDescription}</Text>
    <Text style={styles.eventCapacity}>Capacity: {item.eventCapacity}</Text>
    <Text style={styles.eventPlace}>{item.eventPlace}</Text>
    <Text style={styles.eventDate}>
      {getFormattedDateFromTimestamp(item.eventDate.seconds)}
    </Text>
  </TouchableOpacity>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);

export default function AssignmentsScreen({route, navigation}) {
  const {group} = route.params;
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchAssignments() {
    setIsFetching(true);
    const response = await eventsAPI.get(`/organizationEventLog/${group.id}`);
    const eventList = response.data;
    setEvents(eventList);
    setIsFetching(false);
  }

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultBackground>
      <FlatList
        style={styles.eventList}
        data={events}
        onRefresh={fetchAssignments}
        refreshing={isFetching}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
          renderListItem({
            item,
            navigation,
          })
        }
      />
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  eventList: {
    margin: 10,
  },
  eventContainer: {
    position: 'relative',
    height: 150,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    margin: 5,
  },
  eventDescription: {
    fontSize: 30,
    position: 'absolute',
    margin: 15,
    fontWeight: 'bold',
    width: '50%',
  },
  eventCapacity: {
    position: 'absolute',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007eff',
    right: 15,
    top: 15,
  },
  eventPlace: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#007eff',
    right: 15,
    bottom: 15,
    padding: 5,
  },
  eventDate: {
    position: 'absolute',
    bottom: 5,
    left: 15,
    color: '#fd893c',
    fontWeight: 'bold',
  },
});
