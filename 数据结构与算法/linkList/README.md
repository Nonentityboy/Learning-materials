## 题

实现一个函数用来判断字符串是否表示数值（包括整数和小数）。 例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。

## 思路:

所有情况：
* 1.只能出现数字、符号位、小数点、指数位
* 2.小数点，指数符号只能出现一次、且不能出现在开头结尾
* 3.指数位出现后，小数点不允许在出现
* 4.符号位只能出现在开头和指数位后面

```js
function isNumber(s){
    if (s === undefined) {
        return false;
    }
    let hasPoint = false; // 代表小数点位
    let hasExp = false; // 代表指数位
    for (let i = 0; i < s.length; i++) {
        // 依次遍历字符串
        const target = s[i];
        //  看此时遍历值是否为数字
        if (target >= 0 && target <= 9){
            continue;
        // 看此时遍历位是否为指数位
        } else if (target === 'e' || target === 'E') {
            // 为保证指数位只出现一次，指数位保证不能出现在首位或末位
            if( hasExp ||  i === 0 || i === s.length - 1){
                return false;
            } else {
                hasExp = true;
                continue;
            }
        } else if (target === '.'){
            // 为保证指数位、小数位只出现一次，小数位和指数位保证不能出现在首位或末位
            if (hasPoint || hasExp || i === 0 || i === s.length - 1 ){
                return false;
            } else {
                hasPoint = true;
                continue;
            }
        } else if (target === '-'|| target === '+'){
            if ( i === 0 || s[i - 1] === 'e' || s[i - 1] === 'E'){
                continue;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}
```

## 题：

实现一个函数，将一个字符串中的每个空格替换成“%20”。
例如，当字符串为We Are Happy。则经过替换之后的字符串为We%20Are%20Happy。

## 思路：

1.用正则实现字符串的替换 
2.用正则表达式找到所有空格在进行替换

```js
function replaceSpace(str){
    return str.split(' ').join('%20');
}
function replaceSpace(str){
    return str.replace(/\s/g,'%20');
}
function replaceSpace(str){
    // 一次性替换多个空格
    return str.replace(/\s+/g,'%20');
}
```

## 题：

字符串排列：输入一个字符串,按字典序打印出该字符串中字符的所有排列。
例如输入字符串abc,
则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。

## 思路
回溯法：
回溯算法也叫试探法，它是一种系统地搜索问题的解的方法。回溯算法的基本思路是：暴力算法的改进，在通过遍历所有路径基础上，通过回溯（往回找）筛除不可能的路径，提高效率。

1.记录一个字符 (temp)，用于存储当前需要进入排列的字符。
2.记录一个字符串 (current)，用于记录当前已经排列好的字符。
3.记录一个队列 (queue)，用来存储还未被排列的字符。

* 每次排列将temp添加到current
* 如果queue为空，则本次排列完成，将curret加入到结果数组中，结束递归
* 如果queue不为空，说明还有未排列的字符
* 递归排列queue中剩余的字符
* 为了不影响后续排列，每次递归完成，将当前递归的字符temp加回队列

```js
function Permutation(str) {
    const result = []; // 排列结果
    if(str) {
        // 将字符拆分并分离存入队列queue
        quene = str.split('')
        PermutationCore(queue,result);
    }
    result.sort();
    return [...new Set(result)];
}

function PermutationCore(queue,result,temp = "",current = ""){
    // temp为字符 current为字符串
    current += temp;
    if (queue.length === 0) {
        result.push(current);
        return;
    }
    for (let i = 0; i < queue.length; i++) {
        temp = queue.shift();
        PermutationCore(queue, result, temp, current);
        queue.push(temp); 
    }
}
```

## 题：
输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student."，则输出"student. a am I"。

```js
function ReverseSentence(str){
    if (!str) {
        return ''
    }
    return str.split(' ').reverse.join(' ');
}
```

## 题
字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。
请定义一个函数实现字符串左旋转操作的功能。
比如输入字符串"abcdefg"和数字2，该函数将返回左旋转2位得到的结果"cdefgab"。
```js
function LeftRotateString(str,n){
    if( str && n!=null) {
        return (str+str).substr(n,str.length)
        // 两个str进行拼接，直接从第n位开始截取，就相当于将前面n个数字移到末尾。
    } else {
        return ''
    }
}
```

