<template>
  <div>
    <!-- 主菜单信息 -->
    <div v-if="isShow === 1">
      <div class="pageTitle">
        <h1>{{ itemObj.name }}</h1>
        <a @click="handleDeleteItem" href="javascript:;">删除菜单</a>
      </div>
      <p v-if="isHasSubList" class="tip1">已添加子菜单，仅可设置菜单名称</p>
      <div class="form-item">
        <h2>菜单名称</h2>
        <div>
          <input v-model="itemObj.name" @blur="handleUpdateData" type="text">
          <p class="tip2">字数不超过4个汉字或8个字母</p>
        </div>
      </div>

      <div v-if="!isHasSubList" class="form-item">
        <h2>页面地址</h2>
        <input v-model="itemObj.url" @blur="handleUpdateData" type="text">
      </div>
    </div>

    <!-- 子菜单信息 -->
    <div v-if="isShow === 2">
      <div class="pageTitle">
        <h1>{{ itemObj.name }}</h1>
        <a @click="handleDeleteSubItem" href="javascript:;">删除子菜单</a>
      </div>
      <p v-if="isHasSubList" class="tip1">已添加子菜单，仅可设置菜单名称</p>

      <div class="form-item">
        <h2>子菜单名称</h2>
        <div>
          <input v-model="itemObj.name" @blur="handleUpdateSubData" type="text">
          <p class="tip2">字数不超过8个汉字或16个字母</p>
        </div>
      </div>
      <div class="form-item">
        <h2>子页面地址</h2>
        <input v-model="itemObj.url" @blur="handleUpdateSubData" type="text">
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
    itemObj: {
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
        name: this.itemObj.name,
        id: this.itemObj.id,
        url: this.itemObj.url,
        subList: this.itemObj.subList
      }
      this.$emit('handleUpdateData', item)
    },
    handleDeleteItem () {
      this.$emit('handleDeleteItem', this.itemObj.id)
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
        name: this.itemObj.name,
        id: this.itemObj.id,
        url: this.itemObj.url
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
.pageTitle {
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pageTitle > h1 {
  font-size: 20px;
  padding: 10px 0;
}
.pageTitle > a {
  padding: 13px 0;
}
.tip1 {
  color: #b6b6b6;
  font-size: 14px;
}
.tip2 {
  color: #b6b6b6;
  font-size: 14px;
}
.form-item {
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
}
.form-item > h2 {
  margin-right: 15px;
  margin-top: 9px;
}
.form-item input {
  height: 38px;
  width: 250px;
  padding-left: 10px;
  border-radius: 3px;
  /* border: none; */
  border: 1px solid #e3e3e3;
  margin-bottom: 5px;
}
</style>
