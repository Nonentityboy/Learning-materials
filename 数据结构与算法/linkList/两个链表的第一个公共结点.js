/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindFirstCommonNode(pHead1, pHead2)
{
    if(!pHead1 || !pHead2) return null;
    let p1 = pHead1;
    let p2 = pHead2;
    while(p1 !== p2){
        if(p1 !== null) p1 = p1.next;
        else p1 = pHead2;
        if(p2 !== null) p2 = p2.next;
        else p2 = pHead1;
    }
    return p1;
}