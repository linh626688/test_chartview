import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './spinner.css'

class SpinnerCustom extends Component {
  render() {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default SpinnerCustom;
