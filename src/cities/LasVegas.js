import React from "react";

import {
    Link,
} from "react-router-dom";


class LasVegas extends React.Component {

    render() {        
        return (<div>
            <h2> Las Vegas travel guide </h2>                  
            <Link to="/LasVegasArticle" class="articlePreview"> Top 5 must do things in Las Vegas </Link>
        </div>)
    }
}

export default LasVegas