<template>
    <div class="col-lg-2">
        <img :src=album.couverture :alt="artist.prenom+' '+artist.nom" class="img-thumbnail">
        <h5>
          {{strUcFirst(album.intitule)}}
          <span class="text-muted">{{setDate()}}</span>
        </h5>
      </div>
      <div class="col-lg-7">
        <table class="table">
          <tbody>
          <tr v-for="song in album.musiques" :key="song">
            <td class="align-middle">
              {{strUcFirst(song.titre)}}
            </td>
            <td class="text-right align-middle">
              {{secondsToMinutes(song.dureeSecondes)}}
            </td>
            <td class="text-right align-middle">
              {{song.nombreEcoutes.toLocaleString("de-DE")}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
</template>


<script>


export default {
    name: "ArtistAlbum",
    props: {
      artist: {
        type: Object,
        required: true
      },
    album: {
        type: Object,
        required: true
      },
    },
 
    methods: {
      setDate() { /* Function permettant de modifier l'ordre de retour de la date  */
      const [year, month, day] = this.album.newDateFormat.split('-');
      return `${day}/${month}/${year}`;
    },
      secondsToMinutes(time) { /* Function qui permet de convertir les secondes en minutes */
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;
      return minutes + ":" + seconds;
    },
      strUcFirst(title) { /* Function qui permet de mettre une majuscule */
      return (title + "").charAt(0).toUpperCase() + title.substr(1);
    },
  }
};
</script>


<style scoped>
  .col-lg-7 {
    margin: 3.5rem;
  }
</style>