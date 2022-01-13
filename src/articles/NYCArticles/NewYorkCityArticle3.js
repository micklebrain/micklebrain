import React from "react";

const Child = () => (
    <h2 className='modal'>
        What neighborhood are you in?
    </h2>
)

const Child2 = () => (
    <h2 className='modal'>
        Do you like spicy?
    </h2>
)

const Child3 = () => (
    <h2 className='modal'>
        Wet or dry food?
    </h2>
)

const Child4 = () => (
    <h2 className='modal'>
        Noodles or rice?
    </h2>
)

class NewYorkCityArticle3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantDetails: [],
            map: null,       
            isHidden: true
        }
    }

    toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

    render() {        
                
        return (
        <div>       
            <div>
                <h2> Where to eat? </h2>
                <h2> Which borough are you in? </h2>
                    <button onClick={this.toggleHidden.bind(this)}> 
                        Brooklyn
                    </button>
                    <button> Bronx </button>
                    <button> Manhattan </button>            
                    <button> Queens </button>
                    <button> Staten Island </button>  
                    {!this.state.isHidden && <Child />}                   
            </div>     
        </div>

        )
    }
}

export default NewYorkCityArticle3