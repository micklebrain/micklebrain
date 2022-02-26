import React from "react";

class NYCArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h1> NYC Omakase Guide </h1>
                <ul>                    
                    <li> Cagen | $150</li>
                    <li> Kosaka | $225 (Bar) / $200 (Table)</li>
                    <li> Kaiseki Room By Yamada </li>                
                    <li> Mojo Omakase | $90 </li>
                    <li> Nakaji | $265</li>
                    <li> Omakase Room by Tatsu | $180 </li>
                    <li> Noda </li>
                    <li> Sushi by Bou </li>
                    <li> Sushi Nakazawa NY </li>
                    <li> Sushi Noz </li>
                    <li> Sushi Zo </li>
                    <li> Shuko </li>
                    <li> Hasaki </li>
                </ul>
            </div>)
    }
}

export default NYCArticle