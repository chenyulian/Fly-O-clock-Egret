var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GamePauseView = (function (_super) {
    __extends(GamePauseView, _super);
    function GamePauseView(displayObjectContainer) {
        var _this = _super.call(this) || this;
        _this.graphics.beginFill(0x000000, 0.5);
        _this.graphics.drawRect(0, 0, displayObjectContainer.stage.stageWidth, displayObjectContainer.stage.stageHeight);
        _this.graphics.endFill;
        return _this;
    }
    return GamePauseView;
}(egret.Sprite));
__reflect(GamePauseView.prototype, "GamePauseView");
//# sourceMappingURL=GamePauseView.js.map