## 题
实现一个函数用来找出字符流中第一个只出现一次的字符。
例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。 
当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。

如果当前字符流没有存在出现一次的字符，返回#字符。

## 思路
<del>使用一个有序的存储结构为每个字符计数，再遍历这个对象，第一个出现次数为1的即为结果。
在JavaScript中有序存储空间选择对象即可。</del>

JavaScript中对象遍历并不是在所有浏览器中的实现都是有序的，而且直接使用对象存储，当字符流中出现数字时也是有问题的。

* 创建一个长度为256的数组container来标记字符流中字符出现的次数
* 使用字符ASCII码作为下标，这样数组长度最大为256
* 当字符没有出现过，标记为-1
* 当字符只出现一次，标记为字符在字符流中的位置index
* 当字符出现多次时，标记为-2
* 当调用FirstAppearingOnce时，只需要找到，数组值大于-1的且值最小的位置索引，即为第一个出现次数为1的字符
  
```js
    let container = new Array(256).fill(-1);
    let index = 0;
    function Init() {
        container = new Array(256).fill(-1);
        index = 0;
    }
    function Insert(ch){
        const code = ch.charCodeAt(0);
        if (container[code] === -1) {
            container[code] = index;
        } else if (container[code] >= 0){
            container[code] = -2;
        }
        index++;
    }
    function FirstAppearingOnce(){
        let minIndex = 256;
        let strIndex = 0;
        for (let i = 0; i < 256; i++){
            if (container[i] >= 0 && container[i] < minIndex) {
                minIndex = container[i];
                strIndex = i;
            }
        }
        return minIndex === 256 ? '#' : String.fromCharCode(strIndex);
    }
```


函数传参的时候传递的对象是在堆中的内存地址的值。
test函数的实参person是p1对象的内存地址，person.age实际上是改变p1的地址，修改age。


```js
function test(person) {
  person.age = 26
  person = {
    name: 'lkt',
    age: 21
  }
  return person
}
const p1 = {
  name: 'lby',
  age: 20
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```

null是对象吗？

null不是对象
typeof null 会输出 object，
但是这只是 JS 存在的一个悠久 Bug。
在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

'1'.toString()为啥可以调用？
第一步: 创建Object类实例。注意为什么不是String ？ 由于Symbol和BigInt的出现，对它们调用new都会报错，目前ES6规范也不建议用new来创建基本类型的包装类。
第二步: 调用实例方法。
第三步: 执行完方法立即销毁这个实例。
整个过程体现了基本包装类型的性质，而基本包装类型恰恰属于基本数据类型，包括Boolean, Number和String。

0.1+0.2为什么不等于0.3？
JS是浮点类型，没有整型。
JS浮点类型基于IEEE754标准实现。
双精度版本(64位)
计算机表示十进制是采用二进制表示的,0.1在二进制表示为：
```js
0.1 = 2^-4 * 1.10011(0011)
// 解决办法
parseFloat((0.1 + 0.2).toFixed(10))
```


时间复杂度
算法中基本操作重复执行的次数（频度）作为算法的时间复杂度。

空间复杂度

### 数组:
#### 为什么很多编程语言中数组都从0开始编号？

官方定义：数组(Array)是一种线性表数据结构。它用一组连续的内存空间，来存储一组具有相同类型的数据。

关键词：
* 1.线性表。
拍成一条线一样的结构，每个线性表上数据只有前后两个方向。
线性表：数组、链表、队列、栈
非线性表：二叉树、堆、图 
（非线性表中，数据之间不是简单的前后关系）
* 2.连续的内存空间和相同类型的数据

这两个限制使数组拥有随机访问的特性。也使数组许多操作非常低效，当删除或插入数据时，为保证连续性，需要大量的数据搬移。
数组支持随机访问，根据下标随机访问的时间复杂度为O(1)

从数组存储的内存模型上来看，
“下标”最确切的定义应该是“偏移(offset)”。
前面也 讲到，如果用 a 来表示数组的首地址，a[0] 就是偏移为 0 的位置，也就是首地址，a[k] 就 表示偏移 k 个 type_size 的位置，所以计算 a[k] 的内存地址只需要用这个公式:
```js
a[k]_address = base_address + k * type_size 
```

如果数组从 1 开始计数，那我们计算数组元素 a[k] 的内存地址就会变为:

```js
 a[k]_address = base_address + (k-1)*type_size
 ```
 
 对比两个公式，我们不难发现，从 1 开始编号，每次随机访问数组元素都多了一次减法运 算，对于 CPU 来说，就是多了一次减法指令。
数组作为非常基础的数据结构，通过下标随机访问数组元素又是其非常基础的编程操作，效 率的优化就要尽可能做到极致。所以为了减少一次减法操作，数组选择了从 0 开始编号， 而不是从 1 开始。

C 语言设计者用 0 开始计数数组下标，之后的 Java、JavaScript 等高级语言都效仿了 C 语 言，或者说，为了在一定程度上减少 C 语言程序员学习 Java 的学习成本，因此继续沿用了 从 0 开始计数的习惯。实际上，很多语言中数组也并不是从 0 开始计数的，比如 Matlab。甚至还有一些语言支持负数下标，比如 Python

链表(上):如何实现LRU缓存淘汰算法


缓存是一种提高数据读取性能的技术，在硬件设计、软件开发中都有着非常广泛的应用，比 如常见的 CPU 缓存、数据库缓存、浏览器缓存等等。

缓存淘汰策略: 

先进先出策略 FIFO(First In，First Out)、最少使用策略 LFU(Least Frequently Used)、最近最少使用策略 LRU(Least Recently Used)。

如何理解：
买了很多本技术书，但有 一天你发现，这些书太多了，太占书房空间了，你要做个大扫除，扔掉一些书籍。那这个时 候，你会选择扔掉哪些书呢?对应一下，你的选择标准是不是和上面的三种策略神似呢?

底层存储结构

为了直观地对比，我画了一张图。从图中我们看到，数组需要一块连续的内存空间来存储， 对内存的要求比较高。如果我们申请一个 100MB 大小的数组，当内存中没有连续的、足够 大的存储空间时，即便内存的剩余总可用空间大于 100MB，仍然会申请失败。

而链表恰恰相反，它并不需要一块连续的内存空间，它通过“指针”将一组零散的内存块串 联起来使用，所以如果我们申请的是 100MB 大小的链表，根本不会有问题。

常见链表结构：
单链表、双向链表、循环链表

链表 通过 指针将零碎的内存块串联 在一起。

把内存块成为链表的“结点”。
为了将所有结点串起来，
每个连标的结点除了存储数据之外 ，再记录链上的下一个结点的地址

把记录下一个结点地址的指针叫做  后继指针next。

单链表： 第一个结点叫头结点  最后一个结点叫尾结点

头结点：用来记录链表的基地址，有它可以遍历得到整条链表。

尾结点：指针最后指向一个空地址NULL,表示这是链表上最后一个结点。

链表插入或者删除：只需要考虑相邻结点的指针改变。其时间复杂度为O(1)。

链表随机访问的性能没有数组好，需要O(n)的时间复杂度。

当随机访问第k个元素时，没有数组那么高效，链表中的数据并非连续存储，，所以无法像数组那样，根据首地址和下标，通过寻址公式就能直接 计算出对应的内存地址，而是需要根据指针一个结点一个结点地依次遍历，直到找到相应的 结点。

把链表想象成一个队伍，队伍中的每个人都只知道自己后面的人是谁，所以当我们希 望知道排在第 k 位的人是谁的时候，我们就需要从第一个人开始，一个一个地往下数。所 以，链表随机访问的性能没有数组好，需要 O(n) 的时间复杂度。

循环链表是一种特殊的单链表。
单链表的尾结点指针指向空地址，表示这就是最后的结点了。而循环链表 的尾结点指针是指向链表的头结点。

单向链表只有一个方向，结点只有一个后继指针 next 指向后面的结点。而双向链表，顾名 思义，它支持两个方向，每个结点不止有一个后继指针 next 指向后面的结点，还有一个前 驱指针 prev 指向前面的结点。
