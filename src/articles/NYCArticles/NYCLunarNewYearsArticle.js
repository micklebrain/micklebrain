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
                    <li> Feb 1st @ 12am | Lunar New Years Firecracker Ceremony Sara D. Roosevelt Park </li>
                    <li> Feb 3-5 @ 4-6pm | Lunar new years celebration, live ice carving | @ Brookfield Place </li>
                    <li> Feb 4 @ 7:30-10:30pm | Macy and Ricky Present: NYC Lunar New Year Comedy Show | @ St. Marks Comedy Club </li>
                    <li> Feb 5 | Lunar New Years Celebration | @ Queens Botanical Garden </li>
                    <li> Feb 12 from 1-5pm | Chinatown Lunar New Year Parade and Festival </li>
                </ul>
            </div>)
    }
}

export default NYCLunarNewYearsArticle