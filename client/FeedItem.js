import React, { Component } from 'react';

// FeedItem should consist of an image (src contained in the data from the AJAX request)
class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  render() {
    // put render logic here
    return (
      this.state.error === false && (
        <div className="feedItem" style={styles.container}>
          {
            <img
              src={this.props.url}
              onError={() => this.setState({ error: true })}
              alt=""
            />
          }
        </div>
      )
    );
  }
}

const styles = {
  container: {
    border: '1px solid black',
    height: 100,
    width: '100%',
    flex: 1,
  },
};

export default FeedItem;