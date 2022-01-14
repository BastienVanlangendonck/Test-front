import { createStore } from "vuex";

const store = createStore({
  state: {
    artists: [],
    sortingArray: [],
  },
  getters: {
     getArtists(state) {
      return state.artists;
    },

    getSortingArray(state) {
      return state.sortingArray;
    },

  },
  mutations: {
    setArtists(state, artists) {
      if (!artists) {
        artists = [];
      }
      
      state.artists = artists;
    },

    setSortingArray(state, SortingArray) {
      if (!SortingArray) {
        SortingArray = [];
      }
      
      state.sortingArray = SortingArray;
    },
  },
  strict: true
});

export default store;
