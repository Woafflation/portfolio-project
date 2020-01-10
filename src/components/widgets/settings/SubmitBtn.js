import React from 'react';
import PropTypes from 'prop-types';

import FormSubmit from 'components/form/FormSubmit';

const SubmitBtn = ({ children, submitting }) => (
  <div className="form-group">
    <FormSubmit submitting={submitting}>{children}</FormSubmit>
  </div>
);

SubmitBtn.propTypes = {
  children: PropTypes.node,
  submitting: PropTypes.bool,
};

SubmitBtn.defaultProps = {
  children: null,
  submitting: false,
};

export default SubmitBtn;
