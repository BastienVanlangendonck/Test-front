 <template>
  <div class="col-lg-2">
    <img
      :src="artist.photo"
      :alt="artist.prenom + ' ' + artist.nom"
      class="img-thumbnail"
    />
    <span
      class="badge badge-secondary mr-2 mt-1"
      v-for="tag in artist.tags"
      :key="tag"
    >
      {{ tag }}
    </span>
  </div>
  <div class="col-lg-7">
    <h3>
      {{ artist.prenom }} {{ artist.nom }}
      <span class="text-muted">({{ artist.age }} ans)</span>
    </h3>
    <p>
      {{ artist.bio }}
    </p>
  </div>
</template>

<script>

export default {
    name: "ArtistDetails",
    props: {
      artist: {
        type: Object,
        required: true
      }
    }
  };
</script>