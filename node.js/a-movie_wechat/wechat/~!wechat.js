// todo 在g.js引入的时候会报Wechat is not a function
'use strict'

var Promise = require('bluebird')
var request = Promise.promisify(require('request'))

var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
    access_token: prefix + 'token?grant_type=client_credential'
}

//微信构造函数
function Wechat(opts) {
// module.exports= function Wechat (opts) {
    var that = this
    this.appId = opts.appId // 业务逻辑传入
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken

    this.getAccessToken() //以Promise实现
        .then(function(data) {
            // console.log('========get data is content?========')
            // console.log(data)

            try {
                data = JSON.parse(data)
            } catch (e) {
                return that.updateAccessToken(data)
            }

            if (that.isValidAccessToken(data)) {
                // console.log('========promise resolve data========')
                // console.log(data)
                return Promise.resolve(data)
                // resolve(data) // 会报resolve not defined
            } else {
                return that.updateAccessToken()
            }
        })
        .then(function(data) {
            console.log('===========from first then resolve data===========')
            console.log(data)
            that.access_token = data.access_token
            that.expires_in = data.expires_in

            that.saveAccessToken(data)
        })
}

Wechat.prototype.isValidAccessToken = function(data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false
    }

    var access_token = data.access_token
    var expires_in = data.expires_in
    var now = (new Date().getTime())

    if (now < expires_in) {
        return true
    } else {
        return false
    }
}

Wechat.prototype.updateAccessToken = function() {
    var appId = this.appId
    var appSecret = this.appSecret
    var apiUrl = api.access_token + '&appid=' + appId + '&secret=' + appSecret
    return new Promise(function(resolve, reject) {
        request({ url: apiUrl, json: true }).then(function(response) {
            // console.log('========req========')
            // console.log(response.body)
            var data = response.body
            console.log('========data========')
            console.log(data)
            var now = (new Date().getTime())
            var expires_in = now + (data.expires_in - 20) * 1000
            data.expires_in = expires_in
            resolve(data)
        })
    })

}