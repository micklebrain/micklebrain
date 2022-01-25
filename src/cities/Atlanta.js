import React from "react";

import {
    Link,
} from "react-router-dom";

class Atlanta extends React.Component {

    render() {
        return (<div>
            <h1> Atlanta travel guide </h1>
            <Link to="/AtlantaArticle" class="articlePreview"> Top 5 resturants in Atlanta </Link>
        </div>)
    }
}

export default Atlanta