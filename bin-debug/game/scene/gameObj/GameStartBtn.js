var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameStartBtn = (function (_super) {
    __extends(GameStartBtn, _super);
    function GameStartBtn(BgImgName) {
        var _this = _super.call(this) || this;
        //_gameStartBtn = this;
        _this.btnSprite = new egret.Sprite();
        _this.addChild(_this.btnSprite);
        _this.bgImage = ResourceUtils.createBitmapByName(BgImgName);
        _this.btnSprite.addChild(_this.bgImage);
        _this.noScaleX = _this.btnSprite.x;
        _this.noScaleY = _this.btnSprite.y;
        return _this;
    }
    return GameStartBtn;
}(egret.Sprite));
__reflect(GameStartBtn.prototype, "GameStartBtn");
//# sourceMappingURL=GameStartBtn.js.map