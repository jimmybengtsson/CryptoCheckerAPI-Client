import React, { Component } from 'react';
import '../styles/Rates.css';
import axios from "axios/index";
import {Line} from 'react-chartjs-2';
import { BeatLoader } from 'react-spinners';



class RatesComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: true,
        };

        this.fetchLastHour = this.fetchLastHour.bind(this);
        this.loadChart = this.loadChart.bind(this);

        this.times = [];
        this.price = [];

        this.data = {
            labels: this.times,
            datasets: [
                {

                    fill: false,
                    legend: false,
                    enabled: false,
                    showLine: true,
                    responsive: true,
                    lineTension: 0.1,
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
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
                    data: this.price,
                }
            ]
        };
    }

    loadChart() {

        if(this.state.loading === false) {
            console.log(this.times);
            console.log(this.price);

            return <Line data={this.state.data} />;

        } else {
            return <div className="loading-component">
                <BeatLoader
                    color={'#0897e2'}
                    loading={this.state.loading}
                />
            </div>;
        }
    }

    async fetchLastHour() {

        let hour = 1000 * 60 * 60 * 3;
        let d = Date.now() - hour;

        let newD = new Date(d);
        newD = newD.toISOString();

        let urlQueary = 'http://188.166.80.171:3000/rates/search?currency=' + this.props.serverName + '&since=' + newD;

        console.log(urlQueary);

        axios.get(urlQueary)
            .then((response) => {
                console.log(response.data);

                let res = response.data.data;

                let data = res.filter((element, index) => {
                    return index % 5 === 0;
                });

                data.forEach((i) => {

                     let value = i[this.props.serverName];

                     this.price.push(value.other.eur);

                     let date = new Date(i.date);
                     let label = addZero(date.getHours()) + ':' + addZero(date.getMinutes());

                    this.times.push(label);
                });
            });

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
    }

    componentDidMount() {
        this.fetchLastHour().then(() => {
            return this.setState({
                loading: false,
                data: this.data,
            });
        });
    }

    render() {
        return (

            <div className="rates-component">
                <div className="rates-component-header">
                    <p className="rates-component-fullname">{this.props.fullName}</p>
                    <p className="rates-component-shortname">{this.props.name}</p>
                </div>
                <div className="rates-component-header-body">
                    <div className="rates-component-body-chart">
                        {this.loadChart()}
                    </div>
                    <div className="rates-component-body-price">
                        <p>price</p>
                    </div>
                </div>
            </div>

        );
    }
}

export default RatesComponent;