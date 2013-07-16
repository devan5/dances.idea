// $log
window._log = window.$log = (function(){
	var
		$log,
		$$log,
		logRepo = {}
	;

	$log = Boolean;

	if(window.console && window.console.log){
		$log = console.log;

		try{
			$log("_____" + (new Date).toString() + "_____");

		}catch(e){
			$log = null;
		}

		$log || ($log = function(){ console.log.apply(console, arguments); }) && $log("_____" + (new Date).toString() + "_____");

		$$log = function(msg, method){
			method = method || "log";

			logRepo[method] || (logRepo[method] = console[method] ? console[method] : console.log);

			"function" === typeof console[method] ?
				logRepo[method].call(console, msg) :
				logRepo[method](msg)
			;

		};

		window.$$log || (window.$$log = $$log);
		window.__log || (window.__log = $$log);

	}else{
		window.$$log = function(){return Array.prototype.slice.call(arguments, 0).join(", ")};
	}

	return $log;
})();

(function(exports){
    var
        Model,

        create = Object.create || (function(){

            var Foo = function(){ };

            return function(){

                if(arguments.length > 1){
                    throw new Error('Object.create implementation only accepts the first parameter.');
                }

                var proto = arguments[0],
                    type = typeof proto
                    ;

                if(!proto || ("object" !== type && "function" !== type)){
                    throw new TypeError('TypeError: ' + proto + ' is not an object or null');
                }

                Foo.prototype = proto;

                return new Foo();
            }
        })()
    ;


	Model = {

		// 创建一个新模型
        create: function(opts){

            var
                model = create(this)
            ;

            opts = opts || {};

            model.create = function(){ return this; };

            model.prototype = create(this.prototype);

            "function" === typeof opts._construct && (this._construct = opts._construct);

            return model;
        },

        init: function(){
            if(this === Model){
                throw "Model logical error";
            }
            var inst;

            inst = create(this.prototype);
            "function" === typeof this._construct && this._construct.apply(inst, arguments);
            return inst;
        },

		/**
		 * 扩展模型的实例
		 * @param {Object | String} os
		 * @param {Function} [fn]
		 */
		extend: function(os, fn){
            if(this === Model){
                return this;
            }

            this[os] = fn;

            return this;
        },

        /**
         * 扩展模型的实例 prototype
         * @param {Object | String} os
         * @param {Function} [fn]
         */
        implement: function(os, fn){
            if(this === Model){
                return this;
            }

            this.prototype[os] = fn;

            return this
        },

		prototype: {

		}
	};

	exports.Model = Model;
})(window);