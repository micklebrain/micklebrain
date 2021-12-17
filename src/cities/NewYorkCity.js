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
            <h1> Upcoming Events </h1>
            <ul> 
                <li>  </li>
            </ul>
            <Link to="/NYCarticle4" class="articlePreview"> <img class="article" src={nycboroughs} alt="Italian Trulli" /> Best resturant in all five NYC boroughs </Link>
            <Link to="/NYCarticle2" class="articlePreview"> <img class="article" src={nycneighborhoods} alt="Best resturant in every NYC neighborhood " /> Best resturant in every NYC neighborhood </Link>
            <Link to="/NYCarticle" class="articlePreview"> <img class="article" src={nycsubway} alt="Best resturant by every subway stop" /> Best resturant by every subway stop </Link>
            {/* <Link to="/NYCarticle3" class="articlePreview"> <img class="article" src={pie} alt="Italian Trulli" /> Stuck on where to eat? </Link> */}
            {/* <h2>  Top attractions </h2>
            <ul>
                <li> https://www.hudsonyardsnewyork.com/discover/vessel </li>                
                <li> https://www.esbnyc.com/ </li>
            </ul> */}
        </div>)
    }
}

export default NewYorkCity