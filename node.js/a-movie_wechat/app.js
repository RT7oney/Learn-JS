'use strict'

var Koa = require('koa')
var path = require('path')
var wechat = require('./wechat/g')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.json')
var config = {
    wechat: {
        appId: 'wx17ea2dd41f40de31',
        appSecret: '8318b4d4511c90f8ba963e0b5a8b74d3',
        token: 'bushitry',
        getAccessToken: function() {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data)
            // console.log('==========传入data==========')
            // console.log(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}

var app = new Koa()

/**
 * 接入微信中间件
 */
app.use(wechat(config.wechat))
    // app.use(_.get('/test', wechatCom.getAccessToken(this)))

app.listen(7070)
console.log('sever run @ ' + 7070)
