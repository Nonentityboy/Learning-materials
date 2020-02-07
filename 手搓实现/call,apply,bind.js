// call和apply都是改变this 指向。
// 作用都是相同的，知识传参不同。
// 除了第一个参数放对象外。
// call可以放一个参数列表 
// apply只接受一个参数数组

let a = {
    value: 1
}
function getValue(name,age){
    console.log(name)
    console.log(age)
    console.log(this.value)
}
getValue.call(a,'lkt','22')
getValue.apply(a,['lkt','22'])

Function.prototype.myCall = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('Error')
    }
    context = context || window
    // context为空this指向window
    // getValue.call(a,'lkt','22') a.fn = getValue

    context.fn = this;
    // 将context 后面的参数取出来
}