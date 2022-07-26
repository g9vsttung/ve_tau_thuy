
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from './routes'

class App extends Component {
  showComponent = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} element={route.main} />
        );
      })
    }
    return result;
  }
  componentDidMount=()=>{
    const queryParams = new URLSearchParams(window.location.search);
    localStorage.setItem("KIOSK_ID", queryParams.get("kioskId"));
    localStorage.setItem("SERVICE_APPLICATION_ID", queryParams.get("serviceApplicationId"));
    console.log(localStorage);
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            {this.showComponent(routes)}
          </Routes>
        </div>
      </Router>

    );
  }
}

export default App;
