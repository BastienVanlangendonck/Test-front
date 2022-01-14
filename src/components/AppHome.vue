<template>
  <!--  Ajouter les Filtres dans la navigation DONE -->
  <!--  et les garder dans le store pour les conserver lors de la navigation-->
  <TheNavigationForHome :artists="this.artists"></TheNavigationForHome>


</template>

<script>
var lodash = require('lodash');
import axios from 'axios';
import TheNavigationForHome from './TheNavigationForHome.vue'

export default {
  name: "Home",
  components: {
    TheNavigationForHome,
    
  },
  data() {
    return {
      artists: [],
    };
  },
  mounted() {
    axios.get('http://localhost:8085/artistes.json').then((data) => {
      const newdata = []
      data.data.forEach((currentArtist) => {
        const newArtistProperties = this.nbrEcouteFunc(currentArtist);
        newdata.push(newArtistProperties);
      })
      return this.artists = newdata;
      });
  },
  methods: { 
    nbrEcouteFunc(artist) {
      const newArtist = artist;
      const nbrEcoute = [];
      for(var b in artist.albums) {
        for(var c in artist.albums[b].musiques) {
          nbrEcoute.push(artist.albums[b].musiques[c].nombreEcoutes) /* Recupération de toutes les nombre d'écoute par musiques puis push dans un tableau  */
        }
      }
      var sum = lodash.sum(nbrEcoute);
      newArtist.nombreEcoutes = sum;
      return newArtist;
      }
  }
};
</script>
