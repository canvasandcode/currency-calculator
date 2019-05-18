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
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`) //fetch() data
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
    const { currencies, base, amount, convertTo, result } = this.state; //destructure from state
    return (
      <section>
        <h2>Currency Converter</h2>

        <div className="flex">
          <form className="">
            <input
              className=""
              type="number"
              value={amount}
              onChange={this.handleInput}
            />
            <select
              className=""
              name="base"
              value={base}
              onChange={this.handleDropDown}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </form>

          <form className="">
            <input
              className=""
              value={
                amount === ""
                  ? "0"
                  : result === null
                  ? "Calculating..."
                  : result
              }
            />

            <select
              className=""
              name="convertTo"
              value={convertTo}
              onChange={this.handleDropDown}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </form>
        </div>
      </section>
    );
  }
}

export default CurrencyConverter;
