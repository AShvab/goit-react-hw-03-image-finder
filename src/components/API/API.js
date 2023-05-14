import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
    key: '34965824-045f8b70a8fe868dcc6efc926',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  

  const fetchImages = async (query, page) => {
    return await axios.get(`${BASE_URL}?${searchParams}&q=${query}&page=${page}`);
  };
  
  export default fetchImages;

