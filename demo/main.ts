/*
 * @Author: guoming1.huang
 * @Date: 2022-05-19 18:12:47
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-09-30 11:28:47
 * @FilePath: /shrinkpng/demo/main.ts
 * @Description:
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
// import { shrinkImage } from "../dist/shrink.js";
import { shrinkImage } from "../src/utils/index.js";

const imgUpFileDom = document.getElementById("imgUpFile") as HTMLInputElement;

imgUpFileDom.addEventListener("change", async (e: any) => {
  const img_origin = document.getElementById("img_origin") as HTMLImageElement;
  const img_compress = document.getElementById(
    "img_compress"
  ) as HTMLImageElement;

  const file = e.target.files[0] as File;
  const _file = await shrinkImage(file, {
    quality: 100,
  });

  console.log(
    "%c [ compress result ]-25",
    "font-size:13px; background:pink; color:#bf2c9f;",
    `from ${file.size / 1024 / 1024}M to ${_file.size / 1024 / 1024}M`
  );
  img_origin.src = await getUrlByFile(file);
  img_compress.src = await getUrlByFile(_file);
});

function getUrlByFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e: any) {
      resolve(e.target.result);
    };
  });
}
