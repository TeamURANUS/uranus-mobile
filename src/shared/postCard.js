import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function PostCard({item}) {
  return (
    <View
      style={
        item.isRead
          ? {backgroundColor: '#ffffff'}
          : {backgroundColor: '#bef33f'}
      }>
      <View style={styles.contentBox}>
        <View style={styles.titleDateIcon}>
          <Text style={styles.postTitle} numberOfLines={2}>
            {item.postTitle}
          </Text>
          <View style={styles.dateIcon}>
            <Text style={styles.postDate}>{item.postDate}</Text>
            {item.isInstructorPost ? (
              <Text style={styles.instructorPostIcon}>instructor</Text>
            ) : null}
          </View>
        </View>

        <View>
          <Text style={styles.postBody} numberOfLines={3}>
            {item.postBody}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bef33f',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentBox: {
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
  },
  postDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  postBody: {fontSize: 12, opacity: 0.7},
  titleDateIcon: {flexDirection: 'row'},
  dateIcon: {
    flexDirection: 'column',
    height: 40,
    marginBottom: 7,
    flex: 1,
    alignItems: 'center',
  },

  instructorPostIcon: {
    backgroundColor: '#ffa600',
    fontSize: 13,
    fontWeight: '900',
    color: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 70,
    marginTop: 5,
    marginLeft: 8,
    textAlign: 'center',
  },
});

export default PostCard;
