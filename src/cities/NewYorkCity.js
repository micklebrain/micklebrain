import React from "react";
import nycboroughs from '../images/boroughs.png'
import pie from '../images/pie.jpg';
import nycneighborhoods from '../images/neighborhoods.jpeg';
import nycsubway from '../images/nyc-subway.jpeg';
import {
    Link,
} from "react-router-dom";

class NewYorkCity extends React.Component {

    render() {
        return (<div>
            <h1> New York City travel guide </h1>
            <h2> Upcoming Events </h2>
            <ul> 
                <li> Radio City Christmas Spectacular Dec 19, All Day Event  1260 6th Avenue, New York </li>
                <li> Lady of Haven Fatima Jan 2, 3pm to 6pm  4867 58 STREET Queens, Parade </li>
                <li> New York Botanical Garden Holiday Train Show Jan 22, All Day Event  2900 Southern Boulevard, Bronx </li>
            </ul>
            <h2> Top attractions </h2>
            <ul>
                <li> <a href="https://www.hudsonyardsnewyork.com/discover/vessel"> Vessel </a> </li>
                <li> <a href="https://www.esbnyc.com/"> Empire State Building lookout </a> </li>                
            </ul>
            <Link to="/NYCarticle4" class="articlePreview"> <img class="article" src={nycboroughs} alt="Italian Trulli" /> Best resturant in all five NYC boroughs </Link>
            <Link to="/NYCarticle2" class="articlePreview"> <img class="article" src={nycneighborhoods} alt="Best resturant in every NYC neighborhood " /> Best resturant in every NYC neighborhood </Link>
            <Link to="/NYCarticle" class="articlePreview"> <img class="article" src={nycsubway} alt="Best resturant by every subway stop" /> Best resturant by every subway stop </Link>
            {/* <Link to="/NYCarticle3" class="articlePreview"> <img class="article" src={pie} alt="Find a place to eat through survey" /> Stuck on where to eat? </Link> */}
        </div>)
    }
}

export default NewYorkCity