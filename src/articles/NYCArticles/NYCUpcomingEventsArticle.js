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
                    <li> 8th | Lil Tecca | @Terminal 5 </li>

                    <h2> May </h2>
                    <li> 1st | Govenors island reopened </li>
                    <li> 1st | Japan Day Festival | @Central Park </li>
                    <li> 9th | Japan Day Festival | @Central Park </li>

                    <h2> June </h2>
                    <li> 7th | Seaport Cinema </li> 
                    <li> 9th - 20th | Tribeca Film Festival </li>
                    <li> 14th | Seaport Cinema </li>
                    <li> 19th | Queens Night market opens </li>

                    <h2> July </h2>
                    <li> 31st - September 18 | Bric's Celebrates Brooklyn! Festival </li>
                    
                    <h2> August </h2>
                    <li> 1st | Pixar-themed mini-golf course </li>
                    <li> 21st - 19th | Zero G Experience </li>
                    <li> 28th | Le Poisson Rouge </li>

                    <h2> September </h2>
                    <li> 30th - September 12 | US Open </li>

                    <h2> October </h2>
                    <li> 24th - 10th | New York Film Festival </li>

                    <h2> November </h2>
                    <li> 5th | Eskimo Callboy | @The Brooklyn Monarch </li> 

                    <h2> December </h2>
                    <li> 26th from 4-5pm | Arts Festival | 5th Ave</li>
                </ul>
            </div>)
    }
}

export default NYCUpcomingEventsArticle