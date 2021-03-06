import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import feedbackAPI from '../../services/feedback-api';

import 'react-toastify/dist/ReactToastify.css';
import s from './FeedbackForm.module.scss';

function FeedbackForm({ handleFeedback }) {
  const [feedback, setFeedback] = useState({ name: '', text: '' });
  const [debouncedText] = useDebounce(feedback.text, 1000);
  const [validationNameError, setValidationNameError] = useState(null);
  const [validationTextError, setValidationTextError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('feedback')) {
      setFeedback(JSON.parse(localStorage.getItem('feedback')));
    }
    const writeMessageToState = async function () {
      const data = await feedbackAPI.fetchMessage();
      const { message } = data[0];
      setFeedback({ ...feedback, text: message });
    };
    writeMessageToState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setFeedback({ ...feedback, [name]: value });
    setValidationNameError(null);
    setValidationTextError(null);
  };

  useEffect(() => {
    const tempMessage = { message: debouncedText };

    feedbackAPI.sendMessage(tempMessage);
  }, [debouncedText]);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const onSubmit = useCallback(async () => {
    try {
      const { feedback: returnedFeedback } = await feedbackAPI.sendFeedback(
        feedback,
      );
      handleFeedback(returnedFeedback);
    } catch (error) {
      console.error(error);
    }
  }, [feedback, handleFeedback]);

  const resetText = useCallback(async () => {
    setFeedback({ ...feedback, text: '' });
    const tempMessage = { message: '' };

    try {
      await feedbackAPI.sendMessage(tempMessage);
    } catch (error) {
      console.error(error);
    }
  }, [feedback]);

  const validateForm = useCallback(() => {
    const { name, text } = feedback;
    const nameRe = /^[a-z0-9_-]{3,16}$/;
    const testRe = /^.{1,300}$/;
    const testLinkRe =
      /^((ftp|http|https):\/\/)?(www\.)?([A-Za-z??-????-??0-9]{1}[A-Za-z??-????-??0-9\\-]*\.?)*\.{1}[A-Za-z??-????-??0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/;
    const nameValidationErrorMassage =
      '???????? "??????" ???????????? ?????????????????? ?????????? ???????????????????? ???????????????? ???? a ???? z ?? ?????????? ???? 0 ???? 9. ???????????? ?????????? ???????????? ???????? ???? 3 ???? 16 ????????????????';
    const textValidationErrorMassage =
      '?????????????????? ???????? ???????????? ?????????????????? ???? 1 ???? 300 ????????????????';
    const textValidationLinkForbiddenMassage =
      '?? ?????????????????? ?????????????????? ???????????????????????? ????????????';

    if (name.trim() === '') {
      setValidationNameError('?????????????? ??????');
      return;
    }

    if (text.trim() === '') {
      setValidationTextError('?????????????? ??????????');
      return;
    }

    if (!nameRe.test(name)) {
      setValidationTextError(nameValidationErrorMassage);
      return;
    }
    if (!testRe.test(text)) {
      setValidationTextError(textValidationErrorMassage);
      return;
    }
    if (testLinkRe.test(text)) {
      setValidationTextError(textValidationLinkForbiddenMassage);
      return;
    }

    onSubmit();
    resetText();
  }, [onSubmit, resetText, feedback]);

  const listener = useCallback(
    e => {
      if (e.ctrlKey && e.code === 'Enter') {
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
      onSubmit={handleSubmit}
      onKeyDown={unEnter}
      className={s.FeedbackForm}
    >
      <label>
        <input
          autoComplete="off"
          type="text"
          name="name"
          placeholder="?????????????? ???????? ??????"
          value={feedback.name}
          onChange={handleChange}
          className={s.FeedbackForm__input}
        />
      </label>

      {(validationNameError || validationTextError) && (
        <div className={s.FeedbackForm__ErrorBlock}>
          <span className={s.FeedbackForm__inputError}>
            {validationNameError}
          </span>
          <span className={s.FeedbackForm__textareaError}>
            {validationTextError}
          </span>
        </div>
      )}
      <textarea
        type="text"
        name="text"
        value={feedback.text}
        onChange={handleChange}
        className={s.FeedbackForm__textarea}
      />

      <p className={s.FeedbackForm__count}>
        ???????????????? ????????????????: {300 - feedback.text.length}
      </p>

      <button type="submit" className={s.FeedbackForm__button}>
        ??????????????????
      </button>
    </form>
  );
}

export default FeedbackForm;
