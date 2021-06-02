import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
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
      setFeedback({ ...feedback, text: message });
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

  const onSubmit = useCallback(() => {
    console.log('post', feedback);
    axios.post('http://localhost:8080/api/feedback', feedback);
  }, [feedback]);

  const resetText = () => {
    setFeedback({ ...feedback, text: '' });
    const tempMessage = { message: '' };
    console.log(tempMessage);

    axios.patch(TEMP_MESSAGE_URL, tempMessage);
  };

  const validateForm = useCallback(() => {
    const { name, text } = feedback;
    const nameRe = /^[a-z0-9_-]{3,16}$/;
    const testRe = /^.{1,300}$/;
    const testLinkRe =
      /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
    const nameValidationErrorMassage =
      'Поле "Имя" должно содержать буквы латинского алфавита от a до z и числа от 0 до 9. Длинна имени должна быть от 3 до 16 символов';
    const textValidationErrorMassage =
      'Текстовое поле должно содержать от 1 до 300 символов';
    const textValidationLinkForbiddenMassage =
      'В сообщении запрещено использовать ссылки';
    console.log(name, text);
    if (name.trim() === '' || text.trim() === '') {
      //   alert('Введите имя');
      toast.warn('Введите имя и текст');
      return;
    }
    if (!nameRe.test(name)) {
      toast.warn(nameValidationErrorMassage);
      console.log(nameValidationErrorMassage);
      return;
    }
    if (!testRe.test(text)) {
      toast.warn(textValidationErrorMassage);
      console.log(textValidationErrorMassage);
      return;
    }
    if (testLinkRe.test(text)) {
      console.log(textValidationErrorMassage);
      toast.warn(textValidationLinkForbiddenMassage);

      return;
    }
    onSubmit();
    resetText();
  }, [onSubmit, resetText, feedback]);

  const listener = useCallback(
    e => {
      if (e.ctrlKey && e.code === 'Enter') {
        // onSubmit();
        validateForm();
        return;
      }
    },
    [validateForm],
  );

  useEffect(() => {
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [listener]);

  const handleSubmit = e => {
    e.preventDefault();

    // onSubmit();
    validateForm();
  };

  const unEnter = e => {
    if (e.code === 'Enter') {
      e.preventDefault();
      return;
    }
  };

  return (
    <form
      className={s.FeedbackForm}
      onSubmit={handleSubmit}
      onKeyDown={unEnter}
    >
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
