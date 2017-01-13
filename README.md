# redux-fetch-middleware

[![Join the chat at https://gitter.im/zslucky/redux-fetch-middleware](https://badges.gitter.im/zslucky/redux-fetch-middleware.svg)](https://gitter.im/zslucky/redux-fetch-middleware?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/zslucky/redux-fetch-middleware.svg?branch=master)](https://travis-ci.org/zslucky/redux-fetch-middleware)

A middleware for redux that help to fetch data from rest API and simplify the request flow.
Many times we only need to do some simple request, but we need to track the request status,
This middleware will automaticly dispatch 3 status.

Changes plesae refer to [CHANGELOG.md](./CHANGELOG.md)

## Installation

```sh
npm i redux-fetch-middleware --save
```
Or use `yarn`:
```sh
yarn add redux-fetch-middleware
```

## Usage

```javascript
import restMiddlewareCreator from 'redux-fetch-middleware';
import { applyMiddleware } from 'redux';

const globalRestOptions = {
    suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],

    // Example config
    fetchOptions: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
};

const restMiddleware = restMiddlewareCreator(globalRestOptions);

const middleware = [restMiddleware];
applyMiddleware(...middleware);

//...
```

## Configuration
Fetch options and browser support please refer to [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch)

### For global settings

#### Every options have default value, please kindly reduce configuration. :shipit:

```javascript
{
    // Suffix will auto append to every action type, then we can dispatch
    // different situation.
    // @Fisrt parameter - 'Request' means when request start.
    // @Second parameter - 'SUCCESS' means when we get response successfully.
    // @Third parameter - 'FAILURE' means when something error.
    // name can be defined by self.
    // Default value is bellow.
    suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],

    // The global fetch settings for our middleware
    fetchOptions: {

        // For detail please relay to whatwg-fetch
        // This is the default header settings.
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    },

    /* TBD ...
     *
     * Here is globle config for each action.
     * Other amazing functions
     *
     */ TBD ...
}

```
### Action usage

```javascript
{
    // Type name
    type: YOUR_ACTION_TYPE_NAME,
    // Your props transition to reducers
    $props: {
        a: 10,
        b: 20
    },
    // @Param: $payload is the detail ajax request description
    $payload: {
        // Request url
        url: '/api/somewhere',

        // The specific options for current request.
        options: {

            // Same as whatwg-fetch

        }

        /* TBD ...
         *
         * Here is config for single action.
         * Other amazing functions
         *
         */ TBD ...
        }
}
```

### Reducer usage
```javascript
function yourReducer(state = initialState, action) {
    switch (action.type) {
        case `${YOUR_ACTION_TYPE_NAME}_REQUEST`:
            // Do something when request start ...
            // @response $props is action.$props

        case `${YOUR_ACTION_TYPE_NAME}_SUCCESS`:
            // Do something ...
            // @response data is action.data
            // @response $props is action.$props

        case `${YOUR_ACTION_TYPE_NAME}_FAILURE`:
            // Do something other ...
            // @response data is action.err
            // @response $props is action.$props

        default:
            return state;
    }
}
```

## TO DO List
1. [ ] Improve custom config for middleware.
2. [ ] Add Exception and response status trace.
3. [ ] Add unit test.
