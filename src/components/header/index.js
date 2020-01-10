import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingBar from 'react-redux-loading-bar';

import listData from './listData';
import useDesktopSize from 'hooks/useDesktopSize';
import { ModalType, Permission } from 'utils/enums';
import { walletActionCreators } from 'actions/widgets/wallet';
import { hasAccessSelector, userNameSelector, userPermissionsSelector } from 'selectors/auth';
import { DEFAULT_ROUTE } from 'utils/constants';
import { logoutRequest } from 'actions/auth';

import Sidebar from './Sidebar';
import NavItem from './NavItem';

import './style.css';

import logo from 'assets/media/logo.svg';

const renderLogo = <img src={logo} alt=""/>;

const Header = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  const name = useSelector(userNameSelector);
  const permissions = useSelector(userPermissionsSelector);
  const addWalletAccess = useSelector(hasAccessSelector(Permission.WALLET_CREATE));
  const dashboardAccess = useSelector(hasAccessSelector(Permission.DASHBOARD));
  const dashboardClientAccess = useSelector(hasAccessSelector(Permission.DASHBOARD_CLIENT));
  const dispatch = useDispatch();

  const desktopSize = useDesktopSize();

  return (
    <>
      <header id="page-header">
        <LoadingBar className="progress-line-bar" showFastActions/>
        <div className="content-header">
          <div className="content-header-item">
            {dashboardAccess || dashboardClientAccess ?
              <Link to={DEFAULT_ROUTE} className="font-w700 mr-5 logo-link">
                {renderLogo}
              </Link> :
              <span className="font-w700 mr-5">{renderLogo}</span>
            }
          </div>

          <div className="content-header-section d-none d-lg-block">
            <ul className="nav-main-header">
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
              {map(listData(permissions), ({ main, hasAccess, ...item }, key) => (
                main && hasAccess && <NavItem key={key} {...item} />
              ))}
              <li className="open">
                <button type="button" className="header-primary-btn">
                  <i className="si si-user"/>
                  <span className="header-primary-btn__text">{name}</span>
                </button>
                <ul>
                  {map(listData(permissions), ({ main, hasAccess, ...item }, key) => (
                    !main && hasAccess && <NavItem key={key} {...item} />
                  ))}
                  <li>
                    <button onClick={() => dispatch(logoutRequest())}
                            className="header-primary-btn">
                      <i className="si si-logout"/>
                      <span className="header-primary-btn__text">Выйти</span>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="content-header-section d-lg-none">
            <button type="button"
                    className="btn btn-circle btn-dual-secondary d-lg-none"
                    onClick={() => setDisplaySidebar(true)}
            >
              <i className="fa fa-navicon"/>
            </button>
          </div>
        </div>
        <div id="page-header-loader" className="overlay-header bg-primary">
          <div className="content-header content-header-fullrow text-center">
            <div className="content-header-item">
              <i className="fa fa-sun-o fa-spin text-white"/>
            </div>
          </div>
        </div>
      </header>
      <TransitionGroup>
        {!desktopSize && displaySidebar &&
          <CSSTransition classNames="sidebar-transition" timeout={260}>
            <Sidebar hideSidebar={() => setDisplaySidebar(false)} />
          </CSSTransition>
        }
      </TransitionGroup>
    </>
  );
};

export default Header;
