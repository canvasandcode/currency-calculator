import React, { Component } from "react";

class CurrencyConverter extends Component {

    state = {
        currencies: ["USD", "EUR"],
        base: "USD",
        amount: "",
        convertTo: "EUR",
        result: ""
    };

    render(){
        return(
            <div>
                <p>CurrencyConverter</p>
            </div>
        )
    }
}

export default CurrencyConverter;