class GameWelcomeView extends egret.Sprite{
	private _gameStartBtn:GameStartBtn;
	private _player:Player;
	private _gameTitle:egret.Bitmap;
	private _leftArrayBtn:egret.Bitmap;
	private _rightArrayBtn:egret.Bitmap;

	private _gameSceneView:GameSceneView;
	public constructor(displayObjectContainer:egret.DisplayObjectContainer) {
		super();
		this._gameSceneView = new GameSceneView(displayObjectContainer);
		this.fillBackGround(displayObjectContainer);
		this.initView();
	}

	private fillBackGround(displayObectContainer:egret.DisplayObjectContainer):void{
		//use #33CCCC as background color
		this.graphics.beginFill(0x33CCCC);
		this.graphics.drawRect(0, 0, displayObectContainer.stage.stageWidth, displayObectContainer.stage.stageHeight);
		this.graphics.endFill;
	}
	private initView():void{
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
	}

	private onStartBtnClickEvent():void{
		console.log("enter game play scene");
		this.removeChildren();
		
		this.addChild(this._gameSceneView);
		var gameOverView:GameOverView = new GameOverView(0,0);
        this.addChild(gameOverView);
		
		//game.play();
	}
}