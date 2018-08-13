import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import queryString from "query-string";

import { fetchPhotos } from "../../actions";

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
    return photo.map(photo => (
      <li>
        <img src={photo.url_q} />
      </li>
    ));
  };

  render() {
    const { photos } = this.props;
    return (
      <div>
        <h3>Gallery</h3>
        {photos.isLoading && <strong>Loading...</strong>}
        {photos.error && <span>{photos.error}</span>}
        {photos && <ul>{this.renderPhotos()}</ul>}
      </div>
    );
  }
}

const mapStateToProps = state => ({ photos: state.photos });

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPhotos }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
