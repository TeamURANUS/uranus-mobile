import {groupsAPI} from '../api/utils';

export async function getAllGroups() {
  const response = await groupsAPI.get('');
  return response.data.data;
}

export function groupInfoPressed({navigation, group}) {
  navigation.navigate('Group Info', {group: group});
}

export function assignmentsPressed({navigation, group}) {
  navigation.navigate('Assignments', {group: group});
}
