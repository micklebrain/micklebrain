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
                    <li> through the 21st | Broadway 2 for 1 |</li>
                    <li> 27th | New York Knicks vs Philadelphia 76ers | @Madison Square Garden </li>
                    <li> 27th | First Impressions | West Chelsea Contemporary </li>

                    <h2> March </h2>
                    <li> 3rd from 2-9pm| NYC Winter Wine and Food Festival | @Webster Hall </li>
                    <li> 4th | Rezz | @Terminal 5 </li>                    
                    <li> 10th | Amine | @Terminal5</li>
                    <li> 17th | St Patrick's Day Parade </li>
                    <li> 18th | Reliant K | @Irving plaza </li>
                    <li> 26th | JoJo | @Terminal5 </li>
                    <li> 27th | New York Rangers vs Buffalo Sabres | @The Madison Square Garden </li>
                    <li> 28th | New York Knicks vs Chicago Bull | @The Madison Square Garden </li>
                    
                    <h2> April </h2>
                    <li> Apr 8 | Lil Tecca | @Terminal 5 </li>

                    <h2> May </h2>
                    <li> May 1 | Govenors island reopened </li>
                    <li> May 1 | Japan Day Festival | @Central Park </li>
                    <li> May 9 | Japan Day Festival | @Central Park </li>

                    <h2> June </h2>
                    <li> June 7 | Seaport Cinema </li> 
                    <li> June 9 - June 20 | Tribeca Film Festival </li>
                    <li> June 14 | Seaport Cinema </li>
                    <li> June 19 | Queens Night market opens </li>

                    <h2> July </h2>
                    <li> July 31 - September 18 | Bric's Celebrates Brooklyn! Festival </li>
                    
                    <h2> August </h2>
                    <li> August 1 | Pixar-themed mini-golf course </li>
                    <li> August 21 - September 19 | Zero G Experience </li>
                    <li> August 28 | Le Poisson Rouge </li>

                    <h2> September </h2>
                    <li> August 30 - September 12 | US Open </li>

                    <h2> October </h2>
                    <li> September 24 - October 10 | New York Film Festival </li>

                    <h2> November </h2>
                    <li> November 5| Eskimo Callboy | @The Brooklyn Monarch </li> 

                    <h2> December </h2>
                    <li> December 26 @4-5pm | Arts Festival | 5th Ave</li>
                </ul>
            </div>)
    }
}

export default NYCUpcomingEventsArticle