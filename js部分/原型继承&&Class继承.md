# 原型如何实现继承？Class如何实现继承？Class本质是什么？
在`JS`中并不存在类，`class`只是语法糖，本质还是函数。
继承方法：组合继承、寄生组合继承、Class继承
```js
class Person {}
Person instanceof Function // true
```

组合继承
组合继承最常用的继承方式

```js
function Parent(value){
    this.val = value;
}
Parent.prototype.getValue = function(){
    console.log(this.val)
}
function Child(value){
    Parent.call(this, value)
}
Child.prototype = new Parent();

const child = new Child(1);

child.getValue() // 1
child instanceof Parent; // true

```

子类通过Parent.call(this)继承父类的属性，然后改变子类的原型 new Parent() 来继承父类的函数