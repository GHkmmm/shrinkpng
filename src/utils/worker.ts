/*
 * @Author: guoming1.huang
 * @Date: 2023-01-13 16:12:18
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2023-01-13 16:15:59
 * @FilePath: /shrinkpng/src/utils/worker.ts
 * @Description:
 *
 * Copyright (c) 2023 by tumax_guoming.huang, All Rights Reserved.
 */
import ShrinkWorker from "../workers/shrink.worker.ts?worker";

export const shrinkPngByWorker = (params: {
  img: HTMLImageElement;
  imageData: Uint8ClampedArray;
  quality: number;
}): Promise<any> => {
  return new Promise((rs, rj) => {
    const {
      img: { width, height },
      imageData,
      quality,
    } = params;
    const worker = new ShrinkWorker();
    worker.onmessage = (event: MessageEvent) => {
      rs(event.data);
    };
    worker.postMessage({ imgSize: { width, height }, imageData, quality });
  });
};
