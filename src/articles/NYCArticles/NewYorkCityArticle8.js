import React from "react";

import nycpool from "../../images/nyc-pool.jpeg"

class NewYorkCityArticle6 extends React.Component {

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
            <h2> Upcoming Events </h2>
            <ul>                 
                <li> Lady of Haven Fatima Jan 2, 3pm to 6pm  4867 58 STREET Queens, Parade </li>
                {/* <button onClick={this.addToItinerary.bind(this)}> Add to itinerary </button> */}
                <li> New York Botanical Garden Holiday Train Show Jan 22, All Day Event  2900 Southern Boulevard, Bronx </li>
                <li> David Bryne Jan 29 St. James Theatre </li>
            </ul>             
            </div>)
    }
}

export default NewYorkCityArticle6