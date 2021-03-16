<template>
  <div class="list">
    <a href="/#/render-target" class="item">render target</a>
    <a href="/#/orbitControls" class="item">orbitControls</a>
  </div>
</template>
<script>
export default {
  name: 'index'
}
</script>
<style scoped>
.list a {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #586c94;
  border-bottom: #e8e8e8 1px solid;
}

.list a:active {
  background: #eee;
}
</style>