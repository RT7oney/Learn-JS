'use strict'

var fs = require('fs')
var Promise = require('bluebird')
var xml2js = require('xml2js')
var tpl = require('./tpl')

exports.readFileAsync = function(fpath, encoding) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fpath, encoding, function(err, content) {
            if (err) {
                reject(err)
            } else {
                // console.log('=======read content=======')
                // console.log(content)
                resolve(content)
            }
        })
    })
}

exports.writeFileAsync = function(fpath, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(fpath, content, function(err) {
            if (err) reject(err)
            else resolve()
        })
    })
}

exports.parseXMLAsync = function(xml) {
    return new Promise(function(resolve, reject) {
        xml2js.parseString(xml, { trim: true }, function(err, content) {
            if (err) {
                reject(err)
            } else {
                resolve(content)
            }
        })
    })
}

function formatMessage(content) {
    var msg = {}
    if (typeof content === 'object') {
        var keys = Object.keys(content)

        for (var i = 0; i < keys.length; i++) {
            var item = result[keys[i]]
            var key = keys[i]

            if (!(item instanceof Array) || item.length === 0) {
                continue
            }

            if (item.length === 1) {
                var val = item[0]
                if (typeof val === 'object') {
                    msg[key] = formatMessage(val)
                } else {
                    msg[key] = (val || '').trim()
                }
            } else {
                msg[key] = []

                for (var j = 0; k = item.length; j < k; j++) {
                    msg[key].push(formatMessage(item[j]))
                }
            }
        }
    }

    return msg
}

exports.formatMessage = function(xml) {
    return new Promise(function(resolve, reject) {
        xml2js.parseString(xml, { trim: true }, function(err, content) {
            if (err) reject(err)
            else resolve(content)
        })
    })
}

exports.tpl = function(content,msg){
	var info = {}
	var type = 'text'
	var fromUserName = msg.FromUserName
	var toUserName= msg.ToUserName
	if(Array.isArray(content)){
		type = 'news'
	}
	type = content.type || type
	info.content = content
	info.createTime= new Date().getTime()
	info.msgType = type
	info.toUserName = fromUserName
	info.fromUserName = toUserName

	return tpl.compiled(info)
}
