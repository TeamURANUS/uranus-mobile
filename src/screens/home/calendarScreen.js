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
import {useState} from 'react';

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

const ListItem = ({item}) => (
  <View style={styles.listItem}>
    <Image
      style={styles.itemImage}
      source={{
        uri: item.imageUrl,
      }}
    />
    <View style={styles.listItemTextContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  </View>
);

const renderListItem = ({item}) => <ListItem item={item} />;

function CalendarScreen() {
  const [eventList, setEventList] = useState(events);
  const [markedDates, setMarkedDates] = useState({});

  return (
    <DefaultBackground>
      <Text style={styles.title}>Takvim</Text>
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
            events,
            markedDates,
            setMarkedDates,
            setEventList,
          });
        }}
      />
      <FlatList
        style={styles.list}
        data={eventList}
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

export default CalendarScreen;
