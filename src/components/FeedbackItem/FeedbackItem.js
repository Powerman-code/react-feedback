import React from 'react';
import s from './FeedbackItem.module.css';

const FeedbackItem = ({ name, text }) => (
  <>
    <p className={s.FeedbackList__text}>{name}</p>
    <p className={s.FeedbackList__text}>{text}</p>
  </>
);

export default FeedbackItem;
