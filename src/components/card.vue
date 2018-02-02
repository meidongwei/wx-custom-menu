<template>
  <div class="panel panel-default">
    <div class="panel-body m-panel-body">
      <div class="message1">
        <img src="../assets/pic1.jpg" alt="pic">
        <div>
          <p>{{ cardItem.content.new_item[0].title }}</p>
        </div>
      </div>
      <div class="message2">
        <div class="message2-text">
          <p>{{ cardItem.content.new_item[1].title }}</p>
        </div>
        <div class="message2-pic">
          <img src="../assets/pic1.jpg" alt="pic">
        </div>
      </div>
      <div class="update">更新于 {{ cardItem.content.update_time }}</div>
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
  }
}
</script>

<style scoped>
.m-panel-body {
  padding: 0;
}
.m-panel-body > .message1 {
  position: relative;
}
.m-panel-body > .message1 > img {
  width: 100%;
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
