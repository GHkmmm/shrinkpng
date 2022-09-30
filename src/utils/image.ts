/*
 * @Author: Tracer
 * @Date: 2022-06-30 21:26:12
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-09-28 14:55:28
 * @FilePath: /shrinkpng/src/utils/image.ts
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (reader.result && typeof reader.result == "string") {
        resolve(reader.result);
      }
    };
    reader.onerror = function (e) {
      reject(e);
    };
    reader.readAsDataURL(file);
  });
}

export const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = dataURL;
  });
};

export const canvastoFile = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> => {
  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob), type, quality)
  );
};

export const convertQualityToBit = (quality: number): number => {
  let bit = 0;
  if (quality > 100 || quality < 0) {
    bit = 0;
  } else {
    bit = !quality ? 0 : quality * 256 * 0.01;
  }
  return bit;
};
