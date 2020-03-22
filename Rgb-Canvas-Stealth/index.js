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
    this.context = this.canvas.getContext('2d');
    this.width = this.video.videoWidth
    this.height = this.video.videoHeight
  },

  initVideoRecord() {
    // 1.1. take media input
    // support promise
    getUserVideo().then((stream) => {
      // 1.3 put into video tag
      this.video.srcObject = stream
    }).catch((err) => {
      console.debug(err)
    })
  },

  bindEvents() {
    this.video.onplay = () => this.timedTask()
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
    
    // 灰度化
    // https://baike.baidu.com/item/%E7%81%B0%E5%BA%A6%E5%8C%96
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const alpha = imageData.data[i + 3];

      const mean = (r + g + b) / 3

      newImageData.data[i + 2] = newImageData.data[i + 1] = newImageData.data[i] = mean
      newImageData.data[i + 3] = alpha
    }
    return newImageData
  }
};

StealthDemo.run();
