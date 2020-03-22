/*
 * @Description: userMedia helpper
 * @Author: Flcwl
 * @Date: 2020-03-22 15:18:42
 * @LastEditTime: 2020-03-22 15:42:05
 * @LastEditors: Flcwl
 */
function userMedia() {
  return navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia || null;
}

export const getUserVideo = (options = {video: true}) =>  userMedia() ? navigator.mediaDevices.getUserMedia(options) : Promise.reject('getUserMedia api is not support by your browser.')
