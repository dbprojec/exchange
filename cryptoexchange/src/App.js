import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DenseAppBar from './appbar/appbar'


class App extends Component {
  render() {
    return (
        <div>
          <DenseAppBar />
        </div>
    );
  }
  componentDidMount() {
    // console.log(this.props.location.pathname);
  }
}

export default App;
