import React from "react";

class NYCUpcomingEventsArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {

        return (
            <div>
                <h1> Upcoming Events </h1>
                <ul>
                    {/* <button onClick={this.addToItinerary.bind(this)}> Add to itinerary </button> */}
                    <h2> All year </h2>
                    <li> ongoing @ 6-10pm | Free Thursdays admissions | @Brooklyn Muesuem </li> 
                    <li> ongoing | Free Friday admissions @6-10pm | @The Rubin Museum of Art </li>
                    <li> ongoing | Free Friday admissions | @The Morgan library and museum </li>
                    <li> Jan 8 - Feb 27 | FirstImpressions | West Chelsea Contemporary </li>
                    <h2> Febuary </h2>                    
                    <li> through Feb 21 | Broadway 2 for 1 |</li>
                    <h2> March </h2>
                    <li> March 4 | Rezz | @Terminal 5 </li>
                    <li> March 6 | Seong-Jin | @New Jersey Performing Arts Center </li>
                    <li> March 18 | Reliant K | @Irving plaza </li>
                    <li> March 27 | New York Rangers vs Buffalo Sabres | @The Madison Square Garden </li>
                    <li> March 28 | New York Knicks vs Chicago Bull | @The Madison Square Garden </li>
                    <h2> April </h2>
                    <li> Apr 8 | Lil Tecca | @Terminal 5 </li>
                </ul>
            </div>)
    }
}

export default NYCUpcomingEventsArticle