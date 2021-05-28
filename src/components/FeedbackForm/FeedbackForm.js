import { Component, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './FeedbackForm.module.css';

function FeedbackForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  // state = {
  //   name: '',
  //   text: '',
  // };

  // componentDidMount() {
  //   console.log('C_DID_MOUNT');

  //   window.addEventListener('keydown', e => {
  //     console.log(e);

  //     if (e.ctrlKey && e.code === 'Enter') {
  //       console.log('win');

  //       this.handleSubmit(e);
  //     }
  //   });
  // }

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'text':
        setText(value);
        break;

      default:
        break;
    }
    // setName({ [name]: value });
    // setText({ [name]: value });
    console.log(value);
  };

  const handleSubmit = e => {
    console.log(e);
    e.preventDefault();

    if (name.trim() === '') {
      //   alert('Введите имя');
      toast.warn('Введите имя');
      return;
    }
    console.log(name, text);
    onSubmit(name, text);
    resetText();
  };

  const resetText = () => {
    setText('');
  };

  return (
    <form className={s.FeedbackForm} onSubmit={e => handleSubmit(e)}>
      <label>
        <input
          type="text"
          name="name"
          placeholder="Введите ваше имя"
          value={name}
          onChange={handleChange}
          // className={s.FeedbackForm__textarea}
        />
      </label>
      <textarea
        type="text"
        name="text"
        value={text}
        onChange={handleChange}
        className={s.FeedbackForm__textarea}
      ></textarea>
      <button type="submit" className={s.FeedbackForm__button}>
        Отправить
      </button>
    </form>
  );
}

export default FeedbackForm;
