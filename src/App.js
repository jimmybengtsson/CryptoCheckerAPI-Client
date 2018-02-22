import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import { slide as Menu } from 'react-burger-menu'
import Rates from "./views/Rates";
import Wallets from "./views/Wallet";
import SignIn from './components/SignInComponent'

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            menuOpen: false,
            signedIn: false,
        };
        this.isSignedIn = this.isSignedIn.bind(this);
    }

    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})
    }

    closeMenu () {
        this.setState({menuOpen: false})
    }

    toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
    }
    isSignedIn() {
        this.setState({
            signedIn: true,
        });
    }



    pageNavigation () {

        console.log(this.state);
        if (this.state.page === 'wallet') {
            if (this.state.signedIn === true) {
                return <Wallets data={this.state}/>;
            } else {
                return <SignIn />
            }

        } else {
            return <Rates/>
        }
    }

  render() {
    return (

          <div className="App">
              <Menu className={ "menu" }
                    isOpen={this.state.menuOpen}
                    onStateChange={(state) => this.handleStateChange(state)}>
                  <button onClick={() => {
                      this.setState({
                          page: 'rates',
                      });
                      this.closeMenu();
                  }}>Rates</button>
                  <button onClick={() => {
                      this.setState({
                          page: 'wallet',
                      });
                      this.closeMenu();
                  }}>Wallets</button>
              </Menu>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">CryptoChecker</h1>
            </header>
              <div className="View-container">
                  { this.pageNavigation() }
              </div>
          </div>

    );
  }
}

export default App;
