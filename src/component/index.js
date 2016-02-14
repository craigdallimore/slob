'use strict';

const React    = require('react');
const { Link } = require('react-router');
//import styles from '../styles.css';

const Index = React.createClass({

  render() {

    return (
      <div>
        <h2>Index</h2>
        <nav>
          <Link to = "/a">Link to a</Link>
          <Link to = "/b">Link to b</Link>
        </nav>
        { this.props.children }
      </div>
    );

  }

});

module.exports = Index;
