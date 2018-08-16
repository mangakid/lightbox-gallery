import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import "./style.css";

class AsyncImage extends Component {
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
    const { alt, errorDisplay, placeholder, source } = this.props;
    const { loaded, error } = this.state;
    return (
      <Fragment>
        <img
          src={source}
          alt={alt}
          onLoad={this._onLoad}
          onError={this._onError}
          style={
            !this.state.loaded
              ? { position: "fixed", left: -10000 }
              : { position: "inherit" }
          }
        />
        {!loaded && !error && placeholder}
        {error && errorDisplay}
      </Fragment>
    );
  }
}

export default AsyncImage;

AsyncImage.propTypes = {
  alt: PropTypes.string,
  errorDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  source: PropTypes.string.isRequired,
};

AsyncImage.defaultProps = {
  alt: "",
  placeholder: <div>Placeholder</div>,
  source: "",
  errorDisplay: <div className="error">Unable to load image</div>,
};
