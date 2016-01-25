'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defaultConfig = require('./config/defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function restMiddlewareCreator(customConfig) {
    var finalConfig = (0, _lodash.merge)(_defaultConfig2.default, customConfig);
    var suffix = finalConfig.suffix;
    var fetchOptions = finalConfig.fetchOptions;

    return function (_ref) {
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;
        return function (next) {
            return function (action) {
                if (!action.$payload) {
                    return next(action);
                }

                var _suffix = _slicedToArray(suffix, 3);

                var REQUEST = _suffix[0];
                var SUCCESS = _suffix[1];
                var FAILURE = _suffix[2];
                var type = action.type;
                var $payload = action.$payload;
                var url = $payload.url;
                var options = $payload.options;

                (0, _lodash.merge)(fetchOptions, options);

                // Request start
                dispatch({ type: type + '_' + REQUEST });

                // Catch the response from service
                (0, _isomorphicFetch2.default)(url, fetchOptions).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    // Request success, dispatch the response data
                    dispatch({ type: type + '_' + SUCCESS, data: data });
                }).catch(function (err) {
                    // Request failure, dispatch the error
                    dispatch({ type: type + '_' + FAILURE, err: err });
                });
            };
        };
    };
}

exports.default = restMiddlewareCreator;