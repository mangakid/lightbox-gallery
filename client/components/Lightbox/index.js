import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { closeLightbox } from "../../actions";
import AsyncBackgroundImage from "../AsyncBackgroundImage";
import SpinnerSmall from "../SpinnerSmall";
import "./style.css";

const noOp = () => {};

class Lightbox extends Component {
  renderPhoto = () => {
    const { photo } = this.props;
    return (
      <div className="lightbox">
        <div
          className="close-button"
          onClick={() => this.props.closeLightbox()}
        >
          <i className="material-icons">close</i>
        </div>
        <div className="container">
          <div className="image-wrapper col s12">
            <AsyncBackgroundImage
              source={photo.url_c}
              placeholder={<SpinnerSmall />}
            />
          </div>
          <div className="photo-info col s12">
            {photo.title} by {photo.ownername}
          </div>
        </div>
      </div>
    );
  };

  closeLightbox = () => this.props.closeLightbox();

  render() {
    return (this.props.isLightboxOpen && this.renderPhoto()) || null;
  }
}

const mapStateToProps = state => ({
  isLightboxOpen: state.gallery.isLightboxOpen,
  photo: state.gallery.selectedPhoto,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ closeLightbox }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lightbox);

Lightbox.propTypes = {};

Lightbox.defaultProps = {
  isLightboxOpen: false,
  closeLightbox: noOp,
  photo: {},
};
