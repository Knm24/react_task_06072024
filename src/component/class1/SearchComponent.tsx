import React, { Component } from 'react';

interface SearchComponentProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
}

class SearchComponent extends Component<SearchComponentProps> {
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchTermChange(event.target.value);
  };

  handleSearch = () => {
    this.props.onSearch();
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchComponent;