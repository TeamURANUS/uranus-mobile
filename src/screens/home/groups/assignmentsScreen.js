import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DefaultBackground from '../../../shared/defaultBackground';
import {eventsAPI} from '../../../api/utils';
import {getFormattedDateFromTimestamp} from '../../../services/time';
import FireBaseContext from '../../../context/fireBaseProvider';
import {FAB} from 'react-native-paper';
import {getGroupAdminId, getGroupMembers} from '../../../services/groups';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import SignUpButton from '../../../shared/buttons/signUpButton';
import DatePicker from 'react-native-date-picker';

const windowHeight = Dimensions.get('window').height;

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Detailed Event', {event: item})}
    style={styles.eventContainer}>
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
  const {user} = useContext(FireBaseContext);
  const {group} = route.params;
  const [events, setEvents] = useState([]);
  const [eventDescription, setEventDescription] = useState('');
  const [eventPlace, setEventPlace] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [eventCapacity, setEventCapacity] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [isFetching, setIsFetching] = useState(false);

  const bottomSheet = useRef();

  async function addEvent() {
    await eventsAPI.post('', {
      eventCapacity,
      eventPlace,
      eventDescription,
      organizerName,
      eventDuration,
      eventLink,
      eventDate,
      eventOrganizers: [group.id],
      eventParticipants: getGroupMembers(group.groupMembers),
    });
    bottomSheet.current.close();
    fetchAssignments();
  }

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

      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={windowHeight * 0.95}
        sheetBackgroundColor={'#e5e5e5'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Description"
              placeholderTextColor="grey"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={t => {
                setEventDescription(t);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Place"
              placeholderTextColor="grey"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={t => {
                setEventPlace(t);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Organizer Name"
              placeholderTextColor="grey"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={t => {
                setOrganizerName(t);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Event Capacity"
              placeholderTextColor="grey"
              autoCorrect={false}
              returnKeyType="next"
              keyboardType="number-pad"
              onChangeText={t => {
                setEventCapacity(t);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Event Duration"
              placeholderTextColor="grey"
              autoCorrect={false}
              returnKeyType="next"
              keyboardType="number-pad"
              onChangeText={t => {
                setEventDuration(t);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Event Link"
              placeholderTextColor="grey"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={t => {
                setEventLink(t);
              }}
              style={styles.input}
            />
            <DatePicker date={eventDate} onDateChange={setEventDate} />
            <SignUpButton
              displayText="Add Assignment / Event"
              onPress={() => addEvent()}
            />
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>

      {user.uid === getGroupAdminId(group) && (
        <FAB
          icon={'plus'}
          style={styles.newAssignmentButton}
          onPress={() => bottomSheet.current.show()}
        />
      )}
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  input: {
    elevation: 11,
    borderBottomWidth: 5,
    borderColor: '#3B7AF9',
    fontSize: 20,
    padding: 10,
    margin: 10,
    width: '90%',
    backgroundColor: '#eeeeee',
    color: 'black',
    shadowOffset: {height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    alignSelf: 'center',
  },
  newAssignmentButton: {
    position: 'absolute',
    backgroundColor: '#3B7AF9',
    bottom: 50,
    right: 30,
    borderRadius: 30,
    alignSelf: 'center',
    width: 70,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    height: '100%',
  },
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
