# JavaScript 正则


### 创建正则表达式方法

方式1:

```js
// 语法格式为: /正则表达式主体/修饰符(可选)
// 案例
var patt = /var/i
// var 是正则表达式主体
// i 是修饰符
```

方式2:
```js
// 创建 RegExp 对象
// new RegExp(正则表达式主体[, 修饰符])
// RegExp(正则表达式主体[, 修饰符])
var patt = new RegExp('var', 'i')
```

> 注意: /var/i 创键的正则表达式对象和 new RegExp(var, i) 创建的对象并不相等。虽然它们匹配规则一样。

### 字符类别

字符

| 元字符 | 作用                                                                         |
| ------ | ---------------------------------------------------------------------------- |
| .      | 匹配任意字符除了换行符和回车符                                               |
| []     | 匹配方括号内的任意字符。比如 [0-9] 就可以用来匹配任意数字                    |
| ^      | ^9，这样使用代表匹配以 9 开头。[^9]，这样使用代表不匹配方括号内除了 9 的字符 |
| {1, 2} | 匹配 1 到 2 位字符                                                           |
| (lkt)  | 只匹配和 lkt 相同字符串                                                      |
| \|     | 匹配 \| 前后任意字符                                                         |
| \      | 转义                                                                         |
| *      | 只匹配出现 0 次及以上 * 前的字符                                             |
| +      | 只匹配出现 1 次及以上 + 前的字符                                             |
| ?      | ? 之前字符可选                                                               |


字符简写

| 简写 | 作用                 |
| ---- | -------------------- |
| \b   | 匹配单词的开始或结束 |
| \B   | 和上面相反           |
| \w   | 匹配字母数字或下划线 |
| \W   | 和上面相反           |
| \s   | 匹配任意的空白符     |
| \S   | 和上面相反           |
| \d   | 匹配数字             |
| \D   | 和上面相反           |


修饰语
| 修饰语 | 作用       |
| ------ | ---------- |
| i      | 忽略大小写 |
| g      | 全局搜索   |
| m      | 多行       |

```js
var reg = /\bis\b/
// 此时匹配第一个单词的开始与结束
'this is a dog. where is she'.replace(reg,'IS')
"this IS a dog. where is she"

var reg = /\bis\b/g
// 此时匹配全局单词的开始与结束
'this is a dog. where is she'.replace(reg,'IS')
"this IS a dog. where IS she"

var reg = new RegExp('\\bis\\b','g')
'this is a dog. where is she'.replace(reg,'IS')
"this IS a dog. where IS she"


'he is a boy . Is he?'.replace(/\bis\b/g,'0')
"he 0 a boy . Is he?"
// i为忽略大小写
'he is a boy . Is he?'.replace(/\bis\b/gi,'0')
"he 0 a boy . 0 he?"

// 匹配方括号内的任意字符。比如 [0-9] 就可以用来匹配任意数字 ^为取反
'a1b2c3d4'.replace(/[abc]/g, 'X')
"X1X2X3d4"
'a1b2c3d4'.replace(/[abcd]/g, 'X')
"X1X2X3X4"
'a1b2c3d4'.replace(/[^abcd]/g, 'X')
"aXbXcXdX"


'a1b2c3x4z9'.replace(/[a-z]/g, 'Q')
"Q1Q2Q3Q4Q9"
'a1b2c3x4z9'.replace(/[^a-z]/g, 'Q')
"aQbQcQxQzQ"
'a1b2B3x4z9'.replace(/[a-zA-Z]/g, 'Q')
"Q1Q2Q3Q4Q9"
'a1b2B3x4z9VYFGUYGUIIUG'.replace(/[a-zA-Z]/g, 'Q')
"Q1Q2Q3Q4Q9QQQQQQQQQQQQ"

'2020-01-01'.replace(/[0-9]/g, 'A')
"AAAA-AA-AA"
'2020-01-01'.replace(/[0-9-]/g, 'A')
"AAAAAAAAAA"

// \B 与 \b相反
'this is a boy'.replace(/is/g,'0')
"th0 0 a boy"
'this is a boy'.replace(/\bis\b/g,'0')
"this 0 a boy"
'this is a boy'.replace(/\Bis\B/g,'0')
"this is a boy"
'this is a boy'.replace(/\Bis\b/g,'0')
"th0 is a boy"

// . 匹配任意字符除了换行符和回车符
'@123@abc@'.replace(/@./g,'Q')
"Q23Qbc@"
'@123@abc@'.replace(/^@./g,'Q')
"Q23@abc@"
'@123@abc@'.replace(/.@/g,'Q')
"@12QabQ"
// $ 为最后的截止符
'@123@abc@'.replace(/.@$/g,'Q')
"@123@abQ"


// {1, 2}	匹配 1 到 2 位字符
'12345678'.replace(/\d{3,6}/g,'X') 
"X78"
// ? 之前字符可选
'12345678'.replace(/\d{3,6}?/g,'X') 
"XX78"

'a1b2c3d4z'.replace(/[a-z]\d{3}/g, 'Q')
"a1b2c3d4z"
'a1b2c3d4z'.replace(/([a-z]\d){3}/g, 'Q')
"Qd4z"
```