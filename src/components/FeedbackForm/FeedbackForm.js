import { Component } from 'react';
import s from './FeedbackForm.module.css';

class FeedbackForm extends Component {
  state = {
    name: '',
    text: '',
  };

  componentDidMount() {
    console.log('C_DID_MOUNT');

    window.addEventListener('keydown', e => {
      console.log(e.code);

      // function checkKey(e, form) {
      // if (e.ctrlKey && e.keyCode == 13)
      //     form.submit();
      //   if (e.ctrlKey && (e.keyCode == 0xa || e.keyCode == 0xd)) {
      //     console.log('Сработало');
      //   }
      //   if (e.code === 'Enter + ControlLeft') {
      //     console.log('Сработало');
      //   }
      //   if (e.code === 'Enter' && e.code === 'ControlLeft') {
      //     console.log('Сработало');
      //   }
    });
  }

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    console.log(e.currentTarget.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state);
    this.resetText();
  };

  resetText = () => {
    console.log('вызов ресет');
    this.setState({ text: '' });
  };

  //      const reset = () => {
  //     setInputValue('');
  //   };

  render() {
    return (
      <form className={s.FeedbackForm} onSubmit={this.handleSubmit}>
        <label>
          Имя
          <input
            type="text"
            name="name"
            placeholder="Введите ваше имя"
            value={this.state.name}
            onChange={this.handleChange}
            // className={s.FeedbackForm__textarea}
          />
        </label>
        <textarea
          type="text"
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
          className={s.FeedbackForm__textarea}
        ></textarea>
        <button type="submit" className={s.FeedbackForm__button}>
          Отправить
        </button>
      </form>
    );
  }
}

export default FeedbackForm;
