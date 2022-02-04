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
                    <li> ongoing @ 6-10pm | Free Thursdays admissions | Brooklyn Muesuem </li> 
                    <li> ongoing | Free Friday admissions | The Rubin museum of art </li>                              
                    <li> Feb 3-5 @ 4-6pm | Lunar new years celebration, live ice carving | @ Brookfield Place </li>                    
                    <li> Feb 4 @ 7:30-10:30pm | Macy and Ricky Present: NYC Lunar New Year Comedy Show | @ St. Marks Comedy Club </li>
                    <li> Feb 5 | Lunar New Years Celebration | @ Queens Botanical Garden </li>
                    <li> March 4 | Rezz | Terminal 5 </li>
                    <li> March 6 | Seong-Jin | New Jersey Performing Arts Center </li>
                    <li> March 18 | Reliant K | Irving plaza </li>
                    <li> March 27 | New York Rangers vs Buffalo Sabres | The Madison Square Garden </li>
                    <li> March 28 | New York Knicks vs Chicago Bull | The Madison Square Garden </li>
                </ul>
            </div>)
    }
}

export default NYCUpcomingEventsArticle