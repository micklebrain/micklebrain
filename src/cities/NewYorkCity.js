import React from "react";

import broadway from '../images/broadway.jpeg';
import omakase from '../images/omakase.jpg';
import pluspool from '../images/pluspool.jpeg';
import nyc from '../images/nyc.jpg'
import nycboroughs from '../images/boroughs.png'
import nycneighborhoods from '../images/neighborhoods.jpeg';
import nycsubway from '../images/nyc-subway.jpeg';
import nycattractions from '../images/nycattractions.jpeg';

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

    getRestaurants() {

    }

    render() {
        return (<div class="articleContainer">
            <h1> New York City guide </h1>
            <div class="column-main">
                {/* <Link to="/NYCarticle3" class="articlePreview"> <img class="article" src={pie} alt="Find a place to eat through survey" /> Stuck on where to eat? </Link> */}
                <Link to="/NYCarticle4" class="articlePreview"> <img class="articleImage" src={nycboroughs} alt="Italian Trulli" /> </Link> <div> <div class="articleTitle"> Best Restaurant in All Five NYC Boroughs </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCarticle5" class="articlePreview"> <img class="articleImage" src={broadway} alt="Every broadway show" /> </Link> <div> <div class="articleTitle"> Every broadway show currently showing </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCarticle6" class="articlePreview"> <img class="articleImage" src={pluspool} alt="New pool coming to Manhattan river" /> </Link> <div> <div class="articleTitle"> New pool coming to Manhattan river </div> <div> Jan 27, 2022 </div> </div>                
                <Link to="/NYCUpcomingEventsArticle" class="articlePreview"> <img class="articleImage" src={nyc} alt="Upcoming events" /> </Link> <div> <div class="articleTitle"> Upcoming events </div> <div> Jan 27, 2022 </div> </div>
            </div>
            <div class="column-main">
                <Link to="/NYCManhattanRestaurants" class="articlePreview"> <img class="article" src={nycneighborhoods} alt="Best restaurant in every NYC neighborhood " /> <div> <div class="articleTitle"> Best Restaurant in Every NYC Neighborhood </div> <div> Jan 27, 2022 </div> </div> </Link>
                <Link to="/NYCarticle" class="articlePreview"> <img class="article" src={nycsubway} alt="Best restaurant by every subway stop" /> <div> <div class="articleTitle"> Best Restaurant by Every Subway Stop </div> <div> Jan 27, 2022 </div> </div> </Link>
                <Link to="/NYCarticle7" class="articlePreview"> <img class="article" src={nycattractions} alt="Top attractions" /> <div> <div class="articleTitle"> Top attractions </div> <div> Jan 27, 2022 </div> </div> </Link>
                <Link to="/NYCOmakaseArticle" class="articlePreview"> <img class="article" src={omakase} alt="Top attractions" /> <div> <div class="articleTitle"> NYC Omakase </div> <div> Jan 27, 2022 </div> </div> </Link>
                <Link to="/NYCLunarNewYearsArticle" class="articlePreview"> <img class="articleImage" src={nyc} alt="NYC Lunar New Years" /> </Link> <div> <div class="articleTitle"> NYC Lunar New Years </div> <div> Jan 27, 2022 </div> </div>
            </div>
        </div>)
    }
}

export default NewYorkCity