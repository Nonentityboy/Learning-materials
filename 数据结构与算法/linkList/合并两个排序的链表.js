/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2)
{
    // write code here
    if(!pHead1) return pHead2;
    if(!pHead2) return pHead1;
    let p1 = pHead1;
    let p2 = pHead2;
    let p = dummyHead = new ListNode();
    while(p1 && p2){
        if(p1.val > p2.val){
            p.next = p2;
            p = p.next;
            p2 = p2.next;
        } else {
            p.next = p1;
            p = p.next;
            p1 = p1.next;
        }
    }
    if(p1) p.next = p1;
    else p.next = p2;
    return dummyHead.next;
}