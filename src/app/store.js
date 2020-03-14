import { configureStore, combineReducers } from "@reduxjs/toolkit";

const initialReducer = { initial: (state = {}) => state };

const store = configureStore({
  reducer: createReducer()
});

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...initialReducer,
    ...asyncReducers
  });
}

export default store;
