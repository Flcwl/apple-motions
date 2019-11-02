#!/usr/bin/env node

const request = require('request')
const fs = require('fs')
const path = require('path')
console.log('HelloWorld!')

function clearDir(path) {
  let files = []
  let separator = '/'

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(file => {
      let curPath = path + separator + file

      if (fs.statSync(curPath).isDirectory()) {
        clearDir(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
  }
}

// https://cloud.tencent.com/developer/ask/36268
function downloadPic(src, dest) {
  request.head(
    {
      url: src,
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
      },
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        if (/image\/jpeg/.test(response.headers['content-type'])) {

          request(src)
            .pipe(fs.createWriteStream(dest))
            .on('close', function() {
              console.log(dest)
            })
        }
      }
    }
  )
}

const srcDir =
  'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large'
const type = '/02-head-bob-turn/'
// const type = '/03-flip-for-guts/'
const discDir = path.resolve(__dirname, './images/')
const imgSuffix = '.jpg'
const NMAX = 300
let j, f, s, d

clearDir('./images')

for (let i = 0; i < NMAX; i++) {
  j = ('' + i).padStart(4, '0')
  f = j + imgSuffix
  s = srcDir + type + f
  d = path.resolve(discDir, f)

  downloadPic(s, d)
}



// 爬虫、劫持、无头模拟
// function spider(url = 'https://www.apple.com/cn/airpods-pro/') {
//   request
//     .get(url, {
//       headers:
//         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
//     })
//     .on('response', function(response) {
//       console.log(response) // 200
//       // console.log(response.headers['content-type']) // 'image/png'
//     })
// }

// const url = 'https://www.apple.com/cn/airpods-pro/'

// spider(url)

// https://zhuanlan.zhihu.com/p/71183048
// (function() {
//   // 浏览器不支持，就算了！
//   if (!window.performance && !window.performance.getEntries) {
//     return false
//   }
//   var result = [] // 获取当前页面所有请求对应的PerformanceResourceTiming对象进行分析
//   window.performance.getEntries().forEach(item => {
//     result.push({
//       url: item.name,
//       entryType: item.entryType,
//       type: item.initiatorType,
//       'duration(ms)': item.duration,
//     })
//   }) // 控制台输出统计结果 c
//   console.table(result)
// })()

// http://www.ojit.com/article/931772
// const puppeteer = require('puppeteer');
// const request_client = require('request-promise-native');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   const result = [];

//   await page.setRequestInterception(true);

//   page.on('request', request => {
//     request_client({
//       uri: request.url(),
//       resolveWithFullResponse: true,
//     }).then(response => {
//       const request_url = request.url();
//       const request_headers = request.headers();
//       const request_post_data = request.postData();
//       const response_headers = response.headers;
//       const response_size = response_headers['content-length'];
//       const response_body = response.body;

//       // if (!request_url.endsWith('.jpg')) {
//       //   request.continue();
//       // }
//       result.push({
//         request_url,
//       });

//       console.log(request_url);
//     }).catch(error => {
//       // console.error(error);
//       request.abort();
//     });
//   });

//   await page.goto('https://www.apple.com/cn/airpods-pro/', {
//     waitUntil: 'networkidle0',
//   });

//   await browser.close();
// })();
// Puppeteer 捕获 网页所有请求
