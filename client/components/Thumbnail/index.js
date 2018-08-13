import React, { Component } from "react";
import "./style.css";

class Thumbnail extends Component {
  render() {
    const { photoId, image, caption, ownerId, ownername } = this.props;
    return (
      <div className="col s12 thumbnail">
        <img src={image} alt={caption} />
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

export default Thumbnail;
