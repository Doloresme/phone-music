var $ = window.Zepto;
// console.log(window)
var root = window.player;
var $scope = $(document.body),
    barLen = $scope.find('.pro-wrapper').width(),
    progBar = $scope.find('.pro-bottom'),
    topBar = $scope.find('.pro-top'),
    curTime = $scope.find('.cur-time'),
    allTime = $scope.find('.all-time');

//定义一个全局变量
var index = 0;  //索引
var songList,
    controlManager,
    audio,
    barLen = $scope.find('.pro-wrapper').width();
//    console.log(barLen) 

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            songList = data;
            root.render(data[index]);
            bindEvent();
            controlManager = new root.ControlManager(data.length);
            audio = new root.AudioControl();
            $scope.trigger("play:change", index);//自动加载音频文件
        },
        error: function () {
            console.log('error')
        }
    })
}

function bindEvent() {

    //加载音乐
    $scope.on("play:change", function () {
        audio.getAudio(songList[index].audio);
        // audio.attr('autoplay', true);
        if (audio.status == 'play') {
            audio.play();
        }
        audio.ontimeupdate = function () {
            root.getCurTime(audio)
        }
        // root.getCurTime(audio);
    })

    var timer = setInterval(function () {
        root.getCurTime(audio.audio);
    }, 500)

    $scope.find('.prev-btn').on('click', function () {
        // if(index === 0){
        //     index = songList.length - 1;
        // }else{
        //     index --;
        // } 
        //封装成一个controlManager模块
        index = controlManager.prev();
        root.render(songList[index]);
        $scope.trigger("play:change", index);
    })
    $scope.find('.next-btn').on('click', function () {
        // if(index === songList.length - 1){
        //     index = 0;
        // }else{
        //     index ++;
        // }
        index = controlManager.next();
        root.render(songList[index]);
        $scope.trigger("play:change", index)
    })

    // 播放/暂停
    $scope.find('.play-btn').on('click', function () {
        if (audio.status == 'play') {
            audio.pause();
        } else {
            audio.play();
        }
        $(this).toggleClass('pause');
    })

    // 收藏/取消收藏
    $scope.find('.like-btn').on('click', function () {
        $(this).toggleClass('liking');
    })

    //获取当前播放时间

    //调整进度条
    progBar.on('mousedown', function (e) {
        clearInterval(timer);
        root.dragBar(songList[index],e);
    }).on('mouseup',function(){
        timer = setInterval(function () {
            progBar.off('mousedown');
            root.getCurTime(audio.audio);
        }, 500)
    })
    topBar.on('mousedown', function (e) {
        root.dragBar(songList[index], e);
    }).on('mouseup',function(){
        timer = setInterval(function () {
            topBar.off('mousedown');
            root.getCurTime(audio.audio);
        }, 500)
    })

}

//每500ms执行一次获取当前播放时间函数，动态改变播放时间
// var timer = setInterval(function () {
//     root.getCurTime(audio);
// }, 500)


getData('../mock/data.json');
