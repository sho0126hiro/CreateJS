window.addEventListener("load", main);
async function main() {
    // ステージを作成
    let stage = new createjs.StageGL("myCanvas");
    stage.setClearColor('#FFFFFF');
    //window.addEventListener("resize", handleResize);
    // -- Contents --
    let shape = createCircle(0,0,80,"DarkRed");
    let shape2 = createCircle(0,0,80,"blue");
    let img = new Image();
    img.src = "./img/rect.png";
    let img_size = await getImageSize(img);
    let bmp   = createBackgroundBitmap("./img/rect.png",stage,img_size);
    stage.addChild(bmp);
    stage.addChild(shape);
    stage.addChild(shape2);
    handleResize();
    
    // リサイズ処理
    function handleResize(event) {
        
        // stageの大きさを画面幅・高さに合わせる
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        //背景画像の大きさ調整・位置をcanvasの上下中央,左右中央に合わせる
        bmp.scaleX = stage.canvas.width / img_size[0];
        bmp.scaleY = stage.canvas.width / img_size[0];
        bmp.x = (stage.canvas.width - img_size[0]*bmp.scaleX)/2;
        bmp.y = (stage.canvas.height - img_size[1]*bmp.scaleY)/2;
        // viewportの設定を更新する
        stage.updateViewport(stage.canvas.width,stage.canvas.height);
        stage.update();
    }
    // 画面更新処理
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick",function(){
        // 高速に移動する
        shape.x += 10;
        shape.y += 5;
        // 画面端を超えたら反対側に移動する
        if (shape.x > stage.canvas.width) shape.x = 0;
        if (shape.y > stage.canvas.height) shape.y = 0;
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

/**
 * 画像サイズを返す
 * @param {obj} image image class obj.
 * @return {Array} size[0]=width size[1]=height   
 */
function getImageSize(image){
    return new Promise(function(resolve,reject){
      image.onload = function(){
        let size =[this.width,this.height];
        resolve(size);
      }
    });
}

/**
 * 画像をBitmap変換し、スケールを調整したものを返す
 * 画面サイズと同じ横幅に画像サイズを合わせるときに使用する
 * @param {String} url path 
 * @param {Array}  size 画像サイズ
 * @return {obj}   bmp bitmap画像
 */
function createBackgroundBitmap(url,stage,size){
    let bmp = new createjs.Bitmap(url);
    // canavsのサイズがcat.jpgの横幅と一致するようにscaleを求める
    let scale = stage.canvas.width / size[0];
    bmp.scaleX = scale;
    bmp.scaleY = scale;
    bmp.x = 0;
    bmp.y = 0;
    return bmp;
}