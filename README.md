# redux-fetch-middleware
A middleware for redux that help to fetch data from rest API and simplify the request flow

## Installation


## Usage

```
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
### For global settings

```
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

        // For detail please relay to [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch)

    }
}

```
### Action usage

```
{
    // Type name
    type: YOUR_ACTION_TYPE_NAME,

    // @Param: $payload is the detail ajax request description
    $payload: {
        // Request url
        url: '/data/appData.json'

        //... TBD
    }
}
```

## TO DO List
1. Improve custom config for middleware.