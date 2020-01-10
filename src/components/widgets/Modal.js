import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { isNull } from 'lodash';

import { Size } from 'utils/enums';
import { widgetSelector } from 'selectors/widgets/widgets';

import ModalWrap from 'components/wrappers/modalWrap/ModalWrap';
import Preloader from 'components/preloader/Preloader';

const Modal = ({ widget, type, actionCreators: { hideModal }, children, title, size, dataSelector }) => {
  const { modal } = useSelector(widgetSelector(widget));
  const data = useSelector(dataSelector ? dataSelector :  () => null);

  return (
    <TransitionGroup>
      {modal && modal.type === type &&
        <CSSTransition classNames="modal-transition"
                       timeout={150}
        >
          <ModalWrap size={size}
                     onClose={hideModal}
                     title={title}>
            {isNull(data) && dataSelector && <Preloader />}
            {children}
          </ModalWrap>
        </CSSTransition>
      }
    </TransitionGroup>
  );
};

Modal.propTypes = {
  widget: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  actionCreators: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.number,
  dataSelector: PropTypes.func,
};

Modal.defaultProps = {
  size: Size.MIDDLE,
};

export default Modal;
