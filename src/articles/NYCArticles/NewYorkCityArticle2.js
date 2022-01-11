import React from "react";

import grubhubIcon from '../../images/grubhubIcon.png'
import postmatesIcon from '../../images/Postmates_Icon.png'
import resyIcon from '../../images/resy_icon.png'
import uberEatsIcon from '../../images/Uber-Eats-Icon.png'

import Resturant from "../../Resturant";

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

        navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    });
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
                        address: resturant['address'],
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

            <Resturant address={resturant.address} name={resturant.name} neighborhood={resturant.neighborhood}> </Resturant>

            // <div>
            //     <h2> {resturant.neighborhood} - {resturant.name} </h2>
            //     <h2> {resturant.address} </h2>
            //     <div class="row">
            //         <div class="column">
            //             <a href={resturant.grubhubLink} target="_blank"> <img src={grubhubIcon} alt="Gruhbhub" width="50" height="50" /> </a>
            //         </div>
            //         <div class="column">
            //             <a href={resturant.postmatesLink} target="_blank"> <img src={postmatesIcon} alt="Postmates" width="50" height="50" /> </a>
            //         </div>
            //         <div class="column">
            //             <a href={resturant.ubereatsLink} target="_blank"> <img src={uberEatsIcon} alt="Ubereats" width="50" height="50" /> </a>
            //         </div>
            //         <div class="column">
            //             <a href={resturant.resyLink} target="_blank"> <img src={resyIcon} alt="Resy" width="50" height="50" /> </a>
            //         </div>
            //     </div>       
            // </div>
        );

        return (<div>
            <div>

                <h1> Best resturant in every Manhattan neighborhood </h1>

                {resturantsList}

                <iframe src="https://www.google.com/maps/d/embed?mid=1P6ChdyZdDkC2N3X4biEE0yg5d90&ehbc=2E312F" width="640" height="480"></iframe>
                
            </div>
        </div>)
    }
}

export default NewYorkCityArticle2