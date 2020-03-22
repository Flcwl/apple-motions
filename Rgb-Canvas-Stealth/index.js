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
    this.context.drawImage(video, 0, 0, videoWidth, videoHeight);
  },

  timedTask() {
    if (this.video.paused) return

    this.drawCanvas()

    setTimeout(() => {
      this.timedTask()
    }, 30);
  }
};

StealthDemo.run();
