<template>
  <div>
    <div class="pageTitle">
      <h1 v-if="name === null || name === ''">{{ item.name }}</h1>
      <h1 v-else>{{ name }}</h1>
      <a @click="handleDeleteItem">删除菜单</a>
    </div>
    <p v-if="subList" class="tip">已添加子菜单，仅可设置菜单名称</p>
    <p v-else class="tip">字数不超过4个汉字或8个字母</p>
    <div class="form-item">
      <span>菜单名称</span>
      <input v-model="name" @blur="handleAddItem3" type="text">
    </div>
    <div v-if="!subList" class="form-item">
      <span>页面地址</span>
      <input v-model="url" @blur="handleAddUrl3" type="text">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      url: '',
      subList: false
    }
  },
  computed: {
    item () {
      return this.$bus.key1
    }
  },
  methods: {
    handleAddItem3 () {
      this.$bus.emit('handleAddItem3', this.name)
    },
    handleAddUrl3 () {
      this.$bus.emit('handleAddUrl3', this.url)
    },
    handleDeleteItem () {
      if (this.item !== null) {
        this.$bus.emit('handleDeleteItem', 3)
      }
    }
  }
}
</script>

<style scoped>
</style>
