<template>
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
        @click="handleSendItem(index)" class="item">
        <router-link :to="{ name: item.path }">{{ item.name }}</router-link>
      </div>
      <div class="item icon-plus">
        <router-link :to="{ name: _path }"
          @click.native="handleAddItem">
          <img src="../assets/plus.png">
        </router-link>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [],
      name: 'item',
      url: '',
      path: 'item',
      id: 1
    }
  },
  computed: {
    _path () {
      return this.path + this.id
    }
  },
  methods: {
    handleAddItem () {
      let item = {
        name: this.name,
        url: this.url,
        path: this.path + this.id,
        id: this.id
      }
      if (this.navList.length < 3) {
        this.navList.push(item)
        if (this.id !== 3) {
          this.id ++
        }
      }
    },
    handleSendItem (index) {
      this.$bus.emit('event1', this.navList[index])
    }
  },
  created () {
    this.$bus.on('handleAddItem1', val => {
      let item = {
        name: val,
        url: '',
        path: 'item1',
        id: 1
      }
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === 1) {
          this.navList.splice(i, 1, item)
          break
        }
      }
    })

    this.$bus.on('handleAddItem2', val => {
      let item = {
        name: val,
        url: '',
        path: 'item2',
        id: 2
      }
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === 2) {
          this.navList.splice(i, 1, item)
          break
        }
      }
    })

    this.$bus.on('handleAddItem3', val => {
      let item = {
        name: val,
        url: '',
        path: 'item3',
        id: 3
      }
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === 3) {
          this.navList.splice(i, 1, item)
          break
        }
      }
    })

    this.$bus.on('handleDeleteItem', val => {
      console.log('我要删除id为： ' + val + ' 的选项')
      for (let i=0;i<this.navList.length;i++) {
        if (this.navList[i].id === val) {
          this.navList.splice(i, 1)
          break
        }
      }
      this.$router.push({ name: 'infoIndex' })
      this.id = val
    })

  }
}
</script>

<style scoped>
.segment {
  width: 300px;
  height: 590px;
  background-color: #fafafa;
  border: 1px solid #e3e3e3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
</style>
