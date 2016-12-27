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
    const { type, $payload, $props } = action;
    const { url, options } = $payload;
    const opts = merge({}, fetchOptions, options);

    // Request start
    dispatch({ type: `${type}_${REQUEST}`, $props });

    // Catch the response from service
    return fetch(url, opts)
      .then(response => response.json())
      .then((data) => {
        // Request success, dispatch the response data
        dispatch({ type: `${type}_${SUCCESS}`, data, $props });
      })
      .catch((err) => {
        // Request failure, dispatch the error
        dispatch({ type: `${type}_${FAILURE}`, err, $props });
      });
  };
}

export default restMiddlewareCreator;
