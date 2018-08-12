import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      error: "",
    };
  }

  componentDidMount() {
    const { page = "" } = queryString.parse(this.props.location.search) || {};
    const pageQuery = (page && `?page=${page}`) || "";
    this.setState(state => ({ ...state, loading: true }));
    axios
      .get(`/api/images${pageQuery}`)
      .then(response => {
        console.log(response.data);
        if (response.data.stat === "ok") {
          const { photos } = response.data;
          this.setState(state => ({
            ...state,
            photos,
            error: "",
            loading: false,
          }));
        } else {
          this.setState(state => ({
            ...state,
            error: response.data.message,
            loading: false,
          }));
        }
      })
      .catch(error =>
        this.setState(state => ({
          ...state,
          error,
          loading: false,
        })),
      );
  }

  renderPhotos = () => {
    const { photo = [] } = this.state.photos;
    return photo.map(photo => (
      <li>
        <img src={photo.url_q} />
      </li>
    ));
  };

  render() {
    return (
      <div>
        <h3>Gallery</h3>
        {this.state.loading && <strong>Loading...</strong>}
        {this.state.error && <span>{this.state.error}</span>}
        {this.state.photos && <ul>{this.renderPhotos()}</ul>}
      </div>
    );
  }
}

export default Gallery;
