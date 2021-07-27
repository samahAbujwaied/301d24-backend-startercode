import React, { Component } from 'react'
import Header from './componants/Header'
import Home from './componants/Home'
import FavCom from './componants/FavCom'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
export class App extends Component {
  render() {
    return (
      <>
       <Router>
       <Header/>
        <Switch>  
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/favorite">
            <FavCom />
          </Route>
          
        </Switch>
      
    </Router>
      </>
    )
  }
}

export default App
