import Routes from "../components/Routes";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import flushChunks from "webpack-flush-chunks";
import { Provider } from "react-redux";
import Favicon from "react-favicon";
import serialize from "serialize-javascript";
import img from "../images/budget.jpg";
import createStore from "./store";

// import uuid from "uuid";
console.log(createStore());
import { flushChunkNames } from "react-universal-component/server";

export default ({ clientStats }) => (req, res) => {
  const store = createStore();

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
        <script>window.INITIAL_STATE=${serialize(store.getState())}</script>

      </body>
    </html>
    `);
};
