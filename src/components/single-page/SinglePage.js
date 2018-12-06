import React, { Component } from 'react'
import "./SinglePage.sass";
import { Link } from 'react-router-dom';

class Currency extends Component {
    state = {
        selectedCurrency: [],
        currencies: []
    }
    componentDidMount = () => {
        let currencyId = this.props.match.params.currency_name;
        this.setState({currencyId})
        fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a2a4a6fb-2033-4d55-8751-88e2434d6985')
        .then(res => res.json())
        .then(res => {
            this.setState({currencies: res.data})
            this.filterAPI(res.data,currencyId);         
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
        const selectedCurrency = this.state.selectedCurrency;
        const date = new Date(selectedCurrency.date_added); 
        const lastUpdate = new Date(selectedCurrency.last_updated); 
        console.log(this.state.selectedCurrency);
        console.log(selectedCurrency.quote);
        return ( 
            <div>
                {this.state.currencies.length ? (
                <div>
                     <div className="header">
                         <Link to="/">Go back</Link>
                     </div>
                     <div className="container">
                         <div className="single-page">
                             <h2> <span>Currency name:</span> {selectedCurrency.name || "/"}</h2>
                             <p>Symbol {selectedCurrency.symbol || "/"}</p>
                             <p>ID number: {selectedCurrency.id || "/"}</p>
                             <p>Date cryptocurrency was added to the system: {date.getDate()}/{date.getMonth()}/{date.getFullYear() || "/"}</p>
                             <p>The currency was updated last time: {lastUpdate.getDate()}/{lastUpdate.getMonth()}/{lastUpdate.getFullYear() || "/"}</p>
                             <p>Approximate number of coins currently in circulation: {selectedCurrency.circulating_supply || "/"}</p>
                             <p>Number of market pairs across all exchanges trading each currency: {selectedCurrency.num_market_pairs || "/"}</p>
                             <p>Approximate total amount of coins in existence right now: {selectedCurrency.total_supply}</p>
                         </div>
                     </div>    
                 </div>
                ):(<div className="loading"></div>)
                }

            </div>
        );
    }
}
 
export default Currency;