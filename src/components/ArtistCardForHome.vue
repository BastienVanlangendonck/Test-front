<template>
  <div class="col-sm-3 mg-b">
    <div class="card mb-4">
      <img class="card-img-top" :src="artist.photo" :alt="artist.prenom+' '+artist.nom">
      <span class="text-white" style="padding: .75rem 1.25rem; margin-top:-2.35rem; background: linear-gradient(to top, black 0%, transparent 100%)">Nombre d'écoutes : <b>{{nbrEcouteTotal[0]}}</b></span>
      <div class="card-body">
        <h5 class="card-title">
          {{artist.prenom}} {{artist.nom}}
          <div class="text-muted">({{artist.age}} ans)</div>
        </h5>
        <p class="card-text custom-max-vh">{{artist.bio}}</p>
        <router-link :to="{name: 'artist', params: {id: artist._id}}" class="btn btn-primary btn-block mt-2">Voir la page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
var lodash = require('lodash');
/**
 * Afficher le nombre d'écoutes à la place du todo. - DONE
 */

export default {
    name: "ArtistCardForHome",
    props: {
      artist: {
        type: Object,
        required: true
      }
    },

    methods: {
      conslog(e) {
        console.log(e);
      }
    },
    data() {
    return {
        nbrEcoute: [],
        nbrEcouteTotal: []
    };
  },

    mounted() {

      for(var b in this.artist.albums) {
        for(var c in this.artist.albums[b].musiques)
        this.nbrEcoute.push(this.artist.albums[b].musiques[c].nombreEcoutes)
      }

      var sum = lodash.sum(this.nbrEcoute);
      this.nbrEcouteTotal.push(sum)
    },

    
  };
</script>

<style scoped>
  .custom-max-vh {
    max-height: 10em;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  }
</style>