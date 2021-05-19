const select = s => document.querySelector(s);
const selectAll = s => document.querySelectorAll(s);

const heart = selectAll('#heart polygon');
const container = selectAll('#container polygon');
const blurFilter = select('#gBlur');
let together = false;

document.addEventListener('click', handleEvents);
// document.addEventListener('touchstart', handleEvents);

TweenMax.set([heart, container], { transformOrigin: 'center' });

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function disperse() {
  heart.forEach(poly => {
    TweenMax.to(poly, 1, {
      x: randomBetween(-3000, 3000),
      y: randomBetween(-3000, 3000),
      rotation: randomBetween(0, 360),
      scale: randomBetween(15, 20) / 10,
      ease: Power2.easeOut });

  });

  container.forEach(poly => {
    TweenMax.to(poly, 1, {
      x: randomBetween(-3000, 3000),
      y: randomBetween(-3000, 3000),
      rotation: randomBetween(0, 360),
      scale: randomBetween(10, 15) / 10,
      ease: Power2.easeOut });

  });

  TweenMax.to(blurFilter, 1, {
    attr: {
      stdDeviation: 12 },

    ease: Power2.easeOut });


  TweenMax.to('#text', 1, {
    autoAlpha: 1 });

}

function updateLoveText() {
    $.ajax({
        url:"/wangqingqing/updatelovetext",
        type:"post",
        data:"",
        success:function (res) {
            // 这里怎么和页面相结合
            var x=document.getElementById("lovetext");
            x.firstChild.nodeValue=res
        },
        error:function () {
           //出错执行什么函数
        },
        dataType:"text"
    });
}

function putTogether() {
  TweenMax.staggerTo([heart, container], 1, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    ease: Back.easeOut.config(0.8) },
  0.1, '-=0.5');


  TweenMax.to(blurFilter, 1, {
    attr: {
      stdDeviation: 0 },

    ease: Back.easeOut });


  TweenMax.to('#text', 1, {
    autoAlpha: 0,
    delay: 0.5 });

}

function handleEvents() {
  if (together) {
    putTogether();
    // updateLoveText()
  } else {
      disperse();
      updateLoveText()
  }
  together = !together;
}


// 让一开始爱心是闭合的
// disperse();