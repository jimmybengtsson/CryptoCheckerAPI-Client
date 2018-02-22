import React, { Component } from 'react';
import '../styles/Wallets.css';

class Wallets extends Component {
    constructor(props){
        super(props);

        this.state = {
            loaded: false,
        };

    }



    render() {
        return (

            <div className="Wallets-container">

                <p>Wallets</p>
            </div>

        );
    }
}

export default Wallets;