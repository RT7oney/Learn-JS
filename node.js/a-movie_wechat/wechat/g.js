'use strict'

var sha1 = require('sha1')
var getRawBody = require('raw-body')
var util = require('./libs/util')
    // var Wechat = require('./wechat')
var Promise = require('bluebird')
var request = Promise.promisify(require('request'))

var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
    access_token: prefix + 'token?grant_type=client_credential'
    upload_media: prefix + 'token?grant_type=client_credential'
}

//微信构造函数
function Wechat(opts) {
    var that = this
    this.appId = opts.appId // 业务逻辑传入
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken
    this.fetchAccessToken()

    // this.getAccessToken() //以Promise实现
    //     .then(function(data) {
    //         // console.log('========get data is content?========')
    //         // console.log(data)

    //         try {
    //             data = JSON.parse(data)
    //         } catch (e) {
    //             return that.updateAccessToken(data)
    //         }

    //         if (that.isValidAccessToken(data)) {
    //             // console.log('========promise resolve data========')
    //             // console.log(data)
    //             // return Promise.resolve(data+'lalalala')
    //             return Promise.resolve(data)
    //                 // resolve(data) // 会报resolve not defined
    //         } else {
    //             return that.updateAccessToken()
    //         }
    //     })
    //     .then(function(data) {
    //         console.log('===========from first then resolve data===========')
    //         console.log(data)
    //         that.access_token = data.access_token
    //         that.expires_in = data.expires_in

    //         that.saveAccessToken(data)
    //     })
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
                // console.log('========data========')
                // console.log(data)
            var now = (new Date().getTime())
            var expires_in = now + (data.expires_in - 20) * 1000
            data.expires_in = expires_in
            resolve(data)
        })
    })
}

Wechat.prototype.reply = function() {
    var content = this.body
    var msg = this.weixin
    var xml = util.tpl(content, message)
    this.status = 200
    this.type = 'application/xml'
    this.body = xml
}

Wechat.prototype.fetchAccessToken = function() {
    var that = this
    if(this.access_token&& this.expires_in){
        if(this.isValidAccessToken(this)){
            return Promise.resolve(this)
        }
    }
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
                // return Promise.resolve(data+'lalalala')
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

            return Promise.resolve(data)
        })
}

Wechat.prototype.uploadMaterial = function() {
    var that = this
    var form = {
        media: fs.createReadStream(filepath)
    }

    var appId = this.appId
    var appSecret = this.appSecret

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function(data) {
                var apiUrl = api.upload_media + '&access_token=' + data.access_token + '&type=' + type

                request({ method: 'POST', url: apiUrl, formData: form, json: true })
                    .then(function(response) {
                        var _data = response
                        if (_data) {
                            resolve(data)
                        }
                    })
            })
    })
}

module.exports = function(opts) {
    var wechat = new Wechat(opts)
        // Wechat.Wechat(opts)
    return function*(next) /*发电机函数*/ {
        console.log(this.query)
            // this.body = this.query.echo
        var that = this
        var query = this.query
        var token = opts.token
        var signature = query.signature
        var nonce = query.nonce
        var timestamp = query.timestamp
        var echostr = query.echostr

        var tmpstr = [token, timestamp, nonce].sort().join('')
        var shastr = sha1(tmpstr)

        if (this.method === 'GET') {
            if (shastr === signature) {
                this.body = echostr + ''
            } else {
                this.body = 'error'
            }
        } else if (this.method === 'POST') {
            if (shastr !== signature) {
                this.body = 'error'
            } else {
                var data = yield getRawBody(this.req, {
                        length: this.length,
                        limit: '1mb',
                        encoding: this.charset
                    })
                    // console.log(data.toString())
                var content = yield util.parseXMLAsync(data)
                console.log(content)
                var msg = util.formatMessage(content.xml)
                console.log(msg)

                this.wexin = msg //把这个带有消息的this交出去

                yield handler.call(this, next) //这里可以使用发电机函数来暂停程序的执行，并且去处理消息，外部传入一个控制器handler，然后通过call方法来改变上下文，也把next作为参数传递给handler

                wechat.reply.call(this) // 请求和响应回到这里
                    // if(msg.msgType === 'event'){
                    //     if(msg.Event ==='subscribe'){
                    //         var now = new Date().getTime()

                //         that.status = 200
                //         that.type = 'application/xml'
                //         that.body = reply
                //     }
                // }
            }
        }

    }
}
