let localhostDev = true

let _host= localhostDev ? 'http://localhost:8080' : '/pzcatering-web/crmwx/api.do?method='
// _host = localhostDev ? 'http://localhost:8080' : 'http://192.168.1.160:8081/pzcatering-web/crmwxapi.do?method='
// _host = localhostDev ? 'http://localhost:8080' : 'http://139.129.222.149:13020/pzcatering-web/crmwxapi.do?method='
let httpUrl = {
  'getDatas': _host + 'getBrandMenuJson', // 初始化页面时加载菜单信息
  'handleSave': _host + 'setBrandMenuJson', // 点击保存时触发
  'getBrandMaterialList': _host + 'getBrandMaterialList', // 初始化页面时加载 “图文信息” 列表
};
export default httpUrl
