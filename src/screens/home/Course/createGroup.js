import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import DefaultBackground from '../../../shared/defaultBackground';
import {Dimensions} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {showSuccessPopup, showWarningPopup} from '../../../services/popup';
import {Popup} from 'popup-ui';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'course',
    value: 'option1',
    selected: true,
  },
  {
    id: '2',
    label: 'community',
    value: 'option2',
  },
];

export default function CreateGroup({navigation}) {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  const AsyncAlert = async (title, message) =>
    new Promise(resolve => {
      Alert.alert(title, message, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            resolve('YES');
          },
        },
      ]);
    });

  async function createPressed() {
    if (groupName.length < 2) {
      showWarningPopup({
        Popup: Popup,
        title: 'Invalid Group Name',
        textBody:
          'Group names should contain at least 2 alphanumeric characters',
      });
    }
    let groupType = radioButtons[0].selected ? ' course' : ' community';
    await AsyncAlert(
      'You are about to create a ' +
        groupType +
        ' group named ' +
        groupName +
        '. Are you sure?',
      '',
    );
    showSuccessPopup({
      Popup: Popup,
      title: groupName + groupType + ' group created succesfully',
      textBody: '',
    });

    //navigation.goBack();
    navigation.navigate('Home Container');
  }

  return (
    <DefaultBackground>
      <Text style={styles.header}>Create New Group</Text>
      <View style={styles.container}>
        <View style={styles.formView}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            layout={'row'}
            containerStyle={styles.radioGroup}
          />
          <TextInput
            placeholder={'Group Name'}
            style={styles.groupName}
            onChangeText={setGroupName}
          />
          <TextInput
            placeholder={'Description'}
            style={styles.groupDescription}
            onChangeText={setDescription}
          />
        </View>
        <TouchableOpacity style={styles.createButtonTO} onPress={createPressed}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#d2d2d2',
    padding: 10,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f5ea4a',
    height: windowHeight * 0.5,
    width: windowWidth * 0.7,
    borderRadius: 15,
  },
  radioGroup: {marginBottom: 20},
  groupName: {
    height: 40,
    width: '80%',
    margin: '3%',
    backgroundColor: '#d2d2d2',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 20,
  },
  groupDescription: {
    height: 80,
    width: '80%',
    margin: '3%',
    backgroundColor: '#d2d2d2',
    borderRadius: 10,
    paddingLeft: 20,
  },
  createButtonTO: {
    marginTop: 20,
    borderRadius: 10,
    width: '30%',
    alignSelf: 'center',
    backgroundColor: '#000000',
    height: 35,
    justifyContent: 'center',
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
