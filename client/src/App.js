import './App.css';
import Search from "./components/memoSearch"
import List from "./components/memoList"
import SignIn from "./components/login"
import {BrowserRouter as Router,Route} from "react-router-dom";
function App() {
  return (
    <div className="App" >
      <Router>         
    <div className="App" >
    <Route exact={true} path="/" component={SignIn} />
        <Route exact={true} path="/list" component={List} /> 
        <Route exact={true} path="/search" component={Search} />

    </div>
    </Router>
    </div>
  );
}

export default App;
