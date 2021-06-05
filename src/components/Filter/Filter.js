import React from 'react';
import s from './Filter.module.scss';

const Filter = ({ value, onChange }) => (
  <label className={s.Filter__text}>
    Фильтр по имени
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={s.Filter__input}
    ></input>
  </label>
);

export default Filter;
