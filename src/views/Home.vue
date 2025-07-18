<template>
  <main>
    <div class="title">
      <img
        src="@/assets/pokemon-ball.png"
        alt="pokeball"
        class="img-pokeball"
      />
      <h1 class="text-styled">PokéDex</h1>
    </div>
    <hr />
    <div class="content">
      <div class="texts-content">
        <h2>
          Explore os pokémons de todas as gerações com imagens e informações
          atualizadas. Utilize a busca para encontrar seu Pokémon favorito e
          navegue entre as páginas para descobrir novas criaturas do universo
          Pokémon.
          
        </h2>
        <p class="decor">. . .</p>
        <input
          type="text"
          id="poke-name"
          v-model="searchTerm"
          placeholder="Buscar Pokémon"
        />
      </div>

      <poke-list :pokemons="filteredPokemonList"></poke-list>
      <poke-pagination></poke-pagination>
    </div>

    <footer class="credits">
      Kauan Turcato, 
      Larissa de Oliveira Mendes &
      Lucas Daniel
    </footer>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import PokeList from "../components/PokeList.vue";
import PokePagination from "../components/PokePagination.vue";
import {
  getPokemonByName,
  type PokemonListItem,
} from "../services/pokemonService";

export default defineComponent({
  components: { PokeList, PokePagination },
  data() {
    return {
      pokemonListItem: [] as PokemonListItem[],
      apiUrl: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
      totalPokemon: 0,
      searchTerm: "", // Novo: termo de busca
    };
  },

  computed: {
    filteredPokemonList(): PokemonListItem[] {
      return this.pokemonListItem.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },

  mounted() {
    this.loadPokemonList(this.apiUrl);
  },

  methods: {
    async loadPokemonList(url: string) {
      const response = await axios.get(url);

      const pokemonWithImages = await Promise.all(
        response.data.results.map(async (pokemon: { name: string }) => {
          const details = await getPokemonByName(pokemon.name);
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
          };
        })
      );
      this.pokemonListItem = pokemonWithImages;
      this.totalPokemon = response.data.count;
    },
  },
});
</script>

<style>
body {
  background-color: #cbecff;
  margin: 0;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}

.img-pokeball {
  width: 50px;
  height: auto;
}

.text-styled {
  font-family: "Press Start 2P", system-ui;
  font-weight: 400;
  font-style: normal;
  color:  #FFCB05;
  text-shadow: 
    -1px -1px 0 #3B4CCA,
     1px -1px 0 #3B4CCA,
    -1px  1px 0 #3B4CCA,
     1px  1px 0 #3B4CCA;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.texts-content {
  margin: 10px 20px;
  flex-direction: row;
  justify-content: center;
  text-align: justify;
  text-indent: 2em;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}

.decor {
  text-align: center;
  font-size: 5em;
  color: #FFCB05;
  text-shadow: 
    -1px -1px 0 #3B4CCA,
     1px -1px 0 #3B4CCA,
    -1px  1px 0 #3B4CCA,
     1px  1px 0 #3B4CCA;
}

input#poke-name {
  margin: 1em auto;          
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #FFCB05;
  background-color: white;
  box-shadow: 0 0 0 0.3px #3B4CCA;
  width: 100%;
  max-width: 550px;
  display: block; 
}

hr {
  border: 2px solid #FFCB05;
  box-shadow: 0 0 0 0.5px #3B4CCA;
  margin-top: 1em;
  width: 100%;
}

footer {
  position: fixed;
  height: 50px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #FFCB05;
  border: 0.5px solid #3B4CCA;
  margin: 0;
  padding: 1em 0;
  text-align: center;
  z-index: 1000;
  color: #3B4CCA;
  font-size: 14px;
  align-items: center;
}

</style>
