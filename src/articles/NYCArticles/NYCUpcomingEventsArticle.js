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
                    <li> Feb 3-5 @ 4-6pm | Lunar new years celebration, live ice carving | @ Brookfield Place </li>
                    <li> Feb 4 @ 7:30-10:30pm | Macy and Ricky Present: NYC Lunar New Year Comedy Show | @ St. Marks Comedy Club </li>
                    <li> Feb 5 | Lunar New Years Celebration | @ Queens Botanical Garden </li>
                </ul>
            </div>)
    }
}

export default NYCUpcomingEventsArticle