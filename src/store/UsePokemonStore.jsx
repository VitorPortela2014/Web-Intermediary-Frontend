import { create } from 'zustand';

const UsePokemonStore = create((set) => ({
    selectPokemons: [], 
    togglePokemon: (pokemon) => 
        set((state) => {
            const isSelectd = state.selectedPokemons.some(
                (p) => p.id === pokemon.id


            )

            return {
                selectedPokemons: isSelectd
                ? state.selectedPokemons.filter((p) => p.id !== pokemon.id)
                : [...state.selectedPokemons, pokemon],


            };


        }),
}));

export default UsePokemonStore;