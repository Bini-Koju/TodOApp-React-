import React from "react";
import { Provider } from "react-redux";

import store from "./Store";
import Cart from "./Cart";
import CartFormik from "./CartFormik";

const App3 = () => (
  <Provider store={store}>
    <div className="App">
      <Cart />
      <CartFormik />
    </div>
  </Provider>
);

export default App3;
