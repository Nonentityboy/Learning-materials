function Fibonacci(n){
    if(n < 2) {
        return n;
    }
    return Fibonacci(n-2) + Fibonacci(n-1);
}

function Fibonacci(n){
    if(n < 2){
        return n;
    }
    let pre = 0;
    let current = 1;
    let result = 1;
    let i = 1;
    while(i++ < n){
        result = pre + current;
        pre = current;
        current = result;
    }
    return current;
}