var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameWelcomeView = (function (_super) {
    __extends(GameWelcomeView, _super);
    function GameWelcomeView(displayObjectContainer) {
        var _this = _super.call(this) || this;
        _this.fillBackGround(displayObjectContainer);
        _this.initView(displayObjectContainer);
        return _this;
    }
    GameWelcomeView.prototype.fillBackGround = function (displayObectContainer) {
        //use #33CCCC as background color
        this.graphics.beginFill(0x33CCCC);
        this.graphics.drawRect(0, 0, displayObectContainer.stage.stageWidth, displayObectContainer.stage.stageHeight);
        this.graphics.endFill;
    };
    GameWelcomeView.prototype.initView = function (displayObjectContainer) {
        //添加title
        this._gameTitle = ResourceUtils.createBitmapByName("GameTitle_png");
        this._gameTitle.x = 220;
        this._gameTitle.y = 200;
        this.addChild(this._gameTitle);
        //添加开始按钮
        this._gameStartBtn = new GameStartBtn("GameStartBtn_png");
        this._gameStartBtn.x = 220;
        this._gameStartBtn.y = 900;
        this.addChild(this._gameStartBtn);
        //添加player
        this._player = new Player("PlayerWithShadow_png");
        this._player.x = 220;
        this._player.y = 500;
        this.addChild(this._player);
        this._gameStartBtn.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEvent, this);
        //添加左右箭头以选择不同的player
        this._leftArrayBtn = ResourceUtils.createBitmapByName("LeftArray_png");
        this._rightArrayBtn = ResourceUtils.createBitmapByName("RightArray_png");
        this._leftArrayBtn.x = 60;
        this._leftArrayBtn.y = 500;
        this._rightArrayBtn.x = 380;
        this._rightArrayBtn.y = 500;
        this.addChild(this._leftArrayBtn);
        this.addChild(this._rightArrayBtn);
    };
    GameWelcomeView.prototype.onClickEvent = function () {
        console.log("game start!");
    };
    return GameWelcomeView;
}(egret.Sprite));
__reflect(GameWelcomeView.prototype, "GameWelcomeView");
//# sourceMappingURL=GameWelcomeView.js.map