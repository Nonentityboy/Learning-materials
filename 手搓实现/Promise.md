# 手撸一个简易版的Promise？

先搭一个大体的框架
```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
    const that = this
    that.state = PENDING
    that.value = null
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []
    // 差个resolve 和 reject函数
    // 差执行fn函数
}
```

* ⾸先我们创建了`三个常量`⽤于表示状态，对于经常使⽤的⼀些值都应该通过常量来管理，便于开发及后期维护
* 在函数体内部⾸先创建了常量 that，因为代码可能会异步执
⾏，⽤于获取正确的 this 对象
* ⼀开始 Promise 的状态应该是 pending ,value 变量⽤于保存 resolve 或者 reject 中传⼊的值
* resolvedCallbacks 和 rejectedCallbacks ⽤于保存 then 中的回调，因为当执⾏完 Promise 时状态可能还是等待中，这时候应该把 then 中的回调保存起来⽤于状态改变时使⽤

```js
function resolve(value) {
    if (that.state === PENDING) {
        that.state = RESOLVED
        that.value = value
        that.resolvedCallbacks.map(cb => {
            cb(that.value)
        })
    }
}

function reject(value) {
    if (that.state === PENDING) {
        that.state = REJECTED
        that.value = value
        that.rejectedCallbacks.map(cb => {
            cb(that.value)
        })
    }
}
```

这两个函数代码类似，就⼀起解析了

* ⾸先两个函数都得判断当前状态是否为等待中，因为规范规定
* 只有等待态才可以改变状态
* 将当前状态更改为对应状态，并且将传⼊的值赋值给 value ,遍历回调数组并执⾏


完成以上两个函数以后，我们就该实现如何执⾏ Promise 中传⼊的
函数了
```js
try {
    fn(resolve, reject)
} catch (e) {
    reject(e)
}
```

* 实现很简单，执⾏传⼊的参数并且将之前两个函数当做参数传进去
* 要注意的是，可能执⾏函数过程中会遇到错误，需要捕获错误,并且执⾏ reject 函数
