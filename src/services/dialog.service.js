/**
 * @ngdoc service
 * @name  shDialog
 * @module SuhUi
 * @description provides a unified dialog box for the user. 
 */
angular.module('SuhUi')
	.factory('shDialog', ['$q','shEventEmitter','shUtil',function ($Q,EM,UT) {
		var _ud = function(){
			EM.call(this,['ui.ShowDialog']);
			this.reset();
		};
		UT.inherits(_ud,EM);
		var x = _ud.prototype; 
		/**
		 * @ngdoc method
		 * @name shDialog#title
		 * @module SuhUi
		 * @description Sets the dialog title
		 * @param {string} title the dialog controller 
		 * @returns {shDialog} the ui.Dialog instance
		 */
		x.title = function (title){
			this._title = title;
			return this;
		};
		/**
		 * @ngdoc method
		 * @name shDialog#content
		 * @module SuhUi
		 * @description sets the content of the dialog
		 * @param  {string} content the content for the dialog
		 * @returns {shDialog} the ui.Dialog instance
		 */
		x.content = function(content){
			this._content = content;
			return this;
		};
		/**
		 * @ngdoc method
		 * @name shDialog#templateUrl
		 * @module SuhUi
		 * @description sets the template URL to fetch as the content of the dialog
		 * @param {string} url the template URL
		 * @returns {shDialog} the ui.Dialog instance
		 */
		x.templateUrl = function(url){
			this._templateUrl = url;
			return this;
		};
		/**
		 * @ngdoc method
		 * @name shDialog#buttons
		 * @module SuhUi
		 * @description sets the dialog buttons 
		 * @param {Array} bs array of button titles
		 */
		x.buttons = function(bs){
			this._buttons = bs;
			return this;
		};
		/**
		 * @ngdoc method
		 * @name shDialog#show
		 * @module SuhUi
		 * @description Initializes the dialog service with the DOM controller
		 * @returns {Promise} a deferred object that is resolved when one of 
		 * the buttons is clicked or the dialog close button is clicked.
		 */
		x.show = function(){
			var self = this;
			this._df = $Q.defer();
			this.trigger('ui.ShowDialog',{
				title:self._title,
				content:self._content,
				templateUrl:self._templateUrl,
				visible:true,
				buttons:self._buttons,
				model:self._model
			});
			return this._df.promise;
		};
		/**
		 * @ngdoc method
		 * @name shDialog#answer
		 * @module SuhUi
		 * @description invoked when the buttons are clicked, and it is passed the index of the button. 
		 * This function resolves the internal deferred object passing in the index of the clicked button.
		 * @param  {number} index index of the button that has been clicked
		 */
		x.answer = function(item){
			if (item !== -1){
				this._df.resolve(item);
			}else{
				this._df.reject(-1);
			}
			this.reset();
		};
		/**
		 * @ngdoc method
		 * @name shDialog#data 
		 * @module SuhUi
		 * @description 
		 * Sets the model object that will passed to the dialog under the `model` 
		 */
		x.data = function(data){
			this._model = data;
			return this;
		};
		/** 
		 * @ngdoc method
		 * @name shDialog#reset
		 * @module SuhUi
		 * @description
		 * Resets dialog internal variables. 
		 */
		x.reset = function(){
			this._title = '';
			this._content = '';
			this._templateUrl = '';
			this._buttons = [];
			this._model = null;
		};
		
		return new _ud();
	}]);