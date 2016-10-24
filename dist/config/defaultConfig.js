'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 *
 *  Default global config
 *
 */
var defaultConifg = {
  suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],
  fetchOptions: {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
};

exports.default = defaultConifg;