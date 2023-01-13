/*
 * @Author: guoming1.huang
 * @Date: 2023-01-12 17:39:09
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2023-01-13 16:22:25
 * @FilePath: /shrinkpng/src/workers/shrink.worker.ts
 * @Description:
 *
 * Copyright (c) 2023 by tumax_guoming.huang, All Rights Reserved.
 */
import { convertQualityToBit } from "../utils/image";
import UPNG from "../utils/UPNG.js";

self.addEventListener(
  "message",
  function (e) {
    const { imgSize, imageData, quality } = e.data;
    const bit = convertQualityToBit(quality);
    const png = UPNG.encode(
      [imageData.buffer],
      imgSize.width,
      imgSize.height,
      bit
    );
    postMessage(png);
  },
  false
);
