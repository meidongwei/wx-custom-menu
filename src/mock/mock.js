import Mock from 'mockjs'
// function getLogoImg () {
// 	return Mock.Random.image('100x100', Mock.Random.hex())
// }
Mock.mock(/getBrandMenuJson/, {
	"errcode": 0,
	"errmsg": "OK",
	"res": {
		"button": [{
			"name": "会员中心",
			"sub_button": [{
				"type": "view",
				"name": "我的卡",
				"url": "https://wxdc.vmolife.com/pzcatering-web/crmwxapi/index.do?brandid=1"
			}, {
				"name": "apple",
				"url": "",
				"type": "media_id",
				"media_id": "rNgdl_jXlgNDMtYATnHtvDp1wT8WMFzYO63jC5C8NPQ"
			}, {
				"name": "local",
				"url": "https://localhost:8080",
				"type": "view"
			}],
			"url": "",
			"type": "media_id"
		}, {
			"type": "media_id",
			"name": "图文消息",
			"media_id": "rNgdl_jXlgNDMtYATnHtvFwyKomAptU7ZPlyQfkIUvI"
		}, {
			"name": "Baidu",
			"type": "view",
			"url": "https://www.baidu.com"
		}],
		"wxname": "青春版品智"
	}
})

Mock.mock(/setBrandMenuJson/, {
  'errcode': 0,
  'errmsg': '服务器内部错误'
})

Mock.mock(/getBrandMaterialList/, {
	"errcode": 0,
	"errmsg": "OK",
	"res": [{
		"media_id": "rNgdl_jXlgNDMtYATnHtvDp1wT8WMFzYO63jC5C8NPQ",
		"content": {
			"news_item": [{
				"title": "测试2",
				"author": "",
				"digest": "测试2测试2测试2测试2测试2测试2测试2测试2测试2",
				"content": "<p>测试2测试2测试2测试2测试2测试2测试2测试2测试2</p>",
				"content_source_url": "",
				"thumb_media_id": "rNgdl_jXlgNDMtYATnHtvODxOqqPkRzHLewbt0stlIc",
				"show_cover_pic": 0,
				"url": "http://mp.weixin.qq.com/s?__biz=MzI1OTg1MDU0OA==&mid=100000007&idx=1&sn=44ad7bedd438bb8734ab1ca4543c42c0&chksm=6a73e95c5d04604a4dfb54ea193273b03aa170644a3efca2a44f71abd3a74a7755272249a3a5#rd",
				"thumb_url": "http://mmbiz.qpic.cn/mmbiz_jpg/ddy6TjufmWIwKBGE0DicgcoEPxpP257icbr32eNnW9PFeKNn12MxU5WJpibtHAib9sjJbicR8fSJJzrxtOAdnsnbabw/0?wx_fmt=jpeg",
				"need_open_comment": 1,
				"only_fans_can_comment": 0
			}],
			"create_time": 1517653803,
			"update_time": 1517653803
		},
		"update_time": 1517653803
	}, {
		"media_id": "rNgdl_jXlgNDMtYATnHtvFwyKomAptU7ZPlyQfkIUvI",
		"content": {
			"news_item": [{
				"title": "图文消息测试略略略略略略略",
				"author": "",
				"digest": "图文消息测试图文消息测试图文消息测试",
				"content": "<p>图文消息测试图文消息测试图文消息测试</p>",
				"content_source_url": "https://www.baidu.com",
				"thumb_media_id": "rNgdl_jXlgNDMtYATnHtvPYEC-42YWQQw2hx-AjhwRY",
				"show_cover_pic": 0,
				"url": "http://mp.weixin.qq.com/s?__biz=MzI1OTg1MDU0OA==&mid=100000004&idx=1&sn=aaad8644ad2c84e77c3c4ca47f1cf4e1&chksm=6a73e95f5d046049dd3e34acfc21fc6dd01b134719d3df44f13786ad11c119b7cbff1f22b18c#rd",
				"thumb_url": "http://mmbiz.qpic.cn/mmbiz_jpg/ddy6TjufmWJ6oTYlNIFgqZV9jgoem5icheXg69cdZpAj9ghMjY6F1CZkIndyhFeCbQB1tXULuwVv49FDvFt9yibA/0?wx_fmt=jpeg",
				"need_open_comment": 1,
				"only_fans_can_comment": 0
			}, {
				"title": "图文消息测试1图文消息测试1图文消息测试1图文消息测试",
				"author": "",
				"digest": "图文消息测试1图文消息测试1图文消息测试1图文消息测试1图文消息测试1",
				"content": "<p>图文消息测试1图文消息测试1图文消息测试1图文消息测试1图文消息测试1</p>",
				"content_source_url": "",
				"thumb_media_id": "rNgdl_jXlgNDMtYATnHtvFIeMs3P_8fg8TpYBourCbk",
				"show_cover_pic": 0,
				"url": "http://mp.weixin.qq.com/s?__biz=MzI1OTg1MDU0OA==&mid=100000004&idx=2&sn=5ee37d11d0f434c1f39cb45c66bca9a1&chksm=6a73e95f5d0460497243fb5670bc3e0825ce7b880cbf1db7c00983debeb56d355d7bcd61007e#rd",
				"thumb_url": "http://mmbiz.qpic.cn/mmbiz_jpg/ddy6TjufmWJ6oTYlNIFgqZV9jgoem5ichaTYNj09clYMn5VcJLPBLOss2AV8NffoWt8pJmSRrx2HFXUYwd7q0KQ/0?wx_fmt=jpeg",
				"need_open_comment": 1,
				"only_fans_can_comment": 0
			}],
			"create_time": 1517467425,
			"update_time": 1517467446
		},
		"update_time": 1517467446
	}]
})
