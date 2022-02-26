import React from "react";

class NYCTrainStopRestaurantsArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantDetails: [],
            map: null
        }
    }

    async componentDidMount() {      
                
    }

    restaurantsTrain() {
    //     trainStationRestaurants = {
    //         "station1" : "restaurant1",
    //         "station2" : "restaurant2",
    //         "station3" : "restaurant3",
    //         "station4" : "restaurant4",
    //     }
    //     for (var key in trainStationRestaurants) {

    //     }
    //     const trainStationRestaurants = trainStationRestaurants.map((restaurant) => 
    //     <div style = { {textAlign: "center"} }  >        
    //         <h2> { restaurant.name } </h2>                    
    //         <div> { restaurant.address } </div>             
    //         {/* <div> { restaurant.region } </div> */}
    //         {/* <div> Recommended dish : { restaurant.topDish } </div> */}
    //     </div>
    // );
    }

    render() {            
        return (            
            <div>      
                last updated: January 6th, 2022 
                <h1> Best restaurant by every subway stop </h1>                     
                <h2> Inwood 207 St - Guadalupe </h2>
                <h2> Dyckman St - International Food House </h2>
                <h2> 190 St - No.1 Tex-Mex Express </h2>
                <h2> 181 St - Burger Heights </h2>
                <h2> 175 St - Malecon </h2>            
                <h2> 168 St - Jaya </h2>
                <h2> 145 St - Chopped parsley </h2>
                <h2> 168 St - Dallas BBQ Washington Heights </h2>
                <h2> 125 St - Clay </h2>
                <h2> 59 St Columbus Circle - Marea </h2>
                <h2> 42 St/Port Authority Bus Terminal - </h2>
                <h2> 34 St Penn Station - </h2>
                <h2> 14 St Semma subway station</h2>
                <h2> W 4 St Wash Sq - Down the Hatch </h2>
                <h2> Canal St - Veranda </h2>
                <h2> Chambers St - </h2>
                <h2> Fulton St - </h2>
                <h2> High St - </h2>
                <h2> Jay St- MetroTech - </h2>
                <h2> Hoyt Schermerhorn - </h2>
                <h2> Nostrand Av - </h2>
                <h2> Hoyt Schermerhorn - </h2>
                <h2> Nostrand Av - </h2>
                <h2> Utica Av - </h2>
                <h2> Broadway Junction - </h2>
                <h2> Euclid Av - </h2>
                <h2> Grant Av - </h2>                
                <h2> 80 St - </h2>
                <h2> 88 St - </h2>
                <h2> Rockaway Blvd - </h2>                
        </div>)
    }
}

export default NYCTrainStopRestaurantsArticle