/*
    gulp.src() //读文件
    gulp.dest() //写文件
    gulp.task() //任务
    gulp.watch() //监听

*/


var gulp = require('gulp');
var imagemin = require('gulp-imagemin');//图片压缩模块
var newer = require('gulp-newer'); //是否是新文件
var htmlclean = require('gulp-htmlclean'); //压缩html
var uglify = require('gulp-uglify');  //压缩js
var stripDebug = require('gulp-strip-debug');
// var concat = require('gulp-concat'); //文件拼接
var less = require('gulp-less'); //less编译成css
var postcss = require('gulp-postcss'); //css兼容时，自动添加前缀的插件
var autoprefixer = require('autoprefixer'); //添加前缀
var cssnano = require('cssnano')  //css压缩
var connect = require('gulp-connect') //服务器插件



console.log(process.env.NODE_ENV); //此时是undefined
          //设置一个环境变量   export NODE_ENV=development

var devMode = (process.env.NODE_ENV == 'development'); 
    //当是开发环境的时候，不执行代码压缩



var folder = {
    src : "./src/",  //开发路径文件夹
    bulid : "./bulid/"  //压缩打包后目录文件夹
}

//处理image图片的任务
//gulp 任务运行器（任务名，回调函数）
// 流读取文件  pipe() 
gulp.task('images',function(){
    gulp.src(folder.src + 'images/*')
        .pipe(newer(folder.bulid + 'images'))  //查看是否是新文件
        .pipe(imagemin()) //压缩图片
        .pipe(gulp.dest(folder.bulid + 'images')) //文件输出到bulid文件夹
})

//处理html的任务处理器

gulp.task('html', ['images'], function(){
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload()) //html开启自动刷新
    if(!devMode){
        page.pipe(htmlclean()) //压缩html
    }
    page.pipe(gulp.dest(folder.bulid + 'html'))
})

//js任务
gulp.task('js',function(){
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload()) //js开启自动刷新
    if(!devMode){
        // page.pipe(stripDebug()) //去掉调试语句
        page.pipe(uglify()) //压缩js
    }
        page.pipe(gulp.dest(folder.bulid + 'js'));
})


//css任务
gulp.task('css',function(){
    var options = [autoprefixer(), cssnano()];
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less()) //less编译成css文件插件
        .pipe(connect.reload()) //css开启自动刷新
        if(!devMode){
            page.pipe(postcss(options)) //自动添加前缀并压缩
        }
        page.pipe(gulp.dest(folder.bulid + 'css'))
})

//监听任务
gulp.task('watch',function(){
    gulp.watch(folder.src + 'html/*',['html'])
    gulp.watch(folder.src + 'css/*',['css'])
    gulp.watch(folder.src + 'js/*',['js'])
    gulp.watch(folder.src + 'images/*',['images'])
})


//开启一个服务器任务
gulp.task('server',function(){
    connect.server({
        port : '8090', //改变端口
        livereload : true  //开启自动刷新
    })
})



gulp.task('default', ['html','images','js','css','watch','server'], function(){
    console.log('loaded')
}) //gulp 默认处理