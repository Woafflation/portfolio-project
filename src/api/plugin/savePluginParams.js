import apiFetch from 'api/apiFetch';

const URL = `payment-plugin/settings`;

const savePluginParams = (data) => apiFetch(URL, { data, method: `POST` });

export default savePluginParams;
