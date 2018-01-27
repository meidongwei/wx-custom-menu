<template>
  <div>
    <div v-if="isShowToast" class="toast-wrap">
      <div class="toast">
        <p>{{ toastMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowToast: {
      type: Boolean,
      default: false
    },
    toastMsg: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.toast-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toast {
  background-color: rgba(0, 0, 0, .8);
  width: 150px;
  height: 100px;
  border-radius: 4px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toast p {
  color: white;
  margin: 0;
}
</style>
