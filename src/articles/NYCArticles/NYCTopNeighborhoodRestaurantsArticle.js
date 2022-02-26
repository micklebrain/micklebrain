import React from "react";
import Restaurant from "../../Restaurant";

class NYCTopNeighborhoodRestaurantsArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantDetails: [],
            map: null
        }
    }

    async componentDidMount() {
        this.getRestaurants();

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }

    getRestaurants() {
        var requestOptions = {
            method: 'GET',
        };

        fetch(
            "https://lostmindsbackend.vercel.app/neighborhoodresturants/newyorkcity", requestOptions)
            // "http://localhost:3000/boroughresturants", requestOptions)
            .then(response => response.text())
            .then(response => {
                var resyJson = JSON.parse(response);

                resyJson['doc'].forEach(restaurant => {
                    const res = {
                        name: restaurant['name'],
                        address: restaurant['address'],
                        neighborhood: restaurant['neighborhood'],
                        grubhubLink: restaurant['GrubhubLink'],
                        resyLink: restaurant['ResyLink']
                    }
                    let restaurants = this.state.restaurantDetails;
                    restaurants.push(res);
                    this.setState({ restaurantDetails: restaurants });
                });
            })
            .catch(error => console.log('error', error));
    }

    render() {
        const restaurantDetails = this.state.restaurantDetails
        const restaurantsList = restaurantDetails.map((restaurant) =>

            <Restaurant address={restaurant.address} name={restaurant.name} neighborhood={restaurant.neighborhood}> </Restaurant>
        );

        return (<div class="container">
            <div>

                <h1> Best Restaurant in every Manhattan Neighborhood </h1>

                {restaurantsList}

                <iframe src="https://www.google.com/maps/d/embed?mid=1P6ChdyZdDkC2N3X4biEE0yg5d90&ehbc=2E312F" width="640" height="480"></iframe>

            </div>
        </div>)
    }
}

export default NYCTopNeighborhoodRestaurantsArticle