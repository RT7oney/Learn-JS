function B(x){
    console.log("参数在这里", x)
}

var A = function(x){
    return B(x)
}

A(4);