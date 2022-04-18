import {groupsAPI} from '../api/utils';

export async function getNonmemberGroups(userId) {
  const response = await groupsAPI.get('');
  return response.data.data.filter(group => {
    const members = getGroupMembers(
      group.groupMembers
        .concat([group.groupAdmin])
        .concat(group.groupAssistants),
    );
    return !members.includes(userId);
  });
}

export async function getAllGroups(userId) {
  const response = await groupsAPI.get('');
  return response.data.data.filter(group => {
    const members = getGroupMembers(
      group.groupMembers
        .concat([group.groupAdmin])
        .concat(group.groupAssistants),
    );
    return members.includes(userId);
  });
}

export function groupInfoPressed({navigation, group}) {
  navigation.navigate('Group Info', {group: group});
}

export function assignmentsPressed({navigation, group}) {
  navigation.navigate('Assignments', {group: group});
}

export function getGroupAdminId(reference) {
  return reference.groupAdmin._key.path.segments[
    reference.groupAdmin._key.path.segments.length - 1
  ];
}

export function getGroupPosts(references) {
  const postIds = [];
  references.forEach(reference => {
    postIds.push(
      reference._key.path.segments[reference._key.path.segments.length - 1],
    );
  });
  return postIds;
}

export function getGroupAssistants(references) {
  const assistantIds = [];
  references.forEach(reference => {
    assistantIds.push(
      reference._key.path.segments[reference._key.path.segments.length - 1],
    );
  });
  return assistantIds;
}

export function getGroupMembers(references) {
  const userIds = [];
  references.forEach(reference => {
    userIds.push(
      reference._key.path.segments[reference._key.path.segments.length - 1],
    );
  });
  return userIds;
}

export function getNonMutantGroupObject(mutantGroupObject) {
  return {
    ...mutantGroupObject,
    groupAdmin: getGroupAdminId(mutantGroupObject),
    groupAssistants: getGroupAssistants(mutantGroupObject.groupAssistants),
    groupMembers: getGroupMembers(mutantGroupObject.groupMembers),
    groupPosts: getGroupPosts(mutantGroupObject.groupPosts),
  };
}
