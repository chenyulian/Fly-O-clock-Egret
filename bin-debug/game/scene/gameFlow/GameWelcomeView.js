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
    GameWelcomeView.prototype.initView = function () {
        //添加title
        var backgroundImage;
        backgroundImage = ResourceUtils.createBitmapByName("main_background_png");
        this.addChild(backgroundImage);
        //金币栏
        this._coinColumnShadow = ResourceUtils.createBitmapByName("coin_column_bg_png");
        this._coinColumnShadow.x = 400;
        this._coinColumnShadow.y = 35;
        this.addChild(this._coinColumnShadow);
        this._coinColumn = ResourceUtils.createBitmapByName("coin_column_png");
        this._coinColumn.x = 400;
        this._coinColumn.y = 25;
        this.addChild(this._coinColumn);
        //金币
        this._coin = ResourceUtils.createBitmapByName("coin_png");
        this._coin.x = 410;
        this._coin.y = 35;
        this.addChild(this._coin);
        //游戏title
        this._gameTitle = ResourceUtils.createBitmapByName("titlewithshadow_png");
        this._gameTitle.x = 80;
        this._gameTitle.y = 120;
        this.addChild(this._gameTitle);
        //adventure mode button
        this._adventureBtnShadow = ResourceUtils.createBitmapByName("adventure_button_bg_png");
        this._adventureBtnShadow.x = 26;
        this._adventureBtnShadow.y = 915;
        this.addChild(this._adventureBtnShadow);
        this._adventureBtn = ResourceUtils.createBitmapByName("adventure_button_png");
        this._adventureBtn.x = 26;
        this._adventureBtn.y = 900;
        this.addChild(this._adventureBtn);
        this._adventureBtn.touchEnabled = true;
        this._adventureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdventureBtnClicked, this._adventureBtn);
        //challenge mode button
        this._challengeBtnShadow = ResourceUtils.createBitmapByName("challenge_button_bg_png");
        this._challengeBtnShadow.x = 342;
        this._challengeBtnShadow.y = 915;
        this.addChild(this._challengeBtnShadow);
        this._challengeBtn = ResourceUtils.createBitmapByName("challenge_button_png");
        this._challengeBtn.x = 342;
        this._challengeBtn.y = 900;
        this.addChild(this._challengeBtn);
        this._challengeBtn.touchEnabled = true;
        this._challengeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onChallengeBtnClicked, this);
        this._challengeBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onChallengeBtnNotClicked, this);
        this._shape = new egret.Shape();
        //添加player
        this._player = new Player("BirdWithoutShadow_png");
        this._player.x = 290;
        this._player.y = 550;
        this.addChild(this._player);
        //添加左右箭头以选择不同的player
        this._leftArrow = ResourceUtils.createBitmapByName("left_arrow_png");
        this._rightArrow = ResourceUtils.createBitmapByName("right_arrow_png");
        this._leftArrow.x = 100;
        this._leftArrow.y = 650;
        this._rightArrow.x = 489;
        this._rightArrow.y = 650;
        //_select
        this._select = ResourceUtils.createBitmapByName("select_png");
        this._select.x = 262;
        this._select.y = 818;
        this.addChild(this._leftArrow);
        this.addChild(this._rightArrow);
        this.addChild(this._select);
    };
    GameWelcomeView.prototype.onStartBtnClickEvent = function () {
        console.log("enter game play scene");
        this.removeChildren();
        this.addChild(this._gameSceneView);
    };
    GameWelcomeView.prototype.onChallengeBtnClicked = function () {
        //console.log("按下");
        var tw = egret.Tween.get(this._challengeBtn, { loop: false });
        tw.to({ x: this._challengeBtn.x, y: this._challengeBtn.y + 13 }, 50).wait(100)
            .to({ x: this._challengeBtn.x, y: this._challengeBtn.y }, 50).wait(500)
            .call(function () {
            console.log("go to game scene");
            //this.addChild(this._gameSceneView);
        });
        this.removeChildren();
        this.addChild(this._gameSceneView);
    };
    GameWelcomeView.prototype.onAdventureBtnClicked = function () {
        // var tw = egret.Tween.get(this._adventureBtn, {loop:false});
        // tw.to({x:this._adventureBtn.x, y:this._adventureBtn.y + 13}, 50 ).wait( 100 )
        // .to({x:this._adventureBtn.x, y:this._adventureBtn.y}, 50).wait(500)
        // .call(function(){
        // 	console.log("go to adventure mode");
        // });
    };
    GameWelcomeView.prototype.onChallengeBtnNotClicked = function () {
        console.log("松手");
        //this.removeChildren();
    };
    return GameWelcomeView;
}(egret.Sprite));
__reflect(GameWelcomeView.prototype, "GameWelcomeView");
//# sourceMappingURL=GameWelcomeView.js.map