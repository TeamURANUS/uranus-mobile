import * as React from 'react';
import DefaultBackground from '../../shared/defaultBackground';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {setEventListView} from '../../services/calendar';
import {useContext, useEffect, useState} from 'react';
import FireBaseContext from '../../context/fireBaseProvider';
import {getUserEvents} from '../../services/calendar';
import {
  getFormattedDateFromTimestamp,
  getDateFromTimestamp,
} from '../../services/time';

const windowHeight = Dimensions.get('window').height;

const events = [
  {
    id: 1,
    title: 'EVENT 1',
    text: 'lorem ipsum annen baban xd xd',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
    dateString: '2022-03-16',
  },
  {
    id: 2,
    title: 'EVENT 2',
    text: 'lorem ipsum annen baban xd xd',
    dateString: '2022-03-16',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
  },
  {
    id: 3,
    title: 'EVENT 3',
    text: 'lorem ipsum annen baban xd xd',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
    dateString: '2022-03-17',
  },
  {
    id: 4,
    title: 'EVENT 4',
    text: 'lorem ipsum annen baban xd xd',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
    dateString: '2022-03-18',
  },
  {
    id: 5,
    title: 'EVENT 5',
    text: 'lorem ipsum annen baban xd xd',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
    dateString: '2022-03-19',
  },
  {
    id: 6,
    title: 'EVENT 6',
    text: 'lorem 6ipsum annen baban xd xd',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
    dateString: '2022-03-20',
  },
  {
    id: 7,
    title: 'EVENT 7',
    text: 'lorem ipsum annen baban xd xd',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
    dateString: '2022-03-20',
  },
];

const monthToStringDict = [
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

const DateCard = ({date}) => (
  <View
    style={{
      backgroundColor: '#f5b14a',
      borderRadius: 30,
      height: 60,
      width: 60,
    }}>
    <Text
      style={{
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        marginTop: -3,
      }}>
      {date.getDate()}
    </Text>
    <Text
      style={{
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
        marginTop: -7,
      }}>
      {monthToStringDict[date.getMonth()]}
    </Text>
    <Text
      style={{
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
        marginTop: -3,
      }}>
      {date.getFullYear()}
    </Text>
  </View>
);

const ListItem = ({item}) => (
  <View style={styles.listItem}>
    <View>
      <DateCard date={getDateFromTimestamp(item.eventDate.seconds)} />
    </View>
    <View style={styles.listItemTextContainer}>
      <Text style={styles.itemTitle}>{item.eventName}</Text>
      <Text style={styles.itemText}>{item.eventDescription}</Text>
    </View>
  </View>
);

const renderListItem = ({item}) => <ListItem item={item} />;

export default function CalendarScreen() {
  const [eventList, setEventList] = useState(events);
  const [markedDates, setMarkedDates] = useState({});
  const {user, userDetails} = useContext(FireBaseContext);
  const [eventsData, setEventsData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  //console.log(user.uid);
  //console.log(eventsData);

  async function fetchEvents() {
    const newsData = await getUserEvents(user.uid);
    setEventsData(newsData);
    setIsFetching(false);
    eventsData.forEach(list => {
      //console.log(list.eventName);
      //console.log(getFormattedDateFromTimestamp(list.eventDate.seconds));
      console.log(list.eventDate.seconds);
    });

    //console.log(eventsData);
  }

  async function onRefresh() {
    setIsFetching(true);
    fetchEvents();
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  //console.log(eventdata.eventParticipants[0]._key.path.segments[6]);

  return (
    <DefaultBackground>
      <Text style={styles.title}>Calendar</Text>
      <View>
        <TextInput
          placeholder="Search"
          placeholderTextColor="grey"
          style={styles.searchBar}
        />
      </View>
      <Calendar
        markedDates={markedDates}
        onDayPress={day => {
          setEventListView({
            day,
            eventsData,
            markedDates,
            setMarkedDates,
            setEventsData,
          });
        }}
      />
      <FlatList
        style={styles.list}
        data={eventsData}
        onRefresh={onRefresh}
        refreshing={isFetching}
        renderItem={renderListItem}
        keyExtractor={item => item.id}
      />
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 30,
    margin: '3%',
  },
  searchBar: {
    height: windowHeight * 0.07,
    margin: '3%',
    backgroundColor: '#d2d2d2',
    borderRadius: 10,
    paddingLeft: 20,
  },
  itemImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 12,
    marginLeft: 2,
    color: 'grey',
  },
  itemTitle: {
    fontSize: 20,
    margin: 2,
  },
  listItemTextContainer: {
    marginLeft: 10,
  },
  listItem: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#c2b9b9',
  },
  list: {
    borderTopWidth: 2,
    borderColor: 'rgba(185,185,185,0.6)',
    height: '80%',
  },
});
