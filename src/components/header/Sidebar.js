import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import listData from './listData';
import { walletActionCreators } from 'actions/widgets/wallet';
import { ModalType, Permission } from 'utils/enums';
import { logoutRequest } from 'actions/auth';
import { hasAccessSelector, userPermissionsSelector } from 'selectors/auth';

import NavItem from './NavItem';

const Sidebar = ({ hideSidebar }) => {
  const dispatch = useDispatch();

  const permissions = useSelector(userPermissionsSelector);
  const addWalletAccess = useSelector(hasAccessSelector(Permission.WALLET_CREATE));
  const dashboardAccess = useSelector(hasAccessSelector(Permission.DASHBOARD));

  return (
    <nav id="sidebar">
      <div id="sidebar-scroll">
        <div className="sidebar-content">
          <div className="content-header content-header-fullrow bg-black-op-10">
            <div className="content-header-section text-center align-parent">
              <button type="button"
                      className="btn btn-circle btn-dual-secondary d-lg-none align-v-r"
                      onClick={hideSidebar}
              >
                <i className="fa fa-times text-danger"/>
              </button>
              <div className="content-header-item">
                {dashboardAccess ?
                  <Link to="/" className="font-w700 font-size-xl mobile-logo logo-link">paykasma</Link> :
                  <span className="font-w700 font-size-xl mobile-logo">paykasma</span>
                }
              </div>
            </div>
          </div>
          <div className="content-side content-side-full">
            <ul className="nav-main mobile-menu">
              {addWalletAccess &&
                <li>
                  <button type="button"
                          className="btn btn-block btn-alt-success"
                          onClick={() => dispatch(walletActionCreators.showModal({ type: ModalType.CREATE }))}
                  >
                    <i className="fa fa-plus mr-5"/>
                    <span className="mr-15">Добавить кошелек</span>
                  </button>
                </li>
              }
              {map(listData(permissions), ({ hasAccess, ...item }, i) => (
                hasAccess && <NavItem key={i} {...item} />
              ))}
              <li>
                <button onClick={() => dispatch(logoutRequest())} className="header-primary-btn">
                  <i className="si si-logout"/> Выйти
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  hideSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
