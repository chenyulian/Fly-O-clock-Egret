/*
	封装一些与利用资源相关的方法
*/ 
class ResourceUtils {
	//根据名称查询获取bitmap资源
	public static createBitmapByName(name:string):egret.Bitmap{
		var bitmapWithName:egret.Bitmap = new egret.Bitmap();
		var texture:egret.Texture = RES.getRes(name);
		bitmapWithName.texture = texture;
		return bitmapWithName;
	}
}