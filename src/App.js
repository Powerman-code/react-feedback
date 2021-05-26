import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Container from './components/Container/Container';
import FeedbackList from './components/FeedbackList/FeedbackList';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import Filter from './components/Filter/Filter';
import FeedbackPendingView from './views/FeedbackPendingView/FeedbackPendingView';

import './App.css';

class App extends Component {
  state = {
    feedbacks: null,
    filter: '',
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      await fetch('http://localhost:8080/api/feedback')
        .then(res => res.json())
        // .then(console.log);
        .then(({ data }) => this.setState({ feedbacks: [...data] }));
      // .catch(error => this.setState({ error })
      // .finally(() => this.setState({ loading: false }));
    } catch (error) {
      if (error) {
        this.setState({ error });
      }
    }
  }

  addFeedback = ({ name, text }) => {
    console.log({ name, text });
    const feedback = {
      name: name.toLowerCase(),
      text,
    };

    this.setState(({ feedbacks }) => ({
      feedbacks: [feedback, ...feedbacks],
    }));
  };

  handleFilter = e => {
    console.log(e.currentTarget.value);
    this.setState({ filter: e.currentTarget.value });
  };

  // getVisibleFeedbacks = () => {
  //   const { feedbacks, filter } = this.state;

  //   const normalizedFilter = filter.toLowerCase();

  //   if (feedbacks) {
  //     return feedbacks.filter(feedback =>
  //       feedback.text.toLowerCase().includes(normalizedFilter),
  //     );
  //   }
  // };

  render() {
    const { feedbacks, filter, loading, error } = this.state;

    // const visibleFeedbacks = this.getVisibleFeedbacks();

    //Вариант передачи ошибки с помощью react-toastify

    // if (error) {
    //   toast.error(`${error.message}`, {
    //     position: 'top-center',
    //     autoClose: false,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: false,
    //     progress: undefined,
    //   });
    // }

    return (
      <Container>
        {error && <h1>Произошла ошибка</h1>}
        {loading && <FeedbackPendingView />}
        <div>
          <p>Общее количество отзывов: {feedbacks?.length}</p>
        </div>
        <Filter value={filter} onChange={this.handleFilter} />
        {/* <FeedbackList feedbacks={visibleFeedbacks} /> */}
        <FeedbackForm onSubmit={this.addFeedback} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    );
  }
}

export default App;
