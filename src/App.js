import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Container from './components/Container/Container';
import FeedbackList from './components/FeedbackList/FeedbackList';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import Filter from './components/Filter/Filter';

import './App.css';

function App() {
  const [feedback, setFeedback] = useState({});
  const [filter, setFilter] = useState('');

  const handleFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFeedback = feedback => {
    setFeedback(feedback);
  };

  return (
    <Container>
      <Filter value={filter} onChange={handleFilter} />
      <FeedbackList feedback={feedback} filter={filter} />
      <FeedbackForm handleFeedback={getFeedback} />
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
