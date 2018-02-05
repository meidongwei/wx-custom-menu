<template>
  <div class="panel panel-default">
    <div class="panel-body m-panel-body">
      <div class="message1">
        <img :src="picSrc1" alt="pic">
        <div>
          <p>{{ title1 }}</p>
        </div>
      </div>
      <div class="message2" v-if="cardItem.content.news_item[1] !== undefined">
        <div class="message2-text">
          <p>{{ title2 }}</p>
        </div>
        <div class="message2-pic">
          <img :src="picSrc2" alt="pic">
        </div>
      </div>
      <div class="update">更新于 {{ this.update_time1 }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardItem: {
      type: Object,
      defautl: null
    }
  },
  computed: {
    picSrc1 () {
      return this.cardItem.content.news_item[0].thumb_url
    },
    picSrc2 () {
      return this.cardItem.content.news_item[1].thumb_url
    },
    update_time1 () {
      return new Date(parseInt(this.cardItem.content.update_time) * 1000)
        .toLocaleString('chinese',{hour12:false}).replace(/:\d{1,2}$/,' ')
    },
    title1 () {
      let str = this.cardItem.content.news_item[0].title
      if (str.length < 14) {
        return str
      } else {
        str = str.substr(0,14) + '...'
        return str
      }
    },
    title2 () {
      let str = this.cardItem.content.news_item[1].title
      if (str.length < 27) {
        return str
      } else {
        str = str.substr(0,27) + '...'
        return str
      }

    }
  }
}
</script>

<style scoped>
.m-panel-body {
  padding: 0;
  min-width: 267px;
}
.m-panel-body > .message1 {
  position: relative;
  min-width: 267px;
}
.m-panel-body > .message1 > img {
  width: 100%;
  height: 151px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.m-panel-body > .message1 > div {
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
.m-panel-body > .message1 > div > p {
  margin: 0;
  color: #fff;
  font-size: 16px;
}
.m-panel-body > .update {
  color: #d2d2d2;
  height: 40px;
  display: flex;
  padding-left: 10px;
  align-items: center;
  border-top: 1px solid #f6f6f6;
}
.m-panel-body > .message2 {
  display: flex;
  justify-content: space-between;
  padding: 5px 8px;
}
.m-panel-body > .message2 > .message2-text {
  margin-right: 5px;
  display: flex;
  align-items: center;
}
.m-panel-body > .message2 > .message2-text > p {
  margin: 0;
  color: #696969;
}
.m-panel-body > .message2 > .message2-pic > img {
  height: 50px;
  width: 50px;
}
</style>
