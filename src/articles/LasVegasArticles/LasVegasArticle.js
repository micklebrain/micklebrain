import React from "react";

class LasVegasArticle extends React.Component {

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
                <h1> Top 5 must do things in Las Vegas </h1>
                <ul>
                    <li> Zipline over LINQ </li>
                    <li> Get Fat Tuesday </li>
                    <li> Eat at Bacchanal buffet </li>
                    <li> Ride the big apple coaster at New York New York </li>
                    <li> Watch Pen and Teller Show</li>
                </ul>
        </div>)
    }
}

export default LasVegasArticle