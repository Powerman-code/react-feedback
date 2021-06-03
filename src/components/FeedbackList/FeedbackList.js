import React, { useEffect, useState } from 'react';

import FeedbackItem from '../FeedbackItem/FeedbackItem';
import feedbackAPI from '../../services/feedback-api';

import s from './FeedbackList.module.css';

const FeedbackList = ({ feedback, filter }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  console.log(feedback);

  useEffect(() => {
    try {
      feedbackAPI().then(({ data }) => {
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

  const getVisibleFeedbacks = () => {
    const allFeedbacks = () => {
      if (Object.keys(feedback).length !== 0) {
        return [feedback, ...feedbacks];
      }
      return feedbacks;
    };

    const normalizedFilter = filter.toLowerCase();
    console.log(allFeedbacks());
    if (filter) {
      return allFeedbacks().filter(el =>
        el.name.toLowerCase().includes(normalizedFilter),
      );
    }
    console.log(allFeedbacks());
    return allFeedbacks();
  };

  const visibleFeedbacks = getVisibleFeedbacks();

  return (
    <ul className={s.FeedbackList}>
      {visibleFeedbacks.map(({ id, name, text }) => (
        <li key={id} className={s.FeedbackList__item}>
          <FeedbackItem name={name} text={text} />
        </li>
      ))}
    </ul>
  );
};

export default FeedbackList;
