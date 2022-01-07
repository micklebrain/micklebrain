import React from "react";

import nycpool from "../../images/nyc-pool.jpeg"

class NewYorkCityArticle6 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    async componentDidMount() {      
                
    }

    render() {            
        return (            
            <div>       
            <h2> Top attractions </h2>
            <ul>
                <li> <a href="https://banksyexpo.com/new-york/" target="_blank"> Banksy genius or vandal? </a> </li>
                <li> <a href="https://www.esbnyc.com/" target="_blank"> Empire State Building </a> </li>
                <li> <a href="https://www.onevanderbilt.com/" target="_blank"> One Vanderbilt </a> </li>
                <li> <a href="https://www.hudsonyardsnewyork.com/discover/vessel" target="_blank"> Vessel </a> </li>
            </ul>                
            </div>)
    }
}

export default NewYorkCityArticle6