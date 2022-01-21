import React from "react";

import Restaurant from "../Restaurant"

class Atlanta extends React.Component {

    render() {
        return (<div class="container">
            <h1> Top Restaurants in Atlanta </h1>
            <h1> January, 2022 </h1>
            <div>
                <Restaurant
                    address="3350 Peachtree Rd NE Suite 175, Atlanta, GA 30326"
                    name="South City Kitchen Buckhead"
                    neighborhood="Buckhead"
                    recommendedDish="Steak">
                </Restaurant>

                <Restaurant
                    address="101 Marietta St NW, Atlanta, GA 30303"
                    name="Thrive"
                    neighborhood="Buckead"
                    recommendedDish="Steak">
                </Restaurant>

                <Restaurant
                    address="438 Moreland Ave NE "
                    name="The Vortex"
                    neighborhood="Buckead"
                    recommendedDish="Steak">
                </Restaurant>
            </div>
        </div>)
    }
}

export default Atlanta