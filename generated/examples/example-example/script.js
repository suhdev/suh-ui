(function(angular) {
  'use strict';
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
})(window.angular);