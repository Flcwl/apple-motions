import './style.scss';
import { getUserVideo } from './helpper';

console.log('Hello Stealth!');

var StealthDemo = {
  run() {
    this.initData();
    this.initVideoRecord();
  },

  initData() {
    this.video = document.getElementById('recording-video');
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
};

StealthDemo.run();
