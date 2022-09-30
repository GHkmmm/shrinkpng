/*
 * @Author: guoming1.huang
 * @Date: 2022-05-20 09:03:20
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-07-27 18:24:36
 * @FilePath: /shrinkpng/src/shrink.ts
 * @Description:
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
import { IShrinkOptions } from "./types/index";
import { loadImage } from "./utils/image";
import UPNG from "./utils/UPNG.js";

var MAX_HEIGHT = 20000;

class Shrink {
  file: any = null;
  options: IShrinkOptions = {
    quality: 80,
    success: () => {},
    error: () => {},
  };

  constructor(file: File, options: IShrinkOptions) {
    this.initParams(file, options);
    this.shrinkImage();
  }

  initParams(file: File, options: IShrinkOptions) {
    this.file = file;
    this.options = {
      ...this.options,
      ...options,
    };
  }

  async shrinkImage() {
    const file = this.file;
    try {
      const imageUrl = await loadImage(file);
      const _file = await this.getImageData(imageUrl, file);
      this.options.success(_file);
      console.log(
        `compress image size from ${file.size / 1024}kb to ${
          _file.size / 1024
        }kb`
      );
    } catch (error) {
      this.options.error(error);
    }
  }

  getImageData(imageUrl: string, originFile: File): Promise<File> {
    return new Promise((resolve, reject) => {
      // 创建一个 Image 对象
      var image = new Image();
      // 绑定 load 事件处理器，加载完成后执行
      image.onload = () => {
        // 获取 canvas DOM 对象
        const canvas = document.createElement("canvas");
        // 如果高度超标
        if (image.height > MAX_HEIGHT) {
          // 宽度等比例缩放 *=
          image.width *= MAX_HEIGHT / image.height;
          image.height = MAX_HEIGHT;
        }
        // 获取 canvas的 2d 环境对象,
        // 可以理解Context是管理员，canvas是房子
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return originFile;
        }
        // canvas清屏
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 重置canvas宽高
        canvas.width = image.width;
        canvas.height = image.height;
        // 将图像绘制到canvas上
        ctx.drawImage(image, 0, 0, image.width, image.height);
        if (["image/jpeg", "image/jpg"].includes(originFile.type)) {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(
                  new File([blob], originFile.name, {
                    type: originFile.type,
                  })
                );
              } else {
                reject("compress error");
              }
            },
            originFile.type,
            this.options.quality / 100
          );
        } else {
          // !!! 注意，image 没有加入到 dom之中
          var dta = ctx.getImageData(0, 0, image.width, image.height).data;

          var png = UPNG.encode(
            [dta.buffer],
            image.width,
            image.height,
            this.getCompressBit()
          );
          resolve(
            new File([png], originFile.name, {
              type: originFile.type,
            })
          );
        }
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
    return bit;
  }
}

export default Shrink;
