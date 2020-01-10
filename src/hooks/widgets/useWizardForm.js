import { useState } from 'react';
import { useUnmount } from 'react-use';
import { useDispatch } from 'react-redux';
import { destroy } from 'redux-form';

/**
 * @param {string} form
 * @return {{page: number, setPage: function(page: number): void}}
 */
const useWizardForm = ({ form }) => {
  const dispatch = useDispatch();

  useUnmount(() => {
    dispatch(destroy(form));
  });

  const [page, setPage] = useState(1);

  return { page, setPage };
};

export default useWizardForm;
