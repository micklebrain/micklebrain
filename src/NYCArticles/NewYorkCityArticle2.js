import React from "react";

import grubhubIcon from '../images/grubhub.png'
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
                
                <h2> Civic Center - Potbelly Sandwich Shop </h2>
                <h2> East Harlem - Texas Chicken and Burgers </h2>
                <h2> East Village - Nowan </h2>
                <h2> Financial District - Bao Bao </h2>
                <h2> Flatiron District - Upland </h2>
                <h2> Garment district - Chef Yu </h2>
                <h2> Gramercy - Bite </h2>
                <h2> Greenwich village - Tue Thai Food </h2>
                <h2> Harlem - Manna's </h2>
                <h2> Hell's Kitchen - Yum Yum Too </h2>
                <h2> Hudson Square - Ear Inn </h2>
                <h2> Inwood - La Casa del Mofongo and Piano Bar </h2>
                <h2> Kips Bay - Soft Swerve </h2>
                <h2> Koreatown - Antoya KBBQ </h2>
                <h2> Lower East Side - Sweet Chick </h2>
                <h2> Little Italy - Gelso and Grand </h2>
                <h2> Meatpacking District - Catch NYC </h2>
                <h2> Midtown East - Obao </h2>
                <h2> Midtown South - Chef Yu </h2>
                <h2> Midtown West - Ivan Ramen Slurp Shop </h2>
                <h2> Morning Side Heights - Tom's </h2>
                <h2> Murray Hill - Sushi Ryusei </h2>
                <h2> NoHo - Lafayette Grand Café and Bakery </h2>
                <h2> Nolita - Rubirosa </h2>
                <h2> NOMAD - KazuNori </h2>
                <h2> Roosevelt Island - Granny Annie's Bar and Kitchen </h2>
                <h2> SOHO - Fanelli’s Cafe </h2>
                <h2> Stuyvesant Town - Ess-a-Bagel </h2>
                <h2> Tribeca - Bubby's </h2>
                <h2> Union Square - Tsurutontan Udon Noodle Brasserie </h2>
                <h2> Upper East Side - Vietnaam </h2>
                <h2> Upper West Side - Sushi Kaito </h2>
                <h2> West Village - L'Artusi </h2>
            </div>
        </div>)
    }
}

export default NewYorkCityArticle2