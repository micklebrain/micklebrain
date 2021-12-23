import React from "react";

import grubhubIcon from '../images/grubhubIcon.png'
import postmatesIcon from '../images/Postmates_Icon.png'
import resyIcon from '../images/resy_icon.png'
import uberEatsIcon from '../images/Uber-Eats-Icon.png'

class NewYorkCityArticle2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resturantDetails: [],
            map: null
        }
    }

    async componentDidMount() {
        this.getResturants();
    }

    getResturants() {
        var requestOptions = {
            method: 'GET',
        };

        fetch(
            "https://lostmindsbackend.vercel.app/boroughresturants", requestOptions)
            // "http://localhost:3000/boroughresturants", requestOptions)
            .then(response => response.text())
            .then(response => {
                var resyJson = JSON.parse(response);

                resyJson['doc'].forEach(resturant => {
                    const res = {
                        name: resturant['name'],
                        neighborhood: resturant['neighborhood'],
                        grubhubLink: resturant['GrubhubLink'],
                        resyLink: resturant['ResyLink']
                    }
                    let resturants = this.state.resturantDetails;
                    resturants.push(res);
                    this.setState({ resturantDetails: resturants });
                });
            })
            .catch(error => console.log('error', error));
    }

    render() {
        const resturantDetails = this.state.resturantDetails
        const resturantsList = resturantDetails.map((resturant) =>
            <div>
                <h2> {resturant.neighborhood} - {resturant.name} </h2>
                <div class="row">
                    <div class="column">
                        <a href={resturant.grubhubLink} target="_blank"> <img src={grubhubIcon} alt="Liberty Bistro" width="75" height="75" /> </a>
                    </div>
                    <div class="column">
                        <a href={resturant.resyLink} target="_blank"> <img src={resyIcon} alt="Liberty Bistro" width="75" height="75" /> </a>
                    </div>
                    <div class="column">
                        <a href={resturant.ubereatsLink} target="_blank"> <img src={uberEatsIcon} alt="Liberty Bistro" width="75" height="75" /> </a>
                    </div>
                    <div class="column">
                        <a href={resturant.postmatesLink} target="_blank"> <img src={postmatesIcon} alt="Liberty Bistro" width="75" height="75" /> </a>
                    </div>
                </div>           
            </div>
        );

        return (<div>
            <div>
        
                <h1> Best resturant in every Manhattan neighborhood </h1>

                {resturantsList}
                
            </div>
        </div>)
    }
}

export default NewYorkCityArticle2