<template>
  <div>
    <!-- 主菜单信息 -->
    <div v-if="isShow === 1">
      <div class="pageTitle">
        <h1>{{ itemObj.name }}</h1>
        <a @click="handleDeleteItem">删除菜单</a>
      </div>
      <p v-if="isHasSubList" class="tip1">已添加子菜单，仅可设置菜单名称</p>
      <div class="form-item">
        <h2>菜单名称</h2>
        <div>
          <input v-model="itemObj.name" @blur="handleUpdateData" type="text">
          <p class="tip2">字数不超过4个汉字或8个字母</p>
        </div>
      </div>

      <div v-if="!isHasSubList" class="form-item-tab">
        <div class="form-item-header">
          <h2>菜单内容</h2>
          <div class="item-input">
            <input @click="isShowSendMsg" id="r1" type="radio" name="r1" :checked="!isShowTab">
            <label for="r1">图文消息</label>
          </div>
          <div class="item-input">
            <input @click="isShowGoPage" id="r2" type="radio" name="r1" :checked="isShowTab">
            <label for="r2">跳转网页</label>
          </div>
        </div>
        <div v-if="isShowTab" class="form-item-body">
          <p>订阅者点击该菜单会跳转到以下链接</p>
          <div class="body-con">
            <h2>页面地址</h2>
            <input v-model="itemObj.url" @blur="handleUpdateData" type="text">
          </div>
        </div>

        <div v-if="!isShowTab" class="form-item-body">
          <div class="body-con">
            <a v-if="!isHasMsg" @click="handleAddPicText">
              <img src="../assets/plus.png" alt="plus-add">
            </a>
            <div class="row">
              <div class="col-md-12">
                <Card v-if="isHasMsg" :cardItem="cardItem"
                  @click.native="handleAddPicText" class="cardHover"></Card>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 子菜单信息 -->
    <div v-if="isShow === 2">
      <div class="pageTitle">
        <h1>{{ itemObj.name }}</h1>
        <a @click="handleDeleteSubItem">删除子菜单</a>
      </div>

      <div class="form-item">
        <h2>子菜单名称</h2>
        <div>
          <input v-model="itemObj.name" @blur="handleUpdateSubData" type="text">
          <p class="tip2">字数不超过8个汉字或16个字母</p>
        </div>
      </div>

      <div class="form-item-tab">
        <div class="form-item-header">
          <h2>子菜单内容</h2>
          <div class="item-input">
            <input @click="isShowSubSendMsg" id="r3" type="radio" name="r3" :checked="!isShowTab">
            <label for="r3">图文消息</label>
          </div>
          <div class="item-input">
            <input @click="isShowSubGoPage" id="r4" type="radio" name="r3" :checked="isShowTab">
            <label for="r4">跳转网页</label>
          </div>
        </div>
        <div v-if="isShowTab" class="form-item-body">
          <p>订阅者点击该菜单会跳转到以下链接</p>
          <div class="body-con">
            <h2>页面地址</h2>
            <input v-model="itemObj.url" @blur="handleUpdateSubData" type="text">
          </div>
        </div>

        <div v-if="!isShowTab" class="form-item-body">
          <div class="body-con">
            <a v-if="!isHasMsg" @click="handleAddPicText">
              <img src="../assets/plus.png" alt="plus-add">
            </a>
            <div class="row">
              <div class="col-md-12">
                <Card v-if="isHasMsg" :cardItem="cardItem"
                  @click.native="handleAddPicText" class="cardHover"></Card>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- 欢迎页 -->
    <div v-if="isShow === 0"></div>

    <!-- Modal -->
    <Modal @handleCloseModal="handleCloseModal"
      :isShowModal="isShowModal"
      :messageList="messageList"
      @handleChooseMsg="handleChooseMsg"
      @handleChooseSubMsg="handleChooseSubMsg"
      :tabId="tabId" :flag="isShow" :subId="subId"></Modal>

  </div>
</template>

