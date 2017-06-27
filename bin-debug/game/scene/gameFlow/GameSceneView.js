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
        //初始化游戏场景时的一些设置
        _this._curScore = 0;
        _this._bestScore = 0;
        //可跳跃的4个点的坐标
        _this._vcLocation = [
            new egret.Point(120, 350),
            new egret.Point(120, 627),
            new egret.Point(397, 627),
            new egret.Point(397, 350),
        ];
        _this._idOfCurLocation = 0;
        _this._gamePauseView = new GamePauseView(displayContainerObject);
        _this.initView(displayContainerObject);
        _this.isPaused = false;
        return _this;
    }
    //初始化GameScene 游戏开始场景
    GameSceneView.prototype.initView = function (displayContainerObject) {
        var _this = this;
        this._gameOverView = new GameOverView(this._curScore, 0);
        //背景图片
        var bgImage;
        bgImage = ResourceUtils.createBitmapByName("bg_blue_png");
        this.addChild(bgImage);
        //添加表盘&表带
        var watchband;
        watchband = ResourceUtils.createBitmapByName("watchband_png");
        watchband.x = 0;
        watchband.y = 333;
        this._clock_color = ResourceUtils.createBitmapByName("clock_green_png");
        this._clock_color.x = 20;
        this._clock_color.y = 213;
        this.addChild(watchband);
        this.addChild(this._clock_color);
        //表盘中心和指针
        this._PointerCenter = ResourceUtils.createBitmapByName("fixed_point_png");
        this._PointerCenterData = new egret.BitmapData(this._PointerCenter);
        this._PointerCenter.x = 320 - this._PointerCenterData.width / 2.0;
        this._PointerCenter.y = 475;
        this._pointer = ResourceUtils.createBitmapByName("pointer_png");
        this._PointerData = new egret.BitmapData(this._pointer);
        this._bird = ResourceUtils.createBitmapByName("shadow_png");
        this._birdData = new egret.BitmapData(this._bird);
        this._bird.x = 120;
        this._bird.y = 400;
        this._birdWithoutShadow = ResourceUtils.createBitmapByName("BirdWithoutShadow_png");
        this._birdWithoutShadow.x = this._bird.x;
        this._birdWithoutShadow.y = this._bird.y - 101;
        this.addChild(this._pointer);
        this.addChild(this._PointerCenter);
        this.addChild(this._bird);
        //Jump按钮，点击跳跃
        //var JumpBtn:egret.Bitmap;
        var JumpBtnData;
        var JumpBtnShadow;
        this._jumpBtn = ResourceUtils.createBitmapByName("jump_button_png");
        JumpBtnData = new egret.BitmapData(this._jumpBtn);
        this._jumpBtn.x = 320 - JumpBtnData.width / 2;
        this._jumpBtn.y = 900;
        this._jumpBtn.touchEnabled = true;
        this._jumpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJumpBtnClicked, this);
        JumpBtnShadow = ResourceUtils.createBitmapByName("jump_button_shadow_png");
        JumpBtnShadow.x = this._jumpBtn.x;
        JumpBtnShadow.y = 913;
        this.addChild(JumpBtnShadow);
        this.addChild(this._jumpBtn);
        this.addChild(this._birdWithoutShadow);
        //暂停按钮
        var suspendBtnShadow;
        suspendBtnShadow = ResourceUtils.createBitmapByName("suspend_button_shadow_png");
        suspendBtnShadow.x = 34;
        suspendBtnShadow.y = 33;
        this._suspendBtn = ResourceUtils.createBitmapByName("suspend_button_png");
        this._suspendBtn.x = 34;
        this._suspendBtn.y = 25;
        this.addChild(suspendBtnShadow);
        this.addChild(this._suspendBtn);
        this._suspendBtn.touchEnabled = true;
        //金币栏
        this.createContentWithShadow(this._coinColumn, 400, 25, "coin_column_png", "coin_column_shadow_png", 10);
        //this.addChild(this._coinColumn);
        //console.log(this._coinColumn.x);
        //分数栏 
        this._scoreColumn = ResourceUtils.createBitmapByName("score_column_png");
        this._scoreColumn.x = 125;
        this._scoreColumn.y = 26;
        this.addChild(this._scoreColumn);
        //给游戏结束界面的“继续玩”按钮添加点击事件
        this._gameOverView.reply_button.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            _this.removeChild(_this._gameOverView);
            //this.removeChild(this._gameOverView._finalScoreText);
            _this._gameOverView.removeChild(_this._gameOverView._finalScoreText);
            console.log("remove game overview");
            _this._jumpBtn.touchEnabled = true;
        }, this);
        //game over view添加到stage时触发行为
        //this._gameOverView.removeEventListener()
        this._gameOverView.home_button.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            _this.removeChildren();
            var gameWelcomeView = new GameWelcomeView(displayContainerObject);
            _this.parent.addChild(gameWelcomeView);
        }, this);
        this._suspendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            if (_this.isPaused) {
                _this.isPaused = false;
                console.log("开始");
            }
            else {
                _this.isPaused = true;
                console.log("暂停");
            }
        }, this);
        this.play();
    };
    GameSceneView.prototype.play = function () {
        var _this = this;
        this._pointer.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            //this._pointer.rotation += 10;
            _this._pointer.anchorOffsetX = _this._PointerData.width / 2;
            _this._pointer.anchorOffsetY = _this._PointerData.height - _this._PointerData.height / 20;
            _this._pointer.x = _this._PointerCenter.x + _this._PointerCenterData.width / 2;
            _this._pointer.y = _this._PointerCenter.y + _this._PointerCenterData.height / 2;
            if (_this.isPaused) {
                _this._pointer.rotation += 0;
                _this._jumpBtn.touchEnabled = false;
            }
            else {
                _this._pointer.rotation += 3;
                _this._jumpBtn.touchEnabled = true;
            }
            //this._pointer.rotation += 3;
            //判断此时小鸟和指针位置重合
            var birdPoint = new egret.Point(_this._bird.x, _this._bird.y);
            if (_this.pointerCoinsideWithBird(birdPoint, _this._pointer.rotation)) {
                //this._pointer.rotation += 0;
                _this.gameOver();
                _this._jumpBtn.touchEnabled = false;
            }
        }, this);
    };
    //点击Jump按钮后执行：
    GameSceneView.prototype.onJumpBtnClicked = function () {
        //按钮按下的动画效果
        var tw = egret.Tween.get(this._jumpBtn, { loop: false });
        tw.to({ x: this._jumpBtn.x, y: this._jumpBtn.y + 13 }, 50).wait(100)
            .to({ x: this._jumpBtn.x, y: this._jumpBtn.y }, 50);
        this._curScore++;
        this.jump();
    };
    GameSceneView.prototype.onSuspendBtnClicked = function () {
    };
    //游戏结束
    GameSceneView.prototype.gameOver = function () {
        var _this = this;
        // var gameOverView:GameOverView = new GameOverView(0,0);
        // this.addChild(gameOverView);
        //this.isPaused = true;
        console.log("game over!");
        console.log("rotation = " + this._pointer.rotation);
        this._gameOverView.finalScore = this._curScore;
        this._gameOverView._finalScoreText.text = this._gameOverView.finalScore.toString();
        this._curScore = 0;
        console.log("FINAL SCORE: " + this._gameOverView.finalScore);
        if (this._gameOverView.finalScore > this._bestScore) {
            this._bestScore = this._gameOverView.finalScore;
        }
        console.log("BEST SCORE: " + this._bestScore);
        //添加game over页面
        this.addChild(this._gameOverView);
        this._gameOverView.addChild(this._gameOverView._finalScoreText);
        this._gameOverView.addEventListener(egret.Event.REMOVED_FROM_STAGE, function (evt) {
            //this.isPaused = false;
            console.log("gameover view leave stage");
            _this._curScore = 0;
        }, this);
        this._gameOverView.addEventListener(egret.Event.ADDED_TO_STAGE, function (evt) {
            //this.isPaused = true;
            console.log("GameOverView added to stage");
            //this._pointer.rotation += 0;
            //console.log("Then rotation = " + this._pointer.rotation);
        }, this);
    };
    //判断小鸟落地时是否与指针位置重合
    GameSceneView.prototype.pointerCoinsideWithBird = function (bird, rotation) {
        if (bird.x == 120 && bird.y == 350 && rotation == -45) {
            return true;
        }
        else if (bird.x == 120 && bird.y == 627 && rotation == -135) {
            return true;
        }
        else if (bird.x == 397 && bird.y == 627 && rotation == 135) {
            return true;
        }
        else if (bird.x == 397 && bird.y == 350 && rotation == 45) {
            return true;
        }
        else {
            return false;
        }
    };
    GameSceneView.prototype.createContentWithShadow = function (content, contentX, contentY, contentName, shadowName, translation) {
        content = ResourceUtils.createBitmapByName(contentName);
        content.x = contentX;
        content.y = contentY;
        //添加阴影
        var shadow;
        shadow = ResourceUtils.createBitmapByName(shadowName);
        shadow.x = contentX;
        shadow.y = contentY + translation;
        this.addChild(shadow);
        this.addChild(content);
    };
    GameSceneView.prototype.jump = function () {
        var _this = this;
        //保证当前位置的id不超过3（数组下标最大值）
        if (this._idOfCurLocation >= 3) {
            this._idOfCurLocation -= 4;
        }
        //下一个跳跃的点为当前点的下一个
        egret.Tween.get(this._bird).to({ x: this._vcLocation[this._idOfCurLocation + 1].x, y: this._vcLocation[this._idOfCurLocation + 1].y }, 200, egret.Ease.sineIn);
        //console.log("current score:"+this._curScore);
        //改变影子和本体的距离创造出跳跃感
        this._idOfCurLocation += 1;
        switch (this._idOfCurLocation) {
            case 1:
                this._bird.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
                    _this._birdWithoutShadow.x = _this._bird.x;
                    _this._birdWithoutShadow.y = _this._bird.y - 30 * (Math.sin((_this._bird.y - 350) * Math.PI / 277)) - 101;
                }, this._bird);
                break;
            case 2:
                this._bird.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
                    _this._birdWithoutShadow.x = _this._bird.x;
                    _this._birdWithoutShadow.y = _this._bird.y - 30 * (Math.sin((_this._bird.x - 120) * Math.PI / 277)) - 101;
                }, this._bird);
                console.log("从左往右");
                break;
            case 3:
                this._bird.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
                    _this._birdWithoutShadow.x = _this._bird.x;
                    _this._birdWithoutShadow.y = _this._bird.y - 30 * (Math.sin((_this._bird.y - 350) * Math.PI / 277)) - 101;
                    ;
                    //console.log(this._birdWithoutShadow.y);
                }, this._bird);
                console.log("从下到上");
                break;
            default:
                this._bird.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
                    _this._birdWithoutShadow.x = _this._bird.x;
                    _this._birdWithoutShadow.y = _this._bird.y - 30 * (Math.sin((397 - _this._bird.x) * Math.PI / 277)) - 101;
                }, this._bird);
                console.log("从右往左");
                break;
        }
    };
    return GameSceneView;
}(egret.Sprite));
__reflect(GameSceneView.prototype, "GameSceneView");
//# sourceMappingURL=GameSceneView.js.map