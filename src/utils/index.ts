import { IShrinkImageOptions } from "./../types/index";
/*
 * @Author: guoming1.huang
 * @Date: 2022-05-31 14:41:58
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-06-16 11:04:51
 * @FilePath: /shrinkjs/src/utils/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
import Shrink from "../shrink";

export async function shrinkImage(
  file: File,
  { quality }: IShrinkImageOptions = { quality: 80 }
) {
  return new Promise((rs, rj) => {
    if (!file) rj(new Error("file can not be empty"));
    new Shrink(file, {
      quality,
      success(_file) {
        rs(_file);
      },
      error(err) {
        rj(err);
      },
    });
  });
}
