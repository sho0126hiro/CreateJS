// 読み込みが終わってから初期化
window.addEventListener("load", init);
function init() {
    // ステージを作成
    let stage = new createjs.StageGL("myCanvas");
    stage.setClearColor('#FFFFFF');
    window.addEventListener("resize", handleResize);
    handleResize(); // 起動時にもリサイズしておく
    // -- Contents --
    let shape = createCircle(0,0,80,"DarkRed");
    stage.addChild(shape);
    // リサイズ処理
    function handleResize(event) {
        // Canvas要素の大きさを画面幅・高さに合わせる
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        // viewportの設定を更新する
        stage.updateViewport(stage.canvas.width,stage.canvas.height);
        stage.update();
    }
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick",function(){
        // 高速に移動する
        shape.x += 10;
        shape.y += 5;
        // 画面端を超えたら反対側に移動する
        if (shape.x > stage.canvas.width) shape.x = 0;
        if (shape.y > stage.canvas.height) shape.y = 0;
        // 画面更新
        stage.update();
    });
}
/**
 * (x,y)を中心とする半径radiusの[color]色の円を返す
 * @param {int}    x , y , radius
 * @param {String} color 
 * @return {obj}   circle
 */

 function createCircle(x,y,radius,color){
    let circle = new createjs.Shape();
    circle.graphics.beginFill(color);
    circle.graphics.drawCircle(0,0,radius);
    circle.x = x;
    circle.y = y;
    circle.cache(-radius,-radius,radius*2,radius*2);
    return circle;
}