import {postsAPI} from '../api/utils';
import {showSuccessPopup, showWarningPopup} from './popup';

export async function getAllPosts() {
  const response = await postsAPI.get('');
  return response.data.data;
}

export async function addNewPost(post, Popup) {
  await postsAPI
    .post('', {
      postDate: new Date(),
      postAuthor: post.author,
      postGroupId: post.groupId,
      postContent: post.content,
      postTitle: post.title,
      postComments: [],
      postId: Date.now().toString(), // this is temporary
    })
    .then(() => {
      showSuccessPopup({Popup, title: post.title + 'posted!'});
    })
    .catch(error => {
      console.log(error);
      showWarningPopup({Popup, title: post.title + 'failed to post!'});
    });
}

export function getPostAuthorId(reference) {
  return reference.postAuthor._key.path.segments[
    reference.postAuthor._key.path.segments.length - 1
  ];
}

export function getPostComments(references) {
  const userIds = [];
  references.forEach(reference => {
    userIds.push(
      reference._key.path.segments[reference._key.path.segments.length - 1],
    );
  });
  return userIds;
}
