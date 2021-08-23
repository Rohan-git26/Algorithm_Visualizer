import './App.css';
import Navbar from "./Components/Navbar";
import {SortingAlgorithmScreen} from "./Screens/SortingAlgorithmScreen"
import {PathFindingScreen} from "./Screens/PathFindingScreen"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={SortingAlgorithmScreen} />
      <Route path="/about" component={PathFindingScreen} />
      {/* <Route path="/contact" component={Contact} /> */} 
    </Switch>
  </Router>
  );
}

export default App;
