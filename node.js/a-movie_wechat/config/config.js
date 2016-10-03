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

module.exports = config