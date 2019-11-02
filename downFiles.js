#!/usr/bin/env node
const request = require('request');
const fs = require('fs');
const path = require('path');
console.log('HelloWorld!');

function clearDir (path) {
  let files = [];
  let separator = '/'

  if(fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
      let curPath = path + separator + file;

      if(fs.statSync(curPath).isDirectory()) {
        clearDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
}

function downloadPic (src, dest) {
  request(src)
    .pipe(fs.createWriteStream(dest))
    .on('close', function() {
      console.log(dest);
    });
};

const srcDir =
  'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/';
const discDir = path.resolve(__dirname, './images/');
const imgSuffix = '.jpg';
const NMAX = 300;
let j, f, s, d;

clearDir('./images')

for (let i = 0; i < NMAX; i++) {
  j = ('' + i).padStart(4, '0');
  f = j + imgSuffix;
  s = srcDir + f;
  d = discDir + f;

  downloadPic(s, d);
}
