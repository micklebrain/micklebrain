import React from "react";

import Restaurant from "../../Restaurant"

class NewYorkCityArticle4 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantDetails: [],
            map: null
        }
    }

    getRestaurantDetails() {
        var requestOptions = {
            method: 'GET',
        };

        fetch(
            "https://lostmindsbackend.vercel.app/resturants/newyorkcity", requestOptions)
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

        const googleScript = document.getElementById('google-map-script')

        this.getRestaurantDetails();

        if (window.google) {
            this.initMap();
        }

        googleScript.addEventListener('load', () => {
            this.initMap();
        })

    }

    initMap() {
        const newyork_coordinates = { lat: 40.730610, lng: -73.935242 };
        const obao_coordinates = { lat: 40.760791677448, lng: -73.99108110247444 };
        const kimoto_coordinates = { lat: 40.691767094535386, lng: -73.98417049147238 };
        const kyuramen_coordinates = { lat: 40.76068852504462, lng: -73.83318746086162 };
        const zero_otto_nove_coordinates = { lat: 40.865034316201864, lng: -73.88190799012268 };
        const bayou_coordinates = { lat: 40.61737143255008, lng: -74.06793410504413 };

        let map = new window.google.maps.Map(document.getElementById("map"), {
            center: newyork_coordinates,
            zoom: 10,
            disableDefaultUI: true,
        });

        // The marker, positioned at Uluru
        const obao_marker = new window.google.maps.Marker({
            position: obao_coordinates,
            map: map,
        });

        const kimoto_marker = new window.google.maps.Marker({
            position: kimoto_coordinates,
            map: map,
        });

        const kyuramen_marker = new window.google.maps.Marker({
            position: kyuramen_coordinates,
            map: map,
        });

        const zero_otto_nove_marker = new window.google.maps.Marker({
            position: zero_otto_nove_coordinates,
            map: map,
        });

        const bayou_marker = new window.google.maps.Marker({
            position: bayou_coordinates,
            map: map,
        });
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

        return (
            <div class="container">
                <h1> Top Restaurants in each New York borough </h1>
                <h1> January, 2022 </h1>
                <div class="column-main">
                    {restaurantsList}
                </div>

                <div class="column-main">
                    <div id="map"></div>
                </div>
            </div>)
    }
}

export default NewYorkCityArticle4