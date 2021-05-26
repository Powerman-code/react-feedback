import { Component } from 'react';

import Container from './components/Container/Container';
import FeedbackList from './components/FeedbackList/FeedbackList';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import Filter from './components/Filter/Filter';

import './App.css';

class App extends Component {
  state = {
    feedbacks: [
      { id: 'id1', name: 'test1', text: 'some text1' },
      { id: 'id2', name: 'test2', text: 'some text2' },
      { id: 'id3', name: 'test3', text: 'some text3' },
    ],
    filter: '',
  };

  addFeedback = ({ name, text }) => {
    console.log({ name, text });
    const feedback = {
      name,
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

  getVisibleFeedbacks = () => {
    const { feedbacks, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return feedbacks.filter(feedback =>
      feedback.text.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { feedbacks, filter } = this.state;

    const visibleFeedbacks = this.getVisibleFeedbacks();

    return (
      <Container>
        <div>
          <p>Общее количество отзывов: {feedbacks.length}</p>
        </div>
        <Filter value={filter} onChange={this.handleFilter} />
        <FeedbackList feedbacks={visibleFeedbacks} />
        <FeedbackForm onSubmit={this.addFeedback} />
      </Container>
    );
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
