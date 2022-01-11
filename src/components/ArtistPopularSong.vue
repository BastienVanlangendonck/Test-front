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
        <tr v-for="titre in topTen" :key="titre._id">
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
          <td colspan="4" class="text-center" :onClick="handleClick">
            <fa icon="add"></fa>
            <a class="more-title">Afficher plus de titres</a>
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
      topTen: {
      type: Array,
      required: true,
    },
      displayXSongs: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleClick(event) {
      let value = null;
      if (event.target.textContent === "Afficher plus de titres") {
        value = 10;
        event.target.textContent = "Afficher moins de titres";
      }
      else {
        value = 5;
        event.target.textContent = "Afficher plus de titres";
      }
      this.displayXSongs(value)
    },
    secondsToMinutes(time) {
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;
      return minutes + ":" + seconds;
    },

    strUcFirst(title) {
      return (title + "").charAt(0).toUpperCase() + title.substr(1);
    },

    conslog(e) {
      console.log(e)
    }
  },
};
</script>