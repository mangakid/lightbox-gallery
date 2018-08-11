import React, { Component } from "react";
import Gallery from "../Gallery";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Lightbox gallery</h1>
        <Switch>
          <Route exact path="/" component={Gallery} />
        </Switch>
      </div>
    );
  }
}

export default App;
