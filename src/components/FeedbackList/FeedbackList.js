import React from 'react';

import FeedbackItem from '../FeedbackItem/FeedbackItem';
import s from './FeedbackList.module.css';

const FeedbackList = ({ feedbacks }) => (
  <ul className={s.FeedbackList}>
    {feedbacks?.map(({ id, name, text }) => (
      <li key={id} className={s.FeedbackList__item}>
        <FeedbackItem name={name} text={text} />
      </li>
    ))}
  </ul>
);

export default FeedbackList;
