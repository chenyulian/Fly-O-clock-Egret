class GamePauseView extends egret.Sprite{
	public constructor(displayObjectContainer:egret.DisplayObjectContainer) {
		super();
		this.graphics.beginFill(0x000000, 0.5);
		this.graphics.drawRect(0, 0, displayObjectContainer.stage.stageWidth, displayObjectContainer.stage.stageHeight);
		this.graphics.endFill;
	}
}