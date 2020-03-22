import './style.scss';
import { getUserVideo } from './helpper';

console.log('Hello Stealth!');

var StealthDemo = {
  run() {
    this.initData()
    this.initVideoRecord()
    this.bindEvents()
    this.timedTask()
  },

  initData() {
    this.video = document.getElementById('recording-video');
    this.canvas = document.getElementById('transform-canvas');
    this.switchBtn = document.getElementById('switch');
    
    this.context = this.canvas.getContext('2d');
    this.width = this.video.videoWidth
    this.height = this.video.videoHeight
  },

  initVideoRecord() {
    // 1.1. take media input
    getUserVideo().then((stream) => {
      // 1.3 put into video tag
      this.video.srcObject = stream
    }).catch((err) => {
      console.debug(err)
    })
  },

  bindEvents() {
    // this.video.onplay = () => this.timedTask()
    this.switchBtn.onclick = () => this.timedTask()
  },

  // 2.2 draw function
  drawCanvas() {
    const { video, canvas } = this
    const { videoWidth, videoHeight } = video

    canvas.width  = videoWidth;
    canvas.height = videoHeight;
    this.width = videoWidth
    this.height = videoHeight

    this.context.drawImage(video, 0, 0, videoWidth, videoHeight);

    const imageData = this.processImageData()
    // 3.3 put image data
    this.context.putImageData(imageData, 0, 0);
  },

  timedTask() {
    if (this.video.paused) return

    this.drawCanvas()
    // 2.3 timer callback
    setTimeout(() => {
      this.timedTask()
    }, 30);
  },

  processImageData() {
    // 3.1 get pixel data
    const imageData = this.context.getImageData(0, 0, this.width, this.height)

    // 3.2 process image data
    const len = imageData.data.length >> 2
    
    for (let i = 0; i < len; i++) {
      const base = i << 2
      const r = imageData.data[base + 0];
      const g = imageData.data[base + 1];
      const b = imageData.data[base + 2];

      // const isGreenMainColor = g > r && g > b
      // imageData.data[i + 3] = isGreenMainColor ? 0 : alpha

      const DIFF_COLOR = 3
      const isGreenMainColor = g - r > DIFF_COLOR && g - b > DIFF_COLOR
      const betterGreenMainColor = isGreenMainColor && g > 100

      if (betterGreenMainColor) {
        imageData.data[base + 3] = 0
      }
    }
    return imageData
  }
};

StealthDemo.run();
