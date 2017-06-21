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
        _this._gameSceneView = new GameSceneView(displayObjectContainer);
        //this.fillBackGround(displayObjectContainer);
        _this.initView();
        return _this;
    }
    // private fillBackGround(displayObectContainer:egret.DisplayObjectContainer):void{
    // 	//use #33CCCC as background color
    // 	this.graphics.beginFill(0x33CCCC);
    // 	this.graphics.drawRect(0, 0, displayObectContainer.stage.stageWidth, displayObectContainer.stage.stageHeight);
    // 	this.graphics.endFill;
    // }
    GameWelcomeView.prototype.initView = function () {
        //添加title
        var backgroundImage;
        backgroundImage = ResourceUtils.createBitmapByName("main_background_png");
        this.addChild(backgroundImage);
        this._coinColumn = ResourceUtils.createBitmapByName("coin_column_1_png");
        this._coinColumn.x = 400;
        this._coinColumn.y = 25;
        this.addChild(this._coinColumn);
        this._coin = ResourceUtils.createBitmapByName("coin_png");
        this._coin.x = 410;
        this._coin.y = 35;
        this.addChild(this._coin);
        this._gameTitle = ResourceUtils.createBitmapByName("title_png");
        this._gameTitle.x = 80;
        this._gameTitle.y = 120;
        this.addChild(this._gameTitle);
        //添加开始按钮
        this._gameStartBtn = new GameStartBtn("GameStartBtn_png");
        this._gameStartBtn.x = 220;
        this._gameStartBtn.y = 900;
        this.addChild(this._gameStartBtn);
        this._gameStartBtn.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnClickEvent, this);
        //添加player
        this._player = new Player("PlayerWithShadow_png");
        this._player.x = 220;
        this._player.y = 500;
        this.addChild(this._player);
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
    GameWelcomeView.prototype.onStartBtnClickEvent = function () {
        console.log("enter game play scene");
        this.removeChildren();
        this.addChild(this._gameSceneView);
        //var gameOverView:GameOverView = new GameOverView(0,0);
        //this.addChild(gameOverView);
        //game.play();
    };
    return GameWelcomeView;
}(egret.Sprite));
__reflect(GameWelcomeView.prototype, "GameWelcomeView");
//# sourceMappingURL=GameWelcomeView.js.map