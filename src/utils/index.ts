import { IShrinkImageOptions } from "./../types/index";
/*
 * @Author: guoming1.huang
 * @Date: 2022-05-31 14:41:58
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-06-16 11:38:07
 * @FilePath: /shrinkjs/src/utils/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
import Shrink from "../shrink";

export async function shrinkImage(
  file: File,
  { quality }: IShrinkImageOptions = { quality: 80 }
): Promise<File> {
  const shrink = new Shrink({
    quality,
  });
  return await shrink.shrinkImage(file);
}
