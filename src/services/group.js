import {groupAPI} from '../api/utils';

export async function getGroupsByUser(userId) {
  const response = await groupAPI.get('allGroupsOfUser/' + userId);
  return response.data;
}
