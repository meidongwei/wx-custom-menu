<template>
  <div>
    <div v-if="isShow" class="segment">
      <div v-for="(sub, index) in subTabs" :key="index" class="item" @click="handleUpdateSubItem(index)"
        :class="{ 'active': nowIndex === index }">
        <!-- <div> -->
          <a>{{ sub.name }}</a>
        <!-- </div> -->
      </div>
      <div v-if="this.subTabs.length < 5" class="item add">
        <a @click="handleAddSubItem">
          <img src="@/assets/plus.png">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    subTabs: {
      type: Array,
      default () {
        return []
      }
    },
    tabId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      nowIndex: 0
    }
  },
  methods: {
    handleAddSubItem () {
      let sub = {
        name: '子菜单',
        url: '',
        id: Math.floor(Math.random()*100000),
        type: 'view'
      }

      let data = {
        sub: sub,
        tabId: this.tabId
      }
      this.$emit('handleAddSubItem', data)
      this.nowIndex = this.subTabs.length - 1
    },
    handleUpdateSubItem (index) {
      // console.log(this.subTabs[index])
      this.nowIndex = index
      this.$emit('handleUpdateSubItem', this.subTabs[index])
    }
  }
}
</script>

<style scoped>
.segment {
  margin-right: 30px;
  width: 85px;
}
.segment > .item {
  width: 100%;
  height: 47px;
  /* border-top: 1px solid #e3e3e3;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.segment > .add {
  /* border: 1px solid #e3e3e3; */
  /* border-top: none; */
  /* border-bottom: 1px solid #e3e3e3; */
}
.segment > .item > div {
  width: 100%;
  height: 100%;
}
.segment > .item a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  border: 1px solid #e3e3e3;
  border-bottom: none;
}
.segment > .item:last-child {
  border-bottom: 1px solid #e3e3e3;
}
.segment > .add > a > img {
  width: 29px;
}
</style>
