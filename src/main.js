/*
 * @Author: guoming1.huang
 * @Date: 2022-05-19 18:12:47
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-05-20 10:51:53
 * @FilePath: /compress_images/src/main.js
 * @Description:
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
import Compress from "../dist/bundle.js";

document.getElementById("imgUpFile").addEventListener("change", (e) => {
  const img_origin = document.getElementById("img_origin");
  const img_compress = document.getElementById("img_compress");

  const file = e.target.files[0];
  const image = new Compress(file, {
    quality: 80,
  });
});
