import React from 'react';
import s from './FeedbackItem.module.scss';

const FeedbackItem = ({ name, text }) => (
  <>
    <div className={s.FeedbackItem__block}>
      <div className={s.FeedbackItem__name}>
        <p className={s.FeedbackItem__name__text}>{name}</p>
      </div>
      <div className={s.FeedbackItem__body}>
        <p className={s.FeedbackItem__body__text}>{text}</p>
      </div>
    </div>
  </>
);

export default FeedbackItem;
