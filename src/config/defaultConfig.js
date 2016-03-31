'use strict';

/*
 *
 *  Default global config
 *
 */
const defaultConifg = {
    suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],
    fetchOptions: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    },
    cache: {
        enable: false
    }
};

export default defaultConifg;
