import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Gallery from "../Gallery";
import { fetchPhotos } from "../../actions";

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchPhotos();
  }

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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPhotos }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);
