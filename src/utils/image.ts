/*
 * @Author: Tracer
 * @Date: 2022-06-30 21:26:12
 * @LastEditors: Tracer
 * @LastEditTime: 2022-06-30 21:26:55
 * @FilePath: /shrinkjs/src/utils/image.ts
 */
export function loadImage(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadstart = function () {
			console.log("文件上传处理......");
		};
		//操作完成
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
