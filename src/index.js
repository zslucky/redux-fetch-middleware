import fetch from 'isomorphic-fetch';
import merge from 'lodash.merge';
import defaultConfig from './config/defaultConfig';

// Function return random UID
function generateUid() {
  function v4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return v4() + v4() + v4() + v4() + v4() + v4() + v4() + v4();
}

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
    // Generate UID request
    const uid = generateUid();
    // Request start
    dispatch({ type: `${type}_${REQUEST}`, $props, $uid: uid });

    // Catch the response from service
    return fetch(url, opts)
      .then(response => response.json())
      .then((data) => {
        // Request success, dispatch the response data
        dispatch({ type: `${type}_${SUCCESS}`, data, $props, $uid: uid });
      })
      .catch((err) => {
        // Request failure, dispatch the error
        dispatch({ type: `${type}_${FAILURE}`, err, $props, $uid: uid });
      });
  };
}

export default restMiddlewareCreator;
