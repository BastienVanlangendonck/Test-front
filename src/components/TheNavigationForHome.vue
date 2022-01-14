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
              <a class="dropdown-item" v-on:click="handleSortingClick" data-sort="name-asc">Nom (Croissant)</a>
              <a class="dropdown-item" v-on:click="handleSortingClick" data-sort="name-desc">Nom (Decroissant)</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" v-on:click="handleSortingClick" data-sort="age-asc">Age (Croissant)</a>
              <a class="dropdown-item" v-on:click="handleSortingClick" data-sort="age-desc">Age (Decroissant)</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" v-on:click="handleSortingClick" data-sort="listen-asc">Nombre d'écoutes (Croissant)</a>
              <a class="dropdown-item" v-on:click="handleSortingClick" data-sort="listen-desc">Nombre d'écoutes (Decroissant)</a>
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
    <SortedCards :conditions="this.sortingCondition" :resultQuery="resultQuery" :resultQueryFilter="resultQueryFilter" :sortingArray="this.sortingArray" />
</template>

<script>
import SortedCards from "./SortedCards.vue";
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
    SortedCards,
  },
  data() {
    return {
      isFiltered: false,
      sortingCondition: '',
      sortingArray: [],
      searchQuery: null,
      FilteredData: [],
      testData: []
    };
  },

  computed: {
    resultQuery() {
      if (this.searchQuery && !this.isFiltered) {
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

     resultQueryFilter() {
       if (this.searchQuery && this.isFiltered) {
         return this.sortingArray.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.prenom.toLowerCase().includes(v) ||
                item.nom.toLowerCase().includes(v)
            );
        });
      } return this.sortingArray
    } 
  },

  methods: {
    conslog(e) {
      console.log(e);
    },

    handleSortingClick(event) {
      const sort = event.target.dataset.sort;
      this.sortingCondition = sort;

      if (sort === 'name-asc') {
        this.sortingArray = this.NameOrderAsc();
        this.$store.commit('setSortingArray', this.sortingArray)
        this.isFiltered = true
      }
      else if (sort === 'name-desc') {
        this.sortingArray = this.NameOrderDesc();
        this.$store.commit('setSortingArray', this.sortingArray)
        this.isFiltered = true
      }
      else if (sort === 'age-asc') {
        this.sortingArray = this.AgeOrderAsc();
        this.$store.commit('setSortingArray', this.sortingArray)
        this.isFiltered = true
      }
      else if (sort === 'age-desc') {
        this.sortingArray = this.AgeOrderDesc();
        this.$store.commit('setSortingArray', this.sortingArray)
        this.isFiltered = true
      }
      else if (sort === 'listen-asc') {
        this.sortingArray = this.ListenOrderAsc();
        this.$store.commit('setSortingArray', this.sortingArray)
        this.isFiltered = true
      }
      else if (sort === 'listen-desc') {
        this.sortingArray = this.ListenOrderDesc();
        this.$store.commit('setSortingArray', this.sortingArray)
        this.isFiltered = true
      }
    },
    
    FilteredArray() {
        this.FilteredData= collect([]);
        this.reshearch= [];
        for (var i in this.resultQuery) {
        this.reshearch.push(this.resultQuery[i])
        }
        for (var j in this.reshearch){
          this.FilteredData.push(this.reshearch[j])
        }
        return this.FilteredData
    },  

    NameOrderAsc() {
      const sortedNamesAsc = this.FilteredArray().sortBy('nom');
      sortedNamesAsc.all();
      return sortedNamesAsc.items;
    },

    NameOrderDesc() {
      const sortedNamesDesc = this.FilteredArray().sortByDesc('nom');
      sortedNamesDesc.all();
      console.log(sortedNamesDesc.items)
      return sortedNamesDesc.items;
    },

    AgeOrderAsc() {
      const sortedAgeAsc = this.FilteredArray().sortBy('age');
      sortedAgeAsc.all();
      return sortedAgeAsc.items;
    },

    AgeOrderDesc() {
      const sortedAgeDesc = this.FilteredArray().sortByDesc('age');
      sortedAgeDesc.all();
      return sortedAgeDesc.items;
    },

    ListenOrderAsc() {
      const sortedListenAsc = this.FilteredArray().sortBy('nombreEcoutes');
      sortedListenAsc.all();
      return sortedListenAsc.items;
    },

    ListenOrderDesc() {
      const sortedListenDesc = this.FilteredArray().sortByDesc('nombreEcoutes');
      sortedListenDesc.all();
      return sortedListenDesc.items;
    },
  },
};
</script>

<style scoped>
</style>