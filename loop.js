/**
 * @name 高阶函数-递归调用
 * @Function loop
 * @Desc fn 显示 false 则停止继续递归
 *
 * @feature 多次多用返回的高阶函数, 逻辑判断是否执行
 *
 * @firstDate 2013.07.19
 * @lastDate 2013.08.07
 */

window.loop = function(){
    /**
     * @param fn
     * @param delay
     */
    return function loop(fn, delay){
        var args = Array.prototype.slice.call(arguments, 0);

			if(loop._bExcuted){
				return;
			}

        if(false !== fn.apply(null, args)){
				loop._bExcuted = true;
            setTimeout(function(){
					loop._bExcuted = false;
                loop.apply(null, args);
                args = null;
            }, delay);

			}else{
				loop._bExcuted = false;
        }
    }

};
