import PropTypes from 'prop-types';

export const modalFormPropTypes = {
  submitText: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
};

export const tableHeaderExtraButtons = {
  extraHeaderButtons: PropTypes.arrayOf(PropTypes.shape({
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    withDispatch: PropTypes.bool,
  })),
};
