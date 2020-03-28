import Routes from "../components/Routes";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import flushChunks from "webpack-flush-chunks";
import { Provider } from "react-redux";
import createStore from "./store";
import { addExpense } from "../actions/expenses";
import img from "../images/budget.jpg";
import Favicon from "react-favicon";
// import uuid from "uuid";

import { flushChunkNames } from "react-universal-component/server";

export default ({ clientStats }) => (req, res) => {
  const store = createStore();
  store.dispatch(
    addExpense({
      id: 234,
      description: "efe",
      note: "dds",
      amount: "32",
      createdAt: "2333"
    })
  );
  store.subscribe(() => console.log(store.getState()));
  const app = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>
          <Favicon url={img} />
          <Routes />
        </div>
      </StaticRouter>
    </Provider>
  );

  //we need stats from webpack
  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames()
  });

  //now when app is being rendered, we know which routes we are using.
  res.send(`<html lang="en">
      <head>
        <meta charset="UTF-8" />
        ${styles}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div id="react-root">${app}</div>
        ${js}
        ${cssHash}
      </body>
    </html>
    `);
};
