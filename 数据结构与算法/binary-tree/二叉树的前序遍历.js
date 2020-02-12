var preorderTraversal = function(root) {
    let arr = [];
    let traverse = (root) => {
        if(root === null) return;
        arr.push(root.val);
        traverse(root.left);
        traverse(root.right);
    }
    traverse(root);
    return arr;
};

