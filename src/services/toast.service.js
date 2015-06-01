/**
 * @ngdoc service
 * @name shToast
 * @module SuhUi
 * @description
 * Provides a toaster to provide notification. 
 */
angular.module('SuhUi')
	.factory('shToast', ['$q','$timeout','shEventEmitter','shUtil',function ($Q,$T,_EM,_UTIL) {
		var _ut = function(){
			_EM.call(this,['ui.ShowToast']);
		};
		_UTIL.inherits(_ut,_EM);
		var x = _ut.prototype;
		/**
		 * @ngdoc method
		 * @name shToast#toast
		 * @module SuhUi
		 * @param {string|object} toast a string representing a text or an object that have the following properties
		 * @param {number} delay the delay in milliseconds (assuming text is passed as the first parameter)
		 * @param {number} 
		 * ```javascript
		 * var toast = {
		 * 		text: 'the text to go with the toast',
		 *		delay: 100 ,the delay of the toast in milliseconds
		 *		progress: true|false, //whether it has a spinning icon or not 
		 * 		action:{
		 *			label:'action label', 
		 *			callback:function(){} //a callback which is called when the toast is clicked. 
		 *		}
		 * }
		 * ```
		 * @description 
		 * Sends a notification to the application. 
		 */
		x.toast = function (text,delay,progress,action){
			var t = text.text || text,
				a = text.action || action,
				d = text.delay || delay || -1,
				p = text.progress || progress;
			var def = $Q.defer();
			this.trigger('ui.ShowToast',{
				text:t,
				delay:d,
				action:a,
				progress:p,
				defer:def
			});
			return def.promise;
		};
		return new _ut();
	}])