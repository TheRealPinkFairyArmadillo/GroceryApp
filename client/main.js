import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Feed from './Feed.js';
import './styles.css'

const url =
  'https://us-central1-codesmith-curriculum-server.cloudfunctions.net/app/images';

//App consists of one feed
class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Feed feedUrl={url} />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

// Render an <App> component to the #app div in the body
ReactDOM.render(<App />, document.getElementById('app'));