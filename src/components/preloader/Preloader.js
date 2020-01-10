import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Size } from 'utils/enums';

import 'components/preloader/preloader.css';

import preloader from 'assets/media/preloader.svg';

const Preloader = (props) => {
  const { size, center, className } = props;
  const _className = classNames(
    `display-block`,
    className,
    {
      'preloader--mini': size === Size.MINI,
      'preloader--little': size === Size.LITTLE,
      'preloader--middle': size === Size.MIDDLE,
      'preloader--big': size === Size.BIG,
      'margin-center': center,
    }
  );

  return (
    <img className={_className} src={preloader} alt=""/>
  );
};

Preloader.propTypes = {
  size: PropTypes.number,
  center: PropTypes.bool,
  className: PropTypes.string,
};

Preloader.defaultProps = {
  size: Size.MIDDLE,
  center: true,
  className: ``,
};

export default Preloader;
