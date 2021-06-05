import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/feedback';
const TEMP_MESSAGE_URL = 'http://localhost:8080/api/tempMessage';

async function fetchFeedbacks() {
  try {
    const response = await axios('http://localhost:8080/api/feedback');
    console.log(response);

    if (response.status === 200) {
      console.log('OK');
      const { data } = response;
      console.log(data);
      return data;
    }
    console.log('Не Ок');
    return await Promise.reject(new Error('Неверный запрос'));
  } catch (error) {
    return error;
  }
}

const fetchMessage = async () => {
  try {
    const { data } = await axios.get(TEMP_MESSAGE_URL);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const sendFeedback = async feedback => {
  try {
    const { data } = await axios.post(BASE_URL, feedback);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const api = {
  fetchFeedbacks,
  fetchMessage,
  sendFeedback,
};

export default api;
// export default fetchFeedbacks;

// if (response.status === 200) {
//   console.log('Ура, мы тут');

//   const data = await response.json();
//   console.log(response);
//   // return this.setState({ feedbacks: data });
//   return data;
// }
// console.log('нет, мы тут');
// return await Promise.reject(new Error('Неверный запрос'));
