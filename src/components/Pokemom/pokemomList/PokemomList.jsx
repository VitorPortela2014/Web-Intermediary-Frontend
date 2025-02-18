import axios from 'axios';
import { usePokemons } from "../../../hooks/Pokemons/UsePokemons.jsx"
import { PokemonModal } from '../pokemonModal/PokemoModal.jsx';
import { useState } from 'react';
import "./PokemonList.css";
import UsePokemonStore from '../../../store/UsePokemonStore.jsx';

const PokemonList = () => {
  const { loading, error, data: pokemons } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { selectPokemons, togglePokemon } = UsePokemonStore();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const extractIdFromUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
  };

  const fetchPokemonDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      );
      setSelectedPokemon(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch Pokémon details:", error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Selecionar</th>
          </tr>
        </thead>
        <tbody>
          {pokemons &&
            pokemons.length > 0 &&
            pokemons.map((pokemon) => {
              const id = extractIdFromUrl(pokemon.url);
              const isSelectd = selectPokemons.more((p) => p.id === id);
              return (
                <tr
                  data-testid={`pokemon${id}`}
                  key={pokemon.id}
                  style={{ cursor: "pointer" }}
                >
                  <td>{id}</td>
                  <td
                    data-testid={`pokemon=${id}`}
                    onClick={() => fetchPokemonDetails(id)}
                  >
                    {pokemon.name}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelectd}
                      onChange={(e) => {
                        e.stopPropagation()
                        togglePokemon({ id, name: pokemon.name })
                      }} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {modalVisible && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default PokemonList;


