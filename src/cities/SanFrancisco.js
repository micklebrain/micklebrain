import React from "react";
import {
    Link,
} from "react-router-dom";

class SanFrancisco extends React.Component {

    render() {
        return (<div>
            <h2> San Francisco travel guide </h2>
            <Link to="/SanFranciscoArticle" class="articlePreview"> Top 5 must do things in San Francisco </Link>
        </div>)
    }
}

export default SanFrancisco