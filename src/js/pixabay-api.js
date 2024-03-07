import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";



export async function getImages(value,  page) {
  const response = await axios.get("", {
    params: {
      key: '42585608-470f45864f44da3a6987e4378',
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    }
  });
  console.log(response.data);
  return response.data;

  }
