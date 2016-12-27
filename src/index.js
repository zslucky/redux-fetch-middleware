import fetch from 'isomorphic-fetch';
import { merge } from 'lodash';
import defaultConfig from './config/defaultConfig';

function restMiddlewareCreator(customConfig) {
  const finalConfig = merge(defaultConfig, customConfig);
  const { suffix, fetchOptions } = finalConfig;

  return ({ dispatch }) => next => (action) => {
    if (!action || !action.$payload) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = suffix;
    const { type, $payload } = action;
    const { url, options } = $payload;
    const opts = merge({}, fetchOptions, options);

    // Request start
    dispatch( Object.assign({}, action, { type: `${type}_${REQUEST}` }) );

    // Catch the response from service
    return fetch(url, opts)
      .then(response => response.json())
      .then((data) => {
        // Request success, dispatch the response data
        dispatch( Object.assign({}, action, { type: `${type}_${SUCCESS}`, data }) );
      })
      .catch((err) => {
        // Request failure, dispatch the error
        dispatch( Object.assign({}, action, { type: `${type}_${FAILURE}`, err }) );
      });
  };
}

export default restMiddlewareCreator;
