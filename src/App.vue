<template>
  <div>
    <Preview></Preview>
  </div>
</template>

<script>
import Preview from '@/pages/preview'
export default {
  name: 'App',
  components: {
    Preview
  }
}
</script>

<style>
a,
a:hover {
  text-decoration: none;
  cursor: pointer;
  color: #666666;
}
/* 激活状态 */
.active a {
  color: #44b549;
  border: 1px solid #44b549 !important;
  text-decoration: none;
}
.box {
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
}
</style>
