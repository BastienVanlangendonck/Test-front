<template>
    <div class="list-group">
        <h5 class="list-group-item list-group-item-primary">{{artist.styleMusical}}</h5>
        <template v-if="artistsSimilaires.length">
            <router-link
                v-for="artistSimilaire in artistsSimilaires"
                :to="{name: 'artist', params: {id: artistSimilaire._id}}"
                :key="artistSimilaire._id"
                class="list-group-item"
                >{{artistSimilaire.prenom}} {{artistSimilaire.nom}}
            </router-link>
        </template>
        <template v-else>
            <a class="list-group-item disabled" href="#">Seul(e) artiste de {{ artist.styleMusical }} connu(e)</a>
        </template>
    </div>
</template>

<script>

export default {
    name: "SimilarArtistList",
    props: {
      artistsSimilaires: {
        type: Object,
        required: true
      },
      artist: {
        type: Object,
        required: true
      }
    }
  };
</script>