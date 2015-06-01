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