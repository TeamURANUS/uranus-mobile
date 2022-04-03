import * as React from 'react';
import DefaultBackground from '../../shared/defaultBackground';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useContext, useEffect, useState} from 'react';
import FireBaseContext from '../../context/fireBaseProvider';
import {getUserEvents} from '../../services/calendar';
import {
  getFormattedDateFromTimestamp,
  getDateFromTimestamp,
  monthToStringDict,
} from '../../services/time';

const windowHeight = Dimensions.get('window').height;

const DateCard = ({date}) => (
  <View style={styles.dateCardView}>
    <Text style={styles.eventDayText}>{date.getDate()}</Text>
    <Text style={styles.eventMonthText}>
      {monthToStringDict[date.getMonth()]}
    </Text>
    <Text style={styles.eventYearText}>{date.getFullYear()}</Text>
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

    <View style={styles.eventRightView}>
      <Text numberOfLines={1} style={styles.eventGroupNameText}>
        {item.eventOrganizers}
      </Text>
    </View>
  </View>
);

const renderListItem = ({item}) => <ListItem item={item} />;

export default function CalendarScreen() {
  const [markedDates, setMarkedDates] = useState({});
  const {user} = useContext(FireBaseContext);
  const [eventsData, setEventsData] = useState([]);
  const [visibleEventsData, setVisibleEventsData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchEvents() {
    const newsData = await getUserEvents(user.uid);
    setEventsData(newsData);
    setVisibleEventsData(newsData);
    setIsFetching(false);
  }

  async function onRefresh() {
    setIsFetching(true);
    fetchEvents();
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function dayPressed(day) {
    if (day.dateString in markedDates) {
      setMarkedDates({});
      setVisibleEventsData(eventsData);
      return;
    }
    const marks = {};
    marks[day.dateString] = {selected: true, selectedColor: '#2994ff'};
    setMarkedDates(marks);
    setVisibleEventsData(
      eventsData.filter(
        event =>
          getFormattedDateFromTimestamp(event.eventDate.seconds) ==
          getFormattedDateFromTimestamp(day.timestamp / 1000),
      ),
    );
  }

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
          dayPressed(day);
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
    backgroundColor: '#d7d7d7',
  },
  eventLeftView: {flexDirection: 'row', width: '60%'},
  eventRightView: {
    backgroundColor: '#120183',
    justifyContent: 'center',
    height: 30,
    borderRadius: 4,
    width: '25%',
  },
  list: {
    borderTopWidth: 2,
    borderColor: 'rgba(185,185,185,0.6)',
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
    backgroundColor: '#f5b14a',
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  eventDayText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginTop: -3,
  },
  eventMonthText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    marginTop: -7,
  },
  eventYearText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    marginTop: -3,
  },
});
