import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./style.css";
import { openLightbox } from "../../actions";

class Thumbnail extends Component {
  constructor(props) {
    super(props);
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
          <img src={image} alt={caption} />
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
