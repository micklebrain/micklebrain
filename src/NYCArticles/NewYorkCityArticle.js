import React from "react";

class NewYorkCityArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resturantDetails: [],
            map: null
        }
    }

    async componentDidMount() {      
                
    }

    resturantsTrain() {
    //     trainStationResturants = {
    //         "station1" : "resturant1",
    //         "station2" : "resturant2",
    //         "station3" : "resturant3",
    //         "station4" : "resturant4",
    //     }
    //     for (var key in trainStationResturants) {

    //     }
    //     const trainStationResturants = trainStationResturants.map((resturant) => 
    //     <div style = { {textAlign: "center"} }  >        
    //         <h2> { resturant.name } </h2>                    
    //         <div> { resturant.address } </div>             
    //         {/* <div> { resturant.region } </div> */}
    //         {/* <div> Recommended dish : { resturant.topDish } </div> */}
    //     </div>
    // );
    }

    render() {            
        return (
            
            <div>       
                <h1> Best resturant by every subway stop </h1>                     
                <table>
                    <tr>
                        <td> Inwood 207 St </td>                    
                        <td> Guadalupe </td>
                    </tr>
                    <tr>
                        <td> Dyckman St </td>                    
                        <td> International Food House </td>
                    </tr>
                    <tr>
                        <td> 190 St </td>
                        <td> No.1 Tex-Mex Express </td>
                    </tr>
                    <tr>
                        <td> 181 St </td>
                        <td> Burger Heights </td>
                    </tr>
                </table>                   
                                                             
                <h2> 175 St - Malecon </h2>            
                <h2> 168 St - Jaya </h2>
                <h2> 145 St - Chopped parsley </h2>
                <h2> 168 St - </h2>
                <h2> 125 St - </h2>
                <h2> 59 St Columbus Circle - </h2>
                <h2> 42 St/Port Authority Bus Terminal - </h2>
                <h2> 34 St Penn Station - </h2>
                <h2> 14 St </h2>
                <h2> W 4 St Wash Sq - </h2>
                <h2> Canal St - </h2>
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

export default NewYorkCityArticle