'use strict'

var Koa = require('koa')
var sha1 = require('sha1')
var config = require('./config')
var http = require('http')
    // console.log(request)
    // console.log(response)

var app = new Koa()

app.use(function*(req, res, next) /*发电机函数*/ {
    // console.log(this.query)
    // this.body = this.query.echo
    var data = {
        api_token: '1lme4m58xm',
    }
    data = JSON.stringify(data)
    
    var opt = {
        method: 'POST',
        host: 'http://192.168.1.113',
        port: 9090,
        path: '/v1/dev/get-app-key',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    }

    var req = http.request(opt, function(res) {
        // console.log('=======res=======')
        // console.log(res)
        res.on('data', function(chunk) {
            console.log('data' + chunk)
        })
    })
    req.on('error', function(e) {
        console.log('error:' + e.message)
    })
    req.write(data)
    req.end()

    // var query = this.query
    // var token = config.wechat.token
    // var signature = query.signature
    // var nonce = query.nonce
    // var timestamp = query.timestamp
    // var echostr = query.echostr

    // var tmpstr = [token, timestamp, nonce].sort().join('')
    // var shastr = sha1(tmpstr)

    // if (shastr === signature) {
    //     this.body = echostr + ''
    // } else {
    //     this.body = 'error'
    // }

})

app.listen(config.port)
console.log('sever run @ ' + config.port)
