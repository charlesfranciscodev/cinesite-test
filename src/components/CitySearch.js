import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";

import { autocompleteSearchByLocation } from "../services";
import "./CitySearch.scss";

class CitySearch extends Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: [],
    };
  }

  getSuggestionValue = (city) => {
    return city.LocalizedName;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (city) => {
    return (
      <div>
        <Link
          to={{
            pathname: `/daily-forecast/${city.Key}`,
            state: {
              LocalizedName: city.LocalizedName,
            },
          }}
        >
          {city.LocalizedName}
        </Link>
      </div>
    );
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (cityArray) => {
    return cityArray.length === 0 ? [] : cityArray;
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    autocompleteSearchByLocation(value).then((res) => {
      this.setState({
        suggestions: this.getSuggestions(res),
      });
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Enter location",
      value,
      onChange: this.onChange,
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default CitySearch;
