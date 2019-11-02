import './style.scss'
// https://github.com/parcel-bundler/parcel/issues/1668
import images from './images/*.jpg'
console.log('HelloWorld!')

var img = document.getElementById('view')
var index = 1
var add = 1

setInterval(() => {
  index += add
  if (index > 131) {
    add = add * -1
  }
  if (index < 0) {
    add = add * -1
    index = 1
  }
  var j = ('' + index).padStart(4, '0')
  // img.src = images[j]
  // console.log(j)
  draw(images[j])
}, 90)

function draw(imgSrc) {
  var context = canvas2.getContext('2d')
  var img = new Image()

  img.onload = function() {
    canvas2.width = img.width
    canvas2.height = img.height

    context.drawImage(img, 0, 0)
  }

  img.src = imgSrc
}

var canvas2 = document.getElementById('02-head-bob-turn')

var appleAirPodsPro = {
  init() {
    this.initData()
    this.handleResize()
    this.bindEvents()
  },

  initData() {
    this.canvas2 = document.getElementById('02-head-bob-turn')
  },

  bindEvents() {
    window.onresize = this.handleResize
    window.scroll = this.handleScroll
  },

  handleScroll() {
    console.log(111);
    
  },

  handleResize() {
    const wScale = window.innerWidth / (canvas2.width || 1458)
    const hScale = (window.innerHeight - 52) / (canvas2.height || 1458)

    canvas2.style.transform = `matrix(${wScale}, 0, 0, ${hScale}, 0, 0)`
    // canvas2.style.cssText = `transform:matrix(1.18171, 0, 0, 1.18171, 0, 0);opacity: 1;`
  },

  drawCanvas(imgSrc) {
    var context = canvas2.getContext('2d')
    var img = new Image()

    img.onload = function() {
      canvas2.width = img.width
      canvas2.height = img.height

      context.drawImage(img, 0, 0)
    }

    img.src = imgSrc
  },
}

appleAirPodsPro.init()
