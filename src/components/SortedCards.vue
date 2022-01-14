<template>
  <div class="row" v-if="this.conditions !== ''">
    <!--  Ajouter les informations de nombre d'écoute-->
    <ArtistCardForHome
      v-for="artist in this.resultQueryFilter"
      :artist="artist"
      :key="artist._id"
    ></ArtistCardForHome>
  </div>

  <div class="row" v-else>
    <ArtistCardForHome
      v-for="artist in this.resultQuery"
      :artist="artist"
      :key="artist._id"
    ></ArtistCardForHome>
  </div>
</template>


<script>
import ArtistCardForHome from "./ArtistCardForHome.vue";
export default {
  name: "SortedCards",
  props: {
    conditions: {
      type: String,
      required: true,
    },

    resultQuery: {
        type: Object,
        required: true,
    },

    resultQueryFilter: {
        type: Object,
    },

    sortingArray: {
        type: Array,
    }
  },
  components: {
    ArtistCardForHome,
  },
}
</script>

