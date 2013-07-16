/***
 * @overview 展示使用 dances.promise 环境
 */


(function(){
    var defer = dances.Defer();

    /**
     * defer 的方法
     * + resolve
     * + reject
     *
     * defer 的属性
     * + promise
     */

    defer.resolve();
    defer.reject();
    var promise = defer.promise;

    /**
     * promise 的方法
     * + then
     * + success
     * + fail

     */
    promise.then();
    promise.success();
    promise.fail();

})();

(function(){
    dances.Promise.when();
    dances.Promise.all();
})();


/***
 *  @example 使用两个 异步资源
 */

// 旧式写法:
dances.get("url-1", function(data1){
    dances.get("url-2", function(data2){
        // main ()
    });
});

// promise 串行写法:
dances
    .get("url-1")
    .then(function(data1){
        /**
         * 返回值 有两种情况:
         * 1. 返回的是一个 promise
         * 等待 这个 promise 被 resolve 之后, 执行下一个链
         *
         * 2. 返回的是一个 非 promise 对象
         * 立刻执行 执行下一个链
         */

        // 本例中 返回的是 promise对象
        return dances.get("url-2");
    })
    .then(function(data2){
        // main()
    })
;

// 如果我们需要 在 第一个 then 使用 data1 返回值
// method 1:
dances
    .get("url-1")
    .then(function(data1){

        // 本例中 返回的是 promise对象
        return dances.get("url-2").bindBefore(data1);
    })
    .then(function(data1, data2){
        // main()
    })
;

// method 2:
dances.Promise.all(dances.get("url-1"), dances.get("url-2"), function(){
    // main()
});

/**
 * @example
 * 嵌套链式操作
 */
(function(){
    var defer = dances.Defer();

    defer.promise
        .then(function(v){
            alert(v === 1);
            var d2 = S.Defer();
            setTimeout(function(){
                d2.resolve(2);
            }, 1000);

            return d2.promise;

        }).then(function(v2){
            alert(v2 === 2);
        })
    ;

    defer.resolve(1);
})();

/***
 * @example all
 * @overview 使用 all 也可以达到嵌套调用的效果（同时等待多个 promise 成功）,
 * 并可一次性得到导致所有 promise 成功的
 */
(function(){
    var
        defer = dances.Defer(),
        defer2 = dances.Defer()
    ;

    setTimeout(function(){
        defer2.resolve(2);
        defer.resolve(1);
    }, 1000);

    dances.Promise.all([defer.promise, defer2.promise]).then(function(vs){
        alert(vs[0] === 1);
        alert(vs[1] === 2);
    });
})();

/**
 * @example when
 * @overview 使用 when 可以不加区别得对待 promise 对象和非 promise 对象,
 * 通过成功回调可以一致得获取最终结果
 */

(function(){
    function check(p){
        dances.Promise.when(p, function(v){
            alert(v === 1);
        });
    }

    var defer = dances.Defer();
    defer.resolve(1);

    check(1); // => alert(true)

    check(defer.promise); //=> alert(true);
})();