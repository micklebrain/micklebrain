import React from "react";

class NYCLunarNewYearsArticle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <h1> Top things in NYC for Lunar New Years celebration </h1>
                <ul>
                    {/* <button onClick={this.addToItinerary.bind(this)}> Add to itinerary </button> */}
                    <li> Chinatown Lunar New Year Parade and Festival January 29 from 1-5pm</li>
                </ul>
            </div>)
    }
}

export default NYCLunarNewYearsArticle