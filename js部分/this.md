## this指向

如何理解：只要记住他几个规则就可以。

```js
function foo() {
	console.log(this.a)
}
var a = 1
foo() // 1

var obj = {
	a: 2,
	foo: foo
}
obj.foo() // 2
// 以上两者情况 `this` 只依赖于调用函数前的对象，优先级是第二个情况大于第一个情况
```

```js
// 以下情况是优先级最高的，`this` 只会绑定在 `c` 上，不会被任何方式修改 `this` 指向
var c = new foo()
c.a = 3
console.log(c.a)

// 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new
```

```js
function a() {
    return () => {
        return () => {
        	console.log(this)
        }
    }
}
console.log(a()()()) /// window
```

箭头函数其实是没有 this 的，这个函数中的 this 只取决于他外面的第一个不是箭头函数的函数的 this。在这个例子中，因为调用 a 符合前面代码中的第一个情况，所以 this 是 window。并且 this 一旦绑定了上下文，就不会被任何代码改变。


this定义：this是在执行上下文创建时确定的一个在执行过程中不可更改的变量。(this就是个变量)

### 调用位置
函数在代码中<b>被调用的位置</b>

查找方法:

方法一: 分析调用栈(调用位置就是当前正在执行的函数的前一个调用中)
```js
function baz() {
    // 当前调用栈是：baz
    // 因此，当前调用位置是全局作用域
    
    console.log( "baz" );
    bar(); // <-- bar的调用位置
}

function bar() {
    // 当前调用栈是：baz --> bar
    // 因此，当前调用位置在baz中
    
    console.log( "bar" );
    foo(); // <-- foo的调用位置
}

function foo() {
    // 当前调用栈是：baz --> bar --> foo
    // 因此，当前调用位置在bar中
    
    console.log( "foo" );
}

baz(); // <-- baz的调用位置
```

方法二：使用开发者工具的到调用栈：

设置断点或者插入debugger;
语句，运行时调试器会在那个位置暂停，同时展示当前位置的函数调用列表，这就是调用栈。找到栈中的第二个元素，这就是真正的调用位置。

### 绑定规则

#### 默认绑定
* 独立函数调用，把默认绑定看作是无法应用其他规则时的默认规则，此时<b>this指向全局对象</b>
* 严格模式下，this会绑定到undefined。只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。在严格模式下调用函数不影响默认绑定

```js
function foo() { // 运行在严格模式下，this会绑定到undefined
    "use strict";
    
    console.log( this.a );
}

var a = 2;

// 调用
foo(); // TypeError: Cannot read property 'a' of undefined

// --------------------------------------

function foo() { // 运行
    console.log( this.a );
}

var a = 2;

(function() { // 严格模式下调用函数则不影响默认绑定
    "use strict";
    
    foo(); // 2
})();
```

#### 隐式绑定

当函数引用有上下文对象时，隐式绑定规则会把函数中的this绑定到这个上下文对象。

对象属性引用链中只有上一层或者说最后一层在调用中起作用。

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

obj.foo(); // 2
```

特定情况下，被隐式绑定的函数特定情况下会丢失绑定对象。
导致默认绑定，把this绑定到全局对象或undefined。

```js
// 虽然bar是obj.foo的一个引用，但是实际上，它引用的是foo函数本身。
// bar()是一个不带任何修饰的函数调用，应用默认绑定。
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // 函数别名

var a = "oops, global"; // a是全局对象的属性

bar(); // "oops, global"
```

参数传递就是一种隐式赋值，传入函数时也会被隐式赋值。回调函数丢失this绑定是非常常见的。

```js
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // fn其实引用的是foo
    
    fn(); // <-- 调用位置！
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a是全局对象的属性

doFoo( obj.foo ); // "oops, global"

// ----------------------------------------

// JS环境中内置的setTimeout()函数实现和下面的伪代码类似：
function setTimeout(fn, delay) {
    // 等待delay毫秒
    fn(); // <-- 调用位置！
}
```

#### 显式绑定
call(..) 或者 apply(..)方法。第一个参数是一个对象，在调用函数时将这个对象绑定到this。因为直接指定this的绑定对象，称之为显示绑定。

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2  调用foo时强制把foo的this绑定到obj上
```
显示绑定无法解决丢失绑定问题。

##### 解决办法：
* 1.硬绑定
* 2.API调用的“上下文”

#### new 绑定

使用new调用函数，或者说发生构造函数调用时，执行操作：
* 创建（或者说构造）一个新对象
* 这个新对象被执行[[Prototype]]连接
* 这个新对象会绑定到函数调用的this
* 如果函数没有返回其他对象，new表达式中的函数调用会自动返回这个新对象

```js
function foo(a) {
    this.a = a;
}

var bar = new foo(2); //bar和foo(..)调用的this绑定
console.log(2)
```

### 题目1
```js
var name = 'window';
var person1 = {
    name: 'person1',
    show1: function () {
        console.log(this.name)
    },
    show2: () => console.log(this.name),
    show3: function () {
        return function () {
            console.log(this.name)
        }
    },
    show4: function () {
        return () => console.log(this.name)
    }
}
var person2 = { name: 'person2' }

person1.show1() // person1 隐式绑定
person1.show1.call(person2) //person2 显式绑定

person1.show2() //window 箭头函数绑定
person1.show2.call(person2) //// window，箭头函数绑定，this指向外层作用域，即全局作用域

person1.show3()()  // window，默认绑定，这是一个高阶函数，调用者是window 类似于`var func = person1.show3()` 执行`func()`
person1.show3().call(person2) //person2 显式绑定，this指向 person2
person1.show3.call(person2)() // window，默认绑定，调用者是window

person1.show4()() //person1 箭头函数绑定，this指向外层作用域，即person1函数作用域
person1.show4().call(person2)  // person1，箭头函数绑定，this指向外层作用域，即person1函数作用域
person1.show4.call(person2)() // person2
```
最后一个person1.show4.call(person2)()有点复杂，我们来一层一层的剥开。

1、首先是var func1 = person1.show4.call(person2)，这是显式绑定，调用者是person2，show4函数指向的是person2。

2、然后是func1()，箭头函数绑定，this指向外层作用域，即person2函数作用域
首先要说明的是，箭头函数绑定中，this指向外层作用域，并不一定是第一层，也不一定是第二层。

因为没有自身的this，所以只能根据作用域链往上层查找，直到找到一个绑定了this的函数作用域，并指向调用该普通函数的对象。
