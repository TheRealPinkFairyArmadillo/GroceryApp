import React, { Component } from 'react';
import FeedItem from './FeedItem';

// Feed contains multiple FeedItems
// Put AJAX in this Component
class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urls: [],
    };
  }

  async componentDidMount() {
    try {
      const resp = await fetch(this.props.feedUrl);
      const data = await resp.json();
      this.setState({ urls: data });
    } catch (e) {
      console.error(e);
    }
  }

  // componentDidMount() {
  //   fetch(this.props.feedUrl)
  //     .then((resp) => resp.json())
  //     .then((data) => this.setState({ urls: [...data] }));
  // }

  render() {
    // put render logic here
    const feedItems = [];
    for (let i = 0; i < this.state.urls.length; i++) {
      feedItems.push(<FeedItem url={this.state.urls[i]} key={i} />);
    }
    return (
      <div id="feed" style={styles.container}>
        {/* {this.state.urls.map((url) => {
          return <FeedItem url={url} />;
        })} */}
        {feedItems}
      </div>
    );
  }
}

const styles = {
  container: {
    border: '1px black solid',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
  },
};

export default Feed;