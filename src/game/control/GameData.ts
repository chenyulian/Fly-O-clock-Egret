class GameData {
	public curScore:number;
	public bestScore:number;
	
	public constructor() {
		this.curScore = 0;
		this.bestScore = 0;
	}

	public setCurScore(score:number):void{
		this.curScore = score;
	}
	public setBestScore(score:number):void{
		this.bestScore = score;
	}
}