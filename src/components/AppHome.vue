<template>
  <!--  Ajouter les Filtres dans la navigation -->
  <!--  et les garder dans le store pour les conserver lors de la navigation-->
  <TheNavigationForHome :artists="this.artists"></TheNavigationForHome>


</template>

<script>
import axios from 'axios';
import TheNavigationForHome from './TheNavigationForHome.vue'

export default {
  name: "Home",
  components: {
    TheNavigationForHome,
    
  },
  data() {
    return {
      artists: []
    };
  },
  mounted() {
    axios.get('http://localhost:8085/artistes.json').then(data => this.artists = data.data);
  }
};
</script>

<style scoped>

</style>
