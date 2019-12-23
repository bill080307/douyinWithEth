<template>
  <b-card class="fun-card">
    <b-input-group>
      <b-form-input placeholder="弹幕/评论"></b-form-input>
      <b-input-group-append>
        <b-button variant="info">发送</b-button>
      </b-input-group-append>
    </b-input-group>
    <br>
    <b-input-group prepend="ETH">
      <b-form-input></b-form-input>
      <b-input-group-append>
        <b-button variant="info">打赏</b-button>
        <b-button variant="outline-success">赞</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-card>
</template>

<script>
  export default {
    name: "FunctionCard"
  }
</script>

<style scoped>
  .card-body{
    padding: 0.2rem;
  }
  .fun-card{
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: 10px;
  }
</style>