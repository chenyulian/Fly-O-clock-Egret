class GameStartBtn extends egret.Sprite{
	//public _gameStartBtn:GameStartBtn;
	private bgImage:egret.Bitmap;
	private btnSprite:egret.Sprite;
	private btnTween:egret.Tween;
	//用来控制按钮被点击时的形变
	private noScaleX:number;
	private noScaleY:number;
	private onClick:Function;

	public constructor(BgImgName:string) {
		super();
		//_gameStartBtn = this;
		this.btnSprite = new egret.Sprite();
		this.addChild(this.btnSprite);
		this.bgImage = ResourceUtils.createBitmapByName(BgImgName);
		this.btnSprite.addChild(this.bgImage);
		this.noScaleX = this.btnSprite.x;
		this.noScaleY = this.btnSprite.y;
	}
}