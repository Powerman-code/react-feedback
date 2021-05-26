import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './FeedbackPendingView.module.css';

class FeedbackPendingView extends Component {
  render() {
    return (
      <Loader
        className={s.loader}
        type="Oval"
        color="#303f9f"
        height={80}
        width={80}
      />
    );
  }
}

export default FeedbackPendingView;
