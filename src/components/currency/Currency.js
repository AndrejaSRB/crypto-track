import React, { Component } from 'react';
import './Currency.sass';
import { Link } from 'react-router-dom';

class Currency extends Component {
    state = {
        currencies: [],
        storageArray: [],
        storage: []
    }

    // calling a function for fetching
    // setting interval on every 60s to recall API
    componentDidMount = () => {
        this.getCurrencies('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a2a4a6fb-2033-4d55-8751-88e2434d6985');
        setInterval(() => this.getCurrencies('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a2a4a6fb-2033-4d55-8751-88e2434d6985'), 60000);

        this.getLocalStorage()
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
            newCurrencies[index].myValueCoin = e.target.value;
            newCurrencies[index].myCalculatedValueCoin = parseFloat(e.target.value * newCurrencies[index].quote.USD.price).toFixed(2);
            this.setState({ currencies: newCurrencies });
        }else {
            warningBtn[index].style.display="block";
        }  
    }

    //giving a functionality to Submit button on press
    activeButton = (e, index) => {
        if (e.charCode === 13){
            let allButtons = document.querySelectorAll(".submit-btn");
            const newCurrencies = [...this.state.currencies];
            newCurrencies[index].myValueCoin = e.target.value;
            newCurrencies[index].myValueCoin ? allButtons[index].removeAttribute('disabled', true) : allButtons[index].setAttribute('disabled', false);
        }   
    }

    //preparing data to set in localStorage
    setLocalStorage = currency => {
        let newStorageArray = [];
        const storageObj = {
            name: currency.name,
            value: currency.myValueCoin
        }
        newStorageArray = [...this.state.storageArray, storageObj];
        this.setState({ storageArray: newStorageArray});
    }

    //taking data from localStorage
    getLocalStorage = () => {
        localStorage.getItem('storage');
        let getStorage = JSON.parse(localStorage.getItem('storage'));
        this.setState({storage : getStorage});
    }

    render() {   
        if (this.state.storageArray.length > 0){
            localStorage.setItem('storage', JSON.stringify(this.state.storageArray));
        }

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
                                        onKeyPress={(e) => this.activeButton(e,index)}
                                    />
                                    <span className="warning">Oops. You should enter a number.</span>
                                    <button 
                                    className="submit-btn" 
                                    value="Submit"
                                    onClick={()=>this.setLocalStorage(currency)}
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