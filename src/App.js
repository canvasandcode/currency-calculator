import React, { Component } from "react";

class App extends Component {
  state = {
    currencies: [],
    base: "USD", //default value
    amount: "",
    convertTo: "BGN", //Bulgarian Lev currency
    result: ""
  };

  //Fetching data from an API, returning as .json, creating a variable consisting of the keys (currency codes) - using these as an array to populate the dropdowns
  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest")
      .then(response => {
        return response.json();
      })

      .then(data => {
        let currenciesFromApi = Object.keys(data.rates); //return array of rates
        console.log(currenciesFromApi);
        this.setState({
          currencies: currenciesFromApi //add rates to state
        });
      })

      .catch(error => {
        console.log(error);
      });
  }

  //Handler for Select
  handleDropDown = e => {
    this.setState(
      {
        [e.target.name]: e.target.value, //assign value to select
        result: null
      },
      this.calculate
    );
  };

  //Handler for Input
  handleInput = e => {
    this.setState(
      {
        amount: e.target.value, //value is user input
        result: null
      },
      this.calculate
    );
  };

  //Handler for Swap Button
  handleSwap = e => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState(
      {
        convertTo: base,
        base: convertTo
      },
      this.calculate
    );
  };

  //Calculate function
  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return; // prevent function from executing if not a number
    } else {
      //else 1. fetch() data
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(res => res.json()) //2. return as json
        .then(data => {
          const result = (data.rates[this.state.convertTo] * amount).toFixed(2); //3. convert rate * input amount and allowing 2 decimal points
          this.setState({
            result //4. update state to show new result
          });
        })

        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { base, amount, convertTo, result } = this.state; //destructured from state
    return (
      <section className="wrapper">
        <div className="wrapper_inner">
          <h2 className="title">Currency Converter</h2>
          <p className="label">
            {amount} {base} = {` `}
            {amount === "" ? "0" : result === null ? "Calculating..." : result}
            {` `}
            {convertTo}
          </p>
          <div className="flex">
            <form className="flex-column">
              <select
                className="dropdown"
                name="base"
                value={base}
                onChange={this.handleDropDown}
              >
                {this.state.currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

              <input
                placeholder="Enter a value"
                className="result_input"
                type="number"
                value={amount}
                onChange={this.handleInput}
              />
            </form>

            <span className="switch_container" onClick={this.handleSwap}>
              <svg
                className="switch_icon"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M21 9l-3.984 3.984v-3H9.985V8.015h7.031v-3zM6.984 11.016v3h7.031v1.969H6.984v3L3 15.001z" />
              </svg>
            </span>

            <form className="flex-column">
              <select
                className="dropdown"
                name="convertTo"
                value={convertTo}
                onChange={this.handleDropDown}
              >
                {this.state.currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

              <input
                disabled={true}
                className="result_input"
                value={
                  amount === ""
                    ? "0"
                    : result === isNaN
                    ? "Calculating..."
                    : result
                }
              />
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
