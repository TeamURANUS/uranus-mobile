import * as React from 'react';
import DefaultBackground from '../../shared/defaultBackground';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useContext, useEffect, useState} from 'react';
import FireBaseContext from '../../context/fireBaseProvider';
import {setEventListView, getUserEvents} from '../../services/calendar';
import {getDateFromTimestamp, monthToStringDict} from '../../services/time';

const windowHeight = Dimensions.get('window').height;

const DateCard = ({date}) => (
  <View style={styles.dateCardView}>
    <Text style={styles.eventDayText}>{date.getDate()}</Text>
    <Text style={styles.eventMonthText}>
      {monthToStringDict[date.getMonth()]}
    </Text>
  </View>
);

const ListItem = ({item}) => (
  <View style={styles.listItem}>
    <View style={styles.eventLeftView}>
      <View>
        <DateCard date={getDateFromTimestamp(item.eventDate.seconds)} />
      </View>
      <View style={styles.listItemTextContainer}>
        <Text numberOfLines={1} style={styles.itemTitle}>
          {item.eventName}
        </Text>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.eventDescription}
        </Text>
      </View>
    </View>

    <TouchableOpacity style={styles.eventRightView}>
      <Text numberOfLines={1} style={styles.eventGroupNameText}>
        {item.eventOrganizers}
      </Text>
    </TouchableOpacity>
  </View>
);

const renderListItem = ({item}) => <ListItem item={item} />;

export default function CalendarScreen() {
  const [markedDates, setMarkedDates] = useState({});
  const {user} = useContext(FireBaseContext);
  const [events, setEvents] = useState([]);
  const [visibleEventsData, setVisibleEventsData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchEvents() {
    const eventData = await getUserEvents(user.uid);
    setEvents(eventData);
    setVisibleEventsData(eventData);
    setIsFetching(false);
  }

  async function onRefresh() {
    setIsFetching(true);
    fetchEvents();
  }

  useEffect(() => {
    fetchEvents();
  }, []);

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
            markedDates,
            setMarkedDates,
            setVisibleEventsData,
            events,
          });
        }}
      />
      <FlatList
        style={styles.list}
        data={visibleEventsData}
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
    borderBottomWidth: 3,
    borderColor: '#ffffff',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  eventLeftView: {flexDirection: 'row', width: '50%'},
  eventRightView: {
    backgroundColor: '#358fd0',
    justifyContent: 'center',
    height: 30,
    borderRadius: 4,
    width: '25%',
  },
  list: {
    borderTopWidth: 2,
    borderColor: 'rgba(253,253,253,0.6)',
    height: '80%',
  },
  eventGroupNameText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    padding: 3,
    width: '100%',
  },
  dateCardView: {
    backgroundColor: '#bbbbbb',
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  eventDayText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 5,
  },
  eventMonthText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});
