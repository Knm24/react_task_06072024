import { Component } from 'react';
import SearchComponent from './component/class1/SearchComponent.tsx';
import ResultsComponent from './component/class1/ResultsComponent';
import ErrorBoundary from './component/class1/ErrorBoundary';

interface AppState {
  searchTerm: string;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    searchTerm: '',
  };

  handleSearchTermChange = (term: string) => {
    this.setState({ searchTerm: term });
  };

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.setState({ searchTerm: trimmedTerm });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <div className="search-section">
            <SearchComponent
              searchTerm={this.state.searchTerm}
              onSearchTermChange={this.handleSearchTermChange}
              onSearch={this.handleSearch}
            />
          </div>
          <div className="results-section">
            <ResultsComponent searchTerm={this.state.searchTerm} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;