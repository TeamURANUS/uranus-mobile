import {notificationAPI} from '../api/utils';
import {getGroupsByUser} from './group';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const showNotification = (
  notification: FirebaseMessagingTypes.Notification,
) => {
  PushNotification.localNotification({
    channelId: 'defaultNotificationChannel',
    title: notification.title,
    message: notification.body,
  });
};

export function handlePushNotifications(response) {
  if (Platform.OS !== 'ios') {
    PushNotification.createChannel({
      channelId: 'defaultNotificationChannel', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    });
    showNotification(response.notification);
    return;
  }
  PushNotificationIOS.requestPermissions().then(() =>
    showNotification(response.notification),
  );
}

export async function getGroupNotifications(groupId) {
  const response = await notificationAPI.get('groupNotificationLog/' + groupId);
  //const groupNotifications = response.data;
  //console.log(groupNotifications);
  return response.data;
}

export async function getGroupListNotifications(groups) {
  const userNotifications = [];
  for (let i = 0; i < groups.length; i++) {
    const groupNotifications = await getGroupNotifications(groups[i].groupId);
    for (let j = 0; j < groupNotifications.length; j++) {
      groupNotifications[j].notifGroupName = groups[i].groupName;
      userNotifications.push(groupNotifications[j]);
    }
  }
  const sortedUserNotifications = userNotifications.sort((a, b) =>
    a.notifDate.seconds > b.notifDate.seconds
      ? -1
      : b.notifDate.seconds > a.notifDate.seconds
      ? 1
      : 0,
  );
  return sortedUserNotifications;
}

export async function getNotificationsByUser(userId) {
  const userGroups = await getGroupsByUser(userId);
  const groupIds = [];
  for (let i = 0; i < userGroups.length; i++) {
    groupIds.push({
      groupId: userGroups[i][1].id,
      groupName: userGroups[i][1].groupName,
    });
  }
  const userNotifications = await getGroupListNotifications(groupIds);
  return userNotifications;
}
