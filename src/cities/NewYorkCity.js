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
            <h2> Food delivery promo codes </h2>
            <ul>
                <li> Uber eats promo code: eats-sxnvv </li>
                <li> Grubhub invite link: https://www.grubhub.com/referral/3c840580-6470-11e8-b9ea-43abd66f1334?utm_source=grubhub.com&utm_medium=content_owned&utm_campaign=growth_refer-a-friend_share-link&utm_content=promo_</li>
                <li> Seamless: https://www.seamless.com/referral/f170c1e0-4e7d-11ec-9f09-d3949d14d0dd?utm_source=seamless.com&utm_medium=content_owned&utm_campaign=growth_refer-a-friend_share-link&utm_content=promo_ </li>
            </ul>

            <Link to="/NYCarticle4" class="articlePreview"> <img class="article" src={nycboroughs} alt="Italian Trulli" /> Best resturant in every NYC borough </Link>
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