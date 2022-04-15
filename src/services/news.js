import {newsAPI} from '../api/utils';

const getAllNews = async () => {
  const response = await newsAPI.get('');
  return response.data.data;
};

const scrapeNews = async () => {
  const response = await newsAPI.get('scrape');
  return response.data.data;
};

module.exports = {
  getAllNews,
  scrapeNews,
};
