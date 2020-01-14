### binary-tree

二叉树是一种典型的`树状结构`。如它名字所描述的那样，二叉树是每个节点最多有两个子树的树结构，通常子树被称作`左子树`和`右子树`。
![](https://user-gold-cdn.xitu.io/2020/1/13/16f9d7eeab943586?w=1314&h=332&f=png&s=236307)

二叉树遍历
重点中的重点，最好同时掌握递归和非递归版本，递归版本很容易书写，但是真正考察基本功的是非递归版本。
> 完全二叉树的一些公式
1.第n层的节点数最多为2n个节点
2.n层二叉树最多有20+...+2n=2n+1-1个节点
3.第一个非叶子节点：length/2
4.一个节点的孩子节点：2n、2n+1

### 基本结构
插入，遍历，深度
```js
function Node(data, left, right){
    this.data = data;
    this.left = left;
    this.right = right;
}
Node.prototype = {
    show: function() {
        console.log(this.data);
    }
}
function Tree() {
    this.root = null;
}
Tree.prototype = {
    insert: function (data) {
        // 构造一个节点
        var node = new Node(data, null, null);
        // 当前节点为空时，将此节点整为头节点
        if(!this.root) {
            this.root = node;
            return;
        }
        // 当前结点为 this.root
        var current = this.root;
        // 让父节点为空
        var parent = null;
        // 存在当前节点时
        while (current) {
            // 让父节点等于当前节点
            parent = current;
            // 若data小于父节点的data
            if (data < parent.data) {
            // 待插入节点保存的数据小于当前节点，则设新的当前节点为原节点的左节点，此时让当前节点为null
                current = current.left;
                if (!current) {
                    parent.left = node;
                    return;
                }
            } else {
                current = current.right;
                if (!current) {
                    parent.right = node;
                    return;
                }
            }
        }
    },
    // 前中后序遍历的区别在于何时访问根节点
    preOrder: function (node){
        if (node) {
            node.show();
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }
    middleOrder: function (node){
        if (node) {
            this.preOrder(node.left);
            node.show();
            this.preOrder(node.right);
        }
    }
    laterOrder: function (node) {
        if (node) {
            this.laterOrder(node.left);
            this.laterOrder(node.right);
            node.show();
        }
    },
    getMin: function () {
        var current = this.root;
        while(current){
            if(!current.left){
                return current;
            }
            current = current.left;
        }
    },
    getMax: function () {
        var current = this.root;
        while(current){
            if(!current.right){
                return current;
            }
            current = current.right;
        }
    },
    getDeep: function (node,deep) {
        deep = deep || 0;
        if(node == null){
            return deep;
        }
        deep++;
        // 递归求深度
        var dleft = this.getDeep(node.left,deep);
        var dright = this.getDeep(node.right,deep);
        return Math.max(dleft,dright);
    }
    getNode: function (data, node) {
        if (node) {
            if (data === node.data) {
                return node;
            } else if (data < node.data) {
                return this.getNode(data,node.left);
            } else {
                return this.getNode(data,node.right);
            }
        } else {
            return null;
        }
    }
}
```

二分查找：
二分查找的条件是必须是有序的线性表。

和线性表的中点值进行比较，如果小就继续在小的序列中查找，如此递归直到找到相同的值。

```js
function binarySearch(data, arr, start, end) {
    if (start > end) {
        return -1;
    }
    var mid = Math.floor((end + start) / 2);
    if (data == arr[mid]) {
        return mid;
    } else if (data < arr[mid]) {
        return binarySearch(data, arr, start, mid - 1);
    } else {
        return binarySearch(data, arr, mid + 1, end);
    }
}
var arr = [0, 1, 1, 1, 1, 1, 4, 6, 7, 8]
console.log(binarySearch(1, arr, 0, arr.length-1));
```

非递归实现二叉树遍历：

前中后序遍历主要区别是何时去遍历根节点

```js
中序遍历
1. 左边子节点入栈，直到左边子节点为空。
2. 节点出栈一个，访问此节点。
3. 以右孩子为目标节点，再次执行1、2、3
function inorderTraversal(root){
    const result = [];
    const stack = [];
    let current = root;
    while(current || stack.length > 0) {
        // 当前左
        while(current){
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
    }
}
```