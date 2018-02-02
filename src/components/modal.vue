<template>
  <div v-if="isShowModal" class="m-modal-wrap">
    <div class="modal-dialog">
      <div class="modal-content modal-lg">
        <div class="modal-header">
          <button @click="handleCloseModal" type="button" class="close">
            <span>&times;</span>
          </button>
          <h4 class="modal-title">选择消息</h4>
        </div>
        <div class="modal-body" style="max-height:500px;overflow-y:scroll;">
          <div class="row">

            <div v-for="(item, index) in messageList" class="col-md-4"
              @click="handleSelectMsg(index)" :class="{ 'msgActive': nowIndex === index }">
              <Card :cardItem="item"></Card>
            </div>

          </div>

          <button class="btn m-btn btn-block">点击加载</button>
        </div>
        <div class="modal-footer">
          <button @click="handleCloseModal" type="button" class="btn btn-default">取消</button>
          <button @click="handleChooseMsg" type="button" class="btn btn-primary">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/card'
export default {
  components: {
    Card
  },
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    },
    messageList : {
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
    handleCloseModal () {
      this.$emit('handleCloseModal')
    },
    // 选择
    handleSelectMsg (index) {
      this.nowIndex = index
    },
    // 选择好之后，点确定发送信息
    handleChooseMsg () {
      let obj = {
        tabId: this.tabId,
        messageObj: this.messageList[this.nowIndex]
      }
      this.$emit('handleChooseMsg', obj)
      this.handleCloseModal()
    }
  }
}
</script>

<style scoped>
.m-modal-wrap {
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .8);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}
.modal-dialog {
  /* 去掉 bootstrap 默认宽度 */
  /* width: 600px; */
  width: auto;
}
.m-btn {
  background-color: #e9e9e9;
  color: #a2a2a2;
}
.m-btn:hover {
  background-color: #dfdfdf;
  color: #6f6f6f;
}
.panel-default:hover{
  box-shadow: 0 0 10px #d6d6d6;
  cursor: pointer;
}
.msgActive .panel-default {
  border: 1px solid #428bca;
}
</style>
