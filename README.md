# redux-fetch-middleware
A middleware for redux that help to fetch data from rest API and simplify the request flow.
Many times we only need to do some simple request, but we need to track the request status, 
This middleware will auto dispatch 3 status.

## Installation

```sh
npm i redux-fetch-middleware --save
```

## Usage

```javascript
import restMiddlewareCreator from 'redux-fetch-middleware';
import { applyMiddleware } from 'redux';

const globalRestOptions = {
    suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],
    fetchOptions: {}
};

const restMiddleware = restMiddlewareCreator(globalRestOptions);

const middleware = [restMiddleware];
applyMiddleware(...middleware);

//...
```

## Configuration
Fetch options and browser support please refer to [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch)

### For global settings

```javascript
{
    // Suffix will auto append to every action type, then we can dispatch 
    // different situation.
    // @Fisrt parameter - 'Request' means when request start.
    // @Second parameter - 'SUCCESS' means when we get response successfully.
    // @Third parameter - 'FAILURE' means when something error.
    // name can be defined by self.
    suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],

    // The global fetch settings for our middleware
    fetchOptions: {

        // For detail please relay to whatwg-fetch

    }

    // TBD ...
}

```
### Action usage

```javascript
{
    // Type name
    type: YOUR_ACTION_TYPE_NAME,

    // @Param: $payload is the detail ajax request description
    $payload: {
        // Request url
        url: '/api/somewhere',

        // The specific options for current request.
        options: {

            // Same as whatwg-fetch

        }

        //... TBD
    }
}
```

### Reducer usage
```javascript
function appReducer(state = initialState, action) {
    switch (action.type) {
        case `${YOUR_ACTION_TYPE_NAME}_REQUEST`:
            // Do something when request start ...
        case `${YOUR_ACTION_TYPE_NAME}_SUCCESS`:
            // Do something ...
        case `${YOUR_ACTION_TYPE_NAME}_FAILURE`:
            // Do something other ...
        default:
            return state;
    }
}
```

## TO DO List
1. Improve custom config for middleware.