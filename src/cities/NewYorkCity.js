import React from "react";

class NewYorkCity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resturantDetails: [],
            map: null
        }
    }

    getResturantDetails() {
        var requestOptions = {
            method: 'GET',
        };
          
        fetch("https://lostmindsbackend.vercel.app/resturants/newyorkcity", requestOptions)
        // fetch("http://localhost:3000/resturants/newyorkcity", requestOptions)
        .then(response => response.text())
        .then(response => {            
            var resyJson = JSON.parse(response);        
            
            resyJson['doc'].forEach(resturant => {                
                const res = {
                    region: resturant['region'],
                    name: resturant['name'],  
                    address: resturant['address'],
                    topDish: resturant['topDish']

                }                    
                let resturants = this.state.resturantDetails;                 
                resturants.push(res);
                this.setState({ resturantDetails: resturants });     
            });               
        })
        .catch(error => console.log('error', error));
    }

    async componentDidMount() {      
        
        const googleScript = document.getElementById('google-map-script')

        this.getResturantDetails();

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
        const resturantDetails = this.state.resturantDetails        
        const resturantsList = resturantDetails.map((resturant) => 
            <div style = { {textAlign: "center"} }  >        
                <h2> { resturant.name } </h2>                    
                <div> { resturant.address } </div>             
                {/* <div> { resturant.region } </div> */}
                {/* <div> Recommended dish : { resturant.topDish } </div> */}
            </div>
        );

        return (<div>       

            {/* <h1> Top Resturant lists </h1>
            <ul>
                <li> Top resturants in each New York borough </li>
                <li> Top resturants in each Manhattan neighborhood </li>            
            </ul>

            <h2>  Top attractions </h2>

            <ul>
                <li> https://www.hudsonyardsnewyork.com/discover/vessel </li>                
                <li> https://www.esbnyc.com/ </li>
            </ul>

            <h2> Top resturants by each New York train stop </h2>

            <h2> A Line </h2> 
            <ul> 
                <li> Inwood 207 Street </li>
            </ul> */}


            <h1> September, 2021 top resturant in each New York borough </h1>
                 
            { resturantsList }

            <div id="map"></div>
     
        </div>)
    }
}

export default NewYorkCity