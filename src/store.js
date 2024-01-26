import { legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import RootSaga from "./Saga";
import Reducers from "./Reducers";
import { applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(RootSaga);

export default store;
