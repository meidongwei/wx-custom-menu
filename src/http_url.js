let localhostDev = false

let _host= localhostDev ? 'http://localhost:8080' : '/pzcatering-web/crmwxapi.do?method='
// let _host = localhostDev ? 'http://localhost:8080' : 'http://192.168.1.164:8081/pzcatering-web/crmwxapi.do?method='
let httpUrl = {
  'getDatas': _host + 'getBrandMenuJson',
  'handleSave': _host + 'setBrandMenuJson'
};
export default httpUrl
