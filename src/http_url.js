let localhostDev = false

// let _host= localhostDev ? 'http://localhost:8080' : '/pzcatering-web/crmwxapi.do?method='
// let _host = localhostDev ? 'http://localhost:8080' : 'http://192.168.1.160:8081/pzcatering-web/crmwxapi.do?method='
// 公网
let _host = localhostDev ? 'http://localhost:8080' : 'http://139.129.222.149:13020/pzcatering-web/crmwxapi.do?method='
let httpUrl = {
  // 初始化页面时加载菜单信息
  'getDatas': _host + 'getBrandMenuJson',
  // 点击保存时触发
  'handleSave': _host + 'setBrandMenuJson',
  // 初始化页面时加载 “图文信息” 列表
  'getBrandMaterialList': _host + 'getBrandMaterialList'
};
export default httpUrl
