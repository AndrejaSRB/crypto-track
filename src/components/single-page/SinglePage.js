import React, { Component } from 'react'
import "./SinglePage.sass";
import { Link } from 'react-router-dom';

class Currency extends Component {
    state = {
        selectedCurrency: [],
        currencies: []
    }

    //taking as prop currency name from clicked currency
    //fetching API
    //calling filtering API function
    componentDidMount = () => {
        let currencyId = this.props.match.params.currency_name;
        this.setState({currencyId});
        fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a2a4a6fb-2033-4d55-8751-88e2434d6985')
        .then(res => res.json())
        .then(res => {
            this.setState({currencies: res.data});
            this.filterAPI(res.data,currencyId);         
        });        
    };

    //looping API and checking which is selected currency from main page
    //setting selected currency as state
    filterAPI = (currencies, currencyName) => {  
        for (let index = 0; index < currencies.length; index++) {
            if (currencies[index].name === currencyName){                
                this.setState({selectedCurrency: currencies[index]})
            };
        };
    };

    //converting numbers in proper type
    convertNumbers = number => {
        return parseFloat(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') 
    }

    render() {  
        
        const selectedCurrency = this.state.selectedCurrency;
        const date = new Date(selectedCurrency.date_added); 
        const lastUpdate = new Date(selectedCurrency.last_updated);
        
        return ( 
            <div>
                {this.state.currencies.length ? (
                <div>
                     <div className="header">
                         <Link to="/">Go back</Link>
                     </div>
                     <div className="container">
                         <div className="single-page">
                            <h2> <span>Currency name:</span> {selectedCurrency.name || "-"}</h2>

                            <p>Symbol: <span>{selectedCurrency.symbol || "-"}</span></p>

                            <p>ID number: <span>{selectedCurrency.id || "-"}</span></p>

                            <p>Price: 
                                <span>
                                {selectedCurrency.quote ? 
                                    this.convertNumbers(selectedCurrency.quote.USD.price) 
                                    : null}$
                                </span>
                            </p>

                            <p>Volume (24h): 
                                <span>
                                {selectedCurrency.quote ? 
                                    this.convertNumbers(selectedCurrency.quote.USD.volume_24h)
                                    : null} %
                                </span>
                            </p>

                            <p>Last (24h): 
                                <span>
                                {selectedCurrency.quote ? 
                                    parseFloat(selectedCurrency.quote.USD.percent_change_24h).toFixed(2)
                                    : "-"}$
                                </span>
                            </p>
                            
                            <p>Date cryptocurrency was added to the system: <span>{date.getDate()}/{date.getMonth()}/{date.getFullYear() || "-"}</span></p>

                            <p>The currency was updated last time: 
                                <span>
                                    {" " + lastUpdate.getDate()}/{lastUpdate.getMonth()}/{lastUpdate.getFullYear() || "-"}
                                </span>
                            </p>

                            <p>Circulating Supply: 
                                 <span>
                                    {" " + this.convertNumbers(selectedCurrency.circulating_supply) || "-"}
                                 </span>
                            </p>

                            <p>Max Supply: 
                                 <span>
                                    {" " + selectedCurrency.max_supply ? this.convertNumbers(selectedCurrency.max_supply) 
                                    : "-"}
                                 </span> BTC
                            </p>

                             <p>Number of market pairs across all exchanges trading each currency: 
                                 <span>
                                    {" " + selectedCurrency.num_market_pairs || "-"}
                                 </span>
                            </p>

                             <p>Approximate total amount of coins in existence right now: 
                                <span>
                                    {" " + this.convertNumbers(selectedCurrency.total_supply)} 
                                </span>
                            </p>
                            <p>CMC Rank: 
                                <span>
                                    {" " + selectedCurrency.cmc_rank || "-"}
                                </span>
                            </p>
                            <p>Slug: 
                                <span>
                                    {" " + selectedCurrency.slug || "-"}
                                </span>
                            </p>
                            <p>Number of market pairs: 
                                <span>
                                    {" " + selectedCurrency.num_market_pairs || "-"}
                                </span>
                            </p>
                            <p>Market Cup: 
                                <span>
                                    {selectedCurrency.quote ? 
                                        this.convertNumbers(selectedCurrency.quote.USD.market_cap) 
                                        : null}$
                                </span>
                            </p>
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