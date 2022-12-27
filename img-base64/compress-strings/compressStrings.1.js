import fs, {
  writeSync,
  readFileSync,
  opendirSync,
  statSync,
  openSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import buffer from "node:buffer";

const compressFileContentsZLIBBrotli = async (uncompressedBase64File) => {
  const filePath = path.parse(uncompressedBase64File);
  const dir = filePath.dir;
  const base = filePath.base;
  const name = filePath.name;

  const totalTimeLabel = "total for brotli compressing " + base;
  console.time(totalTimeLabel);

  const size = statSync(path.resolve(dir, base)).size;
  const compOutFileFormat = {
    dir: "./comp",
    base: name + "_comp.txt",
  };
  const compOutFile = path.format(compOutFileFormat);
  const compOutDir = compOutFileFormat.dir;

  console.log();
  console.log("------------------------------------------");
  console.log(
    "*********",
    "COMNPRESSING",
    path.relative(".", path.format(filePath)),
    "*********"
  );

  console.log();
  console.log("read dir:", dir);
  console.log("out dir:", compOutDir);

  console.log();
  console.log("...", "reading", base, "...");

  console.time("read " + base);

  console.log();
  const fileBuf = readFileSync(path.resolve(dir, base));
  console.log("read!");
  console.timeEnd("read " + base);

  console.log();
  console.time("compressing " + base);
  console.log("...", "compressing", base, "...");

  console.log();
  console.log(filePath.base, "size:", size);
  const compressed = zlib.brotliCompressSync(fileBuf, {
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    [zlib.constants.BROTLI_PARAM_SIZE_HINT]: size,
  });

  console.log();
  console.log("compressed!");
  console.timeEnd("compressing " + base);

  console.log();
  console.time("write " + base);
  console.log("...", "writing to", compOutFile, "...");

  if (!existsSync(compOutDir)) {
    const mkdirSyncResult = mkdirSync(compOutDir);
  }

  if (!existsSync(compOutFile)) {
    openSync(
      compOutFile,
      fs.constants.O_CREAT,
      // fs.constants.O_RDWR,
      "765"
    );
  }
  const compOutFileFD = openSync(
    compOutFile,
    // fs.constants.O_CREAT,
    fs.constants.O_RDWR,
    "765"
  );
  const compressedToB64String = compressed.toString("base64");
  writeSync(compOutFileFD, compressedToB64String);

  console.log();
  console.log("written!");
  console.log();
  console.timeEnd("write " + base);

  console.log();
  console.log();
  console.log("==========================================");
  console.timeEnd(totalTimeLabel);
  console.log("==========================================");
  console.log();
  console.log();

  return compressedToB64String;
};

const decompressFileContentsZLIBBrotli = async (compressedFilename) => {
  const compressedPath = path.resolve("./comp/" + compressedFilename);
  const filePath = path.parse(compressedPath);
  const dir = filePath.dir;
  const base = filePath.base;

  const totalTimeLabel = "total for decompressing " + base;
  console.time(totalTimeLabel);

  const decompFilename = compressedFilename.replace("_comp.txt", "_decomp.txt");
  const ogFilePath = path.parse(
    "./base64/" +
      compressedFilename
        .replace("_comp.txt", ".base64")
        .replace("/comp/", "/base64/")
  );
  const len = statSync(path.format(ogFilePath)).size;

  const decompOutFileFormat = {
    dir: "./decomp",
    base: decompFilename,
  };

  const decompOutFile = path.format(decompOutFileFormat);
  const decompOutDir = decompOutFileFormat.dir;

  console.log();
  console.log("------------------------------------------");
  console.log(
    "*********",
    "DECOMNPRESSING",
    path.relative(".", path.format(filePath)),
    "*********"
  );

  console.time("read " + base);

  console.log();
  console.log("...", "reading", compressedPath, "...");
  const compressedString = readFileSync(compressedPath, {
    encoding: "utf8",
  });

  console.log();
  console.log("read!");

  console.timeEnd("read " + base);

  console.time("decompressing " + base);
  console.log();
  console.log("...", "decompressing", "...");

  console.log();
  console.log(ogFilePath.base, "size:", len);

  // using different npm module
  // const decompressedBin = decompress(buf);
  // const decompressedBin = decompress(bufBin, len);
  // const decompressedUTF8 = decompress(bufUTF8, len);
  // const decompressedB64 = decompress(bufB64, len);

  const compressedBuf = Buffer.from(compressedString, "base64");
  const decompressed = zlib.brotliDecompressSync(compressedBuf, {
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
    [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    [zlib.constants.BROTLI_PARAM_SIZE_HINT]: len,
  });

  console.log();
  console.log("decompressed!");

  // console.log();
  // console.log("...", "decompressing file " + readPath.base, "...");
  // const decompressedB64ToB64Buf = Buffer.from(b64, "base64");
  // const decompressedB64 = zlib.brotliDecompressSync(decompressedB64ToB64Buf, {
  //   [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
  //   [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
  //   [zlib.constants.BROTLI_PARAM_SIZE_HINT]: len,
  // });
  // console.log("decompressed!");

  console.log();
  console.timeEnd("decompressing " + base);

  console.log();
  console.time("write " + base);
  console.log();
  console.log("...", "writing", decompOutFile, "...");
  // console.log("...", "writing to", decompressedUTF8OutputFile, "...");

  if (!existsSync(decompOutDir)) {
    const mkdirSyncResult = mkdirSync(decompOutDir);
  }
  if (!existsSync(decompOutFile)) {
    const decompressedOutputFileBinFD = openSync(
      decompOutFile,
      fs.constants.O_CREAT,
      // fs.constants.O_RDWR,
      "765"
    );
  }
  const decompOutFileFD = openSync(
    decompOutFile,
    // fs.constants.O_CREAT,
    fs.constants.O_RDWR,
    "765"
  );
  writeSync(decompOutFileFD, decompressed);

  console.log();
  console.log("written!");

  console.log();
  console.timeEnd("write " + base);

  console.log();
  console.log("...", "transcoding", "...");
  console.time("transcode " + base);

  const originalB64 = buffer.transcode(decompressed, "binary", "utf8");
  const beginningOfTranscoded = originalB64.toString("utf8").slice(0, 100);

  console.log();
  console.log("beginningOfTranscoded");
  console.log(beginningOfTranscoded);

  console.log();
  console.timeEnd("transcode " + base);

  console.log();
  console.log();
  console.log("==========================================");
  console.timeEnd(totalTimeLabel);
  console.log("==========================================");
  console.log();
  console.log();

  return originalB64;
};

const compressFilesInDir = async (ogB64Dir) => {
  const totalTimeLabel = "total for " + ogB64Dir;
  console.time(totalTimeLabel);

  const dir = opendirSync(ogB64Dir);
  console.log("==========================================");
  console.log("==========================================");
  console.log("==========================================");
  console.log("\tCOMPRESSING:", dir.path);
  console.log("==========================================");
  console.log("==========================================");
  console.log("==========================================");

  for await (const dirent of dir) {
    // console.log(dirent.name);

    await compressFileContentsZLIBBrotli(path.resolve(dir.path, dirent.name));

    console.log();
  }

  console.log();
  console.log();
  console.log("==========================================");
  console.timeEnd(totalTimeLabel);
  console.log("==========================================");
  console.log();
  console.log();
};

const decompressFilesInDir = async (compressedDir) => {
  const totalTimeLabel = "total for " + compressedDir;
  console.time(totalTimeLabel);

  const dir = opendirSync(compressedDir);

  console.log("==========================================");
  console.log("==========================================");
  console.log("==========================================");
  console.log("\tDECOMPRESSING:", dir.path);
  console.log("==========================================");
  console.log("==========================================");
  console.log("==========================================");

  for await (const dirent of dir) {
    // console.log(dirent.name);

    await decompressFileContentsZLIBBrotli(dirent.name);

    console.log();
  }

  console.log();
  console.log();
  console.log("==========================================");
  console.timeEnd(totalTimeLabel);
  console.log("==========================================");
  console.log();
  console.log();
};

const compareFiles = async (file1, file2) => {
  const totalTimeLabel = "total for comparing " + file1 + " " + file2;
  console.time(totalTimeLabel);
  const file1Buf = readFileSync(file1);
  const file2Buf = readFileSync(file2);

  console.log();
  console.log("==========================================");
  console.log("compare", file1, file2);

  console.log();
  console.log("compare");
  console.log(file1Buf.compare(file2Buf));

  console.log();
  console.log("equals");
  console.log(file1Buf.equals(file2Buf));

  console.log();
  console.log();
  console.log("==========================================");
  console.timeEnd(totalTimeLabel);
  console.log("==========================================");
  console.log();
  console.log();

  return file1Buf.equals(file2Buf);
};

const testPreAndPostCompressDecompressFiles = async (ogDir, decompDir) => {
  const totalTimeLabel = "total for " + ogDir;
  console.time(totalTimeLabel);

  console.log();
  console.log("compPath:", path.relative(".", path.resolve(ogDir)));
  console.log("decompPath:", path.relative(".", path.resolve(decompDir)));

  const dir = opendirSync(ogDir);

  console.log();
  for await (const dirent of dir) {
    console.log("compressed file:", dirent.name);

    const ogFile = path.resolve(dir.path, dirent.name);
    const decompFile = path.resolve(dir.path, dirent.name);
    const ogFileEqDecompFile = compareFiles(ogFile, decompFile);

    console.log("compressed", "=", "decompressed");

    console.log();
  }

  console.timeEnd(totalTimeLabel);
};

try {
  const B64_DIR = "./base64";
  const COMP_DIR = "./comp";
  const DECOMP_DIR = "./decomp";
  console.time("total");
  await compressFilesInDir(B64_DIR);
  console.log();
  await decompressFilesInDir(COMP_DIR);
  console.log();
  await testPreAndPostCompressDecompressFiles(B64_DIR, DECOMP_DIR);
  console.timeEnd("total");
} catch (err) {
  console.error(err);
}
