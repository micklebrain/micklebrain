import React from "react";

import {
    Link,
} from "react-router-dom";

class Boston extends React.Component {

    render() {
        return (<div class='container'>
            <h1> Boston travel guide </h1>
            <Link to="/BostonArticle" class="articlePreview"> Top 5 resturants in Boston </Link>
        </div>)
    }
}

export default Boston