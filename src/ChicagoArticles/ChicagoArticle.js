import React from "react";

class ChicagoArticle extends React.Component {

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
                <h1> Top 5 must do things in Chicago </h1>
                <ul>
                    <li> Touch gloudgate </li>
                    <li> Take boat tour on river through city </li>
                    <li> Visit glass edge </li>
                    <li> Visit broadway </li>
                    <li> Eat deep dish pizza </li>
                </ul>
        </div>)
    }
}

export default ChicagoArticle