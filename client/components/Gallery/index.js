import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import queryString from "query-string";
import PropTypes from "prop-types";

import "./style.css";
import { fetchPhotos } from "../../actions";
import Thumbnail from "../Thumbnail";
import Lightbox from "../Lightbox";

const noOp = () => {};

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { page = "" } = queryString.parse(this.props.location.search) || {};
    this.props.fetchPhotos(page);
  }

  renderPhotos = () => {
    const { photo = [] } = this.props.photos;
    return photo.map(photo => {
      const { id, owner, ownername, title, url_q } = photo;
      return (
        <li key={id} className="col s6 m4 l3">
          <Thumbnail
            photoId={id}
            image={url_q}
            caption={title}
            ownerId={owner}
            ownername={ownername}
          />
        </li>
      );
    });
  };

  render() {
    const { photos } = this.props;
    return (
      <div className="row gallery">
        {photos.isLoading && (
          <Fragment>
            <div className="progress light-color">
              <div className="indeterminate dark-color" />
            </div>
            <strong className="loading col s12">Loading...</strong>
          </Fragment>
        )}
        {photos.error && <span>{photos.error}</span>}
        {photos && <ul>{this.renderPhotos()}</ul>}
        {<Lightbox />}
      </div>
    );
  }
}

const mapStateToProps = state => ({ photos: state.gallery });

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPhotos }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gallery);

Gallery.propTypes = {
  fetchPhotos: PropTypes.func,
  location: PropTypes.object,
  photos: PropTypes.object,
};

Gallery.defaultProps = {
  fetchPhotos: noOp,
  location: { search: "" },
  photos: {},
};
