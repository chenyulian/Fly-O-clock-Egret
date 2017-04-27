var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
    封装一些与利用资源相关的方法
*/
var ResourceUtils = (function () {
    function ResourceUtils() {
    }
    //根据名称查询获取bitmap资源
    ResourceUtils.createBitmapByName = function (name) {
        var bitmapWithName = new egret.Bitmap();
        var texture = RES.getRes(name);
        bitmapWithName.texture = texture;
        return bitmapWithName;
    };
    return ResourceUtils;
}());
__reflect(ResourceUtils.prototype, "ResourceUtils");
//# sourceMappingURL=ResourceUtils.js.map