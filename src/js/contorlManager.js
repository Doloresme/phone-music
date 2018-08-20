 //获取当前的索引值index
(function($, root){

    function ControlManager(len){
        this.len = len;
        this.index = index;
    }
    ControlManager.prototype = {
        prev : function() {
            // index --
            return this.getIndex(-1);
        },
        next : function() {
            // index ++
            return this.getIndex(1);
        },
        getIndex : function(val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val) % len; //使用%不必考虑正负值和超出数值的情况
            this.index = curIndex;
            return curIndex;
        }
    }

    root.ControlManager = ControlManager;

})(window.Zepto, window.player || (window.player = {}))