// TypeScript file
class GameSceneView extends egret.Sprite{
    public static _gameScene:GameSceneView;
    private gameSceneContainer:egret.Sprite;
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
        this.addChild(this._gamePauseView);
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