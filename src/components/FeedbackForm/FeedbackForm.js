import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './FeedbackForm.module.css';

function FeedbackForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  // componentDidMount() {
  //   console.log('C_DID_MOUNT');

  // window.addEventListener('keydown', e => {
  //   console.log(e);

  //   if (e.ctrlKey && e.code === 'Enter') {
  //     console.log('win');

  //     this.handleSubmit(e);
  //   }
  // });
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

  const validateForm = useCallback(() => {
    const nameRe = /^[a-z0-9_-]{3,16}$/;
    const testRe = /^.{1,300}$/;
    const nameValidationErrorMassage =
      'Поле "Имя" должно содержать буквы латинского алфавита от a до z и числа от 0 до 9. Длинна имени должна быть от 3 до 16 символов';
    const textValidationErrorMassage =
      'Текстовое поле должно содержать от 1 до 300 символов';

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

    onSubmit(name, text);
    resetText();
  }, [name, text, onSubmit]);

  const handleSubmit = useCallback(
    e => {
      console.log(e);
      e.preventDefault();

      // if (name.trim() === '') {
      //   //   alert('Введите имя');
      //   toast.warn('Введите имя');
      //   return;
      // }

      // console.log(name.test());
      // if (!name.test(/^[a-z0-9_-]{3,16}$/)) {
      //   return;
      // }

      // if (name !== /^[a-z0-9_-]{3,16}$/) {
      //   alert(
      //     'Поле "имя" должно содержать буквы латинского алфавита от A до Z и числа от 0 до 9. Длинна имени должна быть от 1 до 16 символов',
      //   );
      //   return;
      // }

      validateForm();
      // const re = /^[a-z0-9_-]{3,16}$/;
      // testinput(name);
      console.log(name, text);
      // onSubmit(name, text);
      // resetText();
    },
    [name, text, validateForm],
  );

  useEffect(() => {
    window.addEventListener('keydown', e => {
      console.log(e);

      if (e.ctrlKey && e.code === 'Enter') {
        console.log('win');

        handleSubmit(e);
      }
    });
  }, [handleSubmit]);

  // const validateMessage = () => {
  //   if (text.trim() === '') {
  //     //   alert('Введите имя');
  //     toast.warn('Введите сообщение');
  //     return;
  //   }
  // }

  // function testinput(str) {
  //   console.log(str, 'TECT СРАБОТАЛ');
  //   let midstring;
  // const validationErrorMassage =
  //   'Поле "Имя" должно содержать буквы латинского алфавита от A до Z и числа от 0 до 9. Длинна имени должна быть от 1 до 16 символов';

  // const re = /^[a-z0-9_-]{3,16}$/;
  //   if (re.test(str)) {
  //     midstring = ' содержит ';
  //     return;
  //   } else {
  //     midstring = ' не содержит ';
  //   }
  //   console.log(str + midstring);
  // }

  // function testinput(re, str) {
  //   let midstring;
  //   if (re.test(str)) {
  //     midstring = ' содержит ';
  //   } else {
  //     midstring = ' не содержит ';
  //   }
  //   console.log(str + midstring + re.source);
  // }

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
