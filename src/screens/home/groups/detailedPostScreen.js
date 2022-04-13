import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultBackground from '../../../shared/defaultBackground';
import {getPostAuthorId, getPostComments} from '../../../services/posts';
import {commentsAPI, userAPI} from '../../../api/utils';
import {getFormattedDateFromTimestamp} from '../../../services/time';
import {getCommentAuthorId} from '../../../services/comments';

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
          {commentAuthor && commentAuthor.userName}
          {commentAuthor && commentAuthor.userLastName}
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
  const [isFetching, setIsFetching] = useState(false);
  const {post} = route.params;

  async function fetchPostAdmin() {
    const postAuthorId = await getPostAuthorId(post);
    const response = await userAPI.get(postAuthorId);
    setPostAuthor(response.data[0]);
  }

  async function fetchComments() {
    const postCommentIds = getPostComments(post.postComments);
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
          {postAuthor && postAuthor.userName}
          {postAuthor && postAuthor.userLastName}
        </Text>
      </View>

      <FlatList
        data={comments}
        onRefresh={fetchComments}
        refreshing={isFetching}
        renderItem={item => renderListItem(item)}
        keyExtractor={item => item.commentId}
      />
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
});
