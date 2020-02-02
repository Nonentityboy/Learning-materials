# Promise 的特点是什么，分别有什么优缺点？什么是Promise 链？Promise 构造函数执⾏和 then 函数执⾏有什么区别？

Promise 翻译过来就是`承诺的意思`，这个承诺会在未来有⼀个`确切的答复`，并且该承诺有三种状态，分别是：
* 1. 等待中（pending）
* 2. 完成了 （resolved）
* 3. 拒绝了（rejected）

这个承诺⼀旦从等待状态变成为其他状态就永远不能更改状态了，也就是说⼀旦状态变为 resolved 后，就不能再次改变

```js
new Promise((resolve, reject) => {
  resolve('success')
  // ⽆效
  reject('reject')
})
```

构造 Promise 的时候，`构造函数内部的代码是⽴即执⾏`的
```js
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('finifsh')
// new Promise -> finifsh
```

Promise 实现了链式调⽤，也就是说每次调⽤ then 之后返回的都是⼀个 Promise，并且是⼀个`全新的 Promise`，原因也是因为状态不可变。如果你在 then 中 使⽤了 return，那么 return 的值会被 `Promise.resolve()` 包装
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

Promise 也很好地解决了回调地狱的问题，可以把之前的
回调地狱例⼦改写为如下代码：

```js
ajax(url)
.then(res => {
  console.log(res)
  return ajax(url1)
}).then(res => {
  console.log(res)
  return ajax(url2)
}).then(res => {
  console.log(res)
})
```

前⾯都是在讲述 Promise 的⼀些优点和特点，其实它也是存在⼀些
缺点的，⽐如⽆法取消 Promise，错误需要通过回调函数捕获。

## async 及 await 的特点，它们的优点和缺点分别是什么？await 原理是什么？

⼀个函数如果加上 async ，那么该函数就会返回⼀个 Promise

```js
async function test() {
  return "1"
}
console.log(test()) // -> Promise {<resolved>:"1"}
```

async 就是将函数返回值使⽤ Promise.resolve() 包裹了下，和 then 中处理返回值⼀样，并且 await 只能配套 async 使⽤。

```js
async function test(){
  let value = await sleep();
}
```

async 和 await 可以说是异步终极解决⽅案了，相⽐直接使⽤
Promise 来说，优势在于处理 then 的调⽤链，能够更清晰准确的
写出代码，毕竟写⼀⼤堆 then 也很恶⼼，并且也能优雅地解决回调地狱问题。

当然也存在⼀些缺点，因为 await 将`异步代码改造成了同步代码`，如果多个异步代码没有依赖性却使⽤了 await 会导致性
能上的降低。

```js
async function test() {
  // 下面代码加入没有依赖性，完全用Promise.all 方式
  // 若有依赖性，也就是解决了回调地狱
  await fetch(url)
  await fetch(url1)
  await fetch(url2)
}
```

再看一个使用await的例子
```js
let a = 0;
let b = async () => {
  a = a + await 10
  console.log('2', a) // '2' 10
}
b()
a++
console.log('1', a) // '1' 1
```

* ⾸先函数 b 先执⾏，在执⾏到 await 10 之前变量 a 还是 0，因为 await 内部实现了 generator ，generator 会保留堆栈中东⻄，所以这时候 a = 0 被保存了下来
* 因为 await 是异步操作，后来的表达式不返回 Promise 的话，就会包装成 Promise.reslove(返回值)，然后会去执⾏函数外的同步代码
* 同步代码执⾏完毕后开始执⾏异步代码，将保存下来的值拿出来使⽤，这时候 a = 0 + 10

> await 内部实现了 generator，其实 await 就是 generator 加上 Promise 的语法糖，且内部实现了⾃动执⾏ generator。如果你熟悉 co 的话，其实⾃⼰就可以实现这样的语法糖。