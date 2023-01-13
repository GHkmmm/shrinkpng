/*
 * @Author: guoming1.huang
 * @Date: 2022-09-28 14:16:40
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2023-01-13 16:30:18
 * @FilePath: /shrinkpng/src/shrink.ts
 * @Description:
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
import { IShrinkOptions } from "./types/index";
import { fileToDataURL, dataURLToImage, canvastoFile } from "./utils/image";
import { shrinkPngByWorker } from "./utils/worker";

class Shrink {
  options: IShrinkOptions = {
    quality: 80,
    success: () => {},
    error: () => {},
  };

  constructor(options: IShrinkOptions) {
    Object.assign(this.options, options);
  }

  async shrinkImage(file: File): Promise<File> {
    if (!file) throw new Error("file can not be null");
    if (!file.type.includes("image/")) throw new Error("file must be image");
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      const base64 = await fileToDataURL(file);
      const img = await dataURLToImage(base64);

      canvas.width = img.width;
      canvas.height = img.height;
      context.clearRect(0, 0, img.width, img.height);
      context.drawImage(img, 0, 0, img.width, img.height);

      /** jpg使用canvas压缩 其他使用UPNG算法压缩 */
      if (["image/jpeg", "image/jpg"].includes(file.type)) {
        const blob = (await canvastoFile(
          canvas,
          file.type,
          this.options.quality / 100
        )) as Blob; // quality:0.5可根据实际情况计算
        return new File([blob], file.name, {
          type: file.type,
        });
      } else {
        const imageData = context.getImageData(
          0,
          0,
          img.width,
          img.height
        ).data;
        const png = await shrinkPngByWorker({
          img,
          imageData,
          quality: this.options.quality,
        });
        return new File([png], file.name, {
          type: file.type,
        });
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default Shrink;
