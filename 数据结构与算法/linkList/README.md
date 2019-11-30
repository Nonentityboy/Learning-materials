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