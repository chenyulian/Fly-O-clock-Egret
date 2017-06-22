// TypeScript file
class GameSceneView extends egret.Sprite{
    public static _gameScene:GameSceneView;
    private gameSceneContainer:egret.Sprite;
    //暂停场景
    private _gamePauseView:GamePauseView;
    private _pointer:egret.Bitmap;
    private _PointerCenter:egret.Bitmap;
    private _PointerCenterData:egret.BitmapData;
    private _PointerData:egret.BitmapData;
    private _bird:egret.Bitmap;
    private _birdData:egret.BitmapData;
    private _vcLocation:Array<egret.Point>;
    private _idOfCurLocation:number;


    constructor(displayContainerObject:egret.DisplayObjectContainer){
        super();
        GameSceneView._gameScene = this;
        this._gamePauseView = new GamePauseView(displayContainerObject);
        this.initView(displayContainerObject);
    }

    public initView(displayContainerObject:egret.DisplayObjectContainer):void{
        //this.gameSceneContainer = new egret.Sprite();
        //this.addChild(this.gameSceneContainer);
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRect(0, 0, displayContainerObject.stage.stageWidth, displayContainerObject.stage.stageHeight);
        shape.graphics.endFill();
        this.addChild(shape);

        
        var JumpBtn:egret.Bitmap;
        var JumpBtnData:egret.BitmapData;
        JumpBtn = ResourceUtils.createBitmapByName("JumpBtn_png");
        JumpBtnData = new egret.BitmapData(JumpBtn);
        JumpBtn.x = 320 - JumpBtnData.width / 2;
        JumpBtn.y = 820;
        JumpBtn.touchEnabled = true;
        JumpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jump, this);

        this._PointerCenter = ResourceUtils.createBitmapByName("pointerCenter_png");

        this._PointerCenterData = new egret.BitmapData(this._PointerCenter);
        this._PointerCenter.x = 320  - this._PointerCenterData.width / 2.0;
        this._PointerCenter.y = 568 - this._PointerCenterData.height / 2.0 ;
        
        this._pointer = ResourceUtils.createBitmapByName("pointer_png");
        this._PointerData = new egret.BitmapData(this._pointer);
        
        this._bird = ResourceUtils.createBitmapByName("bird_png");
        this._birdData = new egret.BitmapData(this._bird);
        this._bird.x = 120;
        this._bird.y = 400;

        //可跳跃的4个点的坐标
        this._vcLocation = [
            new egret.Point(120, 400),
            new egret.Point(442, 400),
            new egret.Point(442, 627),
            new egret.Point(120, 627),
            
        ];
        this._idOfCurLocation = 0;

        this.addChild(this._PointerCenter);
        this.addChildAt(this._pointer, 1);
        this.addChild(this._bird);
        this.addChild(JumpBtn);

        this._pointer.addEventListener(egret.Event.ENTER_FRAME, (evt:egret.Event)=>{
            //this._pointer.rotation += 10;
            this._pointer.anchorOffsetX = this._PointerData.width / 2;
            this._pointer.anchorOffsetY = this._PointerData.height - this._PointerData.height / 20;
            this._pointer.x = this._PointerCenter.x + this._PointerCenterData.width / 2;
            this._pointer.y = this._PointerCenter.y + this._PointerCenterData.height / 2;

            this._pointer.rotation += 3;
        }
        ,this);
            
        console.log("anchorOffsetX: "+ this._pointer.anchorOffsetX, + " anchorOffsetY:" + this._pointer.anchorOffsetY);
         

    }

    public play():void{
        //this.removeChildren();
        
        this._pointer.anchorOffsetX = 320;
        this._pointer.anchorOffsetY = 568;
        this._pointer.x = this._PointerCenter.x + (this._PointerCenterData.width - this._PointerData.width) / 2.0;
        this._pointer.y = this._PointerCenter.y - this._PointerData.height;

        this._pointer.rotation += 3;
    }
    public jump():void{
        console.log("jump btn clicked");
        console.log(this._idOfCurLocation);
        //保证当前位置的id不超过3（数组下标最大值）
         if(this._idOfCurLocation >= 3){
             this._idOfCurLocation -= 4;
         }
         //下一个跳跃的点为当前点的下一个
         egret.Tween.get(this._bird).to({x: this._vcLocation[this._idOfCurLocation + 1].x, y: this._vcLocation[this._idOfCurLocation + 1].y}, 300, egret.Ease.sineIn);
         //egret.Tween.get(this._bird).to({x:442, y:400}, 300, egret.Ease.sineIn);
         this._idOfCurLocation += 1;
         
    }
    public gameOver():void{
        var gameOverView:GameOverView = new GameOverView(0,0);
        this.addChild(gameOverView);
    }
}