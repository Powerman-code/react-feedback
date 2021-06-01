import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './FeedbackForm.module.css';

const TEMP_MESSAGE_URL = 'http://localhost:8080/api/tempMessage';

function FeedbackForm() {
  const [feedback, setFeedback] = useState({ name: '', text: '' });
  const [feedbacks, setFeedbacks] = useState([]);
  // const [filter, setFilter] = useState(''); //в imageView
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessage = () => {
    return axios.get(TEMP_MESSAGE_URL).then(({ data }) => data.data);
  };

  useEffect(() => {
    if (localStorage.getItem('feedback')) {
      setFeedback(JSON.parse(localStorage.getItem('feedback')));
    }
    fetchMessage().then(data => {
      const { message } = data[0];
      setFeedback({ text: message });
      // localStorage.setItem('feedback', JSON.stringify(message));
      // console.log(Object.values(responseMessage.data.message));
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    setFeedback({ ...feedback, [name]: value });
    const tempMessage = { message: feedback.text };
    console.log(tempMessage);

    axios.patch(TEMP_MESSAGE_URL, tempMessage);
  };

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const postData = useCallback(() => {
    console.log('post', feedback);
  }, [feedback]);

  const listener = useCallback(
    e => {
      if (e.ctrlKey && e.code === 'Enter') {
        postData();

        return;
      }
    },
    [postData],
  );

  useEffect(() => {
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [listener]);

  const onSubmit = e => {
    e.preventDefault();

    postData();
  };

  const unEnter = e => {
    if (e.code === 'Enter') {
      e.preventDefault();
      return;
    }
  };

  return (
    <form className={s.FeedbackForm} onSubmit={onSubmit} onKeyDown={unEnter}>
      <label>
        <input
          type="text"
          name="name"
          placeholder="Введите ваше имя"
          value={feedback.name}
          onChange={handleChange}
        />
      </label>
      <textarea
        type="text"
        name="text"
        value={feedback.text}
        onChange={handleChange}
        className={s.FeedbackForm__textarea}
      />

      <button type="submit" className={s.FeedbackForm__button}>
        Отправить
      </button>
    </form>
  );
}

export default FeedbackForm;
