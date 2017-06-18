var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
        this.curScore = 0;
        this.bestScore = 0;
    }
    GameData.prototype.setCurScore = function (score) {
        this.curScore = score;
    };
    GameData.prototype.setBestScore = function (score) {
        this.bestScore = score;
    };
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map