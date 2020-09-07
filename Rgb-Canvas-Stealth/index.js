import './style.scss';
import { getUserVideo } from './helpper';

console.log('Hello Stealth!');

var StealthDemo = {
  run() {
    this.initData();
    this.initVideoRecord();
    this.bindEvents();
  },

  initData() {
    this.video = document.getElementById('recording-video');
    this.canvas = document.getElementById('transform-canvas');
    this.button = document.getElementById('switch-btn');

    this.context = this.canvas.getContext('2d');
    this.width = this.video.videoWidth;
    this.height = this.video.videoHeight;
  },

  initVideoRecord() {
    // 1.1. take media input
    getUserVideo()
      .then((stream) => {
        // 1.3 put into video tag
        this.video.srcObject = stream;
      })
      .catch((err) => {
        console.debug(err);
      });
  },

  bindEvents() {
    this.button.onclick = () => this.timedTask();
  },

  timedTask() {
    if (this.video.paused) return;

    this.drawCanvas();
    // 2.3 timer callback
    setTimeout(() => {
      this.timedTask();
    }, 17);
  },

  // 2.2 draw function
  drawCanvas() {
    const { video, canvas } = this;
    const { videoWidth, videoHeight } = video;

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    this.width = videoWidth;
    this.height = videoHeight;

    this.context.drawImage(video, 0, 0, videoWidth, videoHeight);

    this.processAndDrawCanvasImage();
  },

  processAndDrawCanvasImage() {
    // 3.1 get pixel data
    const imageData = this.context.getImageData(0, 0, this.width, this.height);
    // 3.2 process image data
    const newImageData = this.processImageData(imageData);
    // 3.3 put image data
    this.context.putImageData(newImageData, 0, 0);
  },

  processImageData(imageData) {
    const len = imageData.data.length >> 2;

    // 遍历
    for (let i = 0; i < len; i++) {
      const base = i << 2;
      const r = imageData.data[base + 0];
      const g = imageData.data[base + 1];
      const b = imageData.data[base + 2];
      
      const DIFF_VAL = 3
      const isGreenMainColor = g - r > DIFF_VAL  && g - b > DIFF_VAL;
      const betterGreenMainColor = isGreenMainColor && g > 55;

      if (betterGreenMainColor) {
        // if (isGreenMainColor) {
        imageData.data[base + 3] = 0;
      }
    }

    return imageData;
  },
};

StealthDemo.run();
