# Ajax请求步骤

Ajax = 异步 JavaScript 和 XML
Ajax是一种用于创建快速动态网页的技术

通过后台与服务器及逆行少量数据交换，Ajax可以使网页实现异步更新。
不重新加载整个网页的情况下，对网页的某部分进行更新。


## 原生JS中的Ajax

第一步 创建异步对象
```js
var xhr = new XMLHttpRequest();
```

第二步 设置 请求行open(请求方式，请求url)
```js
// get请求如果有参数需要在url上面添加参数
// post请求如果有参数，就在请求体中传递 
xhr.open("get","validate.php?username="+name)
xhr.open("post","validate.php");
```

第三步 设置请求头（GET方式忽略此步骤）：setRequestHeader()
```js
// 1.get不需要设置
// 2.post需要设置请求头：Content-Type:application/x-www-form-urlencoded
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
```

第四步 设置请求体send()
```js
// 1.get的参数在url拼接了，所以不需要在这个函数中设置
// 2.post的参数在这个函数中设置(如果有参数)
xhr.send(null)
xhr.send("username="+name)
```

第五步 让异步对象接收服务器的响应数据
```js
xhr.onreadystatechange = function(){
    if(xhr.status === 200 && xhr.readyState === 4){
        console.log(xhr.responseText);
    }
}
```

ajax-get方式请求案例：

```js
var xhr = new XMLHttpRequest();
xhr.open("get","validate.php?username="+name);
xhr.send(null);
xhr.onreadystatechange = function(){
    if(xhr.status == 200 && xhr.readyState == 4){ 
        console.log(xhr.responseText); 
        document.querySelector(".showmsg").innerHTML = xhr.responseText;;
    }
}
```
ajax-post方式请求案例：

```js
var xhr = new XMLHttpRequest();
xhr.open("post","validate.php");
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send("username="+name);
xhr.onreadystatechange = function(){
    // 判断服务器是否响应，判断异步对象的响应状态
    if(xhr.status == 200 && xhr.readyState == 4){
        document.querySelector(".showmsg").innerHTML = xhr.responseText;
    }
}
```
