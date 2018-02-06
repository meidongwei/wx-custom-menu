<template>
  <div class="panel panel-default" style="border-width: 1px;">
    <div class="panel-body m-panel-body">

      <div class="message" :class="{first: item.isFirst }" v-for="item in list1">
        <img :src="item.thumb_url" alt="pic">
        <div class="message-text">
          <p>{{ item.title }}</p>
        </div>
      </div>

      <div class="update">更新于 {{ this.update_time }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  props: {
    cardItem: {
      type: Object,
      defautl: null
    }
  },
  computed: {
    update_time () {
      return new Date(parseInt(this.cardItem.content.update_time) * 1000)
        .toLocaleString('chinese',{hour12:false}).replace(/:\d{1,2}$/,' ')
    },
    list1 () {
      for (let i=0;i<this.cardItem.content.news_item.length;i++) {
        let str = this.cardItem.content.news_item[i].title
        if (i === 0) {
          if (str.length >= 14) {
            this.cardItem.content.news_item[i].title = str.substr(0, 14) + '...'
          }
        } else {
          if (str.length >= 27) {
            this.cardItem.content.news_item[i].title = str.substr(0, 27) + '...'
          }
        }
      }
      this.list =  this.cardItem.content.news_item
      this.list[0].isFirst = true
      return this.list
    }

  }
}
</script>

<style scoped>
.m-panel-body {
  padding: 0;
  min-width: 267px;
}


.m-panel-body > .update {
  color: #d2d2d2;
  height: 40px;
  display: flex;
  padding-left: 10px;
  align-items: center;
  border-top: 1px solid #f6f6f6;
}


.message {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
}
.message > img {
  width: 50px;
  height: 50px;
  order: 2;
}
.message > .message-text {
  order: 1;
  margin-right: 5px;
}
.message > .message-text > p {
  margin: 0;
  color: #696969;
}

.first > img {
  width: 100%;
  height: 151px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.first {
  position: relative;
  min-width: 267px;
  padding: 0;
}
.first > .message-text {
  background-color: rgba(0, 0, 0, .6);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 36px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
}
.first > .message-text > p {
  margin: 0;
  color: #fff;
  font-size: 16px;
}
</style>
