<template>
  <div class="container">
    <div class="segment">
      <div class="header">
        <h3>青春版品质 Test</h3>
      </div>
      <div class="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, beatae.</p>
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
          :subTabs="subTabs" :tabId="tabId"
          @showSubInfo="showSubInfo"></SubTab>
      </div>
      <!-- navbar end -->
    </div>
    <div class="info">
      <Info :isShow="isShowItem" :tabId="infoTabId" :subId="subId"
        :obj="item1" :isHasSubList="isHasSubList"
        @handleUpdateData="handleUpdateData"
        @handleDeleteItem="handleDeleteItem"
        @handleUpdateSubData="handleUpdateSubData"
        @handleDeleteSubItem="handleDeleteSubItem"></Info>
    </div>
  </div>
</template>

<script>
import Info from '@/components/info'
import SubTab from '@/components/subTab'
export default {
  components: {
    Info,
    SubTab
  },
  data () {
    return {
      navList: [],
      name: 'item',
      url: '',
      isShowItem: 0,
      item1: null,
      id: 1,
      subList: [],
      isShowSubTab: false,
      subTab: null,
      subTabs: [],
      tabId: 1,
      subId: 1,
      infoTabId: 1,
      isHasSubList: false,
      nowIndex: ''
    }
  },
  computed: {
    _id () {
      if (this.navList.length < 3) {
        return this.id++
      } else {
        return this.id - 1
      }
    }
  },
  methods: {
    handleAddItem () {

      this.isShowItem = 1
      this.isShowSubTab = false

      let item = {}
      item.name = this.name,
      item.url = this.url,
      item.id = this._id,
      item.subList = []

      if (this.navList.length < 3) {
        this.navList.push(item)
        this.item1 = item
      } else {
        console.log('只能添加3项')
      }
    },
    handleUpdateItem (index) {
      // 显示 Info 组件（主菜单信息）
      this.isShowItem = 1
      let item = {}
      item.name = this.navList[index].name,
      item.url = this.navList[index].url,
      item.id = this.navList[index].id,
      item.subList = this.navList[index].subList
      this.item1 = item

      // 显示 subTab 组件
      // 传 tabId 给 subTab 组件
      // 传 tabId 给 Info 组件
      this.subTabs = item.subList
      this.tabId = this.navList[index].id
      this.infoTabId = this.navList[index].id
      this.isShowSubTab = true

      // 判断 navList.subList 是否为空
      // 并把 是否为空 传给 Info 组件
      if (this.navList[index].subList.length === 0) {
        this.isHasSubList = false
      } else {
        this.isHasSubList = true
      }

      // 点击变换样式
      this.nowIndex = index
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
      this.isShowItem = 0
      this.isShowSubTab = false
    },
    handleDeleteSubItem (val) {
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId) {
          for (let j=0;j<this.navList[i].subList.length;j++) {
            if (this.navList[i].subList[j].id === val.subId) {
              this.navList[i].subList.splice(j, 1)
            }
          }
        }
      }
      this.isShowItem = 0
    },
    showSubInfo (val) {
      this.isShowItem = val.isShowSub
      this.item1 = val.sub
      // 根据 id 把 sub 存入 navList.subList
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val.tabId && this.navList[i].subList.length < 5) {
          this.navList[i].subList.push(val.sub)
          this.subTabs = this.navList[i].subList
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
          for (let j=0;j<this.navList[i].subList.length;j++) {
            if (this.navList[i].subList[j].id === val.sub.id) {
              this.navList[i].subList.splice(j, 1, val.sub)
            }
          }


        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  display: flex;
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
  flex-grow: 1;
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
  left: -1px;
  width: 100px;
  margin-left: 50px;
}
</style>
