/*
 * @Author: guoming1.huang
 * @Date: 2022-06-16 10:23:07
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-06-16 10:56:24
 * @FilePath: /shrinkjs/src/types/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
export interface IShrinkOptions {
  quality: number;
  success(file: File): void;
  error(err: any): void;
}

export interface IShrinkImageOptions {
  quality: number;
}
