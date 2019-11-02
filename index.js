/*
 * @Description: apple AirPods Pro Animation Fork
 * @Author: Flcwl
 * @Date: 2019-11-02 14:56:38
 * @LastEditTime: 2019-11-02 21:39:45
 * @LastEditors: Flcwl
 */

import './style.scss'
// https://github.com/parcel-bundler/parcel/issues/1668
import images from './images/*.jpg'

console.log('Hello AirPods-Pro!')

var appleAirPodsPro = {
  init() {
    this.initData()
    this.handleResize()
    this.bindEvents()
  },

  initData() {
    this.canvas2 = document.getElementById('02-head-bob-turn')
    this.context = this.canvas2.getContext('2d')
    this.img = new Image()

    this.start = 1
    this.addN = 1
    this.interval = 3 // 控制刷新率
    this.curScrollY = this.getScrollTop()
    this.lastPos = this.curScrollY
    this.isStop = false
    this.MAX_LEN = Object.keys(images).length || 0
  },

  bindEvents() {
    window.addEventListener('resize', () => this.handleResize())
    window.addEventListener('scroll', () => this.handleScroll())
    this.img.addEventListener('load', () => this.drawCanvas())
  },

  getScrollTop() {
    return window.scrollY || 0
  },
  getImage(num) {
    console.assert(Number.isInteger(num) && num > -1 && num < this.MAX_LEN)
    return images[('' + this.start).padStart(4, '0')]
  },

  isOver() {
    return this.start < 0 || this.start > this.MAX_LEN - 1
  },

  handleScroll() {
    const scrollY = this.getScrollTop()
    let delta = scrollY - this.curScrollY
    const isDown = delta > 0

    delta = Math.abs(delta)
    this.curScrollY = scrollY

    if (delta < this.interval) return

    isDown ? (this.start += this.addN) : (this.start -= this.addN)
    // if (this.isOver() && !this.isStop) {
    //   // this.lastPos = scrollY
    //   this.isStop = true
    //   console.log(scrollY, this.lastPos)
    // }
    // if (
    //   // this.isOver() &&
    //   this.isStop &&
    //   this.curScrollY < this.lastPos
    //   // (isDown && this.curScrollY < this.lastPos))
    // ) {
    //   this.isStop = false
    // }

    // if (this.isStop) return

    if (this.start < 0) return (this.start = 0)
    if (this.start > this.MAX_LEN - 1) return (this.start = this.MAX_LEN - 1)

    this.isStop = false
    this.lastPos = scrollY
    const img = this.getImage(this.start)
    this.triggerDraw(img)
  },

  handleResize() {
    const wScale = window.innerWidth / (this.canvas2.width || 1458)
    const hScale = (window.innerHeight - 52) / (this.canvas2.height || 1458)

    this.canvas2.style.transform = `matrix(${wScale}, 0, 0, ${hScale}, 0, 0)`
    // TODO: 多个 canvas 用 opacity 切换
    // this.canvas2.style.cssText = `transform:matrix(1.18171, 0, 0, 1.18171, 0, 0);opacity: 1;`
  },

  triggerDraw(img) {
    this.img.src = img
  },

  drawCanvas() {
    const imgTemp = this.img
    const canvas = this.canvas2

    canvas.width = imgTemp.width
    canvas.height = imgTemp.height

    this.context.drawImage(imgTemp, 0, 0)
  },
}

appleAirPodsPro.init()
