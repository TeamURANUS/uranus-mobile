import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

import DefaultBackground from '../../../shared/defaultBackground';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AssignmentCard} from './assignmentCard';
import DatePicker from 'react-native-date-picker';

const windowWidth = Dimensions.get('window').width;

var DATA = [
  {
    id: '1',
    assignmentTitle: 'Homework1',
    assignmentInstructions: 'Plagirism wont be excused',
    assignmentDate: '16.01.2022',
    assignmentDueDate: '29.03.2022',
    assignmentOwner: 'Oğuz Ergin',
  },
  {
    id: '2',
    assignmentTitle: 'Project',
    assignmentInstructions: 'You will be working in 2-person groups.',
    assignmentDate: '3.02.2022',
    assignmentDueDate: '2.04.2022',
    assignmentOwner: 'Oğuz Ergin',
  },
  {
    id: '3',
    assignmentTitle: 'Paper Assignment',
    assignmentInstructions: 'Read and summarize 3 scientific paper.',
    assignmentDate: '1.01.2022',
    assignmentDueDate: '10.05.2022',
    assignmentOwner: 'Oğuz Ergin',
  },
];

const ListItem = ({item, navigation}) => (
  <TouchableOpacity style={styles.assignmentItem}>
    <AssignmentCard item={item} />
  </TouchableOpacity>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);
export default function GroupAssignmentsScreen({route, navigation}) {
  const {group} = route.params;
  const [newAssignmentButtonPressed, setNewAssignmentButtonPressed] =
    useState(false);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentInstructions, setNewAssignmentInstructions] =
    useState('');
  let newAssignmentTitleTextInput = React.createRef();
  let newAssignmentInstructionsTextInput = React.createRef();
  const [date, setDate] = useState(new Date());

  function newAssignmentPressed() {
    setNewAssignmentButtonPressed(!newAssignmentButtonPressed);
  }

  function assignNewAssignment() {
    DATA.push({
      id: DATA.length + 1,
      assignmentTitle: newAssignmentTitle,
      assignmentInstructions: newAssignmentInstructions,
      assignmentDate:
        new Date().getDate().toString() +
        '.' +
        new Date().getMonth() +
        '.' +
        new Date().getFullYear(),
      assignmentDueDate:
        date.getDate().toString() +
        '.' +
        date.getMonth() +
        '.' +
        date.getFullYear(),
      AssignmentOwner: 'Oğuz Ergin',
    });
    newAssignmentTitleTextInput.clear();
    newAssignmentInstructionsTextInput.clear();
    setNewAssignmentTitle('');
    setNewAssignmentInstructions('');
    setNewAssignmentButtonPressed(!newAssignmentButtonPressed);
    console.log(DATA);
  }

  return (
    <DefaultBackground>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.headerView}>
            <Text style={styles.header}>Events</Text>
            <Text style={styles.courseName}>{group.groupName}</Text>
          </View>
          <View style={styles.topBarButtons}>
            <TouchableOpacity
              style={[styles.newAssignmentTO]}
              onPress={newAssignmentPressed}>
              <MaterialCommunityIcons
                name={newAssignmentButtonPressed ? 'close' : 'plus'}
                style={styles.plusIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {newAssignmentButtonPressed ? (
          <View style={styles.newAssignmentView}>
            <View style={styles.newAssignmentButtonsView}>
              <TouchableOpacity
                style={styles.newAssignmentAssignmentTO}
                onPress={assignNewAssignment}>
                <MaterialCommunityIcons name="plus" style={styles.plusIcon} />
                <Text style={styles.newAssignmentTOText}>Assign</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder={'Assignment Title'}
              style={styles.newAssignmentTitleTextBox}
              onChangeText={setNewAssignmentTitle}
              ref={input => {
                newAssignmentTitleTextInput = input;
              }}
            />
            <View style={styles.separator} />
            <TextInput
              placeholder={'Instructions'}
              style={styles.newAssignmentInstructionsTextBox}
              onChangeText={setNewAssignmentInstructions}
              ref={input => {
                newAssignmentInstructionsTextInput = input;
              }}
            />
            <View style={styles.datePickerView}>
              <DatePicker date={date} mode={'date'} onDateChange={setDate} />
            </View>
          </View>
        ) : (
          <FlatList
            data={DATA}
            renderItem={({item}) =>
              renderListItem({
                item,
                navigation,
              })
            }
          />
        )}
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  headerView: {
    flexDirection: 'row',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#06136c',
    color: '#fcfcfc',
    width: 70,
    height: 23,
    marginLeft: 8,
    borderRadius: 5,
    marginBottom: -5,
  },
  header: {
    fontSize: 25,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#a6a5a5',
    color: '#fcfcfc',
    marginLeft: 10,
  },
  assignmentItem: {
    display: 'flex',
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#c4c4c4',
  },
  topBar: {
    width: windowWidth,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#a6a5a5',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topBarButtons: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    width: '50%',
    marginRight: 15,
  },

  newAssignmentTO: {
    borderRadius: 5,
    height: 30,
    flexDirection: 'row',
  },

  plusIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: 35,
  },

  newAssignmentTOText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },

  newAssignmentView: {
    backgroundColor: '#ffffff',
    borderWidth: 4,
    borderColor: '#ffffff',
    height: '100%',
    margin: 5,
  },

  newAssignmentTitleTextBox: {
    backgroundColor: '#cccccc',
    height: '10%',
    marginTop: 6,
  },

  newAssignmentInstructionsTextBox: {
    backgroundColor: '#eae9e9',
    height: '30%',
    textAlignVertical: 'top',
    marginTop: 3,
  },

  newAssignmentButtonsView: {
    flexDirection: 'row',
    height: '7%',
    justifyContent: 'center',
  },

  datePickerView: {
    height: '40%',
    width: '100%',
    backgroundColor: '#eae9e9',
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },

  newAssignmentAssignmentTO: {
    backgroundColor: '#15a205',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },

  newAssignmentCancelTO: {
    backgroundColor: '#e72838',
    borderRadius: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    width: '50%',
    height: '100%',
    flexDirection: 'row',
  },
});
