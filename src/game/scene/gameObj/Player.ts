class Player extends egret.Sprite{
	private playerSprite:egret.Sprite;
	private playerBitmap:egret.Bitmap;

	public constructor(playerImgName:string) {
		super();
		this.playerSprite = new egret.Sprite();
		this.addChild(this.playerSprite);
		this.playerBitmap = ResourceUtils.createBitmapByName(playerImgName);
		this.playerSprite.addChild(this.playerBitmap);
	}
}