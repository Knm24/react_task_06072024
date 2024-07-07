import React, { Component } from 'react';

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Pokemon {
  abilities: Ability[];
  id: number;
  name: string;
  description: string;
}

interface ResultsComponentProps {
  searchTerm: string;
}

interface ResultsComponentState {
  results: Pokemon[];
  loading: boolean;
  error: Error | null;
}

class ResultsComponent extends Component<ResultsComponentProps, ResultsComponentState> {
  state: ResultsComponentState = {
    results: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: ResultsComponentProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchData(this.props.searchTerm);
    }
  }

  fetchData = (searchTerm: string) => {
    this.setState({ loading: true, error: null });
    console.log('Fetching data for:', searchTerm);
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const pokemon: Pokemon = {
          id: data.id,
          name: data.name,
          abilities: data.abilities || [],
          description: 'Enter pokemon name example: bulbasaur, ivysaur, rattata, weedle, kakuna',
        };
        this.setState({ results: [pokemon], loading: false });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    const { results, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div>
        <h2>Full Result:</h2>
        {results.map((pokemon: Pokemon) => (
          <div key={pokemon.name}>
            <h3>{pokemon.name}</h3>
            <p>{pokemon.description}</p>
            <h4>Abilities:</h4>
            <ul>
              {pokemon.abilities.map((ability, index) => (
                <li key={index}>
                  Ability: {ability.ability.name}, Hidden: {ability.is_hidden ? 'Yes' : 'No'}, Slot: {ability.slot}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <h2>List of Results:</h2>
        <ul>
          {results.map((pokemon: Pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ResultsComponent;
