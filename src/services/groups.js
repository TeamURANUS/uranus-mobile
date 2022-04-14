import {groupsAPI} from '../api/utils';

export async function getAllGroups(userId) {
  const response = await groupsAPI.get('');
  return response.data.data.filter(group => {
    const members = getGroupMembers(group.groupMembers);
    console.log(members, group.groupIsCommunity, members.includes(userId));
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

export function getGroupMembers(references) {
  const userIds = [];
  references.forEach(reference => {
    userIds.push(
      reference._key.path.segments[reference._key.path.segments.length - 1],
    );
  });
  return userIds;
}
