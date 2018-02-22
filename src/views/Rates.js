import React, { Component } from 'react';
import '../styles/Rates.css';
import axios from 'axios';
import RatesComponent from "../components/RatesComponent";

class Rates extends Component {
    constructor(props){
        super(props);

        this.state = {
            loaded: false,
        };

        this.getContent = this.getContent.bind(this);
        this.stateLoaded = this.stateLoaded.bind(this);
    }

    stateLoaded() {
        if(this.state.loaded === true) {
            return <ul className="rates-ul">
                    <li className="rates-li"><RatesComponent fullName="Bitcoin" name="XBT" serverName="xbt" data={ this.state.crypto.xbt }/></li>
                <li className="rates-li"><RatesComponent fullName="Ethereum" name="ETH" serverName="eth" data={ this.state.crypto.eth }/></li>
                <li className="rates-li"><RatesComponent fullName="Litecoin" name="LTC" serverName="ltc" data={ this.state.crypto.ltc }/></li>
                <li className="rates-li"><RatesComponent fullName="Bitcoin Cash" name="BCH" serverName="bch" data={ this.state.crypto.bch }/></li>
            </ul>
        } else {
            return <p>Loading</p>
        }
    }

    getContent () {
        axios.get('http://192.168.86.95:8005/rates/latest')
            .then((response) => {

                let res = response.data;

                return this.setState({

                    crypto: res,
                    loaded: true,
                });
            })
    }

    componentDidMount() {
        this.getContent();
    }



    render() {

        console.log(this.state);

        /*const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.rates,
                }
            ]
        };*/

        return (

            <div className="Rates-container">
                <p>Rates</p>
                { this.stateLoaded() }
            </div>

        );
    }
}

export default Rates;

// <RatesComponent name="XBT" data={this.state.xbt}/>