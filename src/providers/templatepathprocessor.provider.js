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