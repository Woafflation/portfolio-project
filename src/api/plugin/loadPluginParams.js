import apiFetch from 'api/apiFetch';

const URL = `payment-plugin/get-private-params`;

const loadPluginParams = () => apiFetch(URL);

export default loadPluginParams;
