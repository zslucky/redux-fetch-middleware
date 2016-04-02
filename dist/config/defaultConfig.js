'use strict';

/*
 *
 *  Default global config
 *
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaultConifg = {
    suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],
    fetchOptions: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
};

exports.default = defaultConifg;