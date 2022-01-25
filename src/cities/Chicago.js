import React from "react";

import {
    Link,
} from "react-router-dom";

class Chicago extends React.Component {

    render() {
        return (<div>
            <h1> Chicago travel guide </h1>
            <Link to="/ChicagoArticle" class="articlePreview"> Top 5 must do things in Chicago </Link>
            <Link to="/ChicagoArticle2" class="articlePreview"> Top resturants in Chicago </Link>
        </div>)
    }
}

export default Chicago