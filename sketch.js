var face_colors = "ff7b00-ff8800-ff9500-ffa200-ffaa00-ffb700-ffc300-ffd000-ffdd00-ffea00".split("-").map(a => "#" + a)
var eye_colors = "f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529".split("-").map(a => "#" + a)
var pos_x = []
var pos_y = []
var sizes = []
var colors = []
var v_y = []
var v_x = []
var txts
var face_move_var = false
//語音辨識初始設定
var lang = navigator.language
var myRec = new p5.SpeechRec(lang)
var face_Rot_var = false

var sound1
function preload() {
  sound1 = loadSound("K-391 & Alan Walker - Ignite (feat. Julie Bergan & Seungri).mp3") //先把音樂檔載入到sound1程式碼中
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  //文字框設定
  inputElement = createInput("喵")//產生一個文字方塊
  inputElement.position(10, 10)//把文字方塊放到(10，10)
  inputElement.size(140, 20)//文字框的寬高
  //google:html,style,css找相關資料
  inputElement.style("font-size", "20px")//文字框內文字大小
  inputElement.style("color", "#5a189a")//文字框內文字顏色
  inputElement.style("background", "#f3d5b5")//文字框的背景顏色
  inputElement.style("border", "none")//設定文字框沒有框線
  //"移動"按鈕的設定
  btnMoveElement = createButton("移動")//產生一個移動按鈕
  btnMoveElement.position(170, 10)//按鈕的位置
  btnMoveElement.size(80, 40)//按鈕寬高
  btnMoveElement.style("font-size", "20px")//按鈕內文字大小
  btnMoveElement.style("color", "#5a189a")//按鈕文字顏色
  btnMoveElement.style("background", "#f3d5b5")//按鈕背景顏色
  btnMoveElement.mousePressed(face_move)//按下執行face_move函數
  //"暫停"按鈕的設定
  btnStopElement = createButton("暫停")//產生一個暫停按鈕
  btnStopElement.position(270, 10)
  btnStopElement.size(80, 40)
  btnStopElement.style("font-size", "20px")
  btnStopElement.style("color", "#5a189a")
  btnStopElement.style("background", "#f3d5b5")
  btnStopElement.mousePressed(face_stop)//按下執行face_stop函數


  btnVoiceElement = createButton("語音")//產生一個暫停按鈕
  btnVoiceElement.position(600, 10)
  btnVoiceElement.size(80, 40)
  btnVoiceElement.style("font-size", "20px")
  btnVoiceElement.style("color", "#5a189a")
  btnVoiceElement.style("background", "#f3d5b5")
  btnVoiceElement.mousePressed(voice_go)//按下執行face_stop函數


  radioElement = createRadio()
  radioElement.option("暫停")
  radioElement.option("旋轉")
  radioElement.option("移動")

  radioElement.position(370, 10)
  radioElement.size(200, 40)
  radioElement.style("font-size", "20px")
  radioElement.style("color", "#5a189a")
  radioElement.style("background-color", "#f3d5b5")

  music_btn = createButton("音樂")
  music_btn.position(700, 10)
  music_btn.size(80, 40)
  music_btn.style("background","#f3d5b5")
  music_btn.style("font-size", "20px")
  music_btn.style("color", "#5a189a");
  music_btn.mousePressed(music_btn_pressed)

  //for(var i=0;i<20;i=i+1){
  //drawface(face_colors[int(random(face_colors.length))],eye_colors[int(random(eye_colors.length))])
}
//}
function music_btn_pressed() {
  song.stop()
  song.play()
  songIsplay = true
  mouseIsplay = falseamp = new p5.Amplitude()
}






// for(var i=0;i<10;i=i+1){
//  drawface(face_colors[int(random(face_colors.length))],eye_colors[int(random(eye_colors.length))],random(0.3,1.2))
// }





function draw() {
  background("#90a955");
  mode = radioElement.value()
  for (var i = 0; i < pos_x.length; i = i + 1) {
    push()
    txts = inputElement.value();
    translate(pos_x[i], pos_y[i])
    if (mode == "旋轉") {
      rotate(sin(frameCount / 20))




    }
    else {
      if (mode == "移動") {
        face_move_var = false
      }


    }
    drawface(colors[i], 0, sizes[i])
    pop()
    if (face_move_var || mode == "移動") {
      pos_y[i] = pos_y[i] + v_y[i]
    }
    if (pos_y[i] > height || pos_y[i] < 0) {
      pos_x.splice(i, 1)
      pos_y.splice(i, 1)
      sizes.splice(i, 1)
      colors.splice(i, 1)
      v_y.splice(i, 1)
    }
  }
}



function drawface(face_clr = 255, eye_clr = 0, size = 1) {
  push()//自行定義格式
  //translate(random(width),random(height))//原點(0,0)移動到
  scale(size)//宣告放大縮小的比例尺
  //文字框顯示格式
  fill(0)//設定文字顏色
  textSize(50)//文字大小
  text(txts, 50, 250)//顯示文字，文字內容為txts，放在位置座標為(50,200)


  fill(face_clr)
  //臉
  ellipse(200, 200, 200, 200);
  //眼睛
  fill(255)
  ellipse(160, 160, 60, 60);
  ellipse(240, 160, 60, 60);
  //眼珠
  fill(eye_clr)
  ellipse(160, 160, 40, 40);
  ellipse(240, 160, 40, 40);
  //鼻子
  fill("#ff70a6")
  triangle(200, 190, 190, 210, 210, 210);

  //嘴巴
  fill("#d90429");
  arc(200, 220, 100, 50, 0, PI);
  //左耳朵
  fill(255, 204, 153);
  triangle(140, 120, 150, 50, 180, 100);

  //右耳朵
  fill(255, 204, 153);
  triangle(260, 120, 250, 50, 220, 100);

  //鬍鬚
  stroke(0);
  strokeWeight(2);

  //左邊鬍鬚
  line(160, 200, 120, 180);
  line(160, 200, 120, 200);
  line(160, 200, 120, 220);

  // 右邊鬍鬚
  line(240, 200, 280, 180);
  line(240, 200, 280, 200);
  line(240, 200, 280, 220);
  pop()

  pop()//把原本設定格式取消
}




function mousePressed() {
  if (mouseY > 60) {
    pos_x.push(mouseX)
    pos_y.push(mouseY)
    sizes.push(random(0.3, 1))
    colors.push(face_colors[int(random(face_colors.length))])
    v_y.push(-1, 1)
    v_x.push(-1, 1)
    print(pos_x)

  }
}
function face_move() {
  face_move_var = true

}
function face_stop() {
  face_move_var = false

}
function voice_go() {

  myRec.onResult = showResult
  myRec.start()
}

function showResult() {

  if (myRec.resultValue == true) {
    print(myRec.resultString)
    if (myRec.resultString == indexOf("走") !== -1) {
      face_move_var = true
    }
    if (myRec.resultString == indexOf("停") !== -1) {
      face_move_var = false
    }
    if (myRec.resultString == indexOf("轉") !== -1) {
      face_Rot_var = true
    }
  }
}

function music_btn_pressed() {
  if (sound1.isPlaying()) {
    sound1.stop();
  }
  else {
    sound1.play();

  }
}
