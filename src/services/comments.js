import {commentsAPI} from '../api/utils';

export function getCommentAuthorId(reference) {
  return reference.commentAuthor._key.path.segments[
    reference.commentAuthor._key.path.segments.length - 1
  ];
}

export async function addComment({
  commentAuthorId,
  commentContent,
  commentDate,
}) {
  const response = await commentsAPI.post('', {
    commentAuthor: commentAuthorId,
    commentContent,
    commentDate,
  });
  const responseString = response.data.message;
  return responseString.substring(16);
}
