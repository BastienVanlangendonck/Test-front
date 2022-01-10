<template>
  <template v-if="artist">
    <div class="row border-bottom mb-4 pb-4">
     
      <ArtistDetails :artist="this.artist"></ArtistDetails>

    <div class="col col-lg-3">

      <SimilarArtistList :artistsSimilaires="this.artistsSimilaires" :artist="this.artist"></SimilarArtistList>

      </div>
    </div>

    <div class="row mb-4">
      
      <ArtistPopularSong :displayXSongs="this.displayXSongs" :topTen="this.topTen"></ArtistPopularSong>

    </div>

    <div class="row">
      
      <ArtistAlbum v-for="album in Albums" :album="album" :artist="this.artist" :key="album._id"></ArtistAlbum>

    </div>

  </template>

  <div class="d-flex justify-content-center" v-else>
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
const _ = require('lodash/core');

import axios from 'axios';
import ArtistDetails from './ArtistDetails.vue';
import SimilarArtistList from './SimilarArtistList.vue';
import ArtistPopularSong from './ArtistPopularSong.vue';
import ArtistAlbum from './ArtistAlbum.vue';

// TODO : Séparer cette page monolithique en composants réutilisables - DONE
// TODO : Afficher les titres des chansons avec une majucule sur la première lettre - DONE
// TODO : formater les nombres d'écoutes pour les rendre plus facile à lire avec un séparateur de milliers - DONE
// TODO : récupérer et ordonner les vrais titres les plus écoutés de l'artiste - DONE
// TODO : afficher 5 ou 10 titres et changer le texte du bouton "Afficher plus de titres" en fonction de l'état - DONE
// TODO : Afficher les albums par ordre chronologique de sortie décroissant en bas de page - DONE
// TODO : Afficher la durée des musiques au format minutes:secondes - DONE
export default {
  name: "Artist",
  props: {
    id: {
      type: String,
      require: true
    }
  },
  components: {
    ArtistDetails,
    SimilarArtistList,
    ArtistPopularSong,
    ArtistAlbum,
  },
  data() {
    return {
      artist: null,
      artistsSimilaires: [],
      titresPopulaires: [],
      songsList: [],
      Albums: [],
      AlbumsDate: [],
      topTen: []
    };
  },
  async mounted() {
    const response = await axios.get('http://localhost:8085/artistes.json');

    for (var i in response.data) {
      if(response.data[i]._id === this.id) {
        this.artist = response.data[i];
      }
    }

    this.artistsSimilaires = [];
    for (var j in response.data) {
      if(response.data[j].styleMusical === this.artist.styleMusical && response.data[j]._id !== this.artist._id) {
        this.artistsSimilaires.push(response.data[j]);
      }
    }


    this.AlbumsDate= [];
    for (var k in this.artist.albums) {
      const currentDate = this.artist.albums[k].dateSortie.split('T')[0];
      this.AlbumsDate.push(currentDate)
    }
    const SortedDates= _.sortBy(this.AlbumsDate).reverse();

    this.Albums= [];
    SortedDates.forEach((currentSortedDate) => {
      for (var l in this.artist.albums) {
        if (this.artist.albums[l].dateSortie.includes(currentSortedDate)) {
          this.artist.albums[l].newDateFormat = currentSortedDate;
          this.Albums.push(this.artist.albums[l]);
        }
      }
    })

    for (var m in this.Albums) {
      for (var p in this.Albums[m].musiques) {
        this.Albums[m].musiques[p].couverture = this.Albums[m].couverture
      }
      this.songsList.push(this.Albums[m].musiques);
    }

    const songs = [];
    this.topTen= [];
    this.songsList.forEach((currentAlbum) => {
      for(const song in currentAlbum) {
        songs.push(currentAlbum[song])
      }
      this.songsList = songs;
    })

    this.displayXSongs();


  },
  methods: {

     displayXSongs(x = 5) {
      /* https://javascript.plainenglish.io/sorting-objects-39a3cc47f9fe */
      const array = Object.entries(this.songsList).sort((a, b) => b[1].nombreEcoutes - a[1].nombreEcoutes)
      const newArray = array.map((current) => current[1])
      this.topTen = newArray.splice(0, x)
    },

    conslog(e) {
      console.log(e)
    },
  }
};
</script>

<style scoped>

</style>
