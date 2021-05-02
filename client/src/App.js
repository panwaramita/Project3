import React from "react";
import './App.css';
import Search from "./components/memoSearch"
import List from "./components/memoList"
import SignIn from "./components/login"
import {BrowserRouter as Router,Route} from "react-router-dom";
function App() {
  return (
      <Router>         
    <div className="App" >
    <Route exact path="/" component={SignIn} />
        <Route exact path="/list" component={List} /> 
        <Route exact path="/search" component={Search} />

    </div>
    </Router>
  );
}

export default App;
