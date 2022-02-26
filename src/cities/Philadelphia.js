import React from "react";
import {
    Link,
} from "react-router-dom";

import philadelphia from '../images/philadelphiaskyline.jpg';

class Philadelphia extends React.Component {

    render() {
        return (<div class='articleContainer'>
            <h1> Philadelphia guide </h1> 
            <div class="column-main">
                <Link to="/PhiladelphiaArticle" class="articlePreview"> <img class="articleImage" src={philadelphia} alt="Upcoming events" /> </Link> <div> <div class="articleTitle"> Top things in Philadelphia for Lunar New Years celebration </div> <div> Jan 27, 2022 </div> </div>
            </div>
            <div class="column-main">
                <Link to="/PhiladelphiaNeighborhoodRestaurantsArticle" class="articlePreview"> <img class="articleImage" src={philadelphia} alt="Upcoming events" /> </Link> <div> <div class="articleTitle"> Top restaraunt in every Philadelphia neighborhood </div> <div> Jan 27, 2022 </div> </div>
            </div>
        </div>)
    }
}
export default Philadelphia