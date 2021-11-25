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
            </ul>

            <ul>
                <li>
                    <img class="article" src={nycboroughs} alt="Italian Trulli" />
                    <Link to="/NYCarticle4"> Best resturant in every NYC borough </Link>
                </li>
                <li>
                    <img class="article" src={nycneighborhoods} alt="Best resturant in every NYC neighborhood " />
                    <Link to="/NYCarticle2"> Best resturant in every NYC neighborhood </Link>
                </li>                
                <li>
                    <img class="article" src={nycsubway} alt="Best resturant by every subway stop" />
                    <Link to="/NYCarticle"> Best resturant by every subway stop </Link>
                </li>                
                <li>
                    <img class="article" src={pie} alt="Italian Trulli" />
                    <Link to="/NYCarticle3"> Stuck on where to eat? </Link>
                </li>                
            </ul>
        
            {/* <h2>  Top attractions </h2>
            <ul>
                <li> https://www.hudsonyardsnewyork.com/discover/vessel </li>                
                <li> https://www.esbnyc.com/ </li>
            </ul> */}

        </div>)
    }
}

export default NewYorkCity