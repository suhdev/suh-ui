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