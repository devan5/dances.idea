/**
 * @name 高阶函数-递归调用
 * @Function loop
 * @Describing fn 显示 false 则停止继续递归
 */
window.loop = (function(){
    /**
     * @param fn
     * @param delay
     */
    return function loop(fn, delay){
        var args = Array.prototype.slice.call(arguments, 0);

        if(false !== fn.apply(null, args)){
            setTimeout(function(){
                loop.apply(null, args);
                args = null;
            }, delay);
        }
    }

})();
