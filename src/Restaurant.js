import React from "react";

import grubhubIcon from './images/grubhubIcon.png'
import imageName from './images/imageName.jpeg'
import openTableIcon from './images/open-table-icon.png'
import postmatesIcon from './images/Postmates_Icon.png'
import resyIcon from './images/resy_icon.png'
import uberEatsIcon from './images/Uber-Eats-Icon.png'

import './Restaurant.css'

class Restaurant extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            address: props.address,
            name: props.name,
            neighborhood: props.neighborhood,
            recommendedDish: props.recommendedDish,
            imageName: props.imageName,
            image: props.image,            
        }
    }

    render() {
        return (<div>
            <img class="restaurantImage" src={`../../restaurants/${this.state.name}.jpeg`}></img>
            <h2 class="resturantTitle"> {this.state.name} </h2>
            <i class='fas fa-map-marker-alt'></i> {this.state.neighborhood} <span>&#183;</span> Recommened dish - {this.state.recommendedDish}
            {/* <div class="tag"> {this.state.neighborhood} </div> */}
            <h4 class="foodDeliveryDetails"> Available for Delivery/Takeout </h4>
            <div class="row">
                <div class="column">
                    <a href={''} target="_blank"> <img src={grubhubIcon} alt="Gruhbhub" width="50" height="50" /> </a>
                </div>
                <div class="column">
                    <a href={''} target="_blank"> <img src={postmatesIcon} alt="Postmates" width="50" height="50" /> </a>
                </div>
                <div class="column">
                    <a href={''} target="_blank"> <img src={uberEatsIcon} alt="Ubereats" width="50" height="50" /> </a>
                </div>
            </div>
            <h4 class="foodDeliveryDetails"> Available for Reservations </h4>
            <div class="row">
                <div class="column">
                    <a href={''} target="_blank"> <img src={resyIcon} alt="Resy" width="50" height="50" /> </a>
                </div>
                <div class="column">
                    <a href={''} target="_blank"> <img src={openTableIcon} alt="Open Table Icon" width="50" height="50" /> </a>
                </div>
            </div>
        </div>)
    }
}

export default Restaurant