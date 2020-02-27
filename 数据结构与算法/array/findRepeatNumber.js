/**
 * @param {number[]} nums
 * 
 * 标签：哈希
        使用 HashSet 来进行处理，因为 HashSet 本身不允许出现重复元素，
        所以当添加元素失败或已经包含该数字时，则表示出现了重复元素，将其返回即可。思路较为简单，就不给图了
        时间复杂度：O(n)，空间复杂度：O(n)
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    const numsSet = new Set();
    for(const num of nums){
        if(numsSet.has(num)){
            return num;
        } else {
            numsSet.add(num);
        }
    }
    return -1;
};