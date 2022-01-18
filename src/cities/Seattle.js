import React from "react";

import {
    Link,
} from "react-router-dom";


class Seattle extends React.Component {
    render() {        
        return (<div class="articleContainer">
            <h1> Seattle guide </h1>
            <div class="column-main">

                
            </div>
            <div class="column-main">               
            <Link to="/SeattleArticle" class="articlePreview"> Top Attractions in Seattle </Link>
            </div>
        </div>)
    }
}

/*
    render() {
        return (<div class="articleContainer">
            <h1> New York City guide </h1>
            <div class="column-main">
                <Link to="/NYCarticle4" class="articlePreview"> <img class="article" src={nycboroughs} alt="Italian Trulli" /> <div> <div> Best Resturant in All Five NYC Boroughs </div> <div> Jan 6, 2022 </div> </div> </Link>
                <Link to="/NYCarticle5" class="articlePreview"> <img class="article" src={broadway} alt="Every broadway show" /> <div> <div> Every broadway show currently showing </div> <div> Jan 6, 2022 </div> </div> </Link>
                <Link to="/NYCarticle6" class="articlePreview"> <img class="article" src={pluspool} alt="New pool coming to Manhattan river" /> <div> <div> New pool coming to Manhattan river </div> <div> Jan 6, 2022 </div> </div> </Link>
                { <Link to="/NYCarticle3" class="articlePreview"> <img class="article" src={pie} alt="Find a place to eat through survey" /> Stuck on where to eat? </Link> }
                <Link to="/NYCarticle8" class="articlePreview"> <img class="article" src={nycattractions} alt="Upcoming events" /> <div> <div> Upcoming events </div> <div> Jan 6, 2022 </div> </div> </Link>
            </div>
            <div class="column-main">
                <Link to="/NYCarticle2" class="articlePreview"> <img class="article" src={nycneighborhoods} alt="Best restaurant in every NYC neighborhood " /> <div> <div> Best Resturant in Every NYC Neighborhood </div> <div> Jan 6, 2022 </div> </div> </Link>
                <Link to="/NYCarticle" class="articlePreview"> <img class="article" src={nycsubway} alt="Best restaurant by every subway stop" /> <div> <div> Best Resturant by Every Subway Stop </div> <div> Jan 6, 2022 </div> </div> </Link>
                <Link to="/NYCarticle7" class="articlePreview"> <img class="article" src={nycattractions} alt="Top attractions" /> <div> <div> Top attractions </div> <div> Jan 6, 2022 </div> </div> </Link>
            </div>
        </div>)
    } 
    */
    

export default Seattle