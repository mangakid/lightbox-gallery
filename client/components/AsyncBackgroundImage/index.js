import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import "./style.css";

class AsyncBackgroundImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
    };
  }

  _onLoad = () => {
    this.setState(() => ({ loaded: true }));
  };

  _onError = () => {
    this.setState(() => ({ error: true }));
  };

  render() {
    const { errorDisplay, placeholder, source } = this.props;
    const { loaded, error } = this.state;
    return (
      <Fragment>
        {!loaded && (
          <img
            src={source}
            onLoad={this._onLoad}
            onError={this._onError}
            style={{ position: "fixed", left: -10000 }}
          />
        )}
        {loaded && (
          <div
            className="async-background-image"
            style={{ backgroundImage: `url(${source})` }}
          />
        )}
        {!loaded && !error && placeholder}
        {error && errorDisplay}
      </Fragment>
    );
  }
}

export default AsyncBackgroundImage;

AsyncBackgroundImage.propTypes = {
  errorDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  source: PropTypes.string.isRequired,
};

AsyncBackgroundImage.defaultProps = {
  placeholder: <div>Placeholder</div>,
  source: "",
  errorDisplay: <div className="error">Unable to load image</div>,
};
