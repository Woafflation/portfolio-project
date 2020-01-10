import React from 'react';
import PropTypes from 'prop-types';

import { Size } from 'utils/enums';

import Preloader from 'components/preloader/Preloader';

const FormSubmit = ({ children, submitting, disabled, ...props }) => (
  <div className="flex">
    <button className="btn btn-alt-primary" disabled={submitting || disabled} {...props}>{children}</button>
    {submitting &&
      <Preloader
        center={false}
        className="margin-mini-preloader"
        size={Size.LITTLE}
      />
    }
  </div>
);

FormSubmit.propTypes = {
  children: PropTypes.node.isRequired,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

FormSubmit.defaultProps = {
  submitting: false,
  disabled: false,
};

export default FormSubmit;
