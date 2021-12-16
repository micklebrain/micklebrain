import React from "react";

class NewYorkCityArticle2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resturantDetails: [],
            map: null
        }
    }

    async componentDidMount() {      
                
    }

    render() {            
        return (<div>       
            <div>     
                <h1> Best resturant in every Manhattan neighborhood </h1>                   
                <a href="https://www.grubhub.com/restaurant/raclette-195-avenue-a-new-york/305505" target="_blank"> Alphabet City - Raclette </a>
                <a href="https://www.grubhub.com/restaurant/dig---madison-square-16-e-23rd-st-new-york/304579" target="_blank"> Battery Park City - Dig </a>
                <h2> Central Park - Express Cafe in the Loeb Boathouse </h2>
                <a href="https://www.grubhub.com/restaurant/bottino-246-10th-ave-new-york/457634" target="_blank"> Chelsea - Bottino </a>                
                <h2> Chinatown - Kong Sihk Tong </h2>
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
                <h2> Union Square - Breads Bakery </h2>
                <h2> Upper East Side - Vietnaam </h2>
                <h2> Upper West Side - Sushi Kaito </h2>
                <h2> West Village - L'Artusi </h2>
            </div>    
        </div>)
    }
}

export default NewYorkCityArticle2