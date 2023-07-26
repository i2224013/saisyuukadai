float []objX = new float [20];  //オブジェクトのx座標
float []objY = new float [20];  //オブジェクトのy座標
float []disX = new float [20];  //ｘ座標のmouseとオブジェクトの距離
float []disY = new float [20];  //ｙ座標のmouseとオブジェクトの距離
float []r = new float [20];
float []g = new float [20];
float delay;

float x, y;             //x,y座標
float ex;               //座標計算
float A=2.0;            //螺旋ふり幅
float A1, A2, A3;       //トロコイドふり幅
float w1, w2;           //角周派数
float R;                //回転半径
float k;                //回転率
float t;                //経過時間
float speed1, speed2;   //スピード
int c;

void setup() {
  size(750, 400);
  background(0);
  noStroke();
  delay=20.0;
  A1=5.0;
  A2=0.5;
  A3=1.0;
  w2=w1=1.0;
  k=0.05;
  t=0.0;
  speed1=0.05;
  speed2=0.18;
  c=255;
}

/*
ランダム生成で偏らないため
 枠内を4分割
 左上(50,50)(200,200)、右上(200,50)(350,200)、左下(50,200)(200,350)、右下(200,200)(350,350)
 */

void draw() {
  //---------------左枠-----------------------------------------------------------------------------
  fill(0);
  rect(50, 50, 300, 300);

  for (int i=0; i<20; i++) {
    //マウス座標とオブジェクトの距離の計算
    disX[i] = mouseX - objX[i];
    disY[i] = mouseY - objY[i];

    //オブジェクトの移動量の計算
    objX[i] = objX[i] + disX[i]/delay;
    objY[i] = objY[i] + disY[i]/delay;

    //オブジェクトがマウス座標の+-2、左枠の上下左右に出たら
    if ((objX[i]<=mouseX+2 && mouseX-2<=objX[i] && objY[i]<=mouseY+2 && mouseY-2<=objY[i]) || 50>=objX[i] || 350<=objX[i] || 50>objY[i] || objY[i]>350) {
      if (i<=4) {                      //番号0～4の場合
        r[i]=random(100, 200);         //色を決める
        g[i]=random(100, 200);
        objX[i] = random(50, 200);     //枠内左上から生成
        objY[i] = random(50, 200);
      } else if (i>=5 && i<=9) {       //番号5～9の場合
        r[i]=random(100, 200);
        g[i]=random(100, 200);
        objX[i] = random(200, 350);    //枠内右上から生成
        objY[i] = random(50, 200);
      } else if (i>=10 && i<=14) {     //番号10～14
        r[i]=random(100, 200);
        g[i]=random(100, 200);
        objX[i] = random(50, 200);     //枠内左下から生成
        objY[i] = random(200, 350);
      } else if (i>=15) {              //番号15～19の場合
        r[i]=random(100, 200);
        g[i]=random(100, 200);
        objX[i] = random(200, 350);    //枠内右下から生成
        objY[i] = random(200, 350);
      }
    } else {
      fill(r[i], g[i], 0);
      ellipse(objX[i], objY[i], 10, 10);
    }
  }

  //-------------------------------------------------------------------------------------------------
  //------------右枠---------------------------------------------------------------------------------

  R=A*exp(k*t);    //半径

  //外トロコイド
  x = (A1 + A2)*cos(w1*t) - A3*cos(((A1 + A2)/A2)*t);
  y = (A1 + A2)*sin(w2*t) - A3*sin(((A1 + A2)/A2)*t);

  //ｘ座標の計算
  ex =x*R+550;

  //図形1（暖色）
  fill(255, c, random(255));
  ellipse(ex, y*R+height/2, 5, 5);

  //図形2（白）
  fill(255, random(50, 200));
  ellipse(ex*1.01, y*R+height/2*1.01, 5, 5);

  if (ex<370) {
    //x座標が370以下で初期化（背景以外）、色変え
    ex=0;
    R=0;
    x=y=0;
    t=0;
    c= int (random(255));
  }

  if (400<=mouseX && mouseX<=700 && 50<=mouseY && mouseY<=350) {
    t+=speed2;  //時間を進める、枠上だと早くなる
  } else {
    t+=speed1;  //時間を進める
  }
  //-----------------------------------------------------------------------------------------------
  //---------外枠-------------
  fill(255);
  rect(0, 0, 750, 50);
  rect(0, 350, 750, 50);
  rect(0, 0, 50, 400);
  rect(350, 0, 50, 400);
  rect(700, 0, 50, 400);
  //----------------------------
}

void mousePressed() {
  if (400<=mouseX && mouseX<=700 && 50<=mouseY && mouseY<=350) {
    //右側四角上でクリックで初期化
    fill(0);
    rect(400, 50, 300, 300);
    ex=0;
    R=0;
    x=y=0;
    t=0;
    c= int (random(255));
  }
}