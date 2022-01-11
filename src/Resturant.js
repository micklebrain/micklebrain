import React from "react";

import grubhubIcon from './images/grubhubIcon.png'
import postmatesIcon from './images/Postmates_Icon.png'
import resyIcon from './images/resy_icon.png'
import uberEatsIcon from './images/Uber-Eats-Icon.png'

class Resturant extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            address: props.address,
            name: props.name,
            neighborhood: props.neighborhood,
            recommendedDish: props.recommendedDish
        }
    }

    render() {
        return (<div>
            <h2> {this.state.neighborhood} - {this.state.name} </h2>
            <h2> {this.state.address} </h2>
            {/* <h2> {this.state.recommendedDish} </h2> */}
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
                <div class="column">
                    <a href={''} target="_blank"> <img src={resyIcon} alt="Resy" width="50" height="50" /> </a>
                </div>
            </div>
        </div>)
    }
}

export default Resturant