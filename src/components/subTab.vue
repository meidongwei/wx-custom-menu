<template>
  <div>
    <div v-if="isShow" class="segment">
      <div v-for="(sub, index) in subTabs" :key="index" class="item">
        <div @click="handleUpdateSubItem(index)"
          :class="{ 'active': nowIndex === index }">
          <a href="javascript:;">{{ sub.name }}</a>
        </div>
      </div>
      <div v-if="this.subTabs.length < 5" class="item add">
        <a @click="handleAddSubItem" href="javascript:;">
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
      default: 1
    }
  },
  data () {
    return {
      isShowSub: 2,
      name: '子菜单',
      url: '',
      id: 1,
      nowIndex: ''
    }
  },
  computed: {
    _id () {
      if (this.subTabs.length < 5) {
        return this.id++
      } else {
        return this.id - 1
      }
    }
  },
  methods: {
    handleAddSubItem () {
      let sub = {
        name: this.name,
        url: this.url,
        id: this._id
      }

      let data = {
        isShowSub: this.isShowSub,
        sub: sub,
        tabId: this.tabId
      }
      this.$emit('showSubInfo', data)
    },
    handleUpdateSubItem (index) {
      this.nowIndex = index
      let sub = {
        name: this.subTabs[index].name,
        url: this.subTabs[index].url,
        id: this.subTabs[index].id
      }
      let data = {
        isShowSub: this.isShowSub,
        sub: sub
      }
      this.$emit('showSubInfo', data)
    }
  }
}
</script>

<style scoped>
.segment {
  margin-right: 30px;
  margin-top: 30px;
  border: 1px solid #e3e3e3;
  width: 100%;
}
.segment > .item {
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.segment > .add {
  border-bottom: none;
}
.segment > .item > div {
  width: 100%;
}
.segment > .item a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
}
.segment > .add > a > img {
  width: 29px;
}
</style>
