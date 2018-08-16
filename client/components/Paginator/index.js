import React, { Component } from "react";
import PropTypes from "prop-types";

const noOp = () => {};

class Paginator extends Component {
  constructor(props) {
    super(props);
  }

  handleGoPrevious = () => {
    this.props.paginate(this.props.page - 1);
  };

  handleGoNext = () => {
    this.props.paginate(this.props.page + 1);
  };

  render() {
    const { page, pages } = this.props;
    const previousPageAvailable = page > 1;
    const nextPageAvailable = page < pages;
    return (
      <div className="paginator row">
        {previousPageAvailable && (
          <div
            className={`col ${
              nextPageAvailable ? "offset-s2 s3" : "offset-s4 s4"
            } waves-effect waves-light btn-small deep-purple darken-1`}
            onClick={this.handleGoPrevious}
          >
            <i className="material-icons left">navigate_before</i>
            Back
          </div>
        )}
        {nextPageAvailable && (
          <div
            className={`col ${
              previousPageAvailable ? "offset-s2 s3" : "offset-s4 s4"
            } waves-effect waves-light btn-small deep-purple darken-1`}
            onClick={this.handleGoNext}
          >
            <i className="material-icons right">navigate_next</i>
            Next
          </div>
        )}
      </div>
    );
  }
}

export default Paginator;

Paginator.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  paginate: PropTypes.func,
};

Paginator.defaultProps = {
  page: null,
  pages: null,
  paginate: noOp,
};
