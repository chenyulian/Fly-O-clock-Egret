var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameOverView = (function (_super) {
    __extends(GameOverView, _super);
    function GameOverView(curScore, bestScore) {
        var _this = _super.call(this) || this;
        _this.graphics.beginFill(0xF08080);
        _this.graphics.drawRoundRect(50, 50, 400, 500, 20, 20);
        _this.graphics.endFill;
        return _this;
    }
    return GameOverView;
}(egret.Sprite));
__reflect(GameOverView.prototype, "GameOverView");
//# sourceMappingURL=GameOverView.js.map