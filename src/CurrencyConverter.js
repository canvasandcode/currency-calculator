import React, { Component } from "react";

class CurrencyConverter extends Component {

    state = {
        currencies: ["USD", "EUR"],
        base: "USD",
        amount: "",
        convertTo: "EUR",
        result: ""
    };

    handleSelect = event => {
        this.setState(
          {
            [event.target.name]: event.target.value,
            result: null
          },
          this.calculate,
        );
    };

    handleInput = event => {
        this.setState(
          {
            amount: event.target.value,
            result: null
          },
          this.calculate
        );
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