import React from "react";

import nycpool from "../../images/nyc-pool.jpeg"

class NYCPlusPoolArticle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p> New York is already the city that never sleeps, but it gets injected with a new level of liveliness in the summer months. Unfortunately, the season also comes with an often unbearable heat that sends city dwellers on the hunt for a public pool to cool off in.
                    Luckily, New Yorkers are one step closer to getting a new and certainly unique swimming hole: a floating pool on the East River.
                    Known as the +Pool for its shape, which resembles a plus sign, this project has been in the works for a decade. And the organization behind it all has finally secured an official spot to build the floating pool: the Lower East Side waterfront just north of the Manhattan Bridge.
                    But the +Pool won't just float on the East River; it's going to use the water from the river to fill its space. Plus, one of the many engineering feats that make this endeavor impressive is the water filtration system. According to Time Out New York, the pool will provide guests with over 600,000 gallons of clean filtered water daily.
                    It's still unclear when the $25 million project will be complete, but organizers — and many New Yorkers — are pleased with the progress and eagerly awaiting the opening.
                    Kara Meyer, +Pool's managing director, told Curbed, "We have an official confirmation to succeed with the next steps for the project…We have a home. Mayoral candidates are talking about it."
                    Meyer says the next obstacle in building and opening +Pool will be meeting all regulations for health and safety, as well as city government requirements.
                    Jessica Poitevien is a Travel + Leisure contributor currently based in South Florida, but she's always on the lookout for her next adventure. Besides traveling, she loves baking, talking to strangers, and taking long walks on the beach. Follow her adventures on Instagram.
                </p>
                <img src={nycpool} alt="NYC pool" />
            </div>)
    }
}

export default NYCPlusPoolArticle