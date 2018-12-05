import React, { Component } from 'react';

class Currency extends Component {
    state = {
        currencies: []
    }
    componentDidMount = () => {
        this.getCurrencies('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a2a4a6fb-2033-4d55-8751-88e2434d6985')
    };

    getCurrencies = (url) => {
        fetch(url)
        .then(res => res.json())
        .then(res => {
            this.setState({currencies: res.data})            
        })
    };
    render() { 
        return ( 
            <h1>Hello World</h1>
         );
    }
}
 
export default Currency;