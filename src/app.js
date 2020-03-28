import React from "react";
import ReactDOM from "react-dom";
import Routes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import createStore from "./store/configureStore";
import Favicon from "react-favicon";
import faviconImage from "./images/budget.jpg";
import "normalize.css/normalize.css";

const store = createStore();
function render(Component) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Favicon url={faviconImage} />
          <Component />
        </div>
      </BrowserRouter>
    </Provider>,
    document.getElementById("react-root")
  );
}

render(Routes);
