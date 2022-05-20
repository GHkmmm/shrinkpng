/*
 * @Author: guoming1.huang
 * @Date: 2022-05-20 09:03:20
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-05-20 13:53:28
 * @FilePath: /shrinkjs/src/compress.js
 * @Description:
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
import "./js/poko.js";
import UPNG from "./js/UPNG.js";

var MAX_HEIGHT = 20000;

class Compress {
  options = {
    quality: 80,
  };

  constructor(file, options) {
    this.options = {
      ...this.options,
      ...options,
    };
    this.compressImage(file);
  }

  async compressImage(file) {
    const imageUrl = await this.loadImage(file);
    const _file = await this.getImageData(imageUrl);
    console.log("_file", _file);
    console.log(
      `compress image size from ${file.size / 1024}kb to ${_file.size / 1024}kb`
    );
  }

  getImageData(imageUrl) {
    return new Promise((resolve) => {
      // 创建一个 Image 对象
      var image = new Image();
      // 绑定 load 事件处理器，加载完成后执行
      image.onload = () => {
        // 获取 canvas DOM 对象
        var canvas = document.createElement("canvas");
        // 如果高度超标
        if (image.height > MAX_HEIGHT) {
          // 宽度等比例缩放 *=
          image.width *= MAX_HEIGHT / image.height;
          image.height = MAX_HEIGHT;
        }
        // 获取 canvas的 2d 环境对象,
        // 可以理解Context是管理员，canvas是房子
        var ctx = canvas.getContext("2d");
        // canvas清屏
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 重置canvas宽高
        canvas.width = image.width;
        canvas.height = image.height;
        // 将图像绘制到canvas上
        ctx.drawImage(image, 0, 0, image.width, image.height);
        // !!! 注意，image 没有加入到 dom之中
        var dta = ctx.getImageData(0, 0, image.width, image.height).data;

        var png = UPNG.encode(
          [dta.buffer],
          image.width,
          image.height,
          this.getCompressBit()
        );
        resolve(new File([png], "filename"));
      };
      // 设置src属性，浏览器会自动加载。
      // 记住必须先绑定事件，才能设置src属性，否则会出同步问题。
      image.src = imageUrl;
    });
  }

  getCompressBit() {
    let bit = 0;
    const quality = this.options.quality;
    if (quality > 100 || quality < 0) {
      bit = 0;
    } else {
      bit = !quality ? 0 : quality * 256 * 0.01;
    }
    console.log("bit is", bit);
    return bit;
  }

  loadImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadstart = function () {
        console.log("文件上传处理......");
      };
      //操作完成
      reader.onload = function (e) {
        resolve(reader.result);
      };
      reader.onerror = function (e) {
        reject(e);
      };
      reader.readAsDataURL(file);
    });
  }
}

export default Compress;
