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
      this.calculate
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

  //Calculate function
  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`) //fetch data
        .then(res => res.json()) //return as json
        .then(data => {
          const result = (data.rates[this.state.convertTo] * amount).toFixed(2); //convert rate * input amount and allowing 2 decimal points
          this.setState({
            result //update state to show new result
          });
        });
    }
  };

  render() {
    return (
      <div>
        <p>CurrencyConverter</p>
      </div>
    );
  }
}

export default CurrencyConverter;
