import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getFormattedDateFromTimestamp} from '../../../services/time';

export function PostCard({item}) {
  return (
    <View style={styles.container}>
      <View style={styles.postHeaderContainer}>
        <Text style={styles.postTitle} numberOfLines={2}>
          {item.postTitle}
        </Text>
        <View style={styles.date}>
          <Text style={styles.postDate}>
            {getFormattedDateFromTimestamp(item.postDate.seconds)}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.postBody} numberOfLines={3}>
          {item.postContent}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 10,
    height: 100,
    flex: 1,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '700',
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 15,
    color: '#000000',
  },
  postDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  postBody: {
    fontSize: 12,
    opacity: 0.7,
    color: '#000000',
  },
  postHeaderContainer: {
    flexDirection: 'row',
  },
  date: {
    flexDirection: 'column',
    height: 40,
    marginBottom: 7,
    flex: 1,
    alignItems: 'center',
  },
});

export default PostCard;
