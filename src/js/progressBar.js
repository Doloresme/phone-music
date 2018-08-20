//进度条插件
(function ($, root) {
    var $scope = $(document.body),
        progBar = $scope.find('.pro-bottom'),
        barLen = $scope.find('.pro-bottom').width(),
        topBar = $scope.find('.pro-top'),
        curTimeBar = $scope.find('.cur-time'),
        allTimeBar = $scope.find('.all-time'),
        curTime,
        allTime;
    function getCurTime(audio, curTime) {
        curTime = curTime || audio.currentTime;
        allTime = audio.duration;
        cTime = parseInt(curTime / 60) + ':' + parseInt(curTime % 60) ;
        aTime = parseInt(allTime / 60) + ':' + parseInt(allTime % 60) ;
        var bar = parseInt(curTime / allTime * barLen);
        console.log(curTime,allTime,bar);
        curTimeBar.html(cTime);
        allTimeBar.html(aTime);
        topBar.css("left",bar);
    }
    function dragBar(audio, event) { 
        var posX = event.clientX;
        if(posX < 60 || posX > barLen + 60){
            return false;
        }else{
            var barLenTime = posX - 60;//减去显示时间的cur-time的宽度
            curTime = parseInt(barLenTime / barLen * audio.duration);
            audio.currentTime = curTime;
            // topBar.css("left", barLenTime);
        // topBar.css({"transform" : 'translateX(' + (barPer - 100) + '%)'});
        }
        getCurTime(audio, curTime);
        console.log(barLen,posX,audio.currentTime,audio.duration)
    }
    root.getCurTime = getCurTime;
    root.dragBar = dragBar;

})(window.Zepto, window.player)