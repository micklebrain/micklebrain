import React from "react";
import nycboroughs from '../images/boroughs.png'
import nycneighborhoods from '../images/neighborhoods.jpeg';
import nycsubway from '../images/nyc-subway.jpeg';
import {
    Link,
} from "react-router-dom";

class NewYorkCity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itinerary: [],
        }
    }

    addToItinerary() {        
        let itinerary = this.state.itinerary;
        itinerary.push("movies");
        this.setState({ itinerary: itinerary });        
    }

    getResturants() {

    }

    render() {
        return (<div class="articleContainer">            
            <h1> New York City guide </h1>
            <div class="column-main">
                <Link to="/NYCarticle4" class="articlePreview"> <img class="article" src={nycboroughs} alt="Italian Trulli" /> <div> <div> Best Resturant in All Five NYC Boroughs </div> <div> Jan 6, 2022 </div> </div> </Link>
                <Link to="/NYCarticle2" class="articlePreview"> <img class="article" src={nycneighborhoods} alt="Best resturant in every NYC neighborhood " /> <div> <div> Best Resturant in Every NYC Neighborhood </div> <div> Jan 6, 2022 </div> </div> </Link>
                <Link to="/NYCarticle6" class="articlePreview"> <img class="article" src={nycneighborhoods} alt="New pool coming to Manhattan river" /> <div> <div> New pool coming to Manhattan river </div> <div> Jan 6, 2022 </div> </div> </Link>
                {/* <Link to="/NYCarticle3" class="articlePreview"> <img class="article" src={pie} alt="Find a place to eat through survey" /> Stuck on where to eat? </Link> */}
            </div>
            <div class="column-main">
                <Link to="/NYCarticle5" class="articlePreview"> <img class="article" src={nycsubway} alt="Every broadway show" /> <div> <div> Every broadway show currently showing </div> <div> Jan 6, 2022 </div> </div> </Link>
                <Link to="/NYCarticle" class="articlePreview"> <img class="article" src={nycsubway} alt="Best resturant by every subway stop" /> <div> <div> Best Resturant by Every Subway Stop </div> <div> Jan 6, 2022 </div> </div> </Link>                
            </div>
        </div>)
    }
}

export default NewYorkCity