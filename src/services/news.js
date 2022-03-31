import {newsAPI} from '../api/utils';

export async function getAllNews() {
  const response = await newsAPI.get('');
  return response.data.data;
}
