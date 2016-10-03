var Koa = require('koa')
var KoaRouter = require('koa-router')
var TestModReg = require('./models/DB/testMod') //这里要注册一下模型
var test = require('./controllers/testCtr')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test-koa-router')

var app = new Koa()
var router = new KoaRouter()


router.get('/test',test.index('hello world'))

app.use(router.routes()).use(router.allowedMethods())

app.listen(9999)