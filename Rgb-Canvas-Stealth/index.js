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
    const newImageData = this.context.createImageData(imageData) // 0 填充
    
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const alpha = imageData.data[i + 3];

      newImageData.data[i] = r
      newImageData.data[i + 1] = g
      newImageData.data[i + 2] = b

      const isGreenMainColor = g > r && g > b
      newImageData.data[i + 3] = isGreenMainColor ? 0 : alpha

      // const betterGreenMainColor = g > 100 && isGreenMainColor
      // const DIFF_COLOR = 5
      // const betterGreenMainColor = g - r > DIFF_COLOR && g - b > DIFF_COLOR && g > 100
      // newImageData.data[i + 3] = betterGreenMainColor ? 0 : alpha
    }
    return newImageData
  }
};

StealthDemo.run();
