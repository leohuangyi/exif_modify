import { Command } from "commander";
import sharp from "sharp";
import piexif from "piexifjs";
import fs from "fs";
import Mime from "mime-types";

const program = new Command();
program.version("0.0.1");
program.requiredOption("-d, --dir <type>", "需要修改的图片所在目录");
program.option("-m, --make <type>", "设备制造商", "Apple");
program.option("-mo, --model <type>", "内容制造者", "iPhone X");
program.option("-s, --software <type>", "创作软件", "");
program.option(
  "-t, --time <type>",
  "图片生成时间，例：2010:10:10 10:10:10",
  ""
);
program.parse(process.argv);

try {
  const dir = program.dir;
  if (!dir || !fs.existsSync(dir)) {
    throw new Error("dir is null");
  }

  const files = fs.readdirSync(dir);
  const outputDir = `${dir}/${new Date().getTime()}`;
  fs.mkdirSync(outputDir);

  files.forEach((fileItem) => {
    const fPath = `${dir}/${fileItem}`;
    const mimeType = Mime.lookup(fPath);
    if (!mimeType || !mimeType.startsWith("image")) {
      return;
    }

    const imgItem = sharp(fPath);
    imgItem.toBuffer((err, data, info) => {
      const zeroth = {};
      const exif = {};
      const gps = {};

      // 设备制造商
      zeroth[piexif.ImageIFD.Make] = program.make;

      // 设备
      zeroth[piexif.ImageIFD.Model] = program.model;

      // 软件
      if (program.software) {
        zeroth[piexif.ImageIFD.Software] = program.software;
      }

      // 内容创建时间
      exif[piexif.ExifIFD.DateTimeOriginal] = program.time ? program.time : "";

      // 拍摄点gps
      // gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
      // gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";

      const exifStr = piexif.dump({ "0th": zeroth, Exif: exif, GPS: gps });
      const encode = "binary";
      let bData = piexif.insert(exifStr, data.toString(encode));
      fs.writeFileSync(`${outputDir}/${fileItem}`, Buffer.from(bData, encode));
    });
  });
} catch (error) {
  console.error("Error: " + error.message);
}
