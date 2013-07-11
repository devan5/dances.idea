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

(function(){
	var Model;

	Model = {

		// 创建一个新模型
		create: function(){
			if(this === Model){
				throw "Model logical error";
			}

			var model = Object.create(this);
			model.create = function(){ return this; };
			return model;
		},

		init: function(){
			return Object.create(this.prototype);
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
			return this
		},

		prototype: {

		}
	};

	window.Model = Model;
})();