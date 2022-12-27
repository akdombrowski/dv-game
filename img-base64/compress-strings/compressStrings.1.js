import fs, {
  writeFileSync,
  writeSync,
  readFileSync,
  opendirSync,
  statSync,
  openSync,
  existsSync,
  mkdirSync,
  appendFileSync,
  closeSync,
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
  // const compOutFileFormat = {
  //   dir: "./comp",
  //   base: name + "_comp.txt",
  // };
  const compOutFileFormat = {
    dir: "./comp-values",
    base: name + "_comp_values.txt",
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
  writeFileSync("./comp-values/test", compressed);

  console.log();
  console.log("compressed!");
  console.timeEnd("compressing " + base);

  console.log();
  console.time("write " + base);
  console.log("...", "writing to", compOutFile, "...");

  let compOutFileValuesFD;
  let compOutFileFD;
  let mkdirSyncResult;
  let mkdirSyncValues;
  let compOutFileBufFD;
  try {
    if (!existsSync(compOutDir)) {
      mkdirSyncResult = mkdirSync(compOutDir);
    }

    if (!existsSync(compOutFile)) {
      openSync(
        compOutFile,
        fs.constants.O_CREAT,
        // fs.constants.O_RDWR,
        "765"
      );
    }
    compOutFileFD = openSync(
      compOutFile,
      // fs.constants.O_CREAT,
      fs.constants.O_RDWR,
      "765"
    );
    // const compressedToB64String = compressed.toString("base64");
    // writeSync(compOutFileFD, compressedToB64String);
    if (!existsSync("./comp-values")) {
      mkdirSyncResult = mkdirSync("./comp-values");
    }
    if (!existsSync(compOutFile)) {
      openSync(
        compOutFile,
        fs.constants.O_CREAT,
        // fs.constants.O_RDWR,
        "765"
      );
    }
    compOutFileValuesFD = openSync(
      compOutFile,
      // fs.constants.O_CREAT,
      fs.constants.O_RDWR,
      "765"
    );
    if (!existsSync("./comp-values/1_buf.txt")) {
      openSync(
        "./comp-values/1_buf.txt",
        fs.constants.O_CREAT,
        // fs.constants.O_RDWR,
        "765"
      );
    }
    compOutFileBufFD = openSync(
      "./comp-values/1_buf.txt",
      // fs.constants.O_CREAT,
      fs.constants.O_RDWR,
      "765"
    );
    for (const val of compressed) {
      appendFileSync(compOutFileValuesFD, val + ",");
    }
  } catch (error) {
    throw error;
  } finally {
    if (compOutFileValuesFD !== undefined) closeSync(compOutFileValuesFD);
    if (compOutFileFD !== undefined) closeSync(compOutFileFD);
    if (mkdirSyncResult !== undefined) closeSync(mkdirSyncResult);
    if (mkdirSyncValues !== undefined) closeSync(mkdirSyncValues);
  }

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

  // return compressedToB64String;
  return compressed;
};

const compressFile = async (uncompressedBase64File) => {
  const filePath = path.parse(uncompressedBase64File);
  const dir = filePath.dir;
  const base = filePath.base;
  const name = filePath.name;

  const totalTimeLabel = "total for brotli compressing " + base;
  console.time(totalTimeLabel);

  const size = statSync(path.resolve(dir, base)).size;
  // const compOutFileFormat = {
  //   dir: "./comp",
  //   base: name + "_comp.txt",
  // };
  const compOutFileFormat = {
    dir: "./comp-values",
    base: name + "_comp_values.txt",
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

  let compOutFileValuesFD;
  let compOutFileFD;
  let mkdirSyncResult;
  let mkdirSyncValues;
  try {
    if (!existsSync("./comp-values")) {
      mkdirSyncResult = mkdirSync("./comp-values");
    }
    if (!existsSync(compOutFile)) {
      openSync(
        compOutFile,
        fs.constants.O_CREAT,
        // fs.constants.O_RDWR,
        "765"
      );
    }
    compOutFileValuesFD = openSync(
      compOutFile,
      // fs.constants.O_CREAT,
      fs.constants.O_RDWR,
      "765"
    );
    for (const val of compressed) {
      appendFileSync(compOutFileValuesFD, val + ",");
    }
  } catch (error) {
    throw error;
  } finally {
    if (compOutFileValuesFD !== undefined) closeSync(compOutFileValuesFD);
    if (compOutFileFD !== undefined) closeSync(compOutFileFD);
    if (mkdirSyncResult !== undefined) closeSync(mkdirSyncResult);
    if (mkdirSyncValues !== undefined) closeSync(mkdirSyncValues);
  }

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

  // return compressedToB64String;
  return compressed;
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

const decompressFile = async (compressedFilename) => {
  const compressedPath = path.resolve("./comp-values/" + compressedFilename);
  const filePath = path.parse(compressedPath);
  const dir = filePath.dir;
  const base = filePath.base;

  const totalTimeLabel = "total for decompressing " + base;
  console.time(totalTimeLabel);

  const decompFilename = compressedFilename.replace(
    "_comp_values.txt",
    "_decomp_values.txt"
  );
  const ogFilePath = path.parse(
    "./base64/" +
      compressedFilename
        .replace("_comp_values.txt", ".base64")
        .replace("/comp-values/", "/base64/")
  );
  const len = statSync(path.format(ogFilePath)).size;

  const decompOutFileFormat = {
    dir: "./decomp-values",
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
  console.log("ogFile", ogFilePath.base, "size:", len);

  // using different npm module
  // const decompressedBin = decompress(buf);
  // const decompressedBin = decompress(bufBin, len);
  // const decompressedUTF8 = decompress(bufUTF8, len);
  // const decompressedB64 = decompress(bufB64, len);

  const compressedArray = compressedString.split(",");
  console.log(JSON.stringify(compressedArray));
  // const compressedBuf = Buffer.from(compressedArray);
  // const decompressed = zlib.brotliDecompressSync(compressedBuf, {
  //   [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
  //   [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
  //   [zlib.constants.BROTLI_PARAM_SIZE_HINT]: len,
  // });

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
  // writeSync(decompOutFileFD, decompressed);

  console.log();
  console.log("written!");

  console.log();
  console.timeEnd("write " + base);

  console.log();
  console.log("...", "transcoding", "...");
  console.time("transcode " + base);

  // const originalB64 = buffer.transcode(decompressed, "binary", "utf8");
  // const beginningOfTranscoded = originalB64.toString("utf8").slice(0, 100);

  // console.log();
  // console.log("beginningOfTranscoded");
  // console.log(beginningOfTranscoded);

  console.log();
  console.timeEnd("transcode " + base);

  console.log();
  console.log();
  console.log("==========================================");
  console.timeEnd(totalTimeLabel);
  console.log("==========================================");
  console.log();
  console.log();

  // return originalB64;
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
  const totalTimeLabel = "total for testing equality " + ogDir;
  console.time(totalTimeLabel);

  const ogDirPath = path.resolve(ogDir);
  const decompDirPath = path.resolve(decompDir);
  console.log();
  console.log("compPath:", ogDirPath);
  console.log("decompPath:", decompDirPath);

  const dir = opendirSync(ogDirPath);
  const equals = {};

  console.log();
  for await (const dirent of dir) {
    console.log("compressed file:", dirent.name);

    const ogFile = path.resolve(dir.path, dirent.name);
    const decompFile = path.resolve(
      decompDir,
      dirent.name.replace(".base64", "_decomp.txt")
    );
    const ogFileEqDecompFile = await compareFiles(ogFile, decompFile);
    const ogFileParsed = path.parse(ogFile);

    equals[ogFileParsed.name] = ogFileEqDecompFile;

    console.log();
  }

  console.log(equals);
  console.log();

  console.timeEnd(totalTimeLabel);

  return equals;
};

const getFileSize = (filename) => {
  const filePath = path.resolve(filename);
  return statSync(filePath).size;
};

const getCompressionStorageSavings = async (ogDir, compDir) => {
  const totalTimeLabel = "total for " + ogDir;
  console.time(totalTimeLabel);

  console.log();
  console.log("comparing files in %s and %s", ogDir, compDir);

  const dir = opendirSync(ogDir);
  const allFileSavings = {};

  console.log();
  for await (const dirent of dir) {
    const ogFile = path.resolve(dir.path, dirent.name);
    const relOGFile = path.relative(".", ogFile);
    const compFile = path.resolve(
      compDir,
      dirent.name.replace(".base64", "_comp.txt")
    );
    const compFileParsed = path.parse(compFile);
    const relCompFile = path.relative(".", compFile);
    const ogFileSize = getFileSize(ogFile);
    const compFileSize = getFileSize(compFile);
    const change = compFileSize - ogFileSize;
    const changePerc = ((change / ogFileSize) * 100).toFixed(5);

    allFileSavings[dirent.name] = {
      ogDir: ogDir,
      compDir: compDir,
      ogFile: ogFile,
      compFile: compFile,
      ogSize: ogFileSize,
      compSize: compFileSize,
      difference: change,
      differencePerc: changePerc + "%",
    };

    console.log("Size Savings (bytes)");
    console.log(
      "original file:",
      relOGFile,
      "  >  ",
      "compressed file:",
      relCompFile
    );
    console.log("before:", ogFileSize);
    console.log("after:", compFileSize);
    console.log("difference:", change);
    console.log("difference %:", changePerc + "%");

    console.log();
  }

  console.log();
  console.log(allFileSavings);
  console.log();

  console.timeEnd(totalTimeLabel);
};

try {
  const B64_DIR = "./base64";
  const COMP_DIR = "./comp";
  const DECOMP_DIR = "./decomp";
  console.time("total");
  await compressFile(B64_DIR + "/1.base64");
  console.log(getFileSize("./base64/1.base64"));
  console.log(getFileSize("./comp-values/1_comp_values.txt"));
  console.log();
  await decompressFile("1_comp_values.txt");
  console.log();
  await compressFileContentsZLIBBrotli("./base64/1.base64");
  // await compressFilesInDir(B64_DIR);
  console.log();
  console.log(getFileSize("./comp-values/test"));

  console.log();
  // await decompressFilesInDir(COMP_DIR);
  console.log();
  // await testPreAndPostCompressDecompressFiles(B64_DIR, DECOMP_DIR);
  console.log();
  // await getCompressionStorageSavings(B64_DIR, COMP_DIR);
  console.timeEnd("total");
} catch (err) {
  console.error(err);
}
