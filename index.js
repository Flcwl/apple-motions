/*
 * @Description: apple AirPods Pro Animation Imitation
 * @Author: Flcwl
 * @Date: 2019-11-02 14:56:38
 * @LastEditTime: 2019-11-03 11:51:23
 * @LastEditors: Flcwl
 */

import './style.scss';
// https://github.com/parcel-bundler/parcel/issues/1668
import images from './images/*.jpg';

console.log('Hello AirPods-Pro!');

var appleAirPodsPro = {
  init() {
    this.initData();
    this.initImages();
    this.handleResize();
    this.bindEvents();
  },

  initData() {
    this.canvas2 = document.getElementById('02-head-bob-turn');
    this.context = this.canvas2.getContext('2d');
    this.MAX_LEN = Object.keys(images).length || 0;
    this.imgs = [];
    this.start = 1;
    this.oldStart = -1;
    this.addN = 1;
    this.interval = 20; // 控制刷新率
    this.leftY = 0;
    this.curScrollY = this.getScrollTop();
    this.startPos = this.curScrollY;
    this.lastPos = this.curScrollY;
    this.isStop = false;
  },

  initImages() {
    for (let i = 0; i < this.MAX_LEN; i++) {
      const img = new Image();
      // img.onload = () => this.imgs[i] = img
      img.src = this.getImage(i);
      // 不管加载否 保证顺序
      this.imgs.push(img);
    }
  },

  bindEvents() {
    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('scroll', () => this.handleScroll());
  },

  getScrollTop() {
    return window.scrollY || 0;
  },

  getImage(num) {
    console.assert(Number.isInteger(num) && num > -1 && num < this.MAX_LEN);
    return images[('' + num).padStart(4, '0')];
  },

  isOver() {
    return this.start < 0 || this.start > this.MAX_LEN - 1;
  },

  handleScroll() {
    const scrollY = this.getScrollTop();
    let delta = scrollY - this.curScrollY;
    const isDown = delta > 0;

    delta = Math.abs(delta) + this.leftY;
    this.curScrollY = scrollY;

    if (
      this.isStop &&
      isDown === this.needDown &&
      ((isDown && this.curScrollY > this.lastPos) || (!isDown && this.curScrollY < this.lastPos))
    ) {
      this.isStop = false;
    }
    if (this.isStop) return;

    // good idea: 补偿
    const alpha = Math.floor(delta / this.interval) * this.addN || 0;
    this.leftY = delta % this.interval;

    isDown ? (this.start += alpha) : (this.start -= alpha);
    if (this.isOver() && !this.isStop) {
      // this.lastPos = scrollY
      this.isStop = true;
      console.log(this.start, scrollY, this.lastPos);

      // TODO: 多个 canvas 用 opacity 切换
      // this.canvas2.style.cssText = `opacity: 0;`
    }

    if (this.start < 0) this.start = 0;
    if (this.start > this.MAX_LEN - 1) this.start = this.MAX_LEN - 1;
    if (this.startPos >= scrollY) this.start = 0;
    if (this.oldStart === this.start) return;
    this.oldStart = this.start;
    // good idea：记录
    this.lastPos = scrollY;
    this.needDown = !isDown;

    this.drawCanvas(this.start);
  },

  handleResize() {
    const wScale = window.innerWidth / (this.canvas2.width || 1458);
    const hScale = (window.innerHeight - 52) / (this.canvas2.height || 1458);

    this.canvas2.style.transform = `matrix(${wScale}, 0, 0, ${hScale}, 0, 0)`;
  },

  drawCanvas(sequence) {
    // 当前序列帧
    const imgTemp = this.imgs[sequence];
    const canvas = this.canvas2;

    canvas.width = imgTemp.width;
    canvas.height = imgTemp.height;

    this.context.drawImage(imgTemp, 0, 0);

    // const t = sequence / this.MAX_LEN
    // const wScale = window.innerWidth / (this.canvas2.width || 1458);
    // const hScale = (window.innerHeight - 52) / (this.canvas2.height || 1458);

    // this.canvas2.style.transform = `matrix(${1 + t * (wScale - 1)}, 0, 0, ${1 + t * (hScale - 1)}, 0, 0)`;
  },
};

appleAirPodsPro.init();
