import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var PostComments = [
  {
    id: '1',
    comment: 'Donec ornare volutpat mauris, eget consequat dui fermentum eu. ',
    commentDate: '16.01.2022',
    isInstructorComment: true,
    commentOwner: 'Oğuz Ergin',
  },
  {
    id: '2',
    comment: 'Donec ornare volutpat mauris, eget consequat dui fermentum eu. ',
    commentDate: '16.01.2022',
    isInstructorComment: false,
    commentOwner: 'Ahmet Bahadır',
  },
  {
    id: '3',
    comment: 'Donec ornare volutpat mauris, eget consequat dui fermentum eu. ',
    commentDate: '16.01.2022',
    isInstructorComment: false,
    commentOwner: 'Deniz',
  },
];

const ListItem = ({item}) => (
  <View style={styles.commentContainer}>
    <View style={styles.commentTitle}>
      <View style={styles.commentOwnerView}>
        <Text style={styles.commentOwner}>{item.commentOwner}</Text>
        {item.isInstructorComment ? (
          <Text style={styles.commentInstructorIcon}>admin</Text>
        ) : null}
      </View>

      <Text style={styles.commentDate}>{item.commentDate}</Text>
    </View>
    <Text style={styles.commentBody}>{item.comment}</Text>
  </View>
);

export default function DetailedPostScreen({route}) {
  const {item} = route.params;
  const [commentText, setCommentText] = useState('');
  let commentTextInput = React.createRef();
  const username = 'dnztrkmn';

  function publishComment() {
    PostComments.push({
      id: PostComments.length + 1,
      comment: commentText,
      commentDate: '16.01.2022',
      isInstructorComment: false,
      commentOwner: username,
    });
    commentTextInput.clear();
    setCommentText('');
    //commentTextInput.focus();
    //scrollViewRef.scrollTo({x: 0, y: 200, animated: false});
    console.log(PostComments);
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} scrollToOverflowEnabled={true}>
        <View style={styles.postOwnerView}>
          <MaterialCommunityIcons name="account" style={styles.postOwnerIcon} />
          <Text style={styles.postOwner}>{item.postOwner}</Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.title}>{item.postTitle}</Text>
          <Text style={styles.date}>{item.postDate}</Text>
          <Text style={styles.text}>{item.postBody}</Text>
        </View>
        <Text style={styles.commentsHeader}>Comments</Text>
        {PostComments.map((item, index) => {
          return <ListItem item={item} />;
        })}
        <View style={styles.writeCommentView}>
          <TextInput
            placeholder={'Comment'}
            style={styles.commentTextInput}
            multiline
            editable
            onChangeText={setCommentText}
            ref={input => {
              commentTextInput = input;
            }}
          />
          <TouchableOpacity style={styles.sendIconTO} onPress={publishComment}>
            <MaterialCommunityIcons name="send" style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },

  scroll: {
    flex: 1,
    marginBottom: 40,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#000000',
  },

  text: {
    fontSize: 15,
    opacity: 0.8,
    marginBottom: 15,
    color: '#000000',
  },

  date: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 15,
    marginBottom: 10,
  },

  picture: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    resizeMode: 'cover',
    height: 300,
    width: '100%',
  },

  postOwnerView: {
    fontSize: 19,
    fontWeight: '300',
    color: '#070707',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#a2a2a2',
    marginBottom: 15,
  },

  postOwner: {
    fontSize: 19,
    fontWeight: '300',
    color: '#070707',
  },

  postOwnerIcon: {
    marginRight: 5,
    color: '#000000',
    fontSize: 30,
  },

  writeCommentView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
  },

  commentTextInput: {
    borderColor: '#5e5e5e',
    width: '85%',
  },

  sendIconTO: {
    backgroundColor: '#0b128c',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '15%',
    height: '100%',
  },

  sendIcon: {
    color: '#ffffff',
    fontSize: 35,
  },

  contentView: {
    borderBottomColor: '#bdbbbb',
    borderBottomWidth: 10,
    flexGrow: 0,
    marginBottom: 20,
  },

  commentContainer: {
    borderWidth: 2,
    flexGrow: 0,
    marginBottom: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },

  commentTitle: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentBody: {
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    color: '#000000',
  },

  commentDate: {},

  commentOwner: {
    fontWeight: '800',
  },
  commentOwnerView: {flexDirection: 'row'},
  commentInstructorIcon: {
    fontWeight: '700',
    color: '#ffffff',
    backgroundColor: '#0b128c',
    textAlign: 'center',
    marginLeft: 10,
    borderRadius: 2,
    paddingHorizontal: 5,
  },

  commentFlatList: {
    backgroundColor: '#ffffff',
    margin: 20,
  },

  commentsHeader: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
});
