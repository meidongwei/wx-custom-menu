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
a, a:hover {
  text-decoration: none;
  cursor: pointer;
}
/* 激活状态 */
.active a {
  color: #428bca;
  border: 1px solid #428bca;
  text-decoration: none;
}
.box {
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
}
</style>
