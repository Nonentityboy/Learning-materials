# call, apply, bind 区别
首先说下前两者的区别。

call 和 apply 都是为了解决改变 this 的指向。作用都是相同的，只是传参的方式不同。

除了第一个参数外，call 可以接收一个参数列表，apply 只接受一个参数数组。

```js
// a为一个对象的环境
let a = {
    value: 1
}
// 方法
function getValue(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value)
}
getValue.call(a, 'lkt', '24')
getValue.apply(a, ['lkt', '24'])
```