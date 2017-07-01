// TypeScript file
class GameSceneView extends egret.Sprite{
    public static _gameScene:GameSceneView;
    //private gameSceneContainer:egret.Sprite;

    /** 以下为GameScene场景组件 */
    //大指针
    private _pointer:egret.Bitmap;
    //小指针
    private _smallPointer:egret.Bitmap;
    //表盘
    private _clock_color:egret.Bitmap;
    //表盘中心
    private _PointerCenter:egret.Bitmap;
    //阴影
    private _bird:egret.Bitmap;
    //本体
    private _birdWithoutShadow:egret.Bitmap;
    //跳跃按钮
    private _jumpBtn:egret.Bitmap;
    //暂停按钮
    private _suspendBtn:egret.Bitmap;
    //分数栏
    private _scoreColumn:egret.Bitmap;
    //金币栏
    private _coinColumn:egret.Bitmap;
    //
    private _picOne:egret.Bitmap;
    private _picTwo:egret.Bitmap;
    private _picThree:egret.Bitmap;

    private isPaused:boolean;

    /** 以下为本页面所关联的其他页面 */
    //暂停页面
    private _gamePauseView:GamePauseView;
    private _gameOverView:GameOverView;
    public _gameWelcomeView:GameWelcomeView;

    /** 以下为游戏逻辑中涉及的变量 */
    //表盘中心图片数据（图像大小等）
    private _PointerCenterData:egret.BitmapData;
    //大指针图片数据
    private _PointerData:egret.BitmapData;
    //小指针图片数据
    private _smallPointerData:egret.BitmapData;
    //阴影图片数据
    private _birdData:egret.BitmapData;
    //游戏角色可以跳跃到的4个固定点
    private _vcLocation:Array<egret.Point>;
    //游戏角色可以跳跃到的4个固定点的id
    private _idOfCurLocation:number;
    //当前分数
    private _curScore:number;
    private _curScoreText:egret.TextField;

    //最终分数
    private _finalScore:number;
    //
    private _finalScoreText:egret.TextField;
    //最高分
    private _bestScore:number;

    constructor(displayContainerObject:egret.DisplayObjectContainer){
        super();
        GameSceneView._gameScene = this;
        //初始化游戏场景时的一些设置
        this._curScore = 0;
        this._curScoreText = new egret.TextField();
        this._curScoreText.text = this._curScore.toString();
        this._curScoreText.x = 280;
        this._curScoreText.y = 40;
        this._curScoreText.textColor = 0x000000;
        this._curScoreText.size = 50;
        this._curScoreText.fontFamily = "Arial";
        this._curScoreText.bold = true;
        this._bestScore = 0;
        //可跳跃的4个点的坐标
        this._vcLocation = [
            new egret.Point(140, 370),
            new egret.Point(140, 647),
            new egret.Point(417, 647),
            new egret.Point(417, 370),
        ];
        this._idOfCurLocation = 0;
        this._gamePauseView = new GamePauseView(displayContainerObject);
        
        this.initView(displayContainerObject);
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.isPaused = true;
        
    }

    // private onAddToStage(event: egret.Event){
    //     this.initView(displayContainerObject);
    // }
    //初始化GameScene 游戏开始场景
        public initView(displayContainerObject:egret.DisplayObjectContainer):void{

        this._gameOverView = new GameOverView(this._curScore, 0);
       //背景图片
        var bgImage:egret.Bitmap;
        bgImage = ResourceUtils.createBitmapByName("bg_blue_png");
        this.addChild(bgImage);
        
        //添加表盘&表带
        var watchband:egret.Bitmap;
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
        this._PointerCenter.x = 320  - this._PointerCenterData.width / 2.0;
        this._PointerCenter.y = 475;
        
        this._pointer = ResourceUtils.createBitmapByName("pointer_png");
        this._PointerData = new egret.BitmapData(this._pointer);
        this._pointer.anchorOffsetX = this._PointerData.width / 2;
        this._pointer.anchorOffsetY = this._PointerData.height - this._PointerData.height / 20;
        this._pointer.x = 230;
        this._pointer.y = 503;

        this._smallPointer = ResourceUtils.createBitmapByName("pointer_png");
        this._smallPointerData = new egret.BitmapData(this._smallPointer);
        this._smallPointer.anchorOffsetX = this._smallPointerData.width / 2;
        this._smallPointer.anchorOffsetY = this._smallPointerData.height / 20;
        this._smallPointer.x = this._PointerCenter.x + this._PointerCenterData.width / 2;
        this._smallPointer.y = this._PointerCenter.y + this._PointerCenterData.height / 2;
        
        this._bird = ResourceUtils.createBitmapByName("shadow_png"); 
        this._birdData =  new egret.BitmapData(this._bird);
        this._bird.x = 120;
        this._bird.y = 400;

        this._birdWithoutShadow = ResourceUtils.createBitmapByName("BirdWithoutShadow_png");
        this._birdWithoutShadow.x = this._bird.x;
        this._birdWithoutShadow.y = this._bird.y - 101;

        this.addChild(this._pointer);
        this.addChild(this._smallPointer);
        this.addChild(this._PointerCenter);
        this.addChild(this._bird);

        //Jump按钮，点击跳跃
        //var JumpBtn:egret.Bitmap;
        var JumpBtnData:egret.BitmapData;
        var JumpBtnShadow:egret.Bitmap;
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
        var suspendBtnShadow:egret.Bitmap;
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
        
        
        //分数栏 
        this._scoreColumn = ResourceUtils.createBitmapByName("score_column_png");
        this._scoreColumn.x = 125;
        this._scoreColumn.y = 26;
        this.addChild(this._scoreColumn);
        this.addChild(this._curScoreText);

        this._picOne = ResourceUtils.createBitmapByName("picone_png");
        this._picOne.x = 220;
        this._picOne.y = 400;
        this._picTwo = ResourceUtils.createBitmapByName("two_png");
        this._picThree = ResourceUtils.createBitmapByName("three_png");
        
        this._picTwo.x = this._picOne.x;
        this._picTwo.y = this._picOne.y;
        this._picThree.x = this._picOne.x;
        this._picThree.y = this._picOne.y;
        //this.addChild(this._picOne);

        //给游戏结束界面的“继续玩”按钮添加点击事件
        this._gameOverView.reply_button.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt:egret.Event)=>{
            this.removeChild(this._gameOverView);
            // if(this.isPaused){
            //     this.isPaused = false;
            // }
            this.prepareAnimation();
            egret.setTimeout(function(){
            this.isPaused = false;
            },this, 2000);
            //this.removeChild(this._gameOverView._finalScoreText);
            this._gameOverView.removeChild(this._gameOverView._finalScoreText);
            console.log("remove game overview");
            this._jumpBtn.touchEnabled = true;
        }, this);


        //GameOverView的“回到主页”按钮按下时触发
        this._gameOverView.home_button.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt:egret.Event) =>{
            this.removeChildren();
            var gameWelcomeView:GameWelcomeView = new GameWelcomeView(displayContainerObject);
            this.parent.addChild(gameWelcomeView);

        }, this);

        this._suspendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt:egret.Event) => {
            if(this.isPaused){
                this.isPaused = false;
                console.log("开始");
            }else{
                this.isPaused = true;
                console.log("暂停");
            }
        }, this)

        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, (evt:egret.Event) => {
            console.log("on add to stage");
            this.prepareAnimation();
            egret.setTimeout(function(){
            this.isPaused = false;
            },this, 2000);
        }, this);
        
         this.play(); 
    }

    public play():void{
        this._pointer.addEventListener(egret.Event.ENTER_FRAME, (evt:egret.Event)=>{
            this._pointer.anchorOffsetX = this._PointerData.width / 2;
            this._pointer.anchorOffsetY = this._PointerData.height - this._PointerData.height / 20;
            this._pointer.x = this._PointerCenter.x + this._PointerCenterData.width / 2;
            this._pointer.y = this._PointerCenter.y + this._PointerCenterData.height / 2;

             this._smallPointer.anchorOffsetX = this._smallPointerData.width / 2;
            this._smallPointer.anchorOffsetY = this._PointerData.height - this._PointerData.height / 20;
            this._smallPointer.x = this._PointerCenter.x + this._PointerCenterData.width / 2;
            this._smallPointer.y = this._PointerCenter.y + this._PointerCenterData.height / 2;

            if(this.isPaused){
                this._pointer.rotation += 0;
                this._smallPointer.rotation += 0;
                this._jumpBtn.touchEnabled = false;
            }else{
                this._smallPointer.rotation += 2 + 0.1 * this._curScore;
                this._pointer.rotation += 3 + 0.1 * this._curScore;
                //console.log("smallpointer rotation:" + this._smallPointer.rotation);
                this._jumpBtn.touchEnabled = true;
            }

            //判断此时小鸟和指针位置重合
            var birdPoint:egret.Point = new egret.Point(this._bird.x, this._bird.y);
            if(this.pointerCoinsideWithBird(birdPoint, this._pointer.rotation)){
                //this._pointer.rotation += 0;
                this.gameOver();
                this._jumpBtn.touchEnabled = false;
            }
            
        }
        ,this);

    }

    //点击Jump按钮后执行：
    public onJumpBtnClicked():void{
        //按钮按下的动画效果
        var tw = egret.Tween.get(this._jumpBtn, {loop:false});
		tw.to( {x:this._jumpBtn.x, y:this._jumpBtn.y + 13}, 50 ).wait( 100 )
		.to({x:this._jumpBtn.x, y:this._jumpBtn.y}, 50);
        this._curScore ++;
        this._curScoreText.text = this._curScore.toString();
        this.jump();
    }

    private onSuspendBtnClicked():void{

    }
    
    //游戏结束
    public gameOver():void{
        // var gameOverView:GameOverView = new GameOverView(0,0);
        // this.addChild(gameOverView);
        //this.isPaused = true;
        console.log("game over!");
        console.log("rotation = " + this._pointer.rotation);
        this._gameOverView.finalScore = this._curScore;
        this._gameOverView._finalScoreText.text = this._gameOverView.finalScore.toString();
        //this._curScore = 0;
        
        console.log("FINAL SCORE: "+ this._gameOverView.finalScore);
        if(this._gameOverView.finalScore > this._bestScore){
            this._bestScore = this._gameOverView.finalScore;
        }
        
        this._gameOverView.bestScore = this._bestScore;
        this._gameOverView._bestScoreText.text = this._gameOverView.bestScore.toString();
        console.log("BEST SCORE: "+ this._bestScore);
        //添加game 
        this.addChild(this._gameOverView);
        this._gameOverView.addChild(this._gameOverView._finalScoreText);
        this._gameOverView.addChild(this._gameOverView._bestScoreText);
        
        this._gameOverView.addEventListener(egret.Event.REMOVED_FROM_STAGE, (evt:egret.Event)=>{
            console.log("gameover view leave stage");
            this._curScore = 0;
        this._curScoreText.text = this._curScore.toString();
        },this);

        egret.setTimeout(function(){
            this.isPaused = true;
        },this, 200);
        
    }

    //判断小鸟落地时是否与指针位置重合
    private pointerCoinsideWithBird(bird:egret.Point, rotation:number):boolean{
        var hitSmallPointer:boolean = this._smallPointer.hitTestPoint(bird.x, bird.y);
        var hitPointer:boolean = this._pointer.hitTestPoint(bird.x, bird.y);
        if(bird.x == 140 && bird.y == 370 && (hitPointer || hitSmallPointer)){
            return true;
        }else if(bird.x == 140 && bird.y == 647 && (hitPointer || hitSmallPointer)){
            return true;
        }else if(bird.x == 417 && bird.y == 647 && (hitPointer || hitSmallPointer)){
            return true;
        }else if(bird.x == 417 && bird.y == 370 && (hitPointer || hitSmallPointer)){
            return true;
        }else{
            return false;
        }
    }

    private createContentWithShadow(content:egret.Bitmap, contentX:number, contentY:number, contentName:string, shadowName:string, translation:number):void{
        content = ResourceUtils.createBitmapByName(contentName);
        content.x = contentX;
        content.y = contentY;
        //添加阴影
        var shadow:egret.Bitmap;
        shadow = ResourceUtils.createBitmapByName(shadowName);
        shadow.x = contentX;
        shadow.y = contentY + translation;
        this.addChild(shadow);
        this.addChild(content);
    }



    private jump():void{
        //保证当前位置的id不超过3（数组下标最大值）
         if(this._idOfCurLocation >= 3){
             this._idOfCurLocation -= 4;
         }
         //下一个跳跃的点为当前点的下一个
         egret.Tween.get(this._bird).to({x: this._vcLocation[this._idOfCurLocation + 1].x, y: this._vcLocation[this._idOfCurLocation + 1].y}, 200, egret.Ease.sineIn);
         //console.log("current score:"+this._curScore);
        //改变影子和本体的距离创造出跳跃感
        this._idOfCurLocation += 1;
         switch(this._idOfCurLocation){
             case 1:
                this._bird.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event)=>{
                    this._birdWithoutShadow.x = this._bird.x;
                    this._birdWithoutShadow.y = this._bird.y - 30 * (Math.sin((this._bird.y - 370) * Math.PI / 277)) - 101;     
                }, this._bird);
                break;
             case 2:
                this._bird.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event)=>{
                    this._birdWithoutShadow.x = this._bird.x;
                    this._birdWithoutShadow.y = this._bird.y - 30 * (Math.sin((this._bird.x - 140) * Math.PI / 277)) - 101;
                    
                },this._bird); 
                console.log("从左往右");
                break;
             case 3:
                this._bird.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event)=>{
                    this._birdWithoutShadow.x = this._bird.x;
                    this._birdWithoutShadow.y = this._bird.y - 30 * (Math.sin((647 - this._bird.y) * Math.PI / 277)) - 101;;
                    //console.log(this._birdWithoutShadow.y);
                }, this._bird);
                console.log("从下到上");
                break;
             default:
                this._bird.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event)=>{
                    this._birdWithoutShadow.x = this._bird.x;
                    this._birdWithoutShadow.y = this._bird.y - 30 * (Math.sin((417 - this._bird.x) * Math.PI / 277)) - 101;
                    
                },this._bird);
                console.log("从右往左");
                break;
         }
    }

    private prepareAnimation():void{
        this.addChild(this._picThree);
        egret.setTimeout(function(){
            this.removeChild(this._picThree);
            this.addChild(this._picTwo)
            egret.setTimeout(function(){
                this.removeChild(this._picTwo);
                this.addChild(this._picOne);
                egret.setTimeout(function(){
                    this.removeChild(this._picOne);
                },this, 500)
            },this, 500)
        },this, 500);
    }
}