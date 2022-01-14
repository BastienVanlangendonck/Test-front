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
  <!--  Prendre en compte les filtres pour afficher seulement les artistes correspondants à la recherche DONE -->
    <!-- Création d'un composant afin de pouvoir dynamiser au mieux l'affichage des cartes -->
    <SortedCards :conditions="this.sortingCondition" :resultQuery="resultQuery" :resultQueryFilter="resultQueryFilter" :sortingArray="this.sortingArray" />
</template>

<script>
import SortedCards from "./SortedCards.vue";
const collect = require('collect.js'); /* Ajout de Collect.js pour facilité le trie via key */
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
    };
  },

  computed: {
    resultQuery() {
      if (this.searchQuery && !this.isFiltered) { /* Si il y a une value dans la recherche et que isFiltered = false ce trie sera effectuer sur this.artists */
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
         return this.sortingArray.filter((item) => { /* Si il y a une value dans la recherche et que isFiltered = true ce trie sera effectuer sur this.sortingArray qui est notre tableau de UserCards trié */
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.prenom.toLowerCase().includes(v) || /* Si la valeur entré correspond au prénom ou nom de la personne alors on la renvoie */
                item.nom.toLowerCase().includes(v)
            );
        });
      } return this.sortingArray
    } 
  },

  methods: {
    handleSortingClick(event) {
      const sort = event.target.dataset.sort; /* Creation d'un handleClick qui va comparé la dataset ajouté dans le dropdown et va agir selon la donnée qu'il reçoit */
      this.sortingCondition = sort;

      if (sort === 'name-asc') {
        this.sortingArray = this.NameOrderAsc(); /* Appel d'une fonction qui effectue le trie et renvoie un tableau trié */
        this.$store.commit('setSortingArray', this.sortingArray) /* Ajout des données dans le store */
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
        this.FilteredData= collect([]); /* Utilisation de collect sur mon tableau de données afin de pouvoir faire les tri */
        this.reshearch= [];
        for (var i in this.resultQuery) { /* Pour chaque resultat on push les données dans un tableau */
        this.reshearch.push(this.resultQuery[i])
        }
        for (var j in this.reshearch){ /* Puis on renvoie toute ces nouvelles données dans this.FilteredData que l'ont return ce qui nous permet d'appeler la fonction a chaque
                                          demande de trie comme tableau de base mais que lors ce que je suis en mode trie  */
          this.FilteredData.push(this.reshearch[j])
        }
        return this.FilteredData
    },

    NameOrderAsc() {
      const sortedNamesAsc = this.FilteredArray().sortBy('nom'); /* Tri par nom asc, SortBy et SortByDesc sont utilisable grace à Collect */
      sortedNamesAsc.all();
      return sortedNamesAsc.items;
    },

    NameOrderDesc() {
      const sortedNamesDesc = this.FilteredArray().sortByDesc('nom');
      sortedNamesDesc.all();
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