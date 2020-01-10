import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMount } from 'react-use';
import Chart from 'chart.js';
import moment from 'moment';
import CountUp from 'react-countup';
import { get } from 'lodash';

import { dashboardReset, fetchDashboardData } from 'actions/dashboard';
import { dashboardSelector } from 'selectors/dashboard';
import { Permission, Size } from 'utils/enums';
import { hasAccessSelector } from 'selectors/auth';

import PageWrap from 'components/wrappers/PageWrap';
import Header from 'components/header';
import PageContentWrap from 'components/wrappers/PageContentWrap';
import Preloader from 'components/preloader/Preloader';

import 'pages/dashboard/style.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(dashboardSelector);

  const dashboardAccess = useSelector(hasAccessSelector(Permission.DASHBOARD));
  const dashboardClientAccess = useSelector(hasAccessSelector(Permission.DASHBOARD_CLIENT));


  const [graphIsRendered, setGraphIsRendered] = useState(false);
  const [activeTab, setactiveTab] = useState(1);
  let graphRef = useRef();
  let graphRef2 = useRef();

  const generateGraph = () => {
    if (graphRef.current && graphRef2.current) {
      const getSubstractDay = (count) => {
        return moment().subtract(count, `day`).format(`DD.MM`);
      };

      const sumData = [];
      const countData = [];
      for (let key in dashboard.data) {
        sumData.push(get(dashboard, `data[${key}].ingoing_transactions_sum`));
        countData.push(get(dashboard, `data[${key}].ingoing_transactions_count`));
      }

      new Chart(graphRef.current.getContext(`2d`), {
        type: `line`,
        data: {
          labels: [
            getSubstractDay(6),
            getSubstractDay(5),
            getSubstractDay(4),
            getSubstractDay(3),
            getSubstractDay(2),
            getSubstractDay(1),
            moment().format(`DD.MM`)],
          datasets: [
            {
              label: `Сумма активированных транзакций`,
              backgroundColor: `rgba(102, 182, 247, .5)`,
              borderColor: `#8cc8f8`,
              data: sumData.reverse(),
            },
          ],
        },
        options: {},
      });
      new Chart(graphRef2.current.getContext(`2d`), {
        type: `line`,
        data: {
          labels: [
            getSubstractDay(6),
            getSubstractDay(5),
            getSubstractDay(4),
            getSubstractDay(3),
            getSubstractDay(2),
            getSubstractDay(1),
            moment().format(`DD.MM`)],
          datasets: [
            {
              label: `Количество активированных транзакций`,
              backgroundColor: `#66b6f7`,
              borderColor: `#4aa8f5`,
              data: countData.reverse(),
            },
          ],
        },
        options: {},
      });

      setGraphIsRendered(true);
    }
  };

  useMount(() => {
    dispatch(fetchDashboardData());
  });

  useMount(() => {
    dispatch(dashboardReset());
  });

  if (dashboard.loadedAllData && !graphIsRendered) {
    generateGraph();
  }

  const countUpOptions = {
    start: 0,
    duration: 0.001,
    easingFn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    separator: ` `,
    decimal: `,`,
  };

  const renderSmallTile = (number, title, src, color, symbol) => {
    return (
      <div className="col-6 col-xl-4">
        <div className={`block block-link-pop text-right bg-${color}`}>
          <div className="block-content block-content-full clearfix border-black-op-b border-3x">
            <div className="float-left mt-10 d-none d-sm-block img">
              <img className="" src={require(`./images/${src}.svg`)} alt={title}/>
            </div>
            <div className="font-size-h3 font-w600 text-white js-count-to-enabled">
              <CountUp
                end={parseFloat(number)}
                {...countUpOptions}
              />
              &nbsp; {symbol}
            </div>
            <div className="font-size-sm font-w600 text-uppercase text-white-op">{title}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderTileRow = (number, title, src, showCurrency = false) => {
    return (
      <React.Fragment>
        <div className="col-8">
          <div className="font-size-h3 font-w600 dashboard-number">
            <CountUp
              end={parseFloat(number)}
              {...countUpOptions}
            />
            &nbsp; {showCurrency && get(dashboard, `currency.symbol`)}
          </div>
          <div className="font-size-sm font-w500 text-muted text-uppercase">{title}</div>
        </div>
        <div className="col-4 text-right">
          <img className="" src={require(`./images/${src}.svg`)} alt={title}/>
        </div>
      </React.Fragment>
    );
  };

  const today = moment().format(`YYYY-MM-DD`);
  const todaysTransaction = get(dashboard, `data[${today}]`);

  const changeTab = (number) => {
    setactiveTab(number);
  };

  return (
    <>
      <PageWrap>
        <Header/>
        <PageContentWrap>
          {!dashboard.loadedAllData ? <Preloader className="margin-center" size={Size.BIG}/> : null}
          <div className={!dashboard.loadedAllData ? `dashboard-hidden` : ``}>
            {!dashboardAccess && dashboardClientAccess
              ?   null
              :   <div className="row js-appear-enabled animated fadeIn">
                    {renderSmallTile(dashboard.active_wallets_count, `рабочих кошельков`,
                      `wallet-verified`, `earth`)}
                    {renderSmallTile(dashboard.total_wallets_balance, `Общий баланс`,
                      `balance`, `elegance`, get(dashboard, `currency.symbol`))}
                    {renderSmallTile(dashboard.active_proxies_count, `рабочих прокси`,
                      `proxy`, `corporate`)}
                  </div>}
            <div className="row align-items-stretch js-appear-enabled animated fadeIn">
              <div className="col-md-8">
                <nav>
                  <div className="nav nav-tabs">
                    <button
                      className={`nav-item nav-link ${activeTab === 1 ? `active` : ``}`}
                      onClick={() => changeTab(1)}
                    >
                      Сумма активированных транзакций
                    </button>
                    <button
                      className={`nav-item nav-link ${activeTab === 2 ? `active` : ``}`}
                      onClick={() => changeTab(2)}
                    >
                      Количество активированных транзакций
                    </button>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div className="block dashboard-tile">
                    <div className="block-content block-content-full">
                      <div className=" dashboard-tab-wrapper">
                        <div className={`dashboard-tab tab-pane fade ${activeTab === 1 ? `show active` : ``}`}>
                          <canvas ref={graphRef}/>
                        </div>
                        <div className={`dashboard-tab tab-pane fade ${activeTab === 2 ? `show active` : ``}`}>
                          <canvas ref={graphRef2}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-md-4">
                <div className="block dashboard-tile dashboard-tile_indent-top">
                  <div className="block-content block-content-full">
                    <div className="row pt-30 pb-30 border-b text-elegance">
                      {renderTileRow(get(todaysTransaction, `ingoing_transactions_sum`),
                        `Сумма активированных транзакций`, `bill`, true)}
                    </div>
                    <div className="row pt-30 pb-30 border-b text-primary">
                      {renderTileRow(get(todaysTransaction, `ingoing_transactions_count`),
                        `Количество активированных транзакций`, `report`)}
                    </div>
                    <div className="row pt-30 pb-30 text-danger">
                      {renderTileRow(get(todaysTransaction, `outgoing_transactions_sum`),
                        `Сумма выводов за сегодня`, `withdraw`, true)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContentWrap>
      </PageWrap>
    </>
  );
};

export default Dashboard;
