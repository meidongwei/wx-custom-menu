<template>
  <div class="confirm-wrap" v-if="isShowConfirm">
    <div class="confirm">
      <div class="confirm-con">
        {{ confirmMsg }}
      </div>
      <div class="confirm-btn-group">
        <a class="btn btn-default" style="margin-right: 5px;"
          @click="handleCanel" href="javascript:;">取消</a>
        <a class="btn btn-primary"
          @click="handleConfirm" href="javascript:;">确认</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowConfirm: {
      type: Boolean,
      default: false
    },
    confirmMsg: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default () {
        return null
      }
    }
  },
  methods: {
    handleCanel () {
      this.$emit('handleCanel')
    },
    handleConfirm () {
      this.$emit('handleConfirm', this.value)
    }
  }
}
</script>

<style scoped>
.confirm-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .8);
  display: flex;
  justify-content: center;
}
.confirm {
  position: absolute;
  top: 200px;
  background-color: #fff;
  box-shadow: 1px 1px 5px #d5d5d5;
  border-radius: 4px;
}
.confirm-con {
  padding: 30px 50px;
}
.confirm-btn-group {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  border-top: 1px solid #f4f4f4;
}
</style>
