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
        })(),

        fMixin = function(oFrom, oTarget){
            for(var prop in oFrom){
                if(oFrom.hasOwnProperty(prop)){
                    oTarget[prop] = oFrom[prop];
                }
            }
        }
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

            "function" === typeof opts._construct && (model._construct = opts._construct);

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
             * @param {Object | String} oos
             * @param {Function | *} [fn]
		 */
        extend: function(oos, fn){
            if(this === Model){
                return this;
            }

                "[object Object]" === toString(oos) ?
                    fMixin(oos, this) :
                    (this[oos] = fn)
                ;

            return this;
        },

        /**
         * 扩展模型的实例 prototype
             * @param {Object | String} oos
             * @param {Function | *} [fn]
         */
        implement: function(oos, fn){
            if(this === Model){
                return this;
            }

                "[object Object]" === toString(oos) ?
                    fMixin(oos, this.prototype) :
                    (this.prototype[oos] = fn)
                ;

            return this
        },

		prototype: {

		}
	};

	exports.Model = Model;
})(window);