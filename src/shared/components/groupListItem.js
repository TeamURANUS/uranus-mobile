import {assignmentsPressed, groupInfoPressed} from '../../services/groups';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';

export function GroupListItem({item, navigation}) {
  function groupPressed() {
    groupInfoPressed({navigation, group: item});
  }

  function assignmentPressed() {
    assignmentsPressed({navigation, group: item});
  }

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('Group', {
          navigation: navigation,
          group: item,
          name: item.groupName,
          options: ['Info', 'Assignments'],
          actions: [groupPressed, assignmentPressed],
        })
      }>
      <Image
        style={styles.itemImage}
        source={{
          uri: item.groupIsCommunity
            ? 'https://newsroom.unl.edu/announce/files/file117032.png'
            : 'https://www.freeiconspng.com/uploads/courses-icon-28.png',
        }}
      />
      <View style={styles.listItemTextContainer}>
        <Text style={styles.itemTitle}>{item.groupName}</Text>
        <Text style={styles.itemText} numberOfLines={2}>
          {item.groupDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
