var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(playerImgName) {
        var _this = _super.call(this) || this;
        _this.playerSprite = new egret.Sprite();
        _this.addChild(_this.playerSprite);
        _this.playerBitmap = ResourceUtils.createBitmapByName(playerImgName);
        _this.playerSprite.addChild(_this.playerBitmap);
        return _this;
    }
    return Player;
}(egret.Sprite));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map