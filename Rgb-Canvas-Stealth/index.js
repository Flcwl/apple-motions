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
  },
};

StealthDemo.run();
