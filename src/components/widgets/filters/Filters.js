import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { size, map, get, each, assign } from 'lodash';
import { Field, getFormValues } from 'redux-form';
import { useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';
import { toNumber } from 'lodash';

import { sleep } from 'utils';
import useSearchParams from 'hooks/useSearchParams';
import { FiltersGridType } from 'utils/enums';

import RangeDatepicker from 'components/rangeDatepicker/RangeDatepicker';
import FormInput from 'components/form/FormInput';

import './filters.css';

const getFieldMapping = ({ values }) => (field, key) => {
  if (field.type === `date`) {
    const date_range = get(values, `date_range`);

    return (
      <Field
        name={field.name}
        key={key}
        component={RangeDatepicker}
        fromValue={get(date_range, `values.startDate`)}
        toValue={get(date_range, `values.endDate`)}
      />
    );
  }

  return (
    <div className="filter-form-input" key={key}>
      <Field {...field} component={FormInput} />
    </div>
  );
};

const Filters = ({
  handleSubmit,
  initialize,
  submit,
  rightFields,
  leftFields,
  formName,
  dateFields,
  gridType,
  numFields,
}) => {
  const values = useSelector(getFormValues(formName));

  const searchParams = useSearchParams();

  useMount(() => {
    const params = { ...searchParams };
    each(dateFields, ({ from, to, name }) => {
      if (from && to && name) {
        const searchFrom = get(params, from);
        const searchTo = get(params, to);
        if (searchFrom && searchTo) {
          delete params[from];
          delete params[to];
          assign(params, { [name]: { values: { startDate: new Date(searchFrom), endDate: new Date(searchTo) } } });
        }
      }
    });
    each(numFields, (field) => {
      if (params[field]) {
        assign(params, { [field]: toNumber(params[field]) });
      }
    });
    initialize(params);
  });

  const onReset = async () => {
    initialize({});
    await sleep(100);
    submit();
  };

  return (
    <div className="table-filter-header table-control-panel">
      <form
        className={classNames(`table-filter-form`, {
          'table-filter-form--flex': gridType === FiltersGridType.FLEX,
          'table-filter-form--grid': gridType === FiltersGridType.GRID,
        })}
        onSubmit={handleSubmit}
      >
        {leftFields &&
          <div className="table-filter-left">
            {map(leftFields, getFieldMapping({ values }))}
          </div>
        }
        <div className="table-filter-right">
          {map(rightFields, getFieldMapping({ values }))}
          <button className={classNames(`btn`, `btn-secondary`, { 'ml-20': size(rightFields) > 0 })}>Поиск</button>
          <button className="btn btn-secondary ml-10" onClick={onReset} type="button">Сброс</button>
        </div>
      </form>
    </div>
  );
};

Filters.propTypes = {
  formName: PropTypes.string.isRequired,
  rightFields: PropTypes.arrayOf(PropTypes.shape()),
  leftFields: PropTypes.arrayOf(PropTypes.shape()),
  dateFields: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    name: PropTypes.string,
  })),
  numFields: PropTypes.arrayOf(PropTypes.string),
  gridType: PropTypes.number,
};

Filters.defaultProps = {
  rightFields: [],
  leftFields: [],
  dateFields: [],
  numFields: [],
  gridType: FiltersGridType.FLEX,
};

export default Filters;