<script>
import Modal from '@/components/modal'
import axios from 'axios'
import HttpUrl from '@/http_url'
import Card from '@/components/card'
export default {
  components: {
    Modal,
    Card
  },
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
      default: null
    },
    isHasSubList: {
      type: Boolean,
      default: false
    },
    isShowTab: {
      type: Boolean,
      default: false
    },
    isHasMsg: {
      type: Boolean,
      default: false
    },
    cardItem: {
      type: Object,
      default: null
    },
    messageList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      name: '',
      url: '',
      isShowModal: false
    }
  },
  methods: {
    handleUpdateData () {
      let item = {
        name: this.itemObj.name,
        id: this.itemObj.id,
        type: this.itemObj.type,
        url: this.itemObj.url
      }
      this.$emit('handleUpdateData', item)
    },
    handleDeleteItem () {
      this.$emit('handleDeleteItem', this.itemObj.id)
    },
    handleDeleteSubItem () {
      let data = {
        tabId: this.tabId,
        subId: this.subId
      }
      this.$emit('handleDeleteSubItem', data)
    },
    // 发送信息/跳转网页切换
    isShowSendMsg () {
      let val = {
        isShow: false,
        tabId: this.tabId,
        type: 'media_id'
      }
      this.$emit('changeTab', val)
    },
    isShowGoPage () {
      let val = {
        isShow: true,
        tabId: this.tabId,
        type: 'view'
      }
      this.$emit('changeTab', val)
    },
    handleAddPicText () {
      // if (this.isShow === 2) {
      //   this.subId = this.itemObj.id
      // }
      this.isShowModal = true
    },
    handleCloseModal () {
      this.isShowModal = false
    },
    handleChooseMsg (obj) {
      this.$emit('handleChooseMsg', obj)
    },
    // 子菜单
    handleUpdateSubData () {
      let sub = {
        name: this.itemObj.name,
        id: this.itemObj.id,
        url: this.itemObj.url,
        type: this.itemObj.type
      }
      let data = {
        tabId: this.tabId,
        sub: sub
      }
      this.$emit('handleUpdateSubData', data)
    },
    // 发送信息/跳转网页切换
    isShowSubSendMsg () {
      let val = {
        isShow: false,
        tabId: this.tabId,
        subId: this.subId,
        type: 'media_id'
      }
      this.$emit('changeSubTab', val)
    },
    isShowSubGoPage () {
      let val = {
        isShow: true,
        tabId: this.tabId,
        subId: this.subId,
        type: 'view'
      }
      this.$emit('changeSubTab', val)
    },
    handleChooseSubMsg (obj) {
      this.$emit('handleChooseSubMsg', obj)
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
  padding: 0 20px;
}
.pageTitle > h1 {
  font-size: 14px;
  margin: 0;
  color: #333333;
}
.pageTitle > a {
  padding: 13px 0;
  color: #787878;
}
.tip1 {
  color: #999999;
  font-size: 14px;
  padding-left: 20px;
}
.tip2 {
  color: #999999;
  font-size: 14px;
}
.form-item,
.form-item-tab {
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0 20px;
}
.form-item {
  display: flex;
}
.form-item > h2,
.form-item-tab > .form-item-header > h2,
.form-item-body > .body-con > h2 {
  margin-right: 15px;
  margin-top: 11px;
  font-size: 14px;
  color: #333333;
}
.form-item input,
.form-item-body > .body-con > input {
  height: 38px;
  width: 600px;
  padding-left: 10px;
  border-radius: 3px;
  /* border: none; */
  border: 1px solid #e3e3e3;
  margin-bottom: 5px;
}
.form-item-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.form-item-header > .item-input > input {
  margin: 0;
  margin-right: 5px;
}
.form-item-header > .item-input > label {
  margin: 0;
}
.form-item-header > .item-input {
  margin-right: 15px;
}
.form-item-body {
  border: 1px solid #d2d2d2;
  background-color: #ffffff;
}
.form-item-body > p {
  color: #999999;
  border-bottom: 1px solid #d2d2d2;
  height: 40px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 0;
}
.form-item-body > .body-con > input {
  margin: 15px 20px 15px 0;
}
.form-item-body > .body-con {
  padding: 20px 0 20px 20px;
}
.form-item-body .body-con img {
  opacity: .1;
  border: 1px dashed #000000;
}
.cardHover {
  margin: 0;
  max-width: 269px;
}
.cardHover:hover {
  box-shadow: 0 0 10px #d6d6d6;
  cursor: pointer;
}
</style>
