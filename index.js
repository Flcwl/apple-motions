import './style.scss'

function render () {}

  var img = document.getElementById('view');
  var index = 1;
  var add  = 1;

  // setInterval(function(){
  index += add;
  if (index > 131) {
    add = add * -1;
  }
  if (index < 0) {
    add = add * -1;
    index = 1;
  }
  var  j = ("" + index).padStart(4, '0');
  img.src = `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/${j}.jpg`;
  console.log(j);
  // }, 30);
window.onload = function () {

}
