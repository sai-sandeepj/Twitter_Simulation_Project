import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./components/Main";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainRoutes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
