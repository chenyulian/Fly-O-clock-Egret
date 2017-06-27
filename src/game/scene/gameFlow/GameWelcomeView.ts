class GameWelcomeView extends egret.Sprite{

	private _gameStartBtn:GameStartBtn;
	private _player:Player;

	private _gameTitle:egret.Bitmap;
	//左箭头
	private _leftArrow:egret.Bitmap;
	//灰色左箭头，无上一角色时的左箭头状态
	private _leftArrowGray:egret.Bitmap;
	//右箭头
	private _rightArrow:egret.Bitmap;
	//灰色右箭头，无上一角色时的左箭头状态
	private _rightArrowGray:egret.Bitmap;
	//“select”:角色状态：未选择
	private _select:egret.Bitmap;
	//shape
	private _shape:egret.Shape;
	//角色状态，已选择，接下来的游戏中将使用该角色进行游戏
	private _selected:egret.Bitmap;
	//角色状态，未解锁。点击后，弹出解锁方式面板；
	private _unlock:egret.Bitmap;
	//冒险模式
	private _adventureBtn:egret.Bitmap;
	//冒险模式按钮阴影（方便做按下动画)
	private _adventureBtnShadow:egret.Bitmap;
	//挑战模式
	private _challengeBtn:egret.Bitmap;
	//挑战模式按钮阴影（方便做按下动画)
	private _challengeBtnShadow:egret.Bitmap;
	//金币栏（金币总数）
	private _coinColumn:egret.Bitmap;
	//金币栏阴影
	private _coinColumnShadow:egret.Bitmap;
	//金币
	private _coin:egret.Bitmap;


	private _gameSceneView:GameSceneView;
	public constructor(displayObjectContainer:egret.DisplayObjectContainer) {
		super();
		this._gameSceneView = new GameSceneView(displayObjectContainer);
		this._gameSceneView._gameWelcomeView = this;
		//this.fillBackGround(displayObjectContainer);
		this.initView();
	}

	private initView():void{
		//添加title
		var backgroundImage:egret.Bitmap;
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
	}

	private onStartBtnClickEvent():void{
		console.log("enter game play scene");
		this.removeChildren();
		this.addChild(this._gameSceneView);
	}

	private onChallengeBtnClicked():void{
		//console.log("按下");
		var tw = egret.Tween.get(this._challengeBtn, {loop:false});
		tw.to( {x:this._challengeBtn.x, y:this._challengeBtn.y + 13}, 50 ).wait( 100 )
		.to({x:this._challengeBtn.x, y:this._challengeBtn.y}, 50).wait(500)
		.call(function(){
			console.log("go to game scene");
			//this.addChild(this._gameSceneView);
		});
		this.removeChildren();
		this.addChild(this._gameSceneView);
	}	

	private onAdventureBtnClicked():void{
		// var tw = egret.Tween.get(this._adventureBtn, {loop:false});
		// tw.to({x:this._adventureBtn.x, y:this._adventureBtn.y + 13}, 50 ).wait( 100 )
		// .to({x:this._adventureBtn.x, y:this._adventureBtn.y}, 50).wait(500)
		// .call(function(){
		// 	console.log("go to adventure mode");
		// });
	}

	private onChallengeBtnNotClicked():void{
		console.log("松手");
		//this.removeChildren();
		
	}
}