/*
 * @Author: guoming1.huang
 * @Date: 2022-05-31 14:41:58
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-05-31 16:00:32
 * @FilePath: /shrinkjs/src/utils.js
 * @Description:
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
import Shrink from "./shrink.js";

export async function shrinkImage(file, { quality } = { quality: 80 }) {
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
