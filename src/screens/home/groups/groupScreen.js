import React, {useRef, useState, useEffect, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import DefaultBackground from '../../../shared/defaultBackground';
import {Dimensions} from 'react-native';
import PostCard from './postCard';
import RadioGroup from 'react-native-radio-buttons-group';
import {PostForm} from '../../../shared/components/postForm';
import {FAB} from 'react-native-paper';

import {addNewPost, getAllPosts} from '../../../services/posts';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import FireBaseContext from '../../../context/fireBaseProvider';

const windowWidth = Dimensions.get('window').width;
const defaultRadioButtons = [
  {id: '1', label: 'All posts', value: 'option1', selected: true},
  {id: '2', label: 'Admin posts', value: 'option2'},
  {id: '3', label: 'Member posts', value: 'option3'},
];

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    style={item.postSentByAdmin ? styles.adminPostItem : styles.postItem}
    onPress={() => navigation.navigate('Detailed Post', {post: item})}>
    <PostCard item={item} />
  </TouchableOpacity>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);

export default function GroupScreen({route, navigation}) {
  const {group} = route.params;
  const {user, Popup} = useContext(FireBaseContext);

  const [currentData, setCurrentData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [adminPostData, setAdminPostData] = useState([]);
  const [memberPostData, setMemberPostData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const [radioButtons, setRadioButtons] = useState(defaultRadioButtons);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const bottomSheet = useRef();

  function updatePostView(radioSelection) {
    setRadioButtons(radioSelection);
    if (radioSelection[0].selected) {
      setCurrentData(postData);
    } else if (radioSelection[1].selected) {
      setCurrentData(adminPostData);
    } else {
      setCurrentData(memberPostData);
    }
  }

  async function fetchPosts() {
    const data = await getAllPosts();
    setPostData(data);
    setAdminPostData(data.filter(post => post.postSentByAdmin));
    setMemberPostData(data.filter(post => !post.postSentByAdmin));
    updatePostView(radioButtons);
    setIsFetching(false);
  }

  async function onRefresh() {
    setIsFetching(true);
    fetchPosts();
  }

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultBackground>
      <View style={styles.radioButtonsView}>
        <RadioGroup
          radioButtons={radioButtons}
          layout={'row'}
          onPress={updatePostView}
        />
      </View>

      <FlatList
        data={currentData}
        onRefresh={onRefresh}
        refreshing={isFetching}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
          renderListItem({
            item,
            navigation,
          })
        }
      />

      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={600}
        sheetBackgroundColor={'#e5e5e5'}>
        <PostForm
          content={content}
          setContent={setContent}
          title={title}
          setTitle={setTitle}
          onSubmit={async () => {
            await addNewPost(
              {
                author: user.uid,
                groupId: group.id,
                content: content,
                title: title,
              },
              Popup,
            );
            bottomSheet.current.close();
            onRefresh();
          }}
        />
      </BottomSheet>

      <FAB
        icon={'plus'}
        style={styles.newPostButton}
        onPress={() => bottomSheet.current.show()}
      />
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a6a5a5',
    color: '#fcfcfc',
    marginLeft: 10,
  },
  adminPostItem: {
    backgroundColor: '#eaeaea',
    display: 'flex',
    borderBottomWidth: 2,
    borderBottomColor: '#e19a36',
  },
  postItem: {
    backgroundColor: 'white',
    display: 'flex',
    borderBottomWidth: 2,
    borderBottomColor: '#c4c4c4',
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
    marginRight: 7,
  },

  newPostButton: {
    position: 'absolute',
    backgroundColor: '#3B7AF9',
    bottom: 50,
    right: 30,
    borderRadius: 30,
    alignSelf: 'center',
    width: 70,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
  radioButtonsView: {
    backgroundColor: '#d3d3d3',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
