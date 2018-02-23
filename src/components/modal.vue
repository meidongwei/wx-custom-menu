<template>
  <div v-if="isShowModal" class="m-modal-wrap">
    <div class="modal-dialog" style="margin: 180px 0;">
      <div class="modal-content modal-lg">
        <div class="modal-header">
          <button @click="handleCloseModal" type="button" class="close">
            <span>&times;</span>
          </button>
          <h4 class="modal-title">选择消息</h4>
        </div>
        <div class="modal-body" style="max-height:450px;overflow-y:scroll;">
          <div class="row">

            <div class="col-md-4">
              <div v-for="(item, index) in messageList" v-if="index % 3 === 0"
                @click="handleSelectMsg(index)" :class="{ 'msgActive': nowIndex === index }">
                <Card :cardItem="item"></Card>
              </div>
            </div>
            <div class="col-md-4">
              <div v-for="(item, index) in messageList" v-if="index % 3 === 1"
                @click="handleSelectMsg(index)" :class="{ 'msgActive': nowIndex === index }">
                <Card :cardItem="item"></Card>
              </div>
            </div>
            <div class="col-md-4">
              <div v-for="(item, index) in messageList" v-if="index % 3 === 2"
                @click="handleSelectMsg(index)" :class="{ 'msgActive': nowIndex === index }">
                <Card :cardItem="item"></Card>
              </div>
            </div>

          </div>

          <!-- <button class="btn m-btn btn-block">点击加载</button> -->
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
    },
    subId: {
      type: Number,
      default: 0
    },
    flag: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      nowIndex: 0
    }
  },
  conputed: {
    list1 () {
      for (let i=0;i<this.messageList.length;i++) {
        this.messageList.length
      }
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
      if (this.flag === 2) {
        // 子菜单
        let obj = {
          tabId: this.tabId,
          subId: this.subId,
          messageObj: this.messageList[this.nowIndex]
        }
        this.$emit('handleChooseSubMsg', obj)
        this.handleCloseModal()
      } else {
        // 主菜单
        let obj = {
          tabId: this.tabId,
          messageObj: this.messageList[this.nowIndex]
        }
        this.$emit('handleChooseMsg', obj)
        this.handleCloseModal()
      }

    }
  }
}
</script>

<style scoped>
.m-modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.modal-dialog {
  /* 去掉 bootstrap 默认宽度 */
  /* width: 600px; */
  width: auto;
  top: -100px;
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
