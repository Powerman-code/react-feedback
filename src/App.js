import { Component, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import Container from './components/Container/Container';
import FeedbackList from './components/FeedbackList/FeedbackList';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import Filter from './components/Filter/Filter';
import FeedbackPendingView from './views/FeedbackPendingView/FeedbackPendingView';
import feedbackAPI from './services/feedback-api';

import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    try {
      feedbackAPI().then(({ data }) => {
        if (data) {
          console.log(data);
          setFeedbacks(data.reverse());
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(typeof error.message);
      setError(error.message);
      setLoading(false);
    }
    // return () => {
    //   cleanup;
    // };
  }, [feedback]);

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   try {
  //     const data = await feedbackAPI();
  //     this.setState({

  //       feedbacks: [...data],
  //       loading: false,
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.log(typeof error.message);
  //     this.setState({ error: error.message });
  //   }
  // }

  // addFeedback = ({ name, text }) => {
  //   console.log({ name, text });
  //   const feedback = {
  //     name: name.toLowerCase(),
  //     text,
  //   };

  //   const response = axios.post('http://localhost:8080/api/feedback', feedback);

  //   this.setState(({ feedbacks }) => ({
  //     feedbacks: [feedback, ...feedbacks],
  //   }));
  // };

  const addFeedback = (name, text) => {
    console.log(name, text);
    const feedback = {
      name: name.toLowerCase(),
      text,
    };

    console.log(feedback);
    setFeedback(feedback);
    // const response = axios.post('http://localhost:8080/api/feedback', feedback);

    // setFeedbacks(({ feedbacks }) => ({
    //   feedbacks: [feedback, ...feedbacks],
    // }));
    // setImages(prevState => [...prevState, ...hits]);
    // setFeedbacks(prevState => [...prevState, feedback]);
  };

  const handleFilter = e => {
    // console.log(e.currentTarget.value);
    setFilter(e.currentTarget.value);
  };

  const getVisibleFeedbacks = () => {
    // const { feedbacks, filter } = this.state;
    // console.log(feedbacks);
    const normalizedFilter = filter.toLowerCase();

    if (feedbacks) {
      console.log('Ура');
      return feedbacks.filter(feedback =>
        feedback.name.toLowerCase().includes(normalizedFilter),
      );
    }
  };

  const visibleFeedbacks = getVisibleFeedbacks();

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
      {error && <h1>{error}</h1>}
      {loading && <FeedbackPendingView />}
      <div>
        <p>Общее количество отзывов: {feedbacks?.length}</p>
      </div>
      <Filter value={filter} onChange={handleFilter} />
      <FeedbackList feedbacks={visibleFeedbacks} />
      <FeedbackForm onSubmit={addFeedback} />
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

export default App;
