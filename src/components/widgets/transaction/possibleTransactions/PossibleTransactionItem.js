import React, { useState } from 'react';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';

import loadTransactionImage from 'api/transactions/possibleTransactions/loadTransactionImage';
import { widgetModalSelector } from 'selectors/widgets/widgets';
import { Size, WidgetType } from 'utils/enums';
import { possibleTransactionActionCreators } from 'actions/widgets/transactions/possibleTransactions';

import Preloader from 'components/preloader/Preloader';

const ViewRow = ({ label, children }) => (
  <div className="row mb-15">
    <span className="col-4 font-weight-bold">{label}</span>
    <span className="col-8">{children}</span>
  </div>
);

ViewRow.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const PossibleTransactionItem = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageError, setImageError] = useState(false);

  const modal = useSelector(widgetModalSelector(WidgetType.POSSIBLE_TRANSACTIONS));

  const dispatch = useDispatch();

  useMount(() => {
    if (modal && modal.id) {
      dispatch(possibleTransactionActionCreators.setItem(modal.id));

      loadTransactionImage(modal.id)
        .then((resp) => {
          const urlCreator = window.URL || window.webkitURL;
          setImageSrc(urlCreator.createObjectURL(resp.data));
        })
        .catch(() => setImageError(true));
    }
  });

  let image;
  if (imageError) {
    image = <span className="text-danger">Ошибка загрузки скрина</span>;
  } else if (isNull(imageSrc)) {
    image = <Preloader size={Size.MINI}/>;
  } else {
    image = <img src={imageSrc} alt="" className="w-100"/>;
  }

  return (
    <div>
      <ViewRow label="Скрин">{image}</ViewRow>
    </div>
  );
};

export default PossibleTransactionItem;
