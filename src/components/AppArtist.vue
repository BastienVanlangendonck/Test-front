<template>
  <template v-if="artist">
    <div class="row border-bottom mb-4 pb-4">
     
      <ArtistDetails :artist="this.artist"></ArtistDetails>

    <div class="col col-lg-3">

      <SimilarArtistList :artistsSimilaires="this.artistsSimilaires" :artist="this.artist"></SimilarArtistList>

      </div>
    </div>

    <div class="row mb-4">
      
      <ArtistPopularSong :titresPopulaires="this.titresPopulaires"></ArtistPopularSong>

    </div>

    <div class="row mb-4 border-bottom mb-4 pb-4">
      
      <ArtistAlbum :artist="this.artist" :titleNumber=[1,2,3,4,5,6]></ArtistAlbum>

    </div>
    <div class="row mb-4 border-bottom mb-4 pb-4">
     
      <ArtistAlbum :artist="this.artist" :titleNumber=[1,2,3,4]></ArtistAlbum>

    </div>
    <div class="row mb-4 border-bottom mb-4 pb-4">

      <AlbumsList v-for="album in Albums" :album="album" :key="album._id"></AlbumsList>

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
import AlbumsList from './AlbumsList.vue';

// TODO : Séparer cette page monolithique en composants réutilisables - DONE
// TODO : Afficher les titres des chansons avec une majucule sur la première lettre - DONE
// TODO : formater les nombres d'écoutes pour les rendre plus facile à lire avec un séparateur de milliers - DONE
// TODO : récupérer et ordonner les vrais titres les plus écoutés de l'artiste
// TODO : afficher 5 ou 10 titres et changer le texte du bouton "Afficher plus de titres" en fonction de l'état
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
    AlbumsList
  },
  data() {
    return {
      artist: null,
      artistsSimilaires: [],
      titresPopulaires: [],
      songsList: [],
      Albums: [],
      AlbumsDate: []
    };
  },
  async mounted() {
    const response = await axios.get('http://localhost:8085/artistes.json');

    for (var i in response.data) {
      if(response.data[i]._id === this.id) {
        this.artist = response.data[i];
        /* console.log(this.artist); */
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


    this.titresPopulaires = this.mostListenedSongs();

  },
  methods: {

    

    mostListenedSongs() {
      return [
        {
          "_id": "618ae89fc40339e626d8dff2",
          "numero": 0,
          "titre": "reprehenderit in voluptate",
          "dureeSecondes": 293,
          "nombreEcoutes": 806453529,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        },
        {
          "_id": "618ae89ff18f04ae3de8ce14",
          "numero": 1,
          "titre": "minim",
          "dureeSecondes": 231,
          "nombreEcoutes": 129446587,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        },
        {
          "_id": "618ae89f771d425479ac8e65",
          "numero": 2,
          "titre": "tempor cupidatat",
          "dureeSecondes": 239,
          "nombreEcoutes": 741808849,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        },
        {
          "_id": "618ae89f506ca1120b835347",
          "numero": 3,
          "titre": "deserunt",
          "dureeSecondes": 323,
          "nombreEcoutes": 182839200,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        },
        {
          "_id": "618ae89f3cc86e1ea38d91f3",
          "numero": 4,
          "titre": "labore enim mollit",
          "dureeSecondes": 270,
          "nombreEcoutes": 374839288,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        }
      ];
    }
  }
};
</script>

<style scoped>

</style>
