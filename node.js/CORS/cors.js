var express = require('express');  
var app = express();
var http = require('http')  
//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});  
  
app.post('http://192.168.1.113:9090/v1/dev/get-app-key', function(req, res) {  
    // res.send({id:req.params.id, name: req.params.password});  
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
});  
  
app.listen(3000);