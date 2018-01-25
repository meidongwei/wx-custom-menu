<template>
  <div>
    <!-- 主菜单信息 -->
    <div v-if="isShow === 1">
      <div class="pageTitle">
        <h1>{{ obj.name }}</h1>
        <a @click="handleDeleteItem" href="javascript:;">删除菜单</a>
      </div>
      <p v-if="isHasSubList" class="tip1">已添加子菜单，仅可设置菜单名称</p>
      <div class="form-item">
        <h2>菜单名称</h2>
        <div>
          <input v-model="obj.name" @blur="handleUpdateData" type="text">
          <p class="tip2">字数不超过4个汉字或8个字母</p>
        </div>
      </div>

      <div v-if="!isHasSubList" class="form-item">
        <h2>页面地址</h2>
        <input v-model="obj.url" @blur="handleUpdateData" type="text">
      </div>
    </div>

    <!-- 子菜单信息 -->
    <div v-if="isShow === 2">
      <div class="pageTitle">
        <h1>{{ obj.name }}</h1>
        <a @click="handleDeleteSubItem" href="javascript:;">删除子菜单</a>
      </div>
      <p v-if="isHasSubList" class="tip1">已添加子菜单，仅可设置菜单名称</p>

      <div class="form-item">
        <h2>子菜单名称</h2>
        <div>
          <input v-model="obj.name" @blur="handleUpdateSubData" type="text">
          <p class="tip2">字数不超过8个汉字或16个字母</p>
        </div>
      </div>
      <div class="form-item">
        <h2>子页面地址</h2>
        <input v-model="obj.url" @blur="handleUpdateSubData" type="text">
      </div>
    </div>

    <!-- 欢迎页 -->
    <div v-if="isShow === 0">
      <h1 style="font-size: 50px;">Welcome</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Number,
      default: 0
    },
    tabId: {
      type: Number,
      default: 0
    },
    subId: {
      type: Number,
      default: 0
    },
    obj: {
      type: Object,
      default () {
        return {
          name: '',
          url: '',
          id: 0,
          subList: []
        }
      }
    },
    isHasSubList: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: '',
      url: ''
    }
  },
  methods: {
    handleUpdateData () {
      let item = {
        name: this.obj.name,
        id: this.obj.id,
        url: this.obj.url,
        subList: this.obj.subList
      }
      this.$emit('handleUpdateData', item)
    },
    handleDeleteItem () {
      this.$emit('handleDeleteItem', this.obj.id)
    },
    handleDeleteSubItem () {
      // console.log('要删除的tabId：'+this.tabId)
      // console.log('要删除的subId：'+this.subId)
      let data = {
        tabId: this.tabId,
        subId: this.subId
      }
      this.$emit('handleDeleteSubItem', data)
    },
    // 子菜单
    handleUpdateSubData () {
      let sub = {
        name: this.obj.name,
        id: this.obj.id,
        url: this.obj.url
      }
      let data = {
        tabId: this.tabId,
        sub: sub
      }
      this.$emit('handleUpdateSubData', data)
    }
  }
}
</script>

<style scoped>
</style>
