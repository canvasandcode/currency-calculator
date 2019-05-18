import React, { Component } from "react";

class App extends Component {
  state = {
    currencies: [],
    base: "USD", //default value
    amount: "",
    convertTo: "BGN", //Bulgarian Lev currency 
    result: ""
  };


  //Fetching data from an API, returning as .json, creating a variable consisting of they keys (currency codes) - using these as an array to populare the dropdowns
  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest")
      .then(response => {
        return response.json();
      })
      .then(data => {
        let currenciesFromApi = Object.keys(data.rates);
        console.log(currenciesFromApi);
        this.setState({
          currencies: currenciesFromApi
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


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
    const { base, amount, convertTo, result } = this.state; //destructured from state
    return (
      <section className="wrapper">
        <div className="wrapper_inner">
          <h2 className="title">Currency Converter</h2>

          <div className="flex">
            <form className="flex-column">

              <p className="label">
                {amount} {base} =
                {amount === ""
                  ? "0"
                  : result === null
                  ? "Calculating..."
                  : result}{" "}
                {convertTo}
              </p>
              
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
                className="result_input"
                type="number"
                value={amount}
                onChange={this.handleInput}
              />
            </form>

            <form className="flex-column">
            <p className="label">
                {amount} {convertTo} =
                {result === ""
                  ? "0"
                  : result === null
                  ? "Calculating..."
                  : result}{" "}
                
              </p>
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
