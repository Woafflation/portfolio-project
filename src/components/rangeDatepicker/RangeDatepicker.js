import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Calendar } from 'react-date-range';
import PropTypes from 'prop-types';
import moment from 'moment';
import useClickAway from 'react-use/lib/useClickAway';

import { displayingDateInputFormat } from 'utils';

import './range-datepicker.css';

const RangeDatepicker = (props) => {
  const {
    input,
    fromValue = new Date(moment().subtract(7, `days`)),
    toValue = new Date(),
    inputClassName,
  } = props;
  const refFrom = useRef();
  const refTo = useRef();

  const [datepickerFromOpened, setFromDatepickerOpened] = useState(false);
  const [datepickerToOpened, setToDatepickerOpened] = useState(false);

  useClickAway(refFrom, () => {
    if (datepickerFromOpened) {
      setFromDatepickerOpened(false);
    }
  });
  useClickAway(refTo, () => {
    if (datepickerToOpened) {
      setToDatepickerOpened(false);
    }
  });

  const onDateChange = (val, type) => {
    const datesRange = { values: { startDate: fromValue, endDate: toValue } };
    datesRange.values[type] = val;
    input.onChange(datesRange);
    setFromDatepickerOpened(false);
    setToDatepickerOpened(false);
  };

  return (
    <div className="datepicker__wrap">
      <span className="datepicker__item" ref={refFrom}>
        <input
          type="text"
          value={displayingDateInputFormat(fromValue)}
          className={classNames(`form-control`, `input--datepicker`, inputClassName)}
          onFocus={() => setFromDatepickerOpened(true)}
          readOnly
        />
        <div className={classNames(`datepicker`, { 'datepicker--opened': datepickerFromOpened })}>
          <Calendar
            {...input}
            {...props}
            date={fromValue}
            onChange={val => onDateChange(val, `startDate`)}
            showDateDisplay={false}
          />
        </div>
      </span>
      <span className="datepicker__item" ref={refTo}>
        <input
          type="text"
          value={displayingDateInputFormat(toValue)}
          className={classNames(`form-control`, `input--datepicker`, `icon-margin-left`, inputClassName)}
          onFocus={() => setToDatepickerOpened(true)}
          readOnly
        />
        <div className={classNames(`datepicker`, { 'datepicker--opened': datepickerToOpened })}>
          <Calendar
            {...input}
            {...props}
            date={toValue}
            onChange={val => onDateChange(val, `endDate`)}
            showDateDisplay={false}
          />
        </div>
      </span>
    </div>
  );
};

RangeDatepicker.propTypes = {
  fromValue: PropTypes.any,
  toValue: PropTypes.any,
  input: PropTypes.any,
  inputClassName: PropTypes.string,
};

RangeDatepicker.defaultProps = {
  inputClassName: ``,
};

export default RangeDatepicker;
