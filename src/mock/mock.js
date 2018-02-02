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
        // 'sub_button|1-3': [
        //   {
        //     'type': 'view',
        //     'name|1': '@ctitle(2)',
        //     'url': 'www.baidu.com'
        //   }
        // ],
        // 'url': 'www.soso.com',
        'item': [
          {
            'media_id': '@id()',
            'content': {
              'new_item': [
                {
                  'title': '@ctitle()',
                  'author': 'Arif',
                  'digest': '图文消息测试',
                  'content': '图文消息测试',
                  'content_source_url': 'http://www.baidu.com',
                  'thumb_media_id': 'rNgdl_jXlgNDMtYATnHtvPYEC-42YWQQw2hx-AjhwRY',
                  'url': 'http://www.baidu.com',
                  'thumb_url': 'http://www.baidu.com',
                },
                {
                  'title': '图文消息测试2',
                  'author': 'Arif2',
                  'digest': '图文消息测试2',
                  'content': '图文消息测试2',
                  'content_source_url': 'http://www.baidu.com',
                  'thumb_media_id': 'rNgdl_jXlgNDMtYATnHtvPYEC-42YWQQw2hx-AjhwRY',
                  'url': 'http://www.baidu.com',
                  'thumb_url': 'http://www.baidu.com',
                }
              ],
              'create_time': '1517467425',
              'update_time': '1517467446'
            },
            'update_time': '1517467446'
          }
        ],
        'type': 'view'
      }
    ],
    'wxname': '青春版品质 Test'
  }
})

Mock.mock(/setBrandMenuJson/, {
  'errcode': 0,
  'errmsg': '服务器内部错误'
})

Mock.mock(/getBrandMaterialList/, {
  'errcode': 0,
  'errmsg': '服务器内部错误',
  'res': {
    'item|9': [
      {
        'media_id': '@id()',
        'content': {
          'new_item': [
            {
              'title': '@ctitle()',
              'author': 'Arif',
              'digest': '图文消息测试',
              'content': '图文消息测试',
              'content_source_url': 'http://www.baidu.com',
              'thumb_media_id': 'rNgdl_jXlgNDMtYATnHtvPYEC-42YWQQw2hx-AjhwRY',
              'url': 'http://www.baidu.com',
              'thumb_url': 'http://www.baidu.com',
            },
            {
              'title': '图文消息测试2',
              'author': 'Arif2',
              'digest': '图文消息测试2',
              'content': '图文消息测试2',
              'content_source_url': 'http://www.baidu.com',
              'thumb_media_id': 'rNgdl_jXlgNDMtYATnHtvPYEC-42YWQQw2hx-AjhwRY',
              'url': 'http://www.baidu.com',
              'thumb_url': 'http://www.baidu.com',
            }
          ],
          'create_time': '1517467425',
          'update_time': '1517467446'
        },
        'update_time': '1517467446'
      }
    ],
    'total_count': 1,
    'item_count': 1
  }
})
