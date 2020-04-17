import React, { Component } from "react";

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">Hello React</h1>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
