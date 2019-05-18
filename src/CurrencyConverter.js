import React, { Component } from "react";

class CurrencyConverter extends Component {

    state = {
        currencies: ["USD", "EUR"],
        base: "USD",
        amount: "",
        convertTo: "EUR",
        result: ""
    };

    //Handler for Select
    handleDropDown = event => {
        this.setState(
          {
            [event.target.name]: event.target.value,
            result: null
          },
          this.calculate,
        );
    };

    //Handler for Input
    handleInput = event => {
        this.setState(
          {
            amount: event.target.value,
            result: null
          },
          this.calculate
        );
    };

    //calculate function
    calculate = () => {
        const amount = this.state.amount;
        if (amount === isNaN) {
          return;
        } else {
          //
        }
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