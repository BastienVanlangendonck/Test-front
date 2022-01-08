<template>
  <div class="col-lg-2"></div>
  <div class="col-lg-7">
    <table class="table table-striped">
      <thead class="thead-light">
        <tr>
          <th></th>
          <th>Titres populaires</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="titre in titresPopulaires" :key="titre._id">
          <td>
            <img :src="titre.couverture" style="width: 30px" />
          </td>
          <td class="align-middle">
            {{ strUcFirst(titre.titre) }}
          </td>
          <td class="text-right align-middle">
            {{ secondsToMinutes(titre.dureeSecondes) }}
          </td>
          <td class="text-right align-middle">
            {{ titre.nombreEcoutes.toLocaleString("de-DE") }} <!-- Ajout du param "de-DE" pour les points entre les milliers plutot que des espaces simples. -->
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-center">
            <fa icon="add"></fa>
            Afficher plus de titres
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import FontAwesomeIcon from "../plugins/font-awesome";

export default {
  name: "ArtistPopularSong",
  components: {
    fa: FontAwesomeIcon,
  },
  props: {
    titresPopulaires: {
      type: Object,
      required: true,
    },
  },
  methods: {
    secondsToMinutes(time) {
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;
      return minutes + ":" + seconds;
    },

    strUcFirst(title) {
      return (title + "").charAt(0).toUpperCase() + title.substr(1);
    },
  },
};
</script>