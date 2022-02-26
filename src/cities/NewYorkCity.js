import React from "react";

import broadway from '../images/broadway.jpeg';
import brunch from '../images/brunch.jpeg'
import koreanBBQ from '../images/KoreanBBQ.jpeg'
import lunarNewYears from '../images/lunarNewYears.jpeg'
import omakase from '../images/omakase.jpg';
import pluspool from '../images/pluspool.jpeg';
import nyc from '../images/nyc.jpg'
import nycattractions from '../images/nycattractions.jpeg';
import nycboroughs from '../images/boroughs.png'
import nycneighborhoods from '../images/neighborhoods.jpeg';
import nycsubway from '../images/nyc-subway.jpeg';

import { Link } from "react-router-dom";

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
                <Link to="/NYCUpcomingEventsArticle" class="articlePreview"> <img class="articleImage" src={nyc} alt="Upcoming events" /> </Link> <div> <div class="articleTitle"> Upcoming events </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCTopBoroughRestaurantsArticle" class="articlePreview"> <img class="articleImage" src={nycboroughs} alt="Italian Trulli" /> </Link> <div> <div class="articleTitle"> Best Restaurant in All Five NYC Boroughs </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCBroadwaysArticle" class="articlePreview"> <img class="articleImage" src={broadway} alt="Every broadway show" /> </Link> <div> <div class="articleTitle"> Every broadway show currently showing </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCPlusPoolArticle" class="articlePreview"> <img class="articleImage" src={pluspool} alt="New pool coming to Manhattan river" /> </Link> <div> <div class="articleTitle"> New pool coming to Manhattan river </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCBrunch" class="articlePreview"> <img class="articleImage" src={brunch} alt="NYC best brunch spots" /> </Link> <div> <div class="articleTitle"> NYC brunch </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCAYCEBBQArticle" class="articlePreview"> <img class="articleImage" src={koreanBBQ} alt="NYC All you can eat BBQ guide" /> </Link> <div> <div class="articleTitle"> NYC All you can eat BBQ guide </div> <div> Jan 27, 2022 </div> </div>
            </div>
            <div class="column-main">
                <Link to="/NYCTopNeighborhoodRestaurantsArticle" class="articlePreview"> <img class="articleImage" src={nycneighborhoods} alt="Best restaurant in every NYC neighborhood " /> </Link> <div> <div class="articleTitle"> Best Restaurant in Every NYC Neighborhood </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCTrainStopRestaurantsArticle" class="articlePreview"> <img class="articleImage" src={nycsubway} alt="Best restaurant by every subway stop" /> </Link> <div> <div class="articleTitle"> Best Restaurant by Every Subway Stop </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCTopAttractionsArticle" class="articlePreview"> <img class="articleImage" src={nycattractions} alt="Top attractions" /> </Link> <div> <div class="articleTitle"> Top attractions </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCOmakaseArticle" class="articlePreview"> <img class="articleImage" src={omakase} alt="NYC Omakase" /> </Link> <div> <div class="articleTitle"> NYC Omakase </div> <div> Jan 27, 2022 </div> </div>
                <Link to="/NYCLunarNewYearsArticle" class="articlePreview"> <img class="articleImage" src={lunarNewYears} alt="NYC Lunar New Years" /> </Link> <div> <div class="articleTitle"> NYC Lunar New Years </div> <div> Jan 27, 2022 </div> </div>
            </div>
        </div>)
    }
}

export default NewYorkCity