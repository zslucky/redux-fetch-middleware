import merge from 'lodash.merge'
import uuid from 'uuid'
import defaultConfig from './config/defaultConfig'

/**
 * Default response type for module
 */
const defaultRType = 'json'

/**
 * Check response type
 *
 * @param {string} type The type to check.
 *
 * @return {boolean} Is valid response type
 */
function checkResponseType (type) {
  const validType = String(type).toLowerCase()
  const types = {
    json: true,
    text: true,
    formData: true,
    blob: true,
    arrayBuffer: true
  }
  return types[validType] ? validType : defaultRType
}

/**
 * Rest Middleware Creator
 *
 * @param {object} customConfig The custom config.
 *
 * @return {function} The middleware function
 */
function restMiddlewareCreator (customConfig) {
  const finalConfig = merge(defaultConfig, customConfig)
  const { suffix, fetchOptions, responseType: configRType, debug } = finalConfig

  /**
   * The fetch middleware
   */
  return ({ dispatch }) => next => (action) => {
    if (!action || !action.$payload) {
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = suffix
    const { type, $payload, meta } = action
    const { url, options, onResponse, preFetchOptions } = $payload
    let opts = merge({}, fetchOptions, options)
    // Edit fetch options in preFetchOptions method
    if (preFetchOptions instanceof Function) {
      opts = preFetchOptions(opts)
    }
    // Check and get response type
    const finalRType = checkResponseType($payload.responseType || configRType)
    // Generate UID request if meta.$uid is empty
    const uid = meta && meta.$uid ? meta.$uid : uuid.v4()
    const preMeta = merge(
      {},
      { $uid: uid },
      (debug ? { $requestOptions: opts } : {}),
      meta
    )
    let resultMeta = null
    // Request start
    dispatch({ type: `${type}_${REQUEST}`, meta: preMeta })

    // Catch the response from service
    return fetch(url, opts)
      .then((response) => {
        resultMeta = merge({}, { $response: response }, preMeta)
        if (
          onResponse &&
          (onResponse instanceof Function) &&
          onResponse(response, preMeta, type) === false
        ) {
          return null
        }
        return response[finalRType]()
      })
      .then((data) => {
        // Request success, dispatch the response data
        dispatch({ type: `${type}_${SUCCESS}`, data, meta: resultMeta })

        return data
      })
      .catch((err) => {
        // Request failure, dispatch the error
        dispatch({ type: `${type}_${FAILURE}`, err, meta: resultMeta });
        throw err;
      })
  }
}

/**
 * The default export.
 */
export default restMiddlewareCreator
