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
                    <h2> Febuary </h2>
                    <li> Feb 3-5 @ 4-6pm | Lunar new years celebration, live ice carving | @Brookfield Place </li>                    
                    <li> Feb 5 | Lunar New Years Celebration | @Queens Botanical Garden </li>
                    <li> Feb 5 | Dabin | @Terminal 5 </li>
                    <li> Feb 6 @1-4:30pm | Chinatown Lunar New Year Parade and Festival | @Chinatown </li>
                    <li> Feb 13 | Super Bowl Watch Party | @Magic Hour Rooftop Bar and Lounge </li>
                    <li> Feb 18 | Billie Ellish | @ Madison Square Garden </li>
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