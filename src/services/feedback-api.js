import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://small-feedback-server.herokuapp.com/api/feedback';
const TEMP_MESSAGE_URL =
  'https://small-feedback-server.herokuapp.com/api/tempMessage';

const successMessage = 'Сообщение успешно добавлено';
const errorMessage = 'Произошла ошибка. Сообщение не добавлено';

async function fetchFeedbacks() {
  try {
    const response = await axios(BASE_URL);

    if (response.status === 200) {
      const { data } = response;
      return data;
    }
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
    return error;
  }
};

const sendMessage = async tempMessage => {
  try {
    const { data } = await axios.patch(TEMP_MESSAGE_URL, tempMessage);
    return data;
  } catch (error) {
    toast.error(errorMessage);
    throw error;
  }
};

const sendFeedback = async feedback => {
  try {
    const { data } = await axios.post(BASE_URL, feedback);
    if ((data.code = 201)) {
      toast.success(successMessage);
      return data.data;
    }
  } catch (error) {
    toast.error(errorMessage);
    throw error;
  }
};

const api = {
  fetchFeedbacks,
  fetchMessage,
  sendFeedback,
  sendMessage,
};

export default api;
