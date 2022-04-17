import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as React from 'react';
import {getGroupMembers, getNonMutantGroupObject} from '../../services/groups';
import {useContext} from 'react';
import FireBaseContext from '../../context/fireBaseProvider';
import {groupsAPI} from '../../api/utils';
import {showDangerPopup, showSuccessPopup} from '../../services/popup';

const windowWidth = Dimensions.get('window').width;

export function EnrollableGroupListItem({item, bottomSheet, onSheetRefresh}) {
  const {user, Popup} = useContext(FireBaseContext);
  return (
    <TouchableOpacity style={styles.listItem}>
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
          {item.groupIsCommunity ? 'Community: ' : 'Class: '}
          {item.groupDescription}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.enrollButton}
        onPress={async () => {
          const members = getGroupMembers(item.groupMembers);
          members.push(user.uid);
          await groupsAPI
            .put(item.id, {
              ...getNonMutantGroupObject(item),
              groupMembers: members,
            })
            .then(() =>
              showSuccessPopup({
                Popup,
                title: 'Successfully Joined',
                textBody: '',
              }),
            )
            .catch(() =>
              showDangerPopup({Popup, title: 'Unable to join', textBody: ''}),
            );
          bottomSheet.current.close();
          onSheetRefresh();
        }}>
        <Text style={styles.enrollText}>JOIN</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemImage: {
    height: 50,
    width: windowWidth * 0.15,
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
    width: windowWidth * 0.6,
  },
  listItem: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#c2b9b9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enrollButton: {
    backgroundColor: '#0098ff',
    height: 40,
    width: windowWidth * 0.16,
    borderRadius: 15,
    justifyContent: 'center',
  },
  enrollText: {
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
});
