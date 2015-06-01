(function(angular) {
  'use strict';
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
})(window.angular);