import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/feedback';

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

// const api = {
//   fetchFeedbacks,
// };

// export default api;
export default fetchFeedbacks;

// if (response.status === 200) {
//   console.log('Ура, мы тут');

//   const data = await response.json();
//   console.log(response);
//   // return this.setState({ feedbacks: data });
//   return data;
// }
// console.log('нет, мы тут');
// return await Promise.reject(new Error('Неверный запрос'));
