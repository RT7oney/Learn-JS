var myPromise = require('bluebird')
var data = {
    fst: 1,
    sec: false,
    end: 'ok',
}

// 非promise方式实现
// 
// function check(data) {
//     return data == 1 ? true : false
// }

// function fix(data) {
//     data = 1
// }

// function i_dont_promise(data, callback) {
//     if (check(data)) {
//         callback()
//     } else {
//         fix(data)
//         i_dont_promise(data, callback)
//     }
// }

// i_dont_promise(data.fst, function() {
//     i_dont_promise(data.sec, function() {
//         i_dont_promise(data.end, function() {
//             console.log(data.end)
//         })
//     })
// })

// promise
// 
function check(data) {
    return data == 1 ? true : false
}

function fix(data) {
    return new myPromise(function(resolve, reject) {
        data = 1
        resolve()
    })
}

function i_promise(data) {
    return new myPromise(function(resolve, reject) {
        if (check(data)) {
            resolve()
        } else {
            fix(data)
        }
    })
}

i_promise(data.fst)
	.then(function(){
		return i_promise(data.sec)
	})
	.then(function(){
		console.log(data.end)
	})
