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
              <a class="dropdown-item" v-on:click="NameOrderAsc()" href='#'>Nom (Croissant)</a>
              <a class="dropdown-item" v-on:click="NameOrderDesc()">Nom (Decroissant)</a>
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

      <div class="row" v-if="nameDesc">
    <!--  Ajouter les informations de nombre d'écoute-->
    <ArtistCardForHome
      v-for="artist in NameOrderDesc()"
      :artist="artist"
      :key="artist._id"
    ></ArtistCardForHome>
  </div>

  <div class="row" v-if="nameAsc">
    <!--  Ajouter les informations de nombre d'écoute-->
    <ArtistCardForHome
      v-for="artist in NameOrderAsc()"
      :artist="artist"
      :key="artist._id"
    ></ArtistCardForHome>
  </div>



  <div class="row" v-else>
    <ArtistCardForHome
      v-for="artist in resultQuery"
      :artist="artist"
      :key="artist._id"
    ></ArtistCardForHome>
  </div>
</template>

<script>
import ArtistCardForHome from "./ArtistCardForHome.vue";
const collect = require('collect.js');
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
      isSortedBy: "",
      searchQuery: null,
      FilteredData: [],
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

    nameAsc() {
      return this.resultQuery.length && this.isSortedBy === "NameAsc" 
    },

    nameDesc() {
      return this.resultQuery.length && this.isSortedBy === "nameDesc" 
    }


  },
  methods: {
    conslog(e) {
      console.log(e);
    },
    
    NameOrderAsc() {
        this.isSortedBy = ""
        this.isSortedBy = "NameAsc"
        this.FilteredData= collect([]);
        this.reshearch= [];
        for (var i in this.resultQuery) {
        this.reshearch.push(this.resultQuery[i])
        }
        for (var j in this.reshearch){
          this.FilteredData.push(this.reshearch[j])
        }
        const sortedNames = this.FilteredData.sortBy('nom');
        sortedNames.all();
        return sortedNames.items;
      },

      NameOrderDesc() {
        this.isSortedBy = ""
        this.isSortedBy = "NameDesc"
        this.FilteredData= collect([]);
        this.reshearch= [];
        for (var i in this.resultQuery) {
        this.reshearch.push(this.resultQuery[i])
        }
        for (var j in this.reshearch){
          this.FilteredData.push(this.reshearch[j])
        }
        const sortedNamesDesc = this.FilteredData.sortByDesc('nom');
        sortedNamesDesc.all();
        console.log(sortedNamesDesc.items)
        return sortedNamesDesc.items;
      },
    },
};
</script>

<style scoped>
</style>