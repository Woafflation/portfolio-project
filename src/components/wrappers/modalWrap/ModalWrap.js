import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useClickAway from 'react-use/lib/useClickAway';
import useKeyPressEvent from 'react-use/lib/useKeyPressEvent';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import useMount from 'react-use/lib/useMount';
import useUnmount from 'react-use/lib/useUnmount';

import { Size } from 'utils/enums';
import { pressEsc } from 'utils';

import './modalWrap.css';

const ModalWrap = ({ children, onClose, title, size, className }) => {
  const modalRef = useRef();

  const dispatch = useDispatch();

  const closeHandler = () => dispatch(onClose());

  useMount(() => {
    document.body.style.overflow = `hidden`;
  });

  useUnmount(() => {
    document.body.style.overflow = `auto`;
  });

  useClickAway(modalRef, closeHandler);

  useKeyPressEvent(pressEsc, closeHandler);

  const _className = classNames(
    `modal-dialog`,
    className,
    {
      'modal--middle': size === Size.MIDDLE,
      'modal--big': size === Size.BIG,
    }
  );

  return (
    <>
      <div className="modal show">
        <div className={_className} ref={modalRef}>
          <div className="modal-content">
            <div className="block block-themed block-transparent mb-0">
              <div className="block-header bg-primary-dark">
                <h3 className="block-title">{title}</h3>
                <div className="block-options">
                  <button type="button" className="btn-block-option" onClick={closeHandler}>
                    <i className="si si-close"/>
                  </button>
                </div>
              </div>
              <div className="block-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"/>
    </>
  );
};

ModalWrap.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

ModalWrap.defaultProps = {
  children: null,
};

export default ModalWrap;
