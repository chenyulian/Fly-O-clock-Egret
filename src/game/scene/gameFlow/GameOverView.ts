class GameOverView extends egret.Sprite{
	private gameOverImage:egret.Sprite;

	public finalScore:number;
	public bestScore:number;
	public addedCoins:number;
	public reply_button:egret.Bitmap;
	public home_button:egret.Bitmap;
	private _gameWelcomeView:GameWelcomeView;
	private _gameSceneView:GameSceneView;
	public _finalScoreText:egret.TextField;
	public _bestScoreText:egret.TextField

	public constructor(curScore:number, bestScore:number) {
		super();
		this.finalScore = 0;
		this.initView();
		//this._scoreText = new egret.TextField();
		//this._gameWelcomeView = new GameWelcomeView(displayObjectContainer);
		//this._gameSceneView = new GameSceneView(displayObjectContainer);
		
	}
	private initView():void{
		var bgImage:egret.Bitmap;
		bgImage = ResourceUtils.createBitmapByName("finalscore_panel_png");
		this.addChild(bgImage);

		var reply_button_shadow:egret.Bitmap;
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

		var home_button_shadow:egret.Bitmap = ResourceUtils.createBitmapByName("home_button_2_shadow_png");
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
	}

	private replyBtnOnClicked():void{
		this.removeChildren();
		this.addChild(this._gameSceneView);
		this._gameSceneView.play();
	}

	private homeBtnOnClicked():void{
		this.removeChildren();
		//this.addChild(this._gameWelcomeView);
	}

	public setCurScore(score:number):void{
		this.finalScore = score;
	}
}