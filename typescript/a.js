"use strict";
exports.__esModule = true;
var Test = (function () {
    function Test() {
        console.log("这里是什么呢", this.config.A);
    }
    return Test;
}());
exports.Test = Test;
new Test();
