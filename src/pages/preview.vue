<template>
  <div class="panel panel-default" style="border:0;border-radius:0;box-shadow:none;">
    <div class="panel-heading">
      <h3 class="panel-title">
        自定义菜单设置
      </h3>
    </div>
    <div class="panel-body" style="display:flex;padding-right:15px;">
      <div class="segment">
        <div class="header">
          <h3>{{ wxname }}</h3>
        </div>
        <div class="content"></div>
        <div class="navbar">
          <div class="icon-keyboard">
            <img src="../assets/keyboard.png">
          </div>
          <div v-for="(item, index) in navList" :key="index"
            @click="handleUpdateItem(index)" class="item"
            :class="{ 'active': nowIndex === index }">
            <a>{{ item.name }}</a>
          </div>
          <div v-if="this.navList.length < 3" class="icon-plus">
            <a @click="handleAddItem">
              <img src="../assets/plus.png">
            </a>
          </div>
          <SubTab :isShow="isShowSubTab" class="subTab" :nowIndex="subNowIndex"
            :subTabs="subTabs" :tabId="tabId" :class="movePanel"
            @handleAddSubItem="handleAddSubItem"
            @handleUpdateSubItem="handleUpdateSubItem"></SubTab>
        </div>
        <!-- navbar end -->
      </div>
      <div class="info">
        <Info :isShow="isShowInfo" :tabId="infoTabId" :subId="subId"
          :itemObj="itemObj" :isHasSubList="isHasSubList"
          :isHasMsg="isHasMsg" :cardItem="cardItem"
          @handleUpdateData="handleUpdateData" :messageList="messageList"
          @handleDeleteItem="handleDeleteItem"
          @handleUpdateSubData="handleUpdateSubData"
          @handleDeleteSubItem="handleDeleteSubItem"
          @changeTab="changeTab" @changeSubTab="changeSubTab"
          @handleChooseMsg="handleChooseMsg"
          @handleChooseSubMsg="handleChooseSubMsg"></Info>
      </div>
    </div>
    <div class="box">
      <button @click="handleSave" class="btn btn-primary">保存并发布</button>
    </div>
    <!-- toast -->
    <Toast :isShowToast="isShowToast" :toastMsg="toastMsg"></Toast>
    <!-- toast end -->
    <!-- confrim -->
    <Confirm :isShowConfirm="isShowConfirm" :confirmMsg="confirmMsg"
      :value="value" @handleCanel="handleCanel"
      @handleConfirm="handleConfirm(value)"></Confirm>
    <!-- confirm end -->
  </div>
</template>

<script>
import Info from '@/components/info'
import SubTab from '@/components/subTab'
import axios from 'axios'
import httpUrl from '@/http_url'
// import Vue from 'vue'
import Toast from '@/components/toast'
import Confirm from '@/components/confirm'
export default {
  components: {
    Info,
    SubTab,
    Toast,
    Confirm
  },
  data () {
    return {
      navList: [],
      brandMaterialList: [],
      cardItem: null,
      messageList: [],
      wxname: '',

      toastMsg: '123',
      isShowToast: false,

      isShowInfo: 0, // 是否显示 Info 组件('1':主菜单 | '2':子菜单 | '0':欢迎页)
      itemObj: null, // Info 组件的对象
      isHasMsg: false,// Info 组件默认显示 发送信息 > plus 按钮/card

      isShowSubTab: false, // 是否显示 SubTab 组件
      subTabs: [], // SubTab 组件的列表

      tabId: 0, // 用于传入 SubTab 组件
      subId: 0, // 用于传入 Info 组件
      infoTabId: 0, // 用于传入 Info 组件

      isHasSubList: false, // 是否有 subList（用于 Info 组件）
      nowIndex: 0, // 当前选项（用于样式选中 active）
      movePanel: '', // 用于样式切换：item1, item2, item3

      isShowConfirm: false,
      confirmMsg: '',
      value: null,
      subNowIndex: -1
    }
  },
  methods: {
    handleAddItem () {
      // 点击 “增加” 按钮时，显示 Info 组件，隐藏 SubTab 组件
      this.isShowInfo = 1
      this.isShowSubTab = false
      this.isHasMsg = false

      let item = {
        name: '菜单',
        url: '',
        id: Math.floor(Math.random()*100000),
        sub_button: [],
        type: 'view'
      }
      // 新建的时候把 id 传给 Info
      this.infoTabId = item.id
      this.isHasSubList = false

      if (this.navList.length < 3) {
        this.navList.push(item)
        this.itemObj = item
      }
      // 选中样式
      this.nowIndex = this.navList.length - 1
    },
    handleUpdateItem (index) {
      this.subNowIndex = -1
      // 显示 Info 组件（主菜单信息）
      this.isShowInfo = 1

      if (this.navList[index].type !== undefined) {
        // Info 组件默认显示 发送消息 or 跳转网址
        if (this.navList[index].type === 'media_id') {
          this.isHasMsg = true

          if (this.navList[index].media_id !== undefined) {
            for (let i=0;i<this.brandMaterialList.length;i++) {
              if (this.brandMaterialList[i].media_id === this.navList[index].media_id) {
                // Card 组件需要的
                this.cardItem = this.brandMaterialList[i]
              }
            }
          } else {
            this.isHasMsg = false
          }
        } else {
          this.isHasMsg = false
        }
      }

      this.itemObj = this.navList[index]

      // 显示 SubTab 组件
      // 传 tabId 给 SubTab 组件
      // 传 tabId 给 Info 组件
      this.subTabs = this.navList[index].sub_button
      this.tabId = this.navList[index].id
      this.infoTabId = this.navList[index].id
      this.isShowSubTab = true

      // 判断 navList 中 sub_button 是否为空
      // 并把 是否为空 传给 Info 组件
      if (this.navList[index].sub_button === undefined || this.navList[index].sub_button.length === 0) {
        this.isHasSubList = false
      } else {
        this.isHasSubList = true
      }

      // 点击变换样式
      this.nowIndex = index

      // 点击移动位置
      if (index === 0) {
        this.movePanel = 'item1'
      } else if (index === 1) {
        this.movePanel = 'item2'
      } else {
        this.movePanel = 'item3'
      }
    },
    handleSave () {
      // 有 sub_button 就没有 url
      // 有 url 就没有 sub_button
      // 所以判断 navList 里面每一项是否有 sub_button 或 url

      // 复制数组
      let arr = JSON.parse(JSON.stringify(this.navList))

      // 处理以下数据，把没有的项都删掉
      // 例如：如果有 sub_button 就删掉 一级 url 和 item
      // 如果 sub_button 里有 item 就删掉 url
      for (let i=0;i<arr.length;i++) {
        // 去 id
        delete arr[i].id
        if (arr[i].sub_button !== undefined && arr[i].sub_button.length !== 0) {
          delete arr[i].type
          delete arr[i].url
          for (let j=0;j<arr[i].sub_button.length;j++) {
            delete arr[i].sub_button[j].id
            if (arr[i].sub_button[j].type === 'media_id') {
              delete arr[i].sub_button[j].url
            } else {
              delete arr[i].sub_button[j].media_id
            }
          }
        } else {
          delete arr[i].sub_button
        }

        if (arr[i].type === 'media_id') {
          delete arr[i].url
        } else {
          delete arr[i].media_id
        }
        // if (arr[i].sub_button !== undefined) {
        //   // 有 sub_button 的情况
        //   if (arr[i].sub_button.length === 0) {
        //     // 有 sub_button 但为 空 的情况
        //     delete arr[i].sub_button
        //   } else {
        //     // 有 sub_button 且不为 空 的情况
        //     delete arr[i].url
        //     delete arr[i].media_id
        //     for (let j=0;j<arr[i].sub_button.length;j++) {
        //       delete arr[i].sub_button[j].id
        //       if (arr[i].sub_button[j].media_id !== undefined) {
        //         // sub_button 中有 media_id 就把 url = ''
        //         delete arr[i].sub_button[j].url
        //       }
        //     }
        //   }
        // }

      }

      let b = {
        button: arr
      }

      let a = {
        menujson: JSON.stringify(b)
      }

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(a))

      axios.post(httpUrl.handleSave, param)
      .then(res => {
        if (res.data.errcode === 0) {
          this.isShowToast = true
          this.toastMsg = '保存成功'
          setTimeout(() => {
            this.isShowToast = false
          }, 2000)
        } else {
          this.isShowToast = true
          this.toastMsg = res.data.errmsg
          setTimeout(() => {
            this.isShowToast = false
          }, 2000)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    getDatas () {
      // 获取数据
      axios.get(httpUrl.getDatas)
      .then(res => {
        if (res.data.errcode === 0) {
          if (res.data.res !== null) {
            this.wxname = res.data.res.wxname
            let arr = res.data.res.button
            // 获取数据成功之后，为每一项添加 id
            // 然后判断是否有 sub_button
            // 没有的话添加 sub_button = []
            // 有的话为 sub_button 中每个选项添加 id
            for (let i=0;i<arr.length;i++) {
              arr[i].id = Math.floor(Math.random()*100000)

              if (arr[i].sub_button !== undefined) {
                for (let j=0;j<arr[i].sub_button.length;j++) {
                  arr[i].sub_button[j].id = Math.floor(Math.random()*100000)
                }
              } else {
                arr[i].sub_button = []
              }
            }

            this.navList = arr
            // 获取数据后，判断 navList 里面有没有值
            // 有的话 默认把第一项显示到 Info 组件
            // 没有的话 把空白显示到 Info 组件
            if (this.navList.length !== 0) {
              this.isShowInfo = 1
              this.itemObj = this.navList[0]
              this.infoTabId = this.navList[0].id
              if (this.navList[0].url === undefined) {
                this.isHasMsg = true
              }
              if (this.navList[0].sub_button.length === 0) {
                this.isHasSubList = false
              } else {
                this.isHasSubList = true
              }
              // 默认显示子菜单
              this.isShowSubTab = true
              this.subTabs = this.navList[0].sub_button
              this.tabId = this.navList[0].id
              this.nowIndex = 0,
              this.movePanel = 'item1'
            } else {
              this.isShowInfo = 0
            }
          } else {
            this.isShowToast = true
            this.toastMsg = '没有数据'
            setTimeout(() => {
              this.isShowToast = false
            }, 2000)
          }
        } else {
          this.isShowToast = true
          this.toastMsg = res.data.errmsg
          setTimeout(() => {
            this.isShowToast = false
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    },

    // 监听子组件触发的方法
    handleUpdateData (val) {
      if (this.navList.length < 4) {
        for (let i=0;i<this.navList.length;i++) {
          if (this.navList[i].id === val.id) {
            this.navList.splice(i, 1, val)
          }
        }
      }
    },
    handleDeleteItem (val) {
      this.value = val
      // 删除提示框
      this.isShowConfirm = true
      this.confirmMsg = '确认删除吗？'
    },
    handleDeleteSubItem (val) {
      this.value = val
      // 删除提示框
      this.isShowConfirm = true
      this.confirmMsg = '确认删除吗？'
    },
    handleCanel () {
      this.isShowConfirm = false
    },
    handleConfirm (value) {
      if (value.subId === undefined) {
        // 删除主菜单：value 里面只有 tabId
        for (let i=0;i<this.navList.length;i++) {
          if (this.navList[i].id === value.tabId) {
            this.navList.splice(i, 1)
          }
        }
        this.isShowInfo = 0
        this.isShowSubTab = false
        this.isShowConfirm = false
      } else {
        // 删除子菜单
        for (let i=0;i<this.navList.length;i++) {
          if (this.navList[i].id === value.tabId) {
            for (let j=0;j<this.navList[i].sub_button.length;j++) {
              if (this.navList[i].sub_button[j].id === value.subId) {
                this.navList[i].sub_button.splice(j, 1)
              }
            }
            this.navList[i].type = 'view'
          }
        }
        this.isShowInfo = 0
        this.isShowConfirm = false
      }
    },
    handleAddSubItem (val) {
      this.subNowIndex = val.index
      this.nowIndex = -1
      this.isShowInfo = 2
      this.itemObj = val.sub

      this.isHasMsg = false
      // 根据 id 把 sub 存入 navList.sub_button
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId && this.navList[i].sub_button.length < 5) {
          this.navList[i].sub_button.push(val.sub)
          this.subTabs = this.navList[i].sub_button
          // delete this.navList[i].media_id
          // delete this.navList[i].type
          this.navList[i].url = ''
        }
      }
      this.subId = val.sub.id
    },
    handleUpdateSubItem (val) {
      this.subNowIndex = val.index
      this.nowIndex = -1
      // 显示 Info 组件（子菜单信息）
      this.isShowInfo = 2
      this.itemObj = val.sub
      this.subId = val.sub.id

      // Info 组件默认显示 发送消息 or 跳转网址
      if (val.sub.media_id !== undefined) {
        this.isHasMsg = true

        for (let i=0;i<this.brandMaterialList.length;i++) {
          if (this.brandMaterialList[i].media_id === val.sub.media_id) {
            // Card 组件需要的
            this.cardItem = this.brandMaterialList[i]
          }
        }

      } else {
        this.isHasMsg = false
      }
    },
    handleUpdateSubData (val) {
      this.isShowSubTab = true
      // val.tabId
      // val.sub
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId) {
          for (let j=0;j<this.navList[i].sub_button.length;j++) {
            if (this.navList[i].sub_button[j].id === val.sub.id) {
              this.navList[i].sub_button.splice(j, 1, val.sub)
            }
          }
        }
      }
    },
    changeTab (val) {
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId) {
          this.navList[i].type = val.type
          this.itemObj.type = val.type
        }
      }
    },
    changeSubTab (val) {
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId) {
          for (let j=0;j<this.navList[i].sub_button.length;j++) {
            if (this.navList[i].sub_button[j].id === val.subId) {
              this.navList[i].sub_button[j].type = val.type
              this.itemObj.type = val.type
            }
          }
        }
      }
    },
    handleChooseMsg (val) {
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId) {
          this.navList[i].media_id = val.messageObj.media_id

          this.itemObj = this.navList[i]
          this.cardItem = val.messageObj

          // 显示 Info 组件（主菜单信息）
          this.isShowInfo = 1
          // Info 组件默认显示 发送消息 or 跳转网址
          this.isHasMsg = true
        }
      }
    },
    handleChooseSubMsg (val) {
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId) {
          for (let j=0;j<this.navList[i].sub_button.length;j++) {
            if (this.navList[i].sub_button[j].id === val.subId) {
              this.navList[i].sub_button[j].media_id = val.messageObj.media_id

              this.itemObj = this.navList[i].sub_button[j]
              this.cardItem = val.messageObj

              // 显示 Info 组件（主菜单信息）
              this.isShowInfo = 2
              // Info 组件默认显示 发送消息 or 跳转网址
              this.isHasMsg = true
            }
          }
        }
      }
    },
    getBrandMaterialList () {
      let a = {}
      a.pageNo = 1
      a.pageSize = 20
      a.type = "news"

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(a))

      axios.post(httpUrl.getBrandMaterialList, param)
        .then(res => {
          if (res.data.errcode === 0) {
            this.brandMaterialList = res.data.res
            this.messageList = this.brandMaterialList
          } else {
            this.brandMaterialList = []
            this.messageList = this.brandMaterialList

            this.isShowToast = true
            this.toastMsg = res.data.errmsg
            setTimeout(() => {
              this.isShowToast = false
            }, 2000)
          }
        })
        .catch(err => console.log(err))
    }
  },
  created () {
    this.getBrandMaterialList()
    setTimeout(() => {
      this.getDatas()
    }, 1000)
  }
}
</script>

<style scoped>
.item1 {
  width: 80px;
  margin-left: 50px;
}
.item2 {
  width: 80px;
  margin-left: 131px;
}
.item3 {
  width: 80px;
  margin-left: 213px;
}
.info {
  box-sizing: border-box;
  /* padding: 10px 20px; */
  width: 100%;
  flex-shrink: 1;
  background-color: #f4f5f9;
  border: 1px solid #d2d2d2;
}
.segment {
  box-sizing: border-box;
  height: 581px;
  width: 94px;
  flex-basis: 300px;
  flex-shrink: 0;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 15px;
}
.segment > .header {
  height: 60px;
  background-color: #303030;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.segment > .header > h3 {
  margin: 0;
  font-weight: normal;
  font-size: 16px;
}
.segment > .content {
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
}
.segment > .content {
  flex-grow: 2;
  padding: 10px;
}
.segment > .navbar {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border: 1px solid #e3e3e3;
  background-color: #fafafa;
  display: flex;
  align-items: stretch;
  position: relative;
  margin-bottom: 0;
  border-radius: 0;
}
.segment > .navbar > .icon-keyboard {
  width: 50px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-right: 1px solid #e3e3e3;
}
.segment > .navbar > .icon-keyboard > img {
  width: 100%;
}
.segment > .navbar > .item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.segment > .navbar > .item a {
  box-sizing: border-box;
  border-right: 1px solid #e3e3e3;
}
.segment > .navbar > .item:last-child {
  border-right: none;
}
.segment > .navbar > .icon-plus {
  box-sizing: border-box;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.segment > .navbar > .item a {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.segment > .navbar > .icon-plus a {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.segment > .navbar > .icon-plus a > img {
  width: 29px;
}
.subTab {
  position: absolute;
  bottom: 55px;
}
</style>
