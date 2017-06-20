// TypeScript file
class GameSceneView extends egret.Sprite{
    public static _gameScene:GameSceneView;
    private gameSceneContainer:egret.Sprite;
    //暂停场景
    private _gamePauseView:GamePauseView;

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
        /*
        var pinkBtn:egret.Bitmap;
        pinkBtn = ResourceUtils.createBitmapByName("pinkBtn_png");
        pinkBtn.x = 0;
        pinkBtn.y = 0;
        this.addChild(pinkBtn);
        */

        var PointerCenter:egret.Bitmap;
        var pointer:egret.Bitmap;
        var PointerCenterData:egret.BitmapData;
        
        
        PointerCenter = ResourceUtils.createBitmapByName("pointerCenter_png");
        PointerCenterData = new egret.BitmapData(PointerCenter);
        PointerCenter.x = 320  - PointerCenterData.width / 2.0;
        PointerCenter.y = 568 - PointerCenterData.height / 2.0 ;
        
        console.log("PointerCenterData width:" + PointerCenterData.width + " height:" + PointerCenterData.height);
        this.addChild(PointerCenter);
    }

    public play():void{
        //this.removeChildren();
        
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0x0000ff);
        //shape.graphics.drawRect(0, 0, , 200);
        shape.graphics.endFill();
        this.addChild(shape);
    }

    public gameOver():void{
        var gameOverView:GameOverView = new GameOverView(0,0);
        this.addChild(gameOverView);
    }
}