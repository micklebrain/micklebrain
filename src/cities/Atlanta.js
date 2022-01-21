import React from "react";

import Restaurant from "../Restaurant"

class Atlanta extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantDetails: [],            
        }
    }

    getRestaurantDetails() {
        var requestOptions = {
            method: 'GET',
        };

        fetch(
            "https://lostmindsbackend.vercel.app/resturants/atlanta", requestOptions)
            // fetch("http://localhost:3000/resturants/newyorkcity", requestOptions)
            .then(response => response.text())
            .then(response => {
                var resyJson = JSON.parse(response);

                resyJson['doc'].forEach(restaurant => {
                    const res = {
                        region: restaurant['region'],
                        name: restaurant['name'],
                        address: restaurant['address'],
                        recommendedDish: restaurant['recommendedDish']

                    }
                    let restaurants = this.state.restaurantDetails;
                    restaurants.push(res);
                    this.setState({ restaurantDetails: restaurants });
                });
            })
            .catch(error => console.log('error', error));
    }

    async componentDidMount() {

        this.getRestaurantDetails();
    }

    render() {
        const restaurantDetails = this.state.restaurantDetails
        const restaurantsList = restaurantDetails.map((restaurant) =>

            <div>
                <Restaurant
                    address={restaurant.address}
                    name={restaurant.name}
                    neighborhood={restaurant.region}
                    recommendedDish={restaurant.recommendedDish}>
                </Restaurant>
            </div>
        );

        return (<div class="container">
            <h1> Top Restaurants in Atlanta </h1>
            <h1> January, 2022 </h1>
            <div>
                {restaurantsList}
            </div>
        </div>)
    }
}

export default Atlanta