# ES6

### var、let 及const区别？

- 全局申明的var会挂在到window上，let与const不会
- var声明存在变量提升，let与const不会
- let与const作用范围是块级作用域，var作用范围是函数作用域
- 同一作用域下let与const不能声明同名变量，var可以
- 同一作用域下在let和const声明前使用会存在暂时性死区
- const
 - 一旦声明必须要赋值，且不能用null占位  
 - 声明之后不能再修改
 - 如果声明的是符合类型，则就可以修改

### Proxy
proxy是ES6 中新增的功能，它可以用来<b>自定义对象中的操作</b>。Vue3.0用proxy替换原本的object.defineproperty来实现数据响应式。

```js
let p = new Proxy(target,handler)
```
`target`代表需要添加代理的对象，`handler`用来定义对象中的操作，比如可以用来自定义set或者get函数。

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    },
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    }
  }
  return new Proxy(obj, handler)
}


let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 控制台输出：监听到属性a改变
p.a // 'a' = 2
```

自定义 set 和 get 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。

当然这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，需要我们在 get 中收集依赖，在 set 派发更新，之所以 Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了。


### map
map 作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后返回一个新数组，原数组不发生改变

map 的回调函数接受三个参数，分别是当前索引元素，索引，原数组

```js
var arr = [1,2,3];
var arr2 = arr.map(item => item + 1)
arr   //[ 1, 2, 3 ]
arr2  // [ 2, 3, 4 ]
```

```js
['1','2','3'].map(parseInt)
// -> [ 1, NaN, NaN ]
```
 - 第一个 parseInt('1', 0) -> 1
 - 第二个 parseInt('2', 1) -> NaN
 - 第三个 parseInt('3', 2) -> NaN

### reduce
reduce 可以将数组中的元素通过回调函数最终转换为一个值。
如果我们想实现一个功能将函数里的元素全部相加得到一个值，可能会这样写代码
```js
const arr = [1, 2, 3]
let total = 0
for (let i = 0; i < arr.length; i++) {
  total += arr[i]
}
console.log(total) //6 
```
但是如果我们使用 reduce 的话就可以将遍历部分的代码优化为一行代码
```js
const arr = [1, 2, 3]
const sum = arr.reduce((acc, current) => acc + current, 0)
console.log(sum)
```
对于 reduce 来说，它接受两个参数，分别是<b>回调函数和初始值</b>，接下来我们来分解上述代码中 reduce 的过程
 - 首先初始值为 0，该值会在执行第一次回调函数时作为第一个参数传入
 - 回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数
 - 在一次执行回调函数时，当前值和初始值相加得出结果 1，该结果会在第二次执行回调函数时当做第一个参数传入
 - 所以在第二次执行回调函数时，相加的值就分别是 1 和 2，以此类推，循环结束后得到结果 6。

### ES6中箭头函数和普通函数的区别？
 - 普通function的声明在变量提升中是最高的，箭头函数没有函数提升
 - 箭头函数没有属于自己的`this`，`arguments`
 - 箭头函数不能作为构造函数，不能被new，没有property
 - 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
 - 不可以使用 new 命令，因为：
   - 没有自己的 this，无法调用 call，apply
   - 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 `__proto__`

### Promise
`Promise` 翻译过来就是承诺的意思，这个承诺会在未来有一个确切的答复，并且该承诺有三种状态，这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了。

 - 等待中（pending）
 - 完成了（resolved）
 - 拒绝了（rejected）

我们在构造 Promise 的时候，构造函数内部的代码是立即执行的。
```js
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('finifsh')
// 先打印new Promise， 再打印 finifsh
```

Promise 实现了链式调用，也就是说每次调用 then 之后返回的都是一个 Promise，并且是一个全新的 Promise，原因也是因为状态不可变。如果你在 then 中 使用了 return，那么 return 的值会被 Promise.resolve() 包装。
```js
Promise.resolve(1)
  .then(res => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res) // => 2
  })
```

当然了，Promise 也很好地解决了回调地狱的问题
```js
ajax(url)
  .then(res => {
      console.log(res)
      return ajax(url1)
  }).then(res => {
      console.log(res)
      return ajax(url2)
  }).then(res => console.log(res))
```
其实它也是存在一些缺点的，比如无法取消 Promise，错误需要通过回调函数捕获。

### async 和 await

### ES Module
ES Module 是原生实现的模块化方案， 与commonJS 有以下几个区别

- CommonJS支持动态导入，也就是require(${path}/xx.js),后者目前不支持，但已有提案
- CommonJS是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。 ES Module是异步导入，用于浏览器，需要下载文件，如果采用同步的话会对渲染有影响。
- CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
- ES Module 会编译成 require/exports 来执行的
  
```js
// 引入模块 API
import XXX from './a.js'
import { XXX } from './a.js'
// 导出模块 API
export function a() {}
export default function() {}
```