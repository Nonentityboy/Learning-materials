/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];
    for( let i = 0; i < s.length; i++){
        let char = s.charAt(i);
        if(char === '(' || char === '{' || char === '[')
            stack.push(char)
        if(!stack.length) return false;
        if(char === ')' && stack.pop() !== '(') return false;
        if(char === '}' && stack.pop() !== '{') return false;
        if(char === ']' && stack.pop() !== '[') return false;
    }
    return stack.length === 0;
};