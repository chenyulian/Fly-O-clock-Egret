var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var GameSceneView = (function (_super) {
    __extends(GameSceneView, _super);
    function GameSceneView(displayContainerObject) {
        var _this = _super.call(this) || this;
        GameSceneView._gameScene = _this;
        _this._gamePauseView = new GamePauseView(displayContainerObject);
        _this.initView(displayContainerObject);
        return _this;
    }
    GameSceneView.prototype.initView = function (displayContainerObject) {
        var _this = this;
        //this.gameSceneContainer = new egret.Sprite();
        //this.addChild(this.gameSceneContainer);
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRect(0, 0, displayContainerObject.stage.stageWidth, displayContainerObject.stage.stageHeight);
        shape.graphics.endFill();
        this.addChild(shape);
        var JumpBtn;
        this._PointerCenter = ResourceUtils.createBitmapByName("pointerCenter_png");
        this._PointerCenterData = new egret.BitmapData(this._PointerCenter);
        this._PointerCenter.x = 320 - this._PointerCenterData.width / 2.0;
        this._PointerCenter.y = 568 - this._PointerCenterData.height / 2.0;
        this._pointer = ResourceUtils.createBitmapByName("pointer_png");
        this._PointerData = new egret.BitmapData(this._pointer);
        console.log("PointerCenterData width:" + this._PointerCenterData.width + " height:" + this._PointerCenterData.height);
        this.addChild(this._PointerCenter);
        this.addChildAt(this._pointer, 1);
        // var i:number;
        // i = 0;
        // while(i <=100){
        //     pointer.rotation += 3;
        //     i ++;
        // }
        this._pointer.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            //this._pointer.rotation += 10;
            _this._pointer.anchorOffsetX = _this._PointerData.width / 2;
            _this._pointer.anchorOffsetY = _this._PointerData.height - _this._PointerData.height / 10;
            _this._pointer.x = _this._PointerCenter.x + _this._PointerCenterData.width / 2;
            _this._pointer.y = _this._PointerCenter.y + _this._PointerCenterData.height / 2;
            _this._pointer.rotation += 3;
        }, this);
        console.log("anchorOffsetX: " + this._pointer.anchorOffsetX, +" anchorOffsetY:" + this._pointer.anchorOffsetY);
    };
    GameSceneView.prototype.play = function () {
        //this.removeChildren();
        this._pointer.anchorOffsetX = 320;
        this._pointer.anchorOffsetY = 568;
        this._pointer.x = this._PointerCenter.x + (this._PointerCenterData.width - this._PointerData.width) / 2.0;
        this._pointer.y = this._PointerCenter.y - this._PointerData.height;
        this._pointer.rotation += 3;
    };
    GameSceneView.prototype.gameOver = function () {
        var gameOverView = new GameOverView(0, 0);
        this.addChild(gameOverView);
    };
    return GameSceneView;
}(egret.Sprite));
__reflect(GameSceneView.prototype, "GameSceneView");
//# sourceMappingURL=GameSceneView.js.map