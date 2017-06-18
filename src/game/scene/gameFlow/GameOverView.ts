class GameOverView extends egret.Sprite{
	private gameOverImage:egret.Sprite;

	public curScore:number;
	public bestScore:number;
	public addedCoins:number;
	public constructor(curScore:number, bestScore:number) {
		super();
		this.graphics.beginFill(0xF08080);
		this.graphics.drawRoundRect(50, 50, 400, 500, 20, 20);
		this.graphics.endFill;
		
	}
}