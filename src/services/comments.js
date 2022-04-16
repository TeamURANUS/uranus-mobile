export function getCommentAuthorId(reference) {
  return reference.commentAuthor._key.path.segments[
    reference.commentAuthor._key.path.segments.length - 1
  ];
}
