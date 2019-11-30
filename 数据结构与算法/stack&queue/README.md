## 栈与队列
数组中，我们可以通过索引随机访问元素，但是在某些情况下，我们可能要限制数据的访问顺序，于是有了两种限制访问顺序的数据结构：栈（先进后出）、队列（先进先出）。

## 实现栈
```js
class Stack {
    constructor() {
        this.stack = []
    }
    push(item) {
        this.stack.push(item) // 尾部添加
    }
    pop(){
        this.stack.pop() // 去除首元素
    }
    peek(){
        return this.stack[this.getCount() - 1] //获取尾元素
    }
    getCount() {
        return this.stack.length // 获取栈长度
    }
    isEmpty() {
        return this.getCount() === 0 //判断栈元素是否为空
    }
}
```

## 实现单链队列
```js
class Queue {
    constructor() {
        this.queue = []
    }
    enQueue(item) {
        this.queue.push(item) // 尾部添加元素
    }
    deQueue() {
        return this.queue.shift() // 去除队列头元素
    }
    getHeader() {
        return this.queue[0]  //获取队列头元素
    }
    getLength() {
        return this.queue.length // 获取队列长度
    }
    isEmpty() {
        return this.getLength() === 0 //判断队列是否为空
    }
}
```
单链队列出队O(n)的时间复杂度，引入了循环队列，循环队列的出队操作平均是O(1)时间复杂度。

## 循环队列
```js

```

## 题目
包含min函数的栈，定义栈的数据结构。
在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。

## 思路

```js
var dataStack = [];
var minStack = [];

function push(node){
    dataStack.push(node);
    if(minStack.length === 0 ||  node < min()){
        minStack.push(node);
    }else{
        minStack.push(min());
    }
}

function pop(){
    minStack.pop();
    return dataStack.pop();
}

function top(){
    var length = dataStack.length;
    return length>0&&dataStack[length-1]
}

function min(){
    var length = minStack.length;
    return length>0&&minStack[length-1]
}
```

## 题目
用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

## 思路
栈1:入队列存储
栈2:出队列时将栈1的数据依次出栈，并入栈到栈2中
栈2出栈即栈1的底部数据即队列要出的数据。

注意:栈2为空才能补充栈1的数据，否则会打乱当前的顺序。

```js
const stack1 = [];
const stack2 = [];

function push(node){
    stack1.push(node);
}
function pop(){
    if(stack2.length === 0){
       while(stack1.length > 0){
        stack2.push(stack1.pop());
       }
    }
    return stack2.pop() || null;
}
```

## 用两个队列实现一个栈
```JS
const queue1 = []
const queue2 = []

function push(x) {
    if (queue1.length === 0) {
            queue1.push(x)
        while (queue2.length) {
            queue1.push(queue2.shift())
        }
    } else if (queue2.length === 0) {
        queue2.push(x)
        while (queue1.length) {
            queue2.push(queue1.shift())
        }
    }
};

function pop() {
    if (queue1.length !== 0) {
        return queue1.shift()
    } else {
        return queue2.shift()
    }
};
```