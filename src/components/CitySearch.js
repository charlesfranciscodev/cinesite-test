import React, { Component } from "react";
import Autosuggest from 'react-autosuggest';

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
      value: '',
      suggestions: [],
      cities: [
        {
          "Version": 1,
          "Key": "2333525",
          "Type": "City",
          "Rank": 13,
          "LocalizedName": "New Territories",
          "Country": {
            "ID": "HK",
            "LocalizedName": "Hong Kong"
          },
          "AdministrativeArea": {
            "ID": "TW",
            "LocalizedName": "Tsuen Wan"
          }
        },
        {
          "Version": 1,
          "Key": "349727",
          "Type": "City",
          "Rank": 15,
          "LocalizedName": "New York",
          "Country": {
            "ID": "US",
            "LocalizedName": "United States"
          },
          "AdministrativeArea": {
            "ID": "NY",
            "LocalizedName": "New York"
          }
        },
        {
          "Version": 1,
          "Key": "2515397",
          "Type": "City",
          "Rank": 21,
          "LocalizedName": "New Taipei City",
          "Country": {
            "ID": "TW",
            "LocalizedName": "Taiwan"
          },
          "AdministrativeArea": {
            "ID": "NWT",
            "LocalizedName": "New Taipei City"
          }
        },
        {
          "Version": 1,
          "Key": "187745",
          "Type": "City",
          "Rank": 30,
          "LocalizedName": "New Delhi",
          "Country": {
            "ID": "IN",
            "LocalizedName": "India"
          },
          "AdministrativeArea": {
            "ID": "DL",
            "LocalizedName": "Delhi"
          }
        },
        {
          "Version": 1,
          "Key": "298885",
          "Type": "City",
          "Rank": 32,
          "LocalizedName": "Newcastle",
          "Country": {
            "ID": "ZA",
            "LocalizedName": "South Africa"
          },
          "AdministrativeArea": {
            "ID": "NL",
            "LocalizedName": "Kwazulu-Natal"
          }
        },
        {
          "Version": 1,
          "Key": "12777",
          "Type": "City",
          "Rank": 35,
          "LocalizedName": "Newcastle",
          "Country": {
            "ID": "AU",
            "LocalizedName": "Australia"
          },
          "AdministrativeArea": {
            "ID": "NSW",
            "LocalizedName": "New South Wales"
          }
        },
        {
          "Version": 1,
          "Key": "348585",
          "Type": "City",
          "Rank": 35,
          "LocalizedName": "New Orleans",
          "Country": {
            "ID": "US",
            "LocalizedName": "United States"
          },
          "AdministrativeArea": {
            "ID": "LA",
            "LocalizedName": "Louisiana"
          }
        },
        {
          "Version": 1,
          "Key": "349530",
          "Type": "City",
          "Rank": 35,
          "LocalizedName": "Newark",
          "Country": {
            "ID": "US",
            "LocalizedName": "United States"
          },
          "AdministrativeArea": {
            "ID": "NJ",
            "LocalizedName": "New Jersey"
          }
        },
        {
          "Version": 1,
          "Key": "329683",
          "Type": "City",
          "Rank": 41,
          "LocalizedName": "Newcastle upon Tyne",
          "Country": {
            "ID": "GB",
            "LocalizedName": "United Kingdom"
          },
          "AdministrativeArea": {
            "ID": "NET",
            "LocalizedName": "Newcastle upon Tyne"
          }
        },
        {
          "Version": 1,
          "Key": "2530492",
          "Type": "City",
          "Rank": 41,
          "LocalizedName": "Newport",
          "Country": {
            "ID": "GB",
            "LocalizedName": "United Kingdom"
          },
          "AdministrativeArea": {
            "ID": "NWP",
            "LocalizedName": "Newport"
          }
        }
      ]
    };
  }

  getSuggestionValue = (city) => {
    return city.LocalizedName
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (city) => {
    return (
      <div>
        {city.LocalizedName}
      </div>
    )
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (searchQuery) => {
    let inputValue = searchQuery.trim().toLowerCase();
    return inputValue.length === 0 ? [] : this.state.cities;
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Enter location',
      value,
      onChange: this.onChange
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
