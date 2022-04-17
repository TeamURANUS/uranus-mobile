import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Keyboard} from 'react-native';
import {useRef} from 'react';
import PostButton from '../buttons/postButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export function PostForm({title, setTitle, content, setContent, onSubmit}) {
  const refInput2 = useRef();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          placeholderTextColor="grey"
          autoCorrect={false}
          returnKeyType="next"
          value={title}
          onChangeText={t => {
            setTitle(t);
          }}
          onSubmitEditing={() => refInput2.current.focus()}
          style={styles.titleInput}
        />
        <TextInput
          placeholder="Content"
          placeholderTextColor="grey"
          autoCorrect={false}
          multiline={true}
          numberOfLines={10}
          returnKeyType="next"
          value={content}
          onChangeText={t => {
            setContent(t);
          }}
          onSubmitEditing={Keyboard.dismiss}
          style={styles.contentInput}
        />

        <PostButton displayText={'POST'} onPress={onSubmit} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  titleInput: {
    elevation: 11,
    borderBottomWidth: 5,
    borderColor: '#3B7AF9',
    fontSize: 20,
    padding: 10,
    margin: 10,
    width: '95%',
    backgroundColor: '#eeeeee',
    color: 'black',
    shadowOffset: {height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  contentInput: {
    height: 120,
    elevation: 11,
    borderBottomWidth: 5,
    borderColor: '#3B7AF9',
    fontSize: 20,
    padding: 10,
    margin: 10,
    width: '95%',
    backgroundColor: '#eeeeee',
    color: 'black',
    shadowOffset: {height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
});
