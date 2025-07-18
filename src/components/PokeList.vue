<template>
  <div class="container">
    <div class="container-item">
      <v-card
        class="pokemon-card"
        v-for="pokemon in pokemons"
        :key="pokemon.name"
      >
        <div class="info">
          <v-card-title id="title">
            {{ pokemon.name }}
            <v-btn @click="playSound(pokemon.name)"> 🔈 </v-btn>
            <v-img :src="pokemon.image" :width="150"></v-img>
          </v-card-title>
          <v-card-text id="text">
            <p>Altura: {{ (pokemon.height / 10).toFixed(1) }} m</p>
            <p>Peso: {{ pokemon.weight / 10 }} kg</p>
          </v-card-text>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["pokemons"],
  methods: {
    playSound(pokemonName: string) {
      const soundUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemonName.toLowerCase()}.mp3`;
      const audio = new Audio(soundUrl);
      audio.play();
    },
  },
});
</script>

<style>
.container {
  max-width: 70%;
  border-radius: 30px;
  background-color: #ffcb05;
  box-shadow: 0 0 0 0.3px #3b4cca;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.container-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 16px;
}

.pokemon-card {
  display: flex;
  justify-content: center;
  border-radius: 10px;
  width: calc((100% / 5) - 16px);
}

#title {
  font-family: "Press Start 2P", system-ui;
  font-style: normal;
  font-size: 1em;
  color: #ffcb05;
  text-shadow: -1px -1px 0 #3b4cca, 1px -1px 0 #3b4cca, -1px 1px 0 #3b4cca,
    1px 1px 0 #3b4cca;
}

#text {
  padding: 5px;
  margin: 10px;
  border: 10px;
  font-size: 1em;
  color: black;
  border: 1px solid #3b4cca;
  width: 200px;
  border-radius: 15px;
  background-color: #cbecff;
}

.v-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  padding: 0 !important;
  min-width: 0 !important;
}
@media (max-width: 768px) {
  .pokemon-card {
    width: calc((100% / 2) - 16px);
  }
}

@media (max-width: 480px) {
  .pokemon-card {
    width: 100%;
  }
}
</style>