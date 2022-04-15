import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import DefaultBackground from '../../shared/defaultBackground';
import {getNotificationsByUser} from '../../services/notification';
import {getTimeDate} from '../../services/time';
import FireBaseContext from '../../context/fireBaseProvider';

const ListItem = ({item}) => (
  <View style={styles.newsBox}>
    <View style={styles.leftPanel}>
      <Text style={styles.notifTitle} numberOfLines={1}>
        {item.notifTitle}
      </Text>
      <Text style={styles.notifGroupName} numberOfLines={1}>
        {'( ' + item.notifGroupName + ' )'}
      </Text>
      <Text style={styles.notifContent} numberOfLines={1}>
        {item.notifContent}
      </Text>
    </View>
    <View style={styles.rightPanel}>
      <Text style={styles.time}>{getTimeDate(item.notifDate.seconds)[0]}</Text>
      <Text style={styles.date}>{getTimeDate(item.notifDate.seconds)[1]}</Text>
    </View>
  </View>
);

const renderListItem = ({item}) => <ListItem item={item} />;

export default function NotificationScreen({navigation}) {
  const {user} = useContext(FireBaseContext);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchNotifications() {
    const notificationData = await getNotificationsByUser(user.uid);
    setData(notificationData);
    setIsFetching(false);
  }

  async function onRefresh() {
    setIsFetching(true);
    fetchNotifications();
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DefaultBackground>
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        <FlatList
          data={data}
          onRefresh={onRefresh}
          refreshing={isFetching}
          renderItem={({item}) => renderListItem({item})}
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    fontWeight: '400',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: '#000000',
    paddingBottom: 20,
    margin: '3%',
  },

  newsBox: {
    flex: 1,
    marginHorizontal: 10,
    height: 80,
    borderBottomWidth: 1,
    borderColor: '#dadada',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftPanel: {
    flex: 7,
    paddingRight: 8,
  },
  rightPanel: {
    alignItems: 'center',
    flex: 2,
    borderLeftWidth: 1,
    borderColor: '#e3e3e3',
  },
  notifTitle: {fontSize: 16, color: '#565656', fontWeight: '600'},
  notifGroupName: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
    marginBottom: 5,
  },
  notifContent: {fontSize: 14, color: '#707070'},
  time: {fontSize: 15},
  date: {fontSize: 12},
});
