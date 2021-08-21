# redux-async
async middleware for redux

## Installation

```bash
npm install @takeaways/redux-async
```

## Composition

Any return value from the inner function will be available as the return value
of `dispatch` itself. This is convenient for orchestrating an asynchronous
control flow with async action creators dispatching each other and returning
Promises to wait for each other’s completion:

```js
import { createStore, applyMiddleware } from 'redux';
import asyncMiddleware from '@takeaways/redux-async';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(asyncMiddleware));

function fetchApi() {
  return fetch('https://domain.com');
}

const exampleAsync = async (dispatch, getState) => {
  fetchApi().then(result => {
    dispatch({
      type:'success',
      payload:result
    })
  })
}
store.dispatch(exampleAsync)
```
