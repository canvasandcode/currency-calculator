import React, { Component } from "react";

class CurrencyConverter extends Component {
  state = {
    currencies: [],
    base: "USD", //default value
    amount: "",
    convertTo: "EUR",
    result: ""
  };

  componentDidMount() {
    fetch('https://api.exchangeratesapi.io/latest')
      .then(response=> response.json())
      .then(rates => {this.setState({ currencies: rates})});
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
    const { currencies, base, amount, convertTo, result } = this.state; //destructure from state
    return (
      <section className="wrapper">
        <div className="wrapper_inner">
          <h2 className="title">Currency Converter</h2>

          <div className="flex">
            <form className="flex-column">
              
              <select
                className="dropdown"
                name="base"
                value={base}
                onChange={this.handleDropDown}
              >
                
                  <option
                  value={currencies}>
                    
                  </option>
                
              </select>
              
              <input
                className="result_input"
                type="number"
                value={amount}
                onChange={this.handleInput}
              />
            </form>

            <form className="flex-column">
              
              <select
                className="dropdown"
                name="convertTo"
                value={convertTo}
                onChange={this.handleDropDown}
              >
                
                  <option value={currencies}>
                    
                  </option>
                
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

export default CurrencyConverter;
