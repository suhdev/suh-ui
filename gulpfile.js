var gulp = require('gulp'),
	concat =require('gulp-concat'),
	uglify= require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	bower = require('bower'),
	rename = require('gulp-rename'),
	stylish = require('jshint-stylish'),
	ngdocs = require('suh-dgeni-ngdocs'),
	path = require('canonical-path'),
	PATHS = {
		JS:{
			SRC:['./src/*.js','./src/**/*.js']
		}
	}; 


gulp.task('jshint',function(){
	return gulp.src(PATHS.JS.SRC)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
});


gulp.task('concat-js',['jshint'],function(){
	return gulp.src(PATHS.JS.SRC)
	  .pipe(concat('suh-ui.js'))
	  .pipe(gulp.dest('./'))
	  .pipe(uglify())
	  .pipe(rename('suh-ui.min.js'))
	  .pipe(gulp.dest('./'));
});

gulp.task('docs',['concat-js'],function(){
	try{
		ngdocs.generate({
	defaultDeployment:{
		name:'default',
		meta:{
			description:'This is just a test suite'
		},
		examples:{
			commonFiles:{
				stylesheets:['../../css/screen.css','../../css/font-awesome.min.css']
			}
		},
		navigation:{
			top:{
				navItems:[{
            		type:'divider',
          		},
          		{
		            type:'dropdown',
		            disabled:true,
		            label:'SuhExternal Documentation',
		            url:'#',
		            menu:[{
			              	label:'API Reference',
			              	url:'api'
			            }
			        ]
          		},
          		{
          			type:'divider'
          		}]
			}
		},
		scripts:[path.resolve('./bower_components/suh-general/suh-general.min.js'),path.resolve('./suh-ui.js')]
	},
	includeCss:[path.resolve('./stylesheets/screen.css')],
	basePath:path.resolve('src'),
	scripts:[],
	stylesheets:[path.resolve('./stylesheets/screen.css')],
	fonts:[],
	sourceFiles:[path.resolve('./suh-ui.js')],
	AREA_NAMES:{
		suhail:'Suhail Abood',
	},
	outputFolder:path.resolve('generated'),
	homePage:{
		data:{
			title:'SuhExternal Angular Module',
			description:'A library to do something.',
			dependencies:[{
				name:'angular',
				version:'1.3.15'
			},{
				name:'jquery',
				version:'2.1.13'
			}]
		}
	},
	logger:{
		level:null
	},
	extraData:{
		angular:'1.3.15',
		name:'Suhail Abood',
		module:{
			version:'v1.0.0',
			file:'suh-ui.js',
			minifiedFile:'suh-ui.min.js'
		}
	}
});
	}catch(e){
		console.log(e);
	}
});

gulp.task('watch',['concat-js'],function(){
	return gulp.watch(['./src/*.js','./src/**/*.js','stylesheets/*.css'],['concat-js','docs']);
});

gulp.task('default',['watch'],function(){

});