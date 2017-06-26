class GameOverView extends egret.Sprite{
	private gameOverImage:egret.Sprite;

	public curScore:number;
	public bestScore:number;
	public addedCoins:number;
	public constructor(curScore:number, bestScore:number) {
		super();
		this.initView();
	}
	private initView():void{
		var bgImage:egret.Bitmap;
		bgImage = ResourceUtils.createBitmapByName("finalscore_panel_png");
		this.addChild(bgImage);
	}
}