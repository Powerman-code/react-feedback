import { Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import s from './FeedbackForm.module.css';

function FeedbackForm() {
  const [feedback, setFeedback] = useState({ name: '', text: '' });

  useEffect(() => {
    if (localStorage.getItem('feedback')) {
      setFeedback(JSON.parse(localStorage.getItem('feedback')));
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    setFeedback({ ...feedback, [name]: value });

    // axios.patch('url', feedback);
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

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Too Short!')
      .max(16, 'Too Long!')
      .required('Поле имя не должно быть пустым'),
    text: yup.string().email('Invalid email').required('Required'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          text: '',
        }}
        validateOnBlur
        onSubmit={values => {
          console.log(values);
        }}
        // onReset
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className={s.FeedbackForm}>
            <label>
              <input
                type="text"
                name="name"
                placeholder="Введите ваше имя"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                // className={s.FeedbackForm__textarea}
              />
            </label>
            <textarea
              type="text"
              name="text"
              value={values.text}
              onChange={handleChange}
              className={s.FeedbackForm__textarea}
            ></textarea>
            {touched.name && errors.name && <p>{errors.name}</p>} //добавить
            класс
            <button
              disabled={!isValid}
              onClick={handleSubmit} //или на форме?
              type="submit"
              className={s.FeedbackForm__button}
            >
              Отправить
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default FeedbackForm;
