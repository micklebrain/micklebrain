import React from "react";

class NYCUpcomingEventsArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    async componentDidMount() {

    }

    render() {

        return (
            <div>
                <h1> Upcoming Events </h1>
                <ul>
                    {/* <button onClick={this.addToItinerary.bind(this)}> Add to itinerary </button> */}
                    <li> David Bryne Jan 29 St. James Theatre </li>
                    <li> Chinese new years celebration Feb 3-5 Brookfield Place</li>
                    <li> Chinatown lion dances Feb 5 </li>
                    <li> Lunar New Years Celebration Feb 5 Queens Botanical Garden </li>
                </ul>
            </div>)
    }
}

export default NYCUpcomingEventsArticle