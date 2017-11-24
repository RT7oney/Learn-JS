var obj = { propA: 'foo', propB: [] };
var objB = Object.create(obj);
objB.propB.push('bar');
console.log(obj.propB);

objB.propA = 'bar';
console.log(obj.propA);


var obj = {
  propA: 'foo',
  doSth: function() {
    console.log(this.propA);
  }
}

obj.doSth(); // 打印的是什么

var doSth = obj.doSth;
doSth();
