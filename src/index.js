import fetch from 'isomorphic-fetch';
import merge from 'lodash.merge';
import uuid from 'uuid';
import defaultConfig from './config/defaultConfig';

// Default response type for module
const defaultRType = 'json';

function checkResponseType(type) {
  const validType = String(type).toLowerCase();
  const types = {
    json: true,
    text: true,
    formData: true,
    blob: true,
    arrayBuffer: true,
  };
  return types[validType] ? validType : defaultRType;
}

function restMiddlewareCreator(customConfig) {
  const finalConfig = merge(defaultConfig, customConfig);
  const { suffix, fetchOptions, responseType: configRType, debug } = finalConfig;

  return ({ dispatch }) => next => (action) => {
    if (!action || !action.$payload) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = suffix;
    const { type, $payload, meta } = action;
    const { url, options, onResponse } = $payload;
    const opts = merge({}, fetchOptions, options);
    // Check and get response type
    const finalRType = checkResponseType($payload.responseType || configRType);
    // Generate UID request if meta.$uid is empty
    const uid = meta && meta.$uid ? meta.$uid : uuid.v4();
    const preMeta = merge(
      {},
      { $uid: uid },
      (debug ? { $requestOptions: opts } : {}),
      meta
    );
    let resultMeta = null;
    // Request start
    dispatch({ type: `${type}_${REQUEST}`, meta: preMeta });

    // Catch the response from service
    return fetch(url, opts)
      .then((response) => {
        resultMeta = merge({}, { $response: response }, preMeta);
        if (
          onResponse
          && (onResponse instanceof Function)
          && onResponse(response, preMeta, type) === false
        ) {
          return null;
        }
        return response[finalRType]();
      })
      .then((data) => {
        // Request success, dispatch the response data
        dispatch({ type: `${type}_${SUCCESS}`, data, meta: resultMeta });
      })
      .catch((err) => {
        // Request failure, dispatch the error
        dispatch({ type: `${type}_${FAILURE}`, err, meta: resultMeta });
      });
  };
}

export default restMiddlewareCreator;
