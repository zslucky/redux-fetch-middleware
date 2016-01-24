import defaultConfig from './config/defaultConfig';
import fetch from 'isomorphic-fetch';
import { merge } from 'lodash';

const defaultConfig = {
    suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],
    fetchOptions: {}
};

function restMiddlewareCreator(customConfig) {
    const finalConfig = merge(defaultConfig, customConfig);
    const { suffix, fetchOptions } = finalConfig;

    return ({ dispatch, getState }) => (next) => (action) => {
        if (!action.payload) {
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = suffix;
        const { type, payload } = action;
        const { url, options } = payload;
        merge(fetchOptions, options);

        // Request start
        dispatch({ type: `${type}_${REQUEST}` });

        // Catch the response from service
        fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Request success, dispatch the response data
            dispatch({ type: `${type}_${SUCCESS}`, data });
        })
        .catch((err) => {
            // Request failure, dispatch the error
            dispatch({ type: `${type}_${FAILURE}`, err });
        });
    };
}

export default restMiddlewareCreator;
