import React from "react";
import ReactDom from "react-dom";

import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {queryReducer} from "./app/reducers/reducer.js";
import thunkMiddleware from "redux-thunk";


import {QueryContainer} from "./app/components/Query.js"
import {QueryInputContainer} from "./app/components/QueryInput.js"

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

const Main = React.createClass({
  render: () => {
    return (
      <div className="IdeasContainer">
        <QueryContainer />
        <QueryInputContainer />
      </div>
    )
  }
});

ReactDom.render(
  <Provider store={createStoreWithMiddleware(queryReducer)}>
    <Main />
  </Provider>,
  document.getElementById('example')
);
