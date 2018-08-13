import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Gallery from "../Gallery";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h3>Lightbox gallery</h3>
        <Switch>
          <Route exact path="/" component={Gallery} />
        </Switch>
      </div>
    );
  }
}

export default App;
