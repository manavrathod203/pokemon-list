import React, { useState, useEffect } from 'react';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [query, setquery] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        if (!response.ok) {
          throw new Error('network error');
        }
        const data = await response.json();
        setPokemon(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-4xl font-bold text-center mb-6">Pokemon List</h1>
        <input
          type="text"
          placeholder="Search Pokemon..."
          className="block w-full max-w-md mx-auto mb-4 p-2 border rounded-lg shadow"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemon.map((pokemon) => (
            <div
              key={pokemon.name}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                  .split('/')
                  .filter(Boolean)
                  .pop()}.png`}
                alt={pokemon.name}
                className="w-20 h-20 mx-auto mb-2"
              />
              <h2 className="text-xl font-semibold">{pokemon.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
