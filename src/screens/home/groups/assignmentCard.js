import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const dateToStringDict = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

export function AssignmentCard({item}) {
  return (
    <View style={styles.container}>
      <View style={styles.dueDateView}>
        <Text style={styles.dayText}>
          {item.assignmentDueDate.split('.')[0]}
        </Text>
        <Text style={styles.monthText}>
          {dateToStringDict[Number(item.assignmentDueDate.split('.')[1])]}
        </Text>
        <Text style={styles.yearText}>
          {item.assignmentDueDate.split('.')[2]}
        </Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.assignmentTitle} numberOfLines={2}>
          {item.assignmentTitle}
        </Text>

        <Text style={styles.assignmentInstructions} numberOfLines={3}>
          {item.assignmentInstructions}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  contentBox: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 10,
    height: 100,
    flex: 1,
  },

  assignmentTitle: {
    fontSize: 19,
    fontWeight: '700',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 15,
    marginBottom: 5,
    color: '#000000',
  },

  assignmentInstructions: {
    fontSize: 13,
    opacity: 0.8,
    color: '#000000',
  },

  dueDateView: {
    backgroundColor: '#ffc342',
    borderRadius: 40,
    height: 80,
    width: 80,
    marginLeft: 15,
    alignContent: 'center',
    justifyContent: 'center',
  },

  dayText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: -10,
    marginTop: -5,
  },

  monthText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '400',
    alignSelf: 'center',
    marginBottom: -5,
  },

  yearText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '400',
    alignSelf: 'center',
  },
});

export default AssignmentCard;
