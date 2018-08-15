import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./style.css";
import { openLightbox } from "../../actions";
import AsyncImage from "../AsyncImage";
import SpinnerSmall from "../SpinnerSmall";

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: null,
    };
  }

  handleImageClick = () => {
    this.props.openLightbox(this.props.photoId);
  };

  render() {
    const { photoId, image, caption, ownerId, ownername } = this.props;
    return (
      <div className="col s12 thumbnail">
        <div className="image-wrapper" onClick={this.handleImageClick}>
          <div className="caption">{caption}</div>
          <AsyncImage
            source={image}
            alt={caption}
            placeholder={<SpinnerSmall />}
          />
        </div>
        <div className="ownername">
          <a
            href={`https://www.flickr.com/photos/${ownerId}/${photoId}`}
            target="_blank"
          >
            {ownername}
          </a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openLightbox }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps,
)(Thumbnail);
