import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }
  
  // Function called when input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    

    // Filter out suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
   
    
      
    // Update the user input and filtered suggestions
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Function called when user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    // User pressed enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
 
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }

    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  change = (e) => {
    const {handleChange} = this.props;
    handleChange(e);
    this.onChange(e);
  }

  render() {
    const {
      onClick,
      onKeyDown,
      change,
      state: {
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions" >
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // if (index === activeSuggestion) {
              //   className = "suggestion-active";
              // }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } 
    }
    const searchResult = this.state.userInput;
    localStorage.setItem('searchResult', JSON.stringify(searchResult));
    return (
      <Fragment>
        <input
         className="form-control"
          type="text"
          onChange={change}
          onKeyDown={onKeyDown}
          value={searchResult}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
