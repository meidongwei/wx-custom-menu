<template>
  <div>
    <div v-if="isShow" class="segment">
      <div v-for="(sub, index) in subTabs" :key="index" class="item">
        <div @click="handleUpdateSubItem(index)"
          :class="{ 'active': nowIndex === index }">
          <a>{{ sub.name }}</a>
        </div>
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
      this.nowIndex = index
      this.$emit('handleUpdateSubItem', this.subTabs[index])
    }
  }
}
</script>

<style scoped>
.segment {
  margin-right: 30px;
  border: 1px solid #e3e3e3;
  width: 85px;
}
.segment > .item {
  width: 100%;
  height: 47px;
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
  height: 100%;
}
.segment > .item a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 0;
}
.segment > .add > a > img {
  width: 29px;
}
</style>
