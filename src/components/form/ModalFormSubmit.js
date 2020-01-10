import React from 'react';
import PropTypes from 'prop-types';

import FormSubmit from 'components/form/FormSubmit';

const ModalFormSubmit = ({ children, submitting, disabled, ...props }) => (
  <div className="form-group pt-10 row justify-content-end">
    <div className="col-lg-8">
      <FormSubmit submitting={submitting} disabled={disabled} {...props}>{children}</FormSubmit>
    </div>
  </div>
);

ModalFormSubmit.propTypes = {
  children: PropTypes.node.isRequired,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

ModalFormSubmit.defaultProps = {
  submitting: false,
  disabled: false,
};

export default ModalFormSubmit;
