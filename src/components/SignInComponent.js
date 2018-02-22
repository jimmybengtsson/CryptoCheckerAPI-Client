import React, { Component } from 'react';
import '../styles/SignIn.css';
import axios from "axios/index";



class SignInComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: 'Username',
            password: 'Password',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({[name]: event.target.value});
    }

    handleSubmit(event) {

        let data = {
            userName: this.state.userName,
            password: this.state.password,
        };
        console.log(JSON.stringify(data));

        axios.post('http://192.168.86.95:8005/register', JSON.stringify(data))
            .then((response) => {

                console.log(response);

                });

        event.preventDefault();
    }

    render() {
        return (

            <div className="signin-component">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        );
    }
}

export default SignInComponent;