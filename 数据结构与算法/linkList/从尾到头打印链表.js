// 时间复杂度 O(N)，
// 空间复杂度 O(N)。

function printListFromTailToHead(head){
    const array = [];
    while(head) {
        array.unshift(head.val);
        head = head.next;
    }
    return array;
}