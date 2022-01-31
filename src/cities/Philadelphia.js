import React from "react";
import {
    Link,
} from "react-router-dom";

class Philadelphia extends React.Component {

    render() {
        return (<div class='container'>
            <h1> Philadelphia travel guide </h1>
            <Link to="/PhiladelphiaArticle" class="articlePreview"> Top things in Philadelphia for Lunar New Years celebration </Link>
        </div>)
    }
}

export default Philadelphia