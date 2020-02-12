var inorderTraversal = function(root) {
    let arr = [];
    let traverse = (root) => {
        if(root === null) return;
        traverse(root.left);
        arr.push(root.val);
        traverse(root.right);
    }
    traverse(root);
    return arr;
};