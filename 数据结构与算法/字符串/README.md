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

