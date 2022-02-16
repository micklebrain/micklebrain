import React from "react";
import {
    Link,
} from "react-router-dom";

class WashingtonDC extends React.Component {

    render() {
        return (<div>
            <h2> Washington DC travel guide </h2>
            <h2> Looking </h2>
            <ul> 
                <li> Smithsonian National Musuem of Natural History </li>
                <li> National Gallery of Art open 10-5pm </li>
                <li> Hirshhorn Museum | Smithsonian open 10-5:30pm </li>
                <li> Hirshhorn Sculpture garden | Smithsonian 10-4:30pm </li>
            </ul>
            <h2> Ice Rinks </h2>
            <ul>
                <li> The Wharf Ice Rink </li>
                <li> Canal Park Outdoor Ice Skating </li>
                <li> National Gallery of Art Sculpture Ice Rink </li>
                <li> Washington Harbour Ice Rink </li> 
            </ul>
            <h2> Food </h2>
            <ul> 
                <li> The Hamilton </li>
                <li> Tortino Restaurant </li>
                <li> Old Ebbitt Grill </li>
                <li> Zaytinya by José Andrés </li>
            </ul>
            <h2> Speakeasies </h2>
            <ul>
                <li> Silver Lyan </li>
                <li> Allegory </li>
                <li> Left Door </li>
                <li> The Gibson </li>
                <li> Chicken and Whiskey </li>
                <li> 600t </li>
                <li> O.K.P.B. </li>
                <li> Tilt Side Bar </li>
                <li> Denson Liquor Bar </li>
            </ul>
        </div>)
    }
}

export default WashingtonDC