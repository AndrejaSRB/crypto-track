import React, { Component } from 'react'
import "./SinglePage.sass"

class Currency extends Component {
    state = {
        selectedCurrency: [],
    }
    componentDidMount = () => {
        let currencyId = this.props.match.params.currency_name;
        this.setState({currencyId})
        fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a2a4a6fb-2033-4d55-8751-88e2434d6985')
        .then(res => res.json())
        .then(res => {
            this.filterAPI(res.data.slice(0,50),currencyId);         
        })
        
    }
    filterAPI = (currencies, currencyName) => {  
        for (let index = 0; index < currencies.length; index++) {
            if (currencies[index].name === currencyName){                
                this.setState({selectedCurrency: currencies[index]})
            }
        }
    }
    render() {  
        console.log(this.state.selectedCurrency);
        return ( 
            <h1>Hi</h1>
         );
    }
}
 
export default Currency;