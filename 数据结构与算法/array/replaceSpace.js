/**
 * @param {string} s
 * @return {string}
 * 第一反应肯定正则表达式，在真正项目中，肯定也会选用正则来做匹配和替换
 * 
 */
var replaceSpace = function(s) {
    return s.replace(/ /g,"%20");
};