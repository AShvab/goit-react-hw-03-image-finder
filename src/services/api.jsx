import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34965824-045f8b70a8fe868dcc6efc926';

export const fetchImages = async (pictureName, page) => {
  const searchParams = new URLSearchParams({
      q: pictureName,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  return response.data;
};


