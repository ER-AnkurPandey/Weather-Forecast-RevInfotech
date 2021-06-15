import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/weatherStation";

@connect((store) => {
  return {
    status: store.weatherStation.status,
  };
})
export default class Dashboard extends Component {
  updateCity = () => {
    const city = this.cityInput.value;
    city.length !== 0 ? this.props.dispatch(fetchData(city)) : null;
  };

  onkeyPress = (e) => {
    e.key === "Enter" ? this.updateCity() : null;
  };

  render() {
    const { city, status } = this.props;
    const wrapperClass =
      status === "failed"
        ? "weather-dashboard invalid-city"
        : "weather-dashboard";

    return (
      <div className={wrapperClass}>
        <header>
          <h1 className='heading'>Weather Forecast RevInfotech</h1>
        </header>
        <section className='controls'>
          <div>
            <input
              type='text'
              className='city-input'
              id='city-name'
              ref={(input) => {
                this.cityInput = input;
                return this.cityInput;
              }}
              onKeyPress={this.onkeyPress}
              placeholder={city}
            />
            <input
              type='button'
              value='&gt;'
              className='search'
              onClick={this.updateCity}
              id='change-city-btn'
            />
          </div>
        </section>
        <span className='error'>Please enter valid city name!</span>
      </div>
    );
  }
}
