import React from 'react';
import PropTypes from 'prop-types';

import ReactLoaderSpinner from 'react-loader-spinner';

// -- Component
function Loader({ height, width, type }) {
  return (
    <ReactLoaderSpinner
      type={type}
      height={height}
      width={width}
      color="#ccc"
    />
  );
}

// -- PropTypes
Loader.propTypes = {
  type: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

Loader.defaultProps = {
  type: 'TailSpin',
  height: 80,
  width: 80,
};

// -----
export default Loader;
