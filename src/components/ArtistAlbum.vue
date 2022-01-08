<template>
    <div class="col-lg-2">
        <img src="http://localhost:8085/img/album/No-album-art.png" :alt="artist.prenom+' '+artist.nom" class="img-thumbnail">
        <h5>
          Intitulé de l'album
          <span class="text-muted">05/11/2021</span>
        </h5>
      </div>
      <div class="col-lg-7">
        <table class="table">
          <tbody>
          <tr v-for="index in titleNumber" :key="index">
            <td class="align-middle">
              Titre de la chanson
            </td>
            <td class="text-right align-middle">
              2:45
            </td>
            <td class="text-right align-middle">
              1 548
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
    titleNumber: {
          type: Array,
          required: true
      } 
    }
  };

</script>
