import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import DefaultBackground from '../../../shared/defaultBackground';
import {
  getNonMutantPostObject,
  getPostAuthorId,
  getPostComments,
} from '../../../services/posts';
import {commentsAPI, postsAPI, userAPI} from '../../../api/utils';
import {getFormattedDateFromTimestamp} from '../../../services/time';
import {addComment, getCommentAuthorId} from '../../../services/comments';
import {FAB} from 'react-native-paper';

const ListItem = ({item}) => {
  const [commentAuthor, setCommentAuthor] = useState();

  async function fetchCommentAuthor() {
    const commentAuthorId = getCommentAuthorId(item);
    const response = await userAPI.get(commentAuthorId);
    setCommentAuthor(response.data[0]);
  }

  useEffect(() => {
    fetchCommentAuthor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <View style={styles.commentHeader}>
        <Text>
          {commentAuthor && commentAuthor.userName}{' '}
          {commentAuthor && commentAuthor.userLastname}
        </Text>
        <Text>{getFormattedDateFromTimestamp(item.commentDate.seconds)}</Text>
      </View>
      <Text style={styles.commentContent}>{item.commentContent}</Text>
    </View>
  );
};

const renderListItem = ({item}) => {
  return <ListItem item={item} />;
};

export default function DetailedPostScreen({route}) {
  const [postAuthor, setPostAuthor] = useState();
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const {post} = route.params;

  const bottomSheet = useRef();

  async function addCommentToPost() {
    const commentId = await addComment({
      commentAuthorId: getPostAuthorId(post),
      commentContent: commentValue,
      commentDate: new Date(),
    });
    const postObject = getNonMutantPostObject(post);
    postObject.postComments.push(commentId);
    await postsAPI.put(postObject.id, postObject);
    bottomSheet.current.close();
    fetchComments();
  }

  async function fetchPostAdmin() {
    const postAuthorId = await getPostAuthorId(post);
    const response = await userAPI.get(postAuthorId);
    setPostAuthor(response.data[0]);
  }

  async function fetchComments() {
    const postResponse = await postsAPI.get(post.id);
    const postToUse = postResponse.data.data;
    const postCommentIds = getPostComments(postToUse.postComments);
    let newCommentArray = comments;
    setIsFetching(true);

    for (let i = 0; i < postCommentIds.length; i++) {
      const commentId = postCommentIds[i];
      const response = await commentsAPI.get(commentId);
      const newComment = response.data.data;
      if (newComment) {
        const exists = newCommentArray.some(
          comment => comment.commentId === newComment.commentId,
        );
        if (!exists) {
          newCommentArray = [...newCommentArray, newComment];
        }
      }
    }
    setComments(newCommentArray);
    setIsFetching(false);
  }

  useEffect(() => {
    setComments([]);
    fetchPostAdmin();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultBackground>
      <View style={styles.postOwnerView}>
        <MaterialCommunityIcons name="account" style={styles.postOwnerIcon} />
        <Text style={styles.postOwner}>
          {postAuthor && postAuthor.userName}{' '}
          {postAuthor && postAuthor.userLastname}
        </Text>
      </View>

      <View style={styles.postContent}>
        <ScrollView style={styles.postContentContainer}>
          <Text style={styles.contextTextStyle}>{post.postContent}</Text>
        </ScrollView>
      </View>

      <FlatList
        data={comments}
        onRefresh={fetchComments}
        refreshing={isFetching}
        renderItem={item => renderListItem(item)}
        keyExtractor={item => item.commentId}
      />

      <FAB
        icon={'plus'}
        style={styles.newCommentButton}
        onPress={() => bottomSheet.current.show()}
      />

      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={600}
        sheetBackgroundColor={'#e5e5e5'}>
        <TextInput
          placeholder="Enter your comment"
          placeholderTextColor="grey"
          autoCorrect={false}
          multiline={true}
          numberOfLines={10}
          value={commentValue}
          onChangeText={t => {
            setCommentValue(t);
          }}
          onSubmitEditing={addCommentToPost}
          style={styles.commentInput}
          returnKeyType="go"
        />
      </BottomSheet>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  postOwnerView: {
    margin: 15,
    fontSize: 19,
    fontWeight: '300',
    color: '#070707',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#a2a2a2',
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
  postContentContainer: {
    height: 250,
  },
  postContent: {
    margin: 20,
  },
  contextTextStyle: {
    fontSize: 20,
  },
  commentHeader: {
    margin: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#3B7AF9',
  },
  commentContent: {
    marginLeft: 20,
    fontSize: 22,
  },
  input: {
    elevation: 11,
    borderBottomWidth: 5,
    borderColor: '#3B7AF9',
    fontSize: 20,
    padding: 10,
    margin: 10,
    color: 'black',
    shadowOffset: {height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  newCommentButton: {
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
  commentInput: {
    elevation: 11,
    borderBottomWidth: 5,
    borderColor: '#3B7AF9',
    fontSize: 20,
    height: 120,
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
