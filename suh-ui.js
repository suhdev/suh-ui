/**
 * @ngdoc module
 * @name SuhUi
 * @module SuhUi
 * @description
 * A module providing a set of UI components for AngularJS apps. 
 */
angular.module('SuhUi',['SuhGeneral']); 
/**
 * @ngdoc directive
 * @name shUiDialog
 * @module SuhUi
 * @restrict A 
 * @element ANY
 * @description
 * A service to create dialog boxes. 
 * @example
 <example module="Suhail" deps="angular-animate.min.js;suh-ui.js;suh-general.min.js" animation="true">
<file name="index.html">
  <div class="container" >
    <div ng-controller="TestCtrl as ctrl" >
      <button ng-click="ctrl.showDialog()">Show</button>
      <button ng-click="ctrl.showDialogWithTemplate()">Show with template</button>
    </div> 
  </div>
  <div sh-ui-dialog>
  </div>
</file>
<file name="script.js">
  angular.module('Suhail',['SuhUi','ngAnimate'])
  	.config(['shTemplatePathProcessorProvider',function(PT){

  	}])
     .controller('TestCtrl',['$scope','shDialog',function($S,_T){
		this.showDialog = function(){
			_T.title('Suhail')
					.content('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate repellendus molestiae iusto minus, magnam tempore minima dicta dolorem quidem in? Dolores non, dignissimos reiciendis est, illum amet fuga neque placeat.')
					.buttons([{label:'Okay',action:function(){console.log('okay');}},'Cancel'])
					.show()
					.then(function(e){
						console.log(e);
					},function(e){
	console.log(e);
					}); 
			
		};

		this.showDialogWithTemplate = function(){
			_T.title('Suhail')
				.templateUrl('/temp.html')
				.data({
					name:'Suhail',
					age:'27'
				})
				.show(); 
		};
     }]);
</file>
</example>
 */


angular.module('SuhUi')
	.directive('shUiDialog', ['shTemplatePathProcessor',function (_PT) {
		return {
			restrict: 'A',
			priority:0,
			replace:true,
			templateUrl:_PT.getTemplatePath('dialog'),
			scope:true,
			controller:['$scope','shDialog', function($S,_UD){
				
				var self = this;
				self.title = '';
				self.content = '';
				self.model = null;
				self.buttons = [];
				self.visible = false;
				self.templateUrl = null;
				self.style = {}; 

				self.hasTemplateUrl = function(){
					return self.templateUrl;
				};
				self.hasButtons = function(){
					return self.buttons.length > 0;
				};
				self.reset = function(){
					self.title = '';
					self.content = '';
					self.model = null;
					self.buttons = [];
					self.visible = false;
					self.templateUrl = null;
				};
				self.close = function(){
					self.answer(-1);
				};
				self.answer = function(d,btn){
					if (btn && btn.action && angular.isFunction(btn.action)){
						btn.action(); 
					}
					self.reset();
					_UD.answer(d);
				};

				function onShowDialog(e){
					console.log(e);
					self.visible = true;
					self.buttons = e.buttons; 
					self.templateUrl = e.templateUrl; 
					self.content = e.content; 
					self.title = e.title; 
					self.model = e.model;
					self.style = e || {}; 
					self.onTemplateLoad = e.onTemplateLoad; 
				}

				_UD.addEventListener('ui.ShowDialog',onShowDialog,this);

			}],
			controllerAs:'dialogCtrl',
			link: function ($S, $E, $A) {
				if ($E.draggable){
					$E.draggable({
						handle:$E.find('.ui-dialog-heading').get(0)
					});
				}
			}
		};
	}]);
/**
 * @ngdoc directive
 * @name shUiToast
 * @module SuhUi
 * @restrict A
 * @element ANY
 * @description
 * A directive to show notifications. 
 * @example
<example module="Suhail" deps="angular-animate.min.js;suh-ui.js;suh-general.min.js" animation="true">
<file name="index.html">
  <div class="container" >
    <div ng-controller="TestCtrl as ctrl" >
      <button ng-click="ctrl.showToast()">Show</button>
      <button ng-click="ctrl.showToastWithAction()">Show with Action</button>
      <button ng-click="ctrl.showToastWithAction(true)">Show with Progress</button>
    </div> 
  </div>
  <div sh-ui-toast>
  </div>
</file>
<file name="script.js">
  angular.module('Suhail',['SuhUi','ngAnimate'])
  	.config(['shTemplatePathProcessorProvider',function(PT){

  	}])
     .controller('TestCtrl',['$scope','shToast',function($S,_T){
		this.showToast = function(){
			_T.toast('This is one toast: '+Math.random(),2000).then(function(item){
				console.log(item.text);
			}); 
		};

		this.showToastWithAction = function(progress){
			console.log(progress);
			_T.toast({
				text:'This is a toast with action: '+Math.random(),
				progress:progress,
				action:{
					label:'Fix',
					callback:function(){
						alert('Action callback called!!!');
					}
				},
			}).then(function(item){
				console.log(item.text);
			});
		};
     }]);
</file>
</example>
 */
angular.module('SuhUi')
	.directive('shUiToast',['shTemplatePathProcessor','$timeout', function (PT,$T) {
		return {
			restrict: 'A',
			replace:true,
			controller:['$scope','$q','shToast',function($S,$Q,_T){
				var self = this;
				this.toasts = [];

				this.remove = function(item){
					var idx = self.toasts.indexOf(item);
					if (idx != -1){
						self.toasts.splice(idx,1);
						item.defer.resolve(item); 
					}
				};
				
				function onShowToast(e){
					var idx = self.toasts.length; 
					self.toasts.push(e);

					if (e.delay && e.delay != -1){
						$T(function(){
							self.remove(e); 
						},e.delay); 
					}
				}
				
				_T.addEventListener('ui.ShowToast',onShowToast,self);
				
			}],
			controllerAs:'toastCtrl',
			templateUrl:PT.getTemplatePath('toast'),
			link: function ($S, $E, $A){
				
			}
		};
	}]);
angular.module('SuhUi')
	.provider('shTemplatePathProcessor', [function () {
		var self = this;
		this.paths = {};
		this.pattern = '/templates/${docType}.template.html';

		this.add = function(docType,path){
			self.paths[docType] = path;
		};

		this.setTemplatePathPattern = function(p){
			self.pattern = p;
		};
	
		this.$get = [function() {
			return {
				getTemplatePath:function(docType){
					var replacements = {
							docType:docType
						},REGEX = /\$\{([\S]+?)\}/g,
						i=0,tx;
					if (self.paths[docType]){
						return self.paths[docType];
					}else {
						tx = self.pattern.replace(REGEX,function(group,filteredGroup,g){
							return replacements[filteredGroup]; 
						});
						return tx; 
					}
				}
			};
		}];
	}]);
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