<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light"
    style="margin-bottom: 1rem"
  >
    <router-link
      to="/"
      class="navbar-brand"
      style="background: transparent; color: black !important"
      >Artistes</router-link
    >

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>

      <form class="form-inline">
        <div class="input-group mb-1">
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Trier
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Nom (Croissant)</a>
              <a class="dropdown-item" href="#">Nom (Decroissant)</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Age (Croissant)</a>
              <a class="dropdown-item" href="#">Age (Decroissant)</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Nombre d'écoutes (Croissant)</a>
              <a class="dropdown-item" href="#"
                >Nombre d'écoutes (Decroissant)</a
              >
            </div>
          </div>
        </div>
        <input
          class="form-control"
          type="search"
          v-model="searchQuery"
          placeholder="Rechercher"
          aria-label="Rechercher"
        />
      </form>
    </div>
  </nav>
  <!--  Prendre en compte les filtres pour afficher seulement les artistes correspondants à la recherche-->
  <div class="row" v-if="artists.length">
    <!--  Ajouter les informations de nombre d'écoute-->
    <ArtistCardForHome
      v-for="r in resultQuery"
      :artist="r"
      :key="r._id"
    ></ArtistCardForHome>
  </div>
  <div class="alert alert-secondary" role="alert" v-else>
    Aucun artiste ne correspond à vos critères...
  </div>
</template>

<script>
import ArtistCardForHome from "./ArtistCardForHome.vue";
export default {
  name: "TheNavigationForHome",
  props: {
    artists: {
      type: Object,
      required: true,
    },
  },
  components: {
    ArtistCardForHome,
  },
  data() {
    return {
      searchQuery: null,
      FilteredDAta: [],
    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.artists.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.prenom.toLowerCase().includes(v) ||
                item.nom.toLowerCase().includes(v)
            );
        });
      } else {
        return this.artists;
      }
    },
  },
  methods: {
    conslog(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>
</style>