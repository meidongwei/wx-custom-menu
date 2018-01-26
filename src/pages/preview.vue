<template>
  <div class="wrap">
    <div class="wrap-header"><strong>会员中心</strong></div>
    <div class="container">
      <div class="segment">
        <div class="header">
          <h3>青春版品质 Test</h3>
        </div>
        <div class="content">
          <p></p>
        </div>
        <div class="navbar">
          <div class="icon-keyboard">
            <img src="../assets/keyboard.png">
          </div>
          <div v-for="(item, index) in navList" :key="index"
            @click="handleUpdateItem(index)"
            :class="{ 'active': nowIndex === index }" class="item">
            <a href="javascript:;">{{ item.name }}</a>
          </div>
          <div v-if="this.navList.length < 3" class="item icon-plus">
            <a @click="handleAddItem" href="javascript:;">
              <img src="../assets/plus.png">
            </a>
          </div>
          <SubTab :isShow="isShowSubTab" class="subTab"
            :subTabs="subTabs" :tabId="tabId" :class="movePanel"
            @showSubInfo="showSubInfo"></SubTab>
        </div>
        <!-- navbar end -->
      </div>
      <div class="info">
        <Info :isShow="isShowInfo" :tabId="infoTabId" :subId="subId"
          :itemObj="itemObj" :isHasSubList="isHasSubList"
          @handleUpdateData="handleUpdateData"
          @handleDeleteItem="handleDeleteItem"
          @handleUpdateSubData="handleUpdateSubData"
          @handleDeleteSubItem="handleDeleteSubItem"></Info>
      </div>
    </div>
    <div class="box">
      <a @click="handleSave" class="btn" href="javascript:;">保存并发布</a>
    </div>
  </div>
</template>

<script>
import Info from '@/components/info'
import SubTab from '@/components/subTab'
import axios from 'axios'
import httpUrl from '@/http_url'
import Vue from 'vue'
export default {
  components: {
    Info,
    SubTab
  },
  data () {
    return {
      navList: [],

      isShowInfo: 0, // 是否显示 Info 组件('1':主菜单 | '2':子菜单 | '0':欢迎页)
      itemObj: null, // Info 组件的对象

      isShowSubTab: false, // 是否显示 SubTab 组件
      subTabs: [], // SubTab 组件的列表

      tabId: 0, // 用于传入 SubTab 组件
      subId: 0, // 用于传入 Info 组件
      infoTabId: 0, // 用于传入 Info 组件

      isHasSubList: false, // 是否有 subList（用于 Info 组件）
      nowIndex: '', // 当前选项（用于样式选中 active）
      movePanel: '' // 用于样式切换：item1, item2, item3
    }
  },
  methods: {
    handleAddItem () {
      // 点击 “增加” 按钮时，显示 Info 组件，隐藏 SubTab 组件
      this.isShowInfo = 1
      this.isShowSubTab = false

      let item = {
        name: '菜单',
        url: '',
        id: Math.floor(Math.random()*100000),
        sub_button: [],
        type: 'view'
      }

      if (this.navList.length < 3) {
        this.navList.push(item)
        this.itemObj = item
      } else {
        console.log('只能添加3项')
      }
    },
    handleUpdateItem (index) {
      // 显示 Info 组件（主菜单信息）
      this.isShowInfo = 1
      let item = {
        name: this.navList[index].name,
        url: this.navList[index].url,
        id: this.navList[index].id,
        sub_button: this.navList[index].sub_button,
        type: this.navList[index].type
      }
      this.itemObj = item

      // 显示 SubTab 组件
      // 传 tabId 给 SubTab 组件
      // 传 tabId 给 Info 组件
      this.subTabs = item.sub_button
      this.tabId = this.navList[index].id
      this.infoTabId = this.navList[index].id
      this.isShowSubTab = true

      // 判断 navList.subList 是否为空
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
      // 有 url 就没有 sub_buttom
      // 所以判断 navList 里面每一项是否有 sub_button 或 url
      let arr = JSON.parse(JSON.stringify(this.navList))

      for (let i=0;i<arr.length;i++) {
        delete arr[i].id
        if (arr[i].sub_button.length === 0) {
          delete arr[i].sub_button
        } else {
          delete arr[i].url
          for (let j=0;j<arr[i].sub_button.length;j++) {
            delete arr[i].sub_button[j].id
          }
        }
      }

      let b = {
        button: arr
      }

      let a = {
        menujson: JSON.stringify(b)
      }

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(a))
      console.log(JSON.stringify(a))

      axios.post(httpUrl.handleSave, param)
      .then(res => {
        if (res.data.errcode === 0) {
          console.log('恭喜你，保存成功')
        } else {
          console.log(res.data.errmsg)
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
            let arr = res.data.res.button
            console.log(res.data.res)
            // 获取数据成功之后，为每一项添加 id
            // 然后判断是否有 sub_button
            // 没有的话添加 sub_button = []
            // 有的话为 sub_button 中每个选项添加 id
            for (let i=0;i<arr.length;i++) {
              console.log(arr[i])
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
          }
        } else {
          console.log(res.data.errmsg)
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
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val) {
          this.navList.splice(i, 1)
        }
      }
      this.isShowInfo = 0
      this.isShowSubTab = false
    },
    handleDeleteSubItem (val) {
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId) {
          for (let j=0;j<this.navList[i].sub_button.length;j++) {
            if (this.navList[i].sub_button[j].id === val.subId) {
              this.navList[i].sub_button.splice(j, 1)
            }
          }
        }
      }
      this.isShowInfo = 0
    },
    showSubInfo (val) {
      this.isShowInfo = val.isShowSub
      this.itemObj = val.sub
      // 根据 id 把 sub 存入 navList.sub_button
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId && this.navList[i].sub_button.length < 5) {
          this.navList[i].sub_button.push(val.sub)
          this.subTabs = this.navList[i].sub_button
        }
      }
      this.subId = val.sub.id
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
    }
  },
  created () {
    this.getDatas()
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
  margin-left: 134px;
}
.item3 {
  width: 80px;
  margin-left: 217px;
}
.container {
  padding: 20px;
  display: flex;
}
.wrap {
  border: 1px solid #ddd;
  padding-bottom: 20px;
}
.wrap-header {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}
.info {
  padding: 10px 20px;
  width: 100%;
  flex-shrink: 1;
  background-color: #f8f8f8;
}
.segment {
  height: 590px;
  flex-basis: 300px;
  flex-shrink: 0;
  background-color: #fafafa;
  border: 1px solid #e3e3e3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
}
.header {
  height: 60px;
  background-color: #303030;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navbar {
  width: 100%;
  height: 60px;
  border-top: 1px solid #e3e3e3;
  background-color: #fafafa;
  display: flex;
  align-items: stretch;
  position: relative;
}
.navbar > .icon-keyboard {
  width: 50px;
  height: 100%;
  padding: 15px 10px;
  box-sizing: border-box;
  border-right: 1px solid #e3e3e3;
}
.navbar > .icon-keyboard > img {
  width: 100%;
}
.navbar > .item {
  box-sizing: border-box;
  border-right: 1px solid #e3e3e3;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.navbar > .icon-plus {
  border-right: none;
}
.navbar > .item a {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navbar > .icon-plus a > img {
  width: 29px;
}
.content {
  flex-grow: 2;
  padding: 10px;
}
.subTab {
  position: absolute;
  bottom: 65px;
}
</style>
