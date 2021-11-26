import './App.css';
import React from 'react';
import Home from './Home';
import Hotels from './Hotels';
import Speakeasy from './Speakeasy'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Denver from './cities/Denver';
import NewYorkCity from './cities/NewYorkCity';
import TopVegasResturants from './TopVegasResturants';
import TicketMarketplace from './TicketMarketplace';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NewYorkCityArticle from './NYCArticles/NewYorkCityArticle';
import NewYorkCityArticle2 from './NYCArticles/NewYorkCityArticle2';
import NewYorkCityArticle3 from './NYCArticles/NewYorkCityArticle3';
import NewYorkCityArticle4 from './NYCArticles/NewYorkCityArticle4';
import Article from './Article'
import { Dropdown, DropdownButton } from 'react-bootstrap';

import Navbarmenu from './Navbarmenu';

class App extends React.Component {
  
  // ListItemLink(props) {
  //   return <ListItem button component="a" {...props} />;
  // } 

  render() {   
    return (
    <div>
      <Router>
          <Navbarmenu/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/speakeasies" component={Speakeasy} />
            <Route exact path="/denver" component={Denver} />
            <Route exact path="/newyorkcity" component={NewYorkCity} />                        
            <Route exact path="/topvegasresturants" component={TopVegasResturants} />
            <Route exact path="/hotels" component={Hotels} />   
            <Route exact path="/ticketMarketplace" component={TicketMarketplace} />
            
            <Route exact path="/article" component={Article} />
            <Route exact path="/NYCarticle" component={NewYorkCityArticle} />
            <Route exact path="/NYCarticle2" component={NewYorkCityArticle2} />
            <Route exact path="/NYCarticle3" component={NewYorkCityArticle3} />
            <Route exact path="/NYCarticle4" component={NewYorkCityArticle4} />
          </Switch>          
      </Router>      
    </div>)
  }
}

export default App;
