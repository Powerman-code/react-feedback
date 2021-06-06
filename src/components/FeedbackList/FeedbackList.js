import React, { useCallback, useEffect, useState } from 'react';

import FeedbackItem from '../FeedbackItem/FeedbackItem';
import feedbackAPI from '../../services/feedback-api';

import s from './FeedbackList.module.scss';

const FeedbackList = ({ feedback, filter }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  // console.log(feedback);

  useEffect(() => {
    try {
      feedbackAPI.fetchFeedbacks().then(({ data }) => {
        if (data) {
          setFeedbacks(data.reverse());
        }
      });
    } catch (error) {
      console.log(typeof error.message);
      setError(error.message);
    }
    // return () => {
    //   cleanup;
    // };
  }, []);

  const getAllFeedbacks = () => {
    if (feedback && Object.keys(feedback).length !== 0) {
      console.log('DA');
      setFeedbacks([feedback, ...feedbacks]);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, [feedback]);

  const getVisibleFeedbacks = () => {
    const normalizedFilter = filter.toLowerCase();
    // console.log(getAllFeedbacks());
    if (filter) {
      return feedbacks.filter(el =>
        el.name.toLowerCase().includes(normalizedFilter),
      );
    }

    return feedbacks;
  };

  const visibleFeedbacks = getVisibleFeedbacks();

  return (
    <ul className={s.FeedbackList}>
      {visibleFeedbacks.map(({ id, name, text }) => (
        <li key={id} className={s.FeedbackItem}>
          <FeedbackItem name={name} text={text} />
        </li>
      ))}
    </ul>
  );
};

export default FeedbackList;

// const getAllFeedbacks = () => {
//   if (Object.keys(feedback).length !== 0) {
//     return [feedback, ...feedbacks];
//   }
//   return feedbacks;
// };
