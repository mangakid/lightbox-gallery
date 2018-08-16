import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import queryString from "query-string";
import PropTypes from "prop-types";

import "./style.css";
import { fetchPhotos } from "../../actions";
import Thumbnail from "../Thumbnail";
import Lightbox from "../Lightbox";
import Paginator from "../Paginator";

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

  handlePagination = page => {
    const { fetchPhotos, location, history } = this.props;
    const query = queryString.parse(location.search);
    query.page = page;
    const stringifiedQuery = queryString.stringify(query);
    history.push({ search: stringifiedQuery });
    fetchPhotos(page);
  };

  render() {
    const { fetchPhotos, photos } = this.props;
    const { error, isLightboxOpen, isLoading, page, pages } = photos;
    const showPaginator = pages > 1 && !isLightboxOpen;
    return (
      <div className="row gallery">
        {isLoading && (
          <Fragment>
            <div className="progress light-color">
              <div className="indeterminate dark-color" />
            </div>
            <strong className="loading col s12">Loading...</strong>
          </Fragment>
        )}
        {error && <span>{error}</span>}
        {photos && <ul>{this.renderPhotos()}</ul>}
        <Lightbox />
        {showPaginator && (
          <Paginator
            page={page}
            pages={pages}
            paginate={this.handlePagination}
          />
        )}
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
