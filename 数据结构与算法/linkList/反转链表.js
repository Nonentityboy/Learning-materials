var reverseList = function(head){
    let p1 = head;
    let p2 = null;
    // p1 p2 为第一二个结点
    // p1 p2不断往后移动
    while(head && head.next) {
        p2 = head.next;
        head.next = p2.next;
        p2.next = p1;
        p1 = p2;
    }
    return p1
}