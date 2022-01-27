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
            <p>
                The gist: This Cantonese-American restaurant in Williamsburg lives up to the media hype.
                Named after his mother, Brooklyn native chef Calvin Eng (Nom Wah, Win Son) offers his own interpretation of Cantonese cuisine along with recipes inspired from his childhood that make for a very unique dining experience.
                From updated versions of American classics like honey walnut shrimp, to Fuyu Cacio e Pepe Mein or even his own version of a McRib, a meal here will kick off your 2022 dining adventures on a high note.
                The food: Small dishes and starters include Chinese long beans with fermented bean curd garlic butter; chrysanthemum green salad with creamy soy sesame and crispy shallots; fish + shrimp wontons in brodo with superior citrus parm broth; and shrimp with apple, candied walnuts, and honey kewpie mayo. Larger dishes include the Fuyu Cacio e Pepe Mein with fermented bean curd, black pepper, and pecorino; the X.O. Cheung Fun with seared rolled rice noodles and dried scallop-shrimp X.O. sauce; the signature Cha Siu McRib with Chinese hot mustard served on a classic Chinese bun; cold poached half chicken; and a whole stuffed rainbow trout with green mustard condiment. Desserts include the Chow Nai Sundae with malted fried milk, ovaltine hot fudge, and buttered peanuts; and a fruit plate.
            </p>
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