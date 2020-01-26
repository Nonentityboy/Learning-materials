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

```js
var reg = /\bis\b/
undefined
'this is a dog. where is she'.replace(reg,'IS')
"this IS a dog. where is she"
var reg = /\bis\b/g
undefined
'this is a dog. where is she'.replace(reg,'IS')
"this IS a dog. where IS she"
var reg = new RegExp('\\bis\\b','g')
undefined
'this is a dog. where is she'.replace(reg,'IS')
"this IS a dog. where IS she"
'he is a boy . Is he?'.replace(/\bis\b/g,'0')
"he 0 a boy . Is he?"
'he is a boy . Is he?'.replace(/\bis\b/gi,'0')
"he 0 a boy . 0 he?"


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

'this is a boy'.replace(/is/g,'0')
"th0 0 a boy"
'this is a boy'.replace(/\bis\b/g,'0')
"this 0 a boy"
'this is a boy'.replace(/\Bis\B/g,'0')
"this is a boy"
'this is a boy'.replace(/\Bis\b/g,'0')
"th0 is a boy"

'@123@abc@'.replace(/@./g,'Q')
"Q23Qbc@"
'@123@abc@'.replace(/^@./g,'Q')
"Q23@abc@"
'@123@abc@'.replace(/.@/g,'Q')
"@12QabQ"
'@123@abc@'.replace(/.@$/g,'Q')
"@123@abQ"

'12345678'.replace(/\d{3,6}/g,'X') 
"X78"

'12345678'.replace(/\d{3,6}?/g,'X') 
"XX78"

'a1b2c3d4z'.replace(/[a-z]\d{3}/g, 'Q')
"a1b2c3d4z"
'a1b2c3d4z'.replace(/([a-z]\d){3}/g, 'Q')
"Qd4z"
```