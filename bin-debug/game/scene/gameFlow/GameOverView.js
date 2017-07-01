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
        _this.finalScore = 0;
        _this.initView();
        return _this;
        //this._scoreText = new egret.TextField();
        //this._gameWelcomeView = new GameWelcomeView(displayObjectContainer);
        //this._gameSceneView = new GameSceneView(displayObjectContainer);
    }
    GameOverView.prototype.initView = function () {
        var bgImage;
        bgImage = ResourceUtils.createBitmapByName("finalscore_panel_png");
        this.addChild(bgImage);
        var reply_button_shadow;
        reply_button_shadow = ResourceUtils.createBitmapByName("reply_button_shadow_png");
        reply_button_shadow.x = 201;
        reply_button_shadow.y = 519;
        this.addChild(reply_button_shadow);
        this.reply_button = ResourceUtils.createBitmapByName("reply_button_png");
        this.reply_button.x = 201;
        this.reply_button.y = 514;
        this.addChild(this.reply_button);
        this.reply_button.touchEnabled = true;
        //this.reply_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replyBtnOnClicked, this);
        var home_button_shadow = ResourceUtils.createBitmapByName("home_button_2_shadow_png");
        home_button_shadow.x = 171;
        home_button_shadow.y = 793;
        this.addChild(home_button_shadow);
        this.home_button = ResourceUtils.createBitmapByName("home_button_2_png");
        this.home_button.x = 171;
        this.home_button.y = 788;
        this.addChild(this.home_button);
        this.home_button.touchEnabled = true;
        this.home_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeBtnOnClicked, this);
        // var score:string = 
        // var num:number = 10;
        this._finalScoreText = new egret.TextField();
        this._finalScoreText.x = 300;
        this._finalScoreText.y = 350;
        //this._finalScoreText.text = this.finalScore.toString();
        this._bestScoreText = new egret.TextField();
        this._bestScoreText.x = 500;
        this._bestScoreText.y = 400;
        console.log("final score: " + this.finalScore);
    };
    GameOverView.prototype.replyBtnOnClicked = function () {
        this.removeChildren();
        this.addChild(this._gameSceneView);
        this._gameSceneView.play();
    };
    GameOverView.prototype.homeBtnOnClicked = function () {
        this.removeChildren();
        //this.addChild(this._gameWelcomeView);
    };
    GameOverView.prototype.setCurScore = function (score) {
        this.finalScore = score;
    };
    return GameOverView;
}(egret.Sprite));
__reflect(GameOverView.prototype, "GameOverView");
//# sourceMappingURL=GameOverView.js.map