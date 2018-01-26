import Mock from 'mockjs'
// function getLogoImg () {
// 	return Mock.Random.image('100x100', Mock.Random.hex())
// }
Mock.mock(/getBrandMenuJson/, {
  'errcode': 0,
  'errmsg': '服务器内部错误',
  'res': {
    'button|0-3': [
      {
        'name|1': '@ctitle(3)',
        'sub_button|1-3': [
          {
            'type': 'view',
            'name|1': '@ctitle(2)',
            'url': 'www.baidu.com',
            'type': 'view'
          }
        ],
        'url': 'www.soso.com',
        'type': 'view'
      }
    ]
  }
})

Mock.mock(/setBrandMenuJson/, {
  'errcode': 0,
  'errmsg': '服务器内部错误'
})
