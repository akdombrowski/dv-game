import fs, {
  writeSync,
  writeFileSync,
  readFileSync,
  opendirSync,
  statSync,
  createReadStream,
  createWriteStream,
  open,
  openSync,
  existsSync,
} from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { compress, decompress } from "brotli";
import buffer, { Buffer } from "node:buffer";

const FILE = "./base64/1.base64";
// const DIR = "./base64";
const DIR = "./base64";
const OUT_DIR = "./base64Compressed";
const READ_FOR_LENGTH_FILE = "./base64/1.base64";
const READ_FILE = "./base64Compressed/1_compressed.txt";
const READ_BROTLI_FILE = "./base64CompressedBrotli/1";
const READ_DIR = "./base64Compressed";
const READ_OUT_DIR = "./base64Decompressed";
const READ_OUT_BROTLI_DIR = "./base64DecompressedBrotli";
const FILE_STORAGE_CONTENTS_ENCODING = "utf8";

const compressFileContentsZLIBBrotli = async (filename) => {
  const filenamePathObj = path.parse(filename);
  const fileBase = filenamePathObj.base;
  const nameOfFile = filenamePathObj.name;

  const compressOutputFileFormatBin = {
    dir: "./base64CompressedBrotli",
    base: nameOfFile + "_compressed_brotli.bin",
  };
  const compressOutputFileFormatUTF8 = {
    dir: "./base64CompressedBrotli",
    base: nameOfFile + "_compressed_brotli_utf8.txt",
  };
  const compressOutputFileFormatB64 = {
    dir: "./base64CompressedBrotli",
    base: nameOfFile + "_compressed_brotli_b64.txt",
  };

  const compressedOutputFileBin = path.format(compressOutputFileFormatBin);
  const compressedOutputFileUTF8 = path.format(compressOutputFileFormatUTF8);
  const compressedOutputFileB64 = path.format(compressOutputFileFormatB64);
  const totalTimeLabel = "total for zlib's brotli compressing " + fileBase;
  console.time(totalTimeLabel);

  console.log();
  console.time("read");
  console.log("reading from", filenamePathObj.base);
  const buf = readFileSync(
    path.resolve(filenamePathObj.dir, filenamePathObj.base)
  );
  console.timeEnd("read");

  console.log();
  console.time("compression");
  console.log("...", "compressing file contents", "...");

  const compressed = zlib.brotliCompressSync(buf, {
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    [zlib.constants.BROTLI_PARAM_SIZE_HINT]: statSync(filename).size,
  });
  console.log("size hint:", statSync(filename).size);

  console.log();
  console.log("compressed!");
  console.timeEnd("compression");

  console.log();
  console.time("write");
  console.log("...", "writing to", compressedOutputFileBin, "...");

  if (!existsSync(compressedOutputFileBin)) {
    const compressedOutputFileBinFD = openSync(
      compressedOutputFileBin,
      fs.constants.O_CREAT,
      // fs.constants.O_RDWR,
      "765"
    );
  }
  const compressedOutputFileBinFD = openSync(
    compressedOutputFileBin,
    // fs.constants.O_CREAT,
    fs.constants.O_RDWR,
    "765"
  );
  writeSync(compressedOutputFileBinFD, compressed);

  console.log("...", "writing to", compressedOutputFileUTF8, "...");
  if (!existsSync(compressedOutputFileUTF8)) {
    const compressedOutputFileUTF8FD = openSync(
      compressedOutputFileUTF8,
      fs.constants.O_CREAT,
      // fs.constants.O_RDWR,
      "765"
    );
  }
  const compressedOutputFileUTF8FD = openSync(
    compressedOutputFileUTF8,
    // fs.constants.O_CREAT,
    fs.constants.O_RDWR,
    "765"
  );
  writeSync(compressedOutputFileUTF8FD, compressed.toString("utf8"));

  console.log("...", "writing to", compressedOutputFileB64, "...");
  if (!existsSync(compressedOutputFileB64)) {
    const compressedOutputFileB64FD = openSync(
      compressedOutputFileB64,
      fs.constants.O_CREAT,
      // fs.constants.O_RDWR,
      "765"
    );
  }
  const compressedOutputFileB64FD = openSync(
    compressedOutputFileB64,
    // fs.constants.O_CREAT,
    fs.constants.O_RDWR,
    "765"
  );
  writeSync(compressedOutputFileB64FD, compressed.toString("base64"));

  // writeFileSync(
  //   compressedOutputFileBin,
  //   compressed.toString("utf8")
  // );
  // writeFileSync(
  //   compressedOutputFileB64,
  //   compressed.toString("base64")
  // );
  // new buffer.File([compressed], compressedOutputFileBinFD, {
  //   type: "application/octet-stream",
  // });
  // new buffer.File([compressed], compressedOutputFileTxtFD, {
  //   type: "text/plain",
  // });

  console.log();
  console.log("written!");
  console.timeEnd("write");

  console.log();
  console.timeEnd(totalTimeLabel);
  console.log();

  return compressedOutputFileBin;
};

const compressFileContents = async (filename) => {
  const filenamePathObj = path.parse(filename);
  const fileBase = filenamePathObj.base;
  const nameOfFile = filenamePathObj.name;
  const outputFileFormat = {
    dir: OUT_DIR,
    base: nameOfFile + "_compressed.txt",
  };
  const compressedBase64OutputFile = path.format(outputFileFormat);
  const totalTimeLabel = "total for compressing " + fileBase;
  console.time(totalTimeLabel);

  console.log();
  console.time("read");
  console.log("reading from", filenamePathObj.base);
  const buf = readFileSync(
    path.resolve(filenamePathObj.dir, filenamePathObj.base)
  );
  console.timeEnd("read");

  console.log();
  console.time("compression");
  console.log("...", "compressing file contents", "...");

  const compressed = compress(buf, {
    mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
    quality: 11, // 0 - 11
    // lgwin: 22, // window size
  });

  console.log();
  console.log("compressed!");
  console.timeEnd("compression");

  console.log();
  console.time("write");
  console.log("...", "writing to", compressedBase64OutputFile, "...");

  writeFileSync(compressedBase64OutputFile, compressed);

  console.log();
  console.log("written!");
  console.timeEnd("write");

  console.log();
  console.timeEnd(totalTimeLabel);
  console.log();

  return compressedBase64OutputFile;
};

const compressFilesInDir = async (dirname) => {
  console.time("total for " + dirname);

  const dir = opendirSync(dirname);
  console.log(dir.path);
  for await (const dirent of dir) {
    console.log(dirent.name);
    // console.log(path.resolve(dir.path, dirent.name));
    compressFileContents(path.resolve(dir.path, dirent.name));

    console.log();
  }

  console.timeEnd("total for " + dirname);
};

const decompressFileContentsZLIBBrotli = async (filename) => {
  const readCompressedBinFilename = filename + "_compressed_brotli.bin";
  const readCompressedUTF8Filename = filename + "_compressed_brotli_utf8.txt";
  const readCompressedB64Filename = filename + "_compressed_brotli_utf8.txt";
  const readBinFilenamePathObj = path.parse(readCompressedBinFilename);
  const readUTF8FilenamePathObj = path.parse(readCompressedUTF8Filename);
  const readB64FilenamePathObj = path.parse(readCompressedB64Filename);
  const fileBaseBin = readBinFilenamePathObj.base;
  const fileBaseUTF8 = readUTF8FilenamePathObj.base;
  const fileBaseB64 = readB64FilenamePathObj.base;
  const nameOfBinFile = readBinFilenamePathObj.name.replace("_compressed", "");
  const nameOfUTF8File = readBinFilenamePathObj.name.replace("_compressed", "");
  const nameOfB64File = readBinFilenamePathObj.name.replace("_compressed", "");

  const decompressOutputFileFormatBin = {
    dir: "./base64DecompressedBrotli",
    base: nameOfBinFile + "_decompressed_brotli.bin",
  };
  const decompressOutputFileFormatUTF8 = {
    dir: "./base64DecompressedBrotli",
    base: nameOfUTF8File + "_decompressed_brotli_utf8.txt",
  };
  const decompressOutputFileFormatB64 = {
    dir: "./base64DecompressedBrotli",
    base: nameOfB64File + "_decompressed_brotli_b64.txt",
  };

  const decompressedBinOutputFile = path.format(decompressOutputFileFormatBin);
  const decompressedUTF8OutputFile = path.format(
    decompressOutputFileFormatUTF8
  );
  const decompressedB64OutputFile = path.format(decompressOutputFileFormatB64);
  console.time("total for decompressing " + fileBaseBin);

  console.log();
  console.time("read");
  console.log("reading from", readBinFilenamePathObj.base);

  const originalFileBuf = readFileSync(path.resolve(FILE));
  const len = originalFileBuf.length;

  console.log("len", len);

  const bufBin = readFileSync(
    path.resolve(readBinFilenamePathObj.dir, readBinFilenamePathObj.base)
  );
  const bufUTF8 = readFileSync(
    path.resolve(readUTF8FilenamePathObj.dir, readUTF8FilenamePathObj.base)
  );
  const bufB64 = readFileSync(
    path.resolve(readB64FilenamePathObj.dir, readB64FilenamePathObj.base)
  );

  const bufToUInt8Array = new Uint8Array(originalFileBuf);
  const bufToUInt8Array2 = new Uint8Array(
    originalFileBuf.buffer,
    originalFileBuf.byteOffset,
    originalFileBuf.length / Uint8Array.BYTES_PER_ELEMENT
  );

  console.timeEnd("read");

  console.log();
  console.time("decompression");
  console.log(
    "...",
    "decompressing file " + readBinFilenamePathObj.base,
    "..."
  );

  // using different npm module
  // const decompressedBin = decompress(buf);
  // const decompressedBin = decompress(bufBin, len);
  // const decompressedUTF8 = decompress(bufUTF8, len);
  // const decompressedB64 = decompress(bufB64, len);

  const decompressedBin = zlib.brotliDecompressSync(bufBin, {
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    [zlib.constants.BROTLI_PARAM_SIZE_HINT]: len,
  });

  // console.log();
  // console.log(
  //   "...",
  //   "decompressing file " +
  //     readBUTF8FilenamePathObj.base,
  //   "..."
  // );

  // these two don't work for some reason
  // const decompressedUTF8 = zlib.brotliDecompressSync(bufUTF8, {
  //   [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
  //   [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
  //   [zlib.constants.BROTLI_PARAM_SIZE_HINT]: len,
  // });
  // const decompressedB64 = zlib.brotliDecompressSync(bufB64, {
  //   [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
  //   [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
  //   [zlib.constants.BROTLI_PARAM_SIZE_HINT]: len,
  // });

  // without options
  // const decompressedBin = zlib.brotliDecompressSync(bufBin);
  // const decompressedUTF8 = zlib.brotliDecompressSync(bufUTF8);
  // const decompressedB64 = zlib.brotliDecompressSync(bufB64);

  console.log();
  console.log("decompressed!");
  console.timeEnd("decompression");

  console.log();
  console.time("write");
  console.log("...", "writing to", decompressedBinOutputFile, "...");
  // console.log("...", "writing to", decompressedUTF8OutputFile, "...");
  // console.log("...", "writing to", decompressedB64OutputFile, "...");

  if (!existsSync(decompressedBinOutputFile)) {
    const decompressedOutputFileBinFD = openSync(
      decompressedBinOutputFile,
      fs.constants.O_CREAT,
      // fs.constants.O_RDWR,
      "765"
    );
  }
  // not currently used
  // if (!existsSync(decompressedUTF8OutputFile)) {
  //   const decompressedOutputFileUTF8FD = openSync(
  //     decompressedUTF8OutputFile,
  //     fs.constants.O_CREAT,
  //     // fs.constants.O_RDWR,
  //     "765"
  //   );
  // }
  // if (!existsSync(decompressedB64OutputFile)) {
  //   const compressedOutputFileTxtFD = openSync(
  //     decompressedB64OutputFile,
  //     fs.constants.O_CREAT,
  //     // fs.constants.O_RDWR,
  //     "765"
  //   );
  // }

  const decompressedBinOutputFileFD = openSync(
    decompressedBinOutputFile,
    // fs.constants.O_CREAT,
    fs.constants.O_RDWR,
    "765"
  );
  // not used
  // const decompressedUTF8OutputFileFD = openSync(
  //   decompressedUTF8OutputFile,
  //   // fs.constants.O_CREAT,
  //   fs.constants.O_RDWR,
  //   "765"
  // );
  // const decompressedBase64OutputFileFD = openSync(
  //   decompressedB64OutputFile,
  //   // fs.constants.O_CREAT,
  //   fs.constants.O_RDWR,
  //   "765"
  // );

  writeSync(decompressedBinOutputFileFD, decompressedBin);
  // same as above because of default enoding is utf8
  // writeSync(
  //   decompressedUTF8OutputFileFD,
  //   decompressedBin.toString("utf8"),
  //   null
  // );
  // it's already in b64 encoding this would encode it again
  // writeSync(
  //   decompressedBase64OutputFileFD,
  //   decompressedBin.toString("base64"),
  //   null
  // );

  console.log();
  console.log("written!");
  console.timeEnd("write");

  console.log();
  console.log();

  const decompressedBinAndTranscodedUTF8 = buffer.transcode(
    decompressedBin,
    "binary",
    "utf8"
  );
  const decompressedUTF8AndTranscodedUTF8 = buffer.transcode(
    decompressedBin,
    "binary",
    "utf8"
  );
  const decompressedB64AndTranscodedUTF8 = buffer.transcode(
    decompressedBin,
    "binary",
    "utf8"
  );
  const beginningOfTranscodedBin = decompressedBinAndTranscodedUTF8
    .toString("utf8")
    .slice(0, 50);

  console.log();
  console.log("beginningOfTranscodedBin");
  console.log(beginningOfTranscodedBin);

  console.log();
  console.log("originalFileBuf === decompressedBinAndTranscodedUTF8");
  console.log(originalFileBuf === decompressedBinAndTranscodedUTF8);
  console.log("originalFileBuf.equals(decompressedBinAndTranscodedUTF8)");
  console.log(originalFileBuf.equals(decompressedBinAndTranscodedUTF8));
  console.log("originalFileBuf.compare(decompressedBinAndTranscodedUTF8)");
  console.log(originalFileBuf.compare(decompressedBinAndTranscodedUTF8));

  console.log();
  console.log();

  console.log();
  console.log("transcoded === bufToUInt8Array2");
  console.log(decompressedBinAndTranscodedUTF8.compare(bufToUInt8Array2));
  console.log();
  console.log("transcoded === bufToUInt8Array");
  console.log(decompressedBinAndTranscodedUTF8.compare(bufToUInt8Array));

  const decompressedBinBuf = Buffer.from(decompressedBin);
  console.log();
  console.log(
    "compare two bufs pre-anything then post-compression-then-decompression"
  );
  console.log(bufBin.compare(decompressedBinBuf));

  const decompressedBinBufToB64 = decompressedBinBuf.toString("base64");
  const decompressedBinToB64ToBuf = Buffer.from(
    decompressedBinBuf.toString("base64")
  );
  console.log(
    "compare two bufs pre-anything then post-compression-then-decompression-b64-buffer"
  );
  console.log(bufBin.compare(decompressedBinToB64ToBuf));

  const decompressedBinToB64ToConstToBuf = Buffer.from(decompressedBinBufToB64);
  console.log(
    "compare two bufs pre-anything then post-compression-then-decompression-b64-const-buffer"
  );
  console.log(bufBin.compare(decompressedBinToB64ToConstToBuf));

  console.log("Buffer.byteLength(" + path.resolve(FILE) + ")");
  console.log(Buffer.byteLength(originalFileBuf));
  console.log("Buffer.byteLength(" + path.resolve(FILE) + ', "base64")');
  console.log(Buffer.byteLength(originalFileBuf, "base64"));
  console.log('Buffer.byteLength(decompressedBinBuf.toString("base64"))');
  console.log(Buffer.byteLength(decompressedBinBuf.toString("base64")));
  console.log(
    'Buffer.byteLength(decompressedBinBuf.toString("base64"), "base64")'
  );
  console.log(
    Buffer.byteLength(decompressedBinBuf.toString("base64"), "base64")
  );

  console.log();
  console.timeEnd("total for decompressing " + fileBaseBin);
  console.log();

  return decompressedBinOutputFile;
};

const decompressFileContents = async (filename) => {
  const filenamePathObj = path.parse(filename);
  const fileBase = filenamePathObj.base;
  const nameOfFile = filenamePathObj.name;
  const bareNameOfFile = nameOfFile.replace("_compressed", "_decompressed.txt");
  const outputFileFormat = {
    dir: READ_OUT_DIR,
    base: bareNameOfFile,
  };
  const decompressedBase64OutputFile = path.format(outputFileFormat);
  const decompressionTotalTime = "total for brotli decompressing " + fileBase;
  console.time(decompressionTotalTime);

  console.log();
  console.time("read");
  console.log("reading from", filenamePathObj.base);

  const bufForLength = readFileSync(path.resolve(FILE));
  const len = bufForLength.length;

  console.log("len", len);

  const buf = readFileSync(
    path.resolve(filenamePathObj.dir, filenamePathObj.base)
  );
  const bufToUInt8Array = new Uint8Array(buf);
  const bufToUInt8Array2 = new Uint8Array(
    buf.buffer,
    buf.byteOffset,
    buf.length / Uint16Array.BYTES_PER_ELEMENT
  );
  console.timeEnd("read");

  console.log();
  console.time("decompression");
  console.log("...", "decompressing file contents", "...");

  const decompressed = decompress(buf, len);

  console.log();
  console.log("decompressed!");
  console.timeEnd("decompression");

  console.log();
  console.time("write");
  console.log("...", "writing to", decompressedBase64OutputFile, "...");

  writeFileSync(
    decompressedBase64OutputFile,
    Buffer.from(decompressed).toString("base64")
  );

  console.log();
  console.log("written!");
  console.timeEnd("write");

  console.log();
  console.log();
  console.log();
  console.log("decompressed === bufToUInt8Array");
  console.log(decompressed === bufToUInt8Array);
  console.log();
  console.log();
  console.log("decompressed === bufToUInt8Array2");
  console.log(decompressed === bufToUInt8Array2);
  console.log();
  console.log();
  console.log();

  const decompressedBuf = Buffer.from(decompressed);
  console.log(
    "compare two bufs pre-anything then post-compression-then-decompression"
  );
  console.log(buf.compare(decompressedBuf));

  const decompressedToB64ToBuf = Buffer.from(
    decompressedBuf.toString("base64")
  );
  console.log(
    "compare two bufs pre-anything then post-compression-then-decompression-b64-buffer"
  );
  console.log(buf.compare(decompressedToB64ToBuf));

  console.log("Buffer.byteLength(" + path.resolve(FILE) + ")");
  console.log(Buffer.byteLength(bufForLength));
  console.log("Buffer.byteLength(" + path.resolve(FILE) + ', "base64")');
  console.log(Buffer.byteLength(bufForLength, "base64"));
  console.log('Buffer.byteLength(decompressedBuf.toString("base64"))');
  console.log(Buffer.byteLength(decompressedBuf.toString("base64")));
  console.log(
    'Buffer.byteLength(decompressedBuf.toString("base64"), "base64")'
  );
  console.log(Buffer.byteLength(decompressedBuf.toString("base64"), "base64"));

  console.log();
  console.timeEnd(decompressionTotalTime);
  console.log();

  return decompressedBase64OutputFile;
};

const decompressFilesInDir = async (dirname) => {
  console.time("total for " + dirname);

  const dir = opendirSync(dirname);
  console.log(dir.path);
  for await (const dirent of dir) {
    console.log(dirent.name);
    // console.log(path.resolve(dir.path, dirent.name));
    compressFileContents(path.resolve(dir.path, dirent.name));

    console.log();
  }

  console.timeEnd("total for " + dirname);
};

const convertBinaryFileTobase64 = async (filename) => {
  const filenamePathObj = path.parse(filename);
  const fileBase = filenamePathObj.base;
  const nameOfFile = filenamePathObj.name;

  const b64OutputFileFormat = {
    dir: "./compressedBrotliToB64",
    base: nameOfFile + "_compressed_brotli_to_b64.txt",
  };

  const b64OutputFile = path.format(b64OutputFileFormat);

  const totalTimeLabel = "total for converting file to base64 " + fileBase;
  console.time(totalTimeLabel);

  console.log();
  console.time("read");
  console.log("reading from", filenamePathObj.base);
  const readFileBuf = readFileSync(
    path.resolve(filenamePathObj.dir, filenamePathObj.base)
  );
  console.timeEnd("read");

  console.time("convert");
  console.log("...", "converting file contents to base64", "...");

  const b64Converted = readFileBuf.toString("base64");

  console.log(b64Converted.slice(0, 50));

  console.timeEnd("convert");

  console.time("write");

  if (!existsSync(b64OutputFile)) {
    const b64OutputFileFD = openSync(
      b64OutputFile,
      fs.constants.O_CREAT,
      // fs.constants.O_RDWR,
      "765"
    );
  }
  const b64OutputFileFD = openSync(
    b64OutputFile,
    // fs.constants.O_CREAT,
    fs.constants.O_RDWR,
    "765"
  );

  writeSync(b64OutputFileFD, b64Converted);

  console.timeEnd("write");

  console.timeEnd(totalTimeLabel);

  return b64Converted;
};

try {
  // compressFilesInDir(DIR);
  // await compressFileContents(FILE);
  await compressFileContentsZLIBBrotli(FILE);
  // await decompressFileContents(READ_FILE);
  await decompressFileContentsZLIBBrotli(READ_BROTLI_FILE);
  // await convertBinaryFileTobase64();
} catch (err) {
  console.error(err);
}
