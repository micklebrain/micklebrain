import './App.css';
import React from 'react';
import Donate from './Donate';
import Home from './Home';
import Hotels from './Hotels';
import Speakeasy from './Speakeasy'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Atlanta from './cities/Atlanta';
import Chicago from './cities/Chicago';
import Denver from './cities/Denver';
import NewYorkCity from './cities/NewYorkCity';
import SanFrancisco from './cities/SanFrancisco';
import LasVegas from './cities/LasVegas';

import TicketMarketplace from './TicketMarketplace';

import AtlantaArticle from './articles/AtlantaArticles/AtlantaArticle';
import ChicagoArticle from './articles/ChicagoArticles/ChicagoArticle';
import ChicagoArticle2 from './articles/ChicagoArticles/ChicagoArticle2';
import DenverArticle from './articles/DenverArticles/DenverArticle';
import LasVegasArticle from './articles/LasVegasArticles/LasVegasArticle';
import NewYorkCityArticle from './articles/NYCArticles/NewYorkCityArticle';
import NewYorkCityArticle2 from './articles/NYCArticles/NewYorkCityArticle2';
import NewYorkCityArticle3 from './articles/NYCArticles/NewYorkCityArticle3';
import NewYorkCityArticle4 from './articles/NYCArticles/NewYorkCityArticle4';
import NewYorkCityArticle5 from './articles/NYCArticles/NewYorkCityArticle5';
import NewYorkCityArticle6 from './articles/NYCArticles/NewYorkCityArticle6';
import NewYorkCityArticle7 from './articles/NYCArticles/NewYorkCityArticle7';
import NYCUpcomingEventsArticle from './articles/NYCArticles/NYCUpcomingEventsArticle';
import SanFranciscoArticle from './articles/SanFranciscoArticles/SanFranciscoArticle';

import Article from './Article'

import Navbarmenu from './Navbarmenu';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbarmenu />
          <Switch>
            <Route exact path="/"> <Home /> </Route>

            <Route exact path="/atlanta" component={Atlanta} />
            <Route exact path="/chicago" component={Chicago} />
            <Route exact path="/denver" component={Denver} />
            <Route exact path="/newyorkcity" component={NewYorkCity} />
            <Route exact path="/sanfrancisco" component={SanFrancisco} />
            <Route exact path="/lasvegas" component={LasVegas} />

            <Route exact path="/article" component={Article} />
            <Route exact path="/hotels" component={Hotels} />
            <Route exact path="/speakeasies" component={Speakeasy} />
            <Route exact path="/ticketMarketplace" component={TicketMarketplace} />
            <Route exact path="/donate" component={Donate} />

            <Route exact path="/AtlantaArticle" component={AtlantaArticle} />
            <Route exact path="/ChicagoArticle" component={ChicagoArticle} />
            <Route exact path="/ChicagoArticle2" component={ChicagoArticle2} />
            <Route exact path="/DenverArticle" component={DenverArticle} />
            <Route exact path="/LasVegasArticle" component={LasVegasArticle} />
            <Route exact path="/NYCarticle" component={NewYorkCityArticle} />
            <Route exact path="/NYCarticle2" component={NewYorkCityArticle2} />
            <Route exact path="/NYCarticle3" component={NewYorkCityArticle3} />
            <Route exact path="/NYCarticle4" component={NewYorkCityArticle4} />
            <Route exact path="/NYCarticle5" component={NewYorkCityArticle5} />
            <Route exact path="/NYCarticle6" component={NewYorkCityArticle6} />
            <Route exact path="/NYCarticle7" component={NewYorkCityArticle7} />
            <Route exact path="/NYCarticle8" component={NYCUpcomingEventsArticle} />
            <Route exact path="/SanFranciscoArticle" component={SanFranciscoArticle} />
          </Switch>
        </Router>
      </div>)
  }
}

export default App;
