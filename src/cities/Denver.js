import React from "react";

import {
    Link,
} from "react-router-dom";

class Denver extends React.Component {

    render() {
        return (<div class='container'>
            <h1> Denver travel guide </h1>
            <Link to="/DenverArticle" class="articlePreview"> Top 5 must do things in Denver </Link>
        </div>)
    }
}

export default Denver