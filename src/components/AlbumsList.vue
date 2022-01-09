<template>

<div class="col-sm-3 mg-b">
    <div class="card mb-4">
      <img :src="album.couverture" :alt="album.intitule" class="img-thumbnail">
      <div class="card-body">
        <h5 class="card-title">{{album.intitule}}
          <div class="text-muted"></div>
        </h5>
        <div class="card-date">{{setDate()}}</div>
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
    },

  methods: {
    setDate() {
      const [year, month, day] = this.album.newDateFormat.split('-');
      return `${day}/${month}/${year}`;
    }
  }
};
</script>