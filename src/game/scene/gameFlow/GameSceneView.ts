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
        
        this._PointerCenter = ResourceUtils.createBitmapByName("pointerCenter_png");

        this._PointerCenterData = new egret.BitmapData(this._PointerCenter);
        this._PointerCenter.x = 320  - this._PointerCenterData.width / 2.0;
        this._PointerCenter.y = 568 - this._PointerCenterData.height / 2.0 ;
        
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

        this._pointer.addEventListener(egret.Event.ENTER_FRAME, (evt:egret.Event)=>{
            //this._pointer.rotation += 10;
            this._pointer.anchorOffsetX = this._PointerData.width / 2;
            this._pointer.anchorOffsetY = this._PointerData.height - this._PointerData.height / 10;
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

    public gameOver():void{
        var gameOverView:GameOverView = new GameOverView(0,0);
        this.addChild(gameOverView);
    }
}