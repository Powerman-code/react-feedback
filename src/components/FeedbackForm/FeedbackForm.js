import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './FeedbackForm.module.css';

class FeedbackForm extends Component {
  state = {
    name: '',
    text: '',
  };

  componentDidMount() {
    console.log('C_DID_MOUNT');

    window.addEventListener('keydown', e => {
      console.log(e);

      if (e.ctrlKey && e.code === 'Enter') {
        console.log('win');

        this.handleSubmit(e);
      }
    });
  }

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    console.log(value);
  };

  handleSubmit = e => {
    console.log(e);
    e.preventDefault();

    if (this.state.name.trim() === '') {
      //   alert('Введите имя');
      toast.warn('Введите имя');
      return;
    }
    console.log(this.state);
    this.props.onSubmit(this.state);
    this.resetText();
  };

  resetText = () => {
    this.setState({ text: '' });
  };

  render() {
    return (
      <form className={s.FeedbackForm} onSubmit={e => this.handleSubmit(e)}>
        <label>
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
