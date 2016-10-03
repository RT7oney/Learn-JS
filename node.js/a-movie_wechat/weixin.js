'use strict'

exports.reply = function*(next) {
    var msg = this.weixin
    if (msg.msgType === 'event') {
        if (mst.Event === 'subscribe') {
            if (msg.EventKey) {
                console.log('扫码：' + msg.EventKey + ' ' + msg.ticket)
            }
            this.body = '哈哈，你订阅了这个号\r\n'+msg.MsgId
        }
    }

    yield next
}
