//实现渲染

(function($, root){
    var $scope = $(document.body);

    //添加dom元素和对应的内部信息
    function renderInfo(info){
        var html = '<div class="song-name">' +info.song +'</div>' +
        '<div class="singer-name">' + info.singer + '</div>' +
        '<div class="album-name">'+ info.album+'</div>';
        $scope.find('.song-info').html(html);
    }

    //加载img图片
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img, $scope); //图片设置成body背景图片
            $scope.find('.song-img img').attr('src', src);
        }
    }

    //根据传进来的是否收藏的值来改变dom元素的类名(改变背景图片)
    function renderIsLike(isLike){
        if(isLike){ 
            $scope.find('.like-btn').addClass('liking');
        }else{
            $scope.find('.like-btn').removeClass('liking');
        }
    }

    //渲染方法 包括歌曲信息/图片/是否收藏
    function render(data){
        renderInfo(data)
        renderImg(data.image)
        renderIsLike(data.isLike)
    }
    root.render = render;
}(window.Zepto, window.player || (window.player = {})))
//通过window.player暴露函数