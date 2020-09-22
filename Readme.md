当图片不希望携带额外的 exif 信息，如照片拍摄点、PhotoShop 的软件痕迹、设备制造商等，可以使用本脚本来清除。

另外他也可以重新写入部分想要的 exif 信息

# Install

```

git clone git@github.com:leohuangyi/exif_modify.git
cd exif_modify
yarn install

```

# Usage:

```

node index.js [options]

Options:
-V, --version output the version number
-d, --dir <type> 需要修改的图片所在目录
-m, --make <type> 设备制造商 (default: "Apple")
-mo, --model <type> 内容制造者 (default: "iPhone X")
-s, --software <type> 创作软件 (default: "")
-t, --time <type> 图片生成时间，例：2010:10:10 10:10:10 (default: "")
-h, --help display help for command

```

# keywords

- exif read and write
- exif clear
- photoshop exif
