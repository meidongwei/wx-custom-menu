const install = function (Vue) {
  const Bus = new Vue({
    data () {
        return {
            key1:'',
            key2: ''
        }
    },
    created () {
      this.$on('event1', val => {
        this.key1 = val
      }),
      this.$on('event2', val => {
        this.key2 = val
      })
    },
    methods: {
      emit (event, ...args) {
        this.$emit(event, ...args)
      },
      on (event, callback) {
        this.$on(event, callback)
      },
      off (event, callback) {
        this.$off(event, callback)
      }
    }
  })
  Vue.prototype.$bus = Bus
}
export default install
