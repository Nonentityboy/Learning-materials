var postorderTraversal = function(root) {
    let arr = [];
    let traverse = (root) => {
      if(root == null) return;
      traverse(root.left);
      traverse(root.right);
      arr.push(root.val);
    }
    traverse(root);
    return arr
};