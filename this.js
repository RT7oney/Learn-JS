// 理解JavaScript中的this
function MyTest() {
	return this.myname = 'lala'
}

var mt = new MyTest
console.log(mt)


// 测试1
console.log("===测试一===")
function identify() {
    return this.name.toUpperCase();
}
function sayHello() {
	console.log(this)
    var greeting = "Hello, I'm " + identify.call( this );
    console.log( greeting );
}
var person1= {
    name: "Kyle"
};
var person2= {
    name: "Reader"
};
sayHello()
identify.call( person1); // KYLE
identify.call( person2); // READER
sayHello.call( person1); // Hello, I'm KYLE
sayHello.call( person2); // Hello, I'm READER
console.log("===测试一===")

// this跟函数在哪里定义没有半毛钱关系，函数在哪里调用才决定了this到底引用的是啥

/*****************1 默认绑定全局变量********************/ 
// 这条规则是最常见的，也是默认的。当函数被单独定义和调用的时候，应用的规则就是绑定全局变量。如下：
function fn() {
    console.log( this.a );
}
var a = 2;
fn(); // -- fn单独调用，this引用window

/*********************2 隐式绑定************************/ 
// 隐式调用的意思是，函数调用时拥有一个上下文对象，就好像这个函数是属于该对象的一样。例如：

function fn() {
    console.log( this.a );
}
var obj = {
    a: 2,
    fn: fn
};
obj.fn(); // 2 -- this引用obj。

// 最后一个调用该函数的对象是传到函数的上下文对象

function fn() {
    console.log( this.a );
}
var obj2 = {
    a: 42,
    fn: fn
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.fn(); // 42 -- this引用的是obj2.

// javascript中的对象时引用传递不是值传递
var test ={
  'a':1,
  'b':function(){
   alert(this === test)
  }
 }
var test1 = test;
test.a = 2;
alert(test1.a);

// 失去隐世绑定的情况
function fn() {
    console.log( this.a );
}
var obj = {
    a: 2,
    fn: fn
};
var bar = obj.fn; // 函数引用传递
var a = "全局"; // 定义全局变量
bar(); // "全局"


/**********************3 显示绑定*************************/ 
// 学过bind()\apply()\call()函数的都应该知道，它接收的第一个参数即是上下文对象并将其赋给this

function fn() {
    console.log( this.a );
}
var obj = {
    a: 2
};
fn.call( obj ); // 2
fn.bind( obj )

// 如果我们传递第一个值为简单值，那么后台会自动转换为对应的封装对象。如果传递为null，那么结果就是在绑定默认全局变量

function fn() {
     console.log( this.a );
 }
 var obj = {
     a: 2
 };
var a = 10;
fn.call( null); // 10

/**********************4 new新对象绑定*************************/ 
// 如果是一个构造函数，那么用new来调用，那么绑定的将是新创建的对象

function fn(a) {
    this.a = a;
}
var bar = new fn( 2 );
console.log( bar.a );// 2
// 一般构造函数名首字母大写，这里没有大写的原因是想提醒读者，构造函数也是一般的函数而已

/**********************5 with(obj)中的this*************************/ 
// 我们需要分析其所在范围。如果是在函数中的this，代表obj，如果是全局范围变量中，则代表window
var name='window_dqs';
var obj={
	name:'obj_dqs',
	showName:function(){
	    console.log(this);
	}
};

function showName(){
	console.log(this);
}


with(obj){
	console.log(this);
	showName();
}
showName();
