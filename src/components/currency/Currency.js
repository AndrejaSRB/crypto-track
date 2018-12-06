import React, { Component } from 'react';
import './Currency.sass';
import { Link } from 'react-router-dom';

class Currency extends Component {
    state = {
        currencies: [],
        storageArray: []
    }

    // calling a function for fetching
    // setting interval on every 60s to recall API
    componentDidMount = () => {
        this.getCurrencies('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a2a4a6fb-2033-4d55-8751-88e2434d6985');
        setInterval(() => this.getCurrencies('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a2a4a6fb-2033-4d55-8751-88e2434d6985'), 60000);
    };

    //fatching API
    //setting fetching data in state
    getCurrencies = (url) => {
        fetch(url)
        .then(res => res.json())
        .then(res => {
            this.setState({currencies: res.data.slice(0,50)});           
        })
    };

    //taking input value and checking if it's a number and displaying warning message
    //adding and removing disabled buttons attribute
    //caluclate my value of currency in $
    saveOwnCurrency= (e, index) => {
        let warningBtn = document.querySelectorAll('.warning');
        for (let i = 0; i < warningBtn.length; i++) {
            warningBtn[i].style.display="none";
        }
        let isNumber = /^[0-9.]*$/;     
        if (isNumber.test(e.target.value) === true){
            const newCurrencies = [...this.state.currencies];
            let allButtons = document.querySelectorAll(".submit-btn");
            newCurrencies[index].myValueCoin = e.target.value;
            newCurrencies[index].myCalculatedValueCoin = parseFloat(e.target.value * newCurrencies[index].quote.USD.price).toFixed(2);
            newCurrencies[index].myValueCoin ? allButtons[index].removeAttribute('disabled', true) : allButtons[index].setAttribute('disabled', false);
            this.setState({ currencies: newCurrencies });
        }else {
            warningBtn[index].style.display="block";
        }    
    }

    render() {              
        return ( 
            <table className="currency-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Short Name</th>
                        <th>$ value</th>
                        <th>last 24h</th>
                        <th>Amout you own</th>
                        <th>$ value of your coin</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.currencies.length ? (
                    this.state.currencies.map((currency, index) => {            
                        return(
                            <tr key={currency.id}>
                                <Link to={currency.name}>{currency.name}</Link>
                                <td>{currency.symbol}</td>
                                <td>{parseFloat(currency.quote.USD.price).toFixed(2)}</td>
                                <td
                                style={currency.quote.USD.percent_change_24h < 0 ? {color : 'red'}: {color:'green'}}
                                >
                                {parseFloat(currency.quote.USD.percent_change_24h).toFixed(2)} %
                                </td>
                                <td className="userValue">
                                    <input 
                                        className="currency-input" 
                                        type="text" 
                                        onChange={(e) => this.saveOwnCurrency(e, index)}
                                    />
                                    <span className="warning">It's not a number!!!</span>
                                    <button 
                                    className="submit-btn" 
                                    value="Submit"
                                    disabled
                                    >
                                    Submit
                                    </button>
                                </td>
                                <td>{currency.myCalculatedValueCoin || "0.00"}$</td>
                            </tr>
                        )
                        })
                    ) : (<tr className="loading"></tr>)
                }
                </tbody>
            </table>   
        );
    }
}
 
export default Currency;