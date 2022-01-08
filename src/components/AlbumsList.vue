<template>

<div class="col-sm-3 mg-b">
    <div class="card mb-4">
      <img :src="album.couverture" :alt="album.intitule" class="img-thumbnail">
      <div class="card-body">
        <h5 class="card-title">oui
          <div class="text-muted"></div>
        </h5>
      </div>
    </div>
  </div>

</template>

<script>

export default {
    name: "AlbumsList",
    props: {
      album: {
        type: Object,
        required: true
      },
    }
  };
</script>