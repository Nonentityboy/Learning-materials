var reverseList = function(head) {
    if(!head) return null;
    let pre = null;
    let cur = head;
    while(cur){
        let next = cur.next;
        // 借助中间变量next
        cur.next = pre;
        // 此时让当前节点的下一个节点指向前面的节点，第一次让它指向为null
        pre = cur;
        // pre后移到cur
        cur = next;
        // cur后移到next
    }
    return pre;
};