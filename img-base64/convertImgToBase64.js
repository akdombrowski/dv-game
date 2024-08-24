import { writeFileSync, readFileSync, opendirSync, openSync } from "node:fs";
import { basename } from "node:path";
import { Buffer } from "node:buffer";

const FILE = "./toonme/toonme_eda3e3_2_flipped (1) copy7.png";
const FILE1 = "img-base64/toonme/toonme_eda3e3_1.png";
const FILE2 = "img-base64/toonme/toonme_eda3e3_3.png";
// const DIR = "toonme";
const DIR = "anthony";

const convert = (filename) => {
  const buf = readFileSync(filename);
  const base64Output = buf.toString("base64");
  const separateFilename = filename.split("/");
  const base64OutputFile = "./base64/" + separateFilename[-1] + ".base64";

  console.log("writing to " + base64OutputFile);

  writeFileSync(base64OutputFile, base64Output);

  console.log("written!");

  return base64Output;
};

const convertDir = async (filename) => {
  const dir = opendirSync(filename);
  for await (const dirent of dir) {
    console.log(dirent.name);
    if (dirent.name) {
      const relativePathFilename = "./" + DIR + "/" + dirent.name;
      const buf = readFileSync(relativePathFilename);
      if (buf) {
        const base64Output = buf.toString("base64");
        const separateFilename = dirent.name.split(".");
        const base64OutputFile = "./base64/" + separateFilename[0] + ".base64";

        console.log("writing to " + base64OutputFile);

        writeFileSync(base64OutputFile, base64Output);

        console.log("written!");
      }
    }
  }

  return true;
};

const b64EncFile = async (fileDescriptor, dontPrintStdOut) => {
  const buf = readFileSync(fileDescriptor);
  const base64Output = buf.toString("base64");

  if (!dontPrintStdOut) {
    console.log("(truncated) base64 encoded " + fileDescriptor + " -");
    console.log();
    console.log(base64Output.slice(0, 100));
    console.log();
  }

  return base64Output;
};

const b64EncFilename = async (filename, dontPrintStdOut) => {
  const buf = readFileSync(filename);
  const base64Output = buf.toString("base64");

  if (!dontPrintStdOut) {
    console.log("(truncated) base64 encoded " + filename + " -");
    console.log();
    console.log(base64Output.slice(0, 100));
    console.log();
  }

  return base64Output;
};

const dimChar = (char) => {
  return `\x1b[2m${char}\x1b[0m`;
};

const colorizeChar = (char) => {
  // for TrueColor:
  // Set foreground color as RGB.
  // \x1b[38;2;{r};{g};{b}m
  // Set background color as RGB.
  // \x1b[48;2;{r};{g};{b}m
  // e.g.,
  // \x1b[48;2;47;24;71m

  // return `\x1b[38;2;247;236;89m\x1b[48;2;47;24;71m${char}\x1b[0m`;

  // bright yellow foreground using RGB (247;236;89) with
  // purple background using RGB (47;24;71)
  // return `\x1b[38;2;247;236;89;48;2;47;24;71m${char}\x1b[0m`;

  return `\x1b[1;31m${char}\x1b[0m`;
};

const getFilenameFromPath = (path) => {
  const filename = basename(path);

  return filename;
};

const getTerminalWidth = () => {
  if (!process.stdout.isTTY) {
    throw new Error("STDOut TTY not available", {
      cause: "Was this run from a text terminal? If not, it should.",
    });
  }

  const stdOutWidth = process.stdout.columns;

  return stdOutWidth;
};

const printWordTerminalWidthChars = (word) => {
  const width = getTerminalWidth() - 3;

  for (
    let i = 0;
    i < word.length;
    i + width < word.length ? (i += width) : (i += word.length)
  ) {
    let end = i + width;
    let end1 = end <= word.length ? end : word.length;

    if (end1 > i) {
      console.log("...", word.slice(i, end1).join(""), "...");
    }

    console.log();
  }
};
const print2WordsTerminalWidthChars = (word1, word2) => {
  const width = getTerminalWidth() - 3;

  for (
    let i = 0;
    i < Math.max(word1.length, word2.length);
    i + width < Math.max(word1.length, word2.length)
      ? (i += width)
      : (i += Math.max(word1.length, word2.length))
  ) {
    let end = i + width;
    let end1 = end <= word1.length ? end : word1.length;
    let end2 = end <= word2.length ? end : word2.length;

    if (end1 > i) {
      console.log("...", word1.slice(i, end1).join(""), "...");
    }

    if (end2 >= i) {
      console.log("...", word2.slice(i, end2).join(""), "...");
    }
    console.log();
  }
};

const compareDirBase64Encodings = async (dirname) => {
  const dir = opendirSync(dirname);
  const files = new Buffer[2]();

  for await (const dirent of dir) {
    console.log(dirent.name);
    if (dirent.name) {
      const relativePathFilename = "./" + DIR + "/" + dirent.name;
      const buf = readFileSync(relativePathFilename);
      if (buf) {
        files.push(buf);
      }
    }
  }
  console.log("Which 2 files would you like to compare?");

  // TODO: INCOMPLETE. NEEDS WORK.
  // compareFilesB64Enc(file1, file2);

  const rows = 4;
  const startIndex = 2000;
  const endIndex = startIndex + getTerminalWidth() * rows - rows * 3;
  // print2WordsTerminalWidthChars(
  //   b64Arr1.slice(startIndex, endIndex),
  //   b64Arr2.slice(startIndex, endIndex),
  // );

  // printTerminalWidthChars(b64Arr1.slice(0, 1000), b64Arr2.slice(0, 1000));
  // printWordTerminalWidthChars(b64Arr1);
  // printWordTerminalWidthChars(b64Arr2);
  console.log("FILE 1 (first 5000 chars)");
  console.log(b64Arr1.slice(0, 5000).join("") + "...");
  console.log();
  console.log("FILE 2 (first 5000 chars)");
  console.log(b64Arr2.slice(0, 5000).join("") + "...");
  console.log();

  return rImgsSame;
};

const compareB64EncBuffers = async (
  buff1,
  buff2,
  name1,
  name2,
  startingCharIndex,
  endingCharIndex,
  rows,
) => {
  const b64Str1 = buff1.toString("base64");
  const b64Str2 = buff2.toString("base64");

  const rImgsSame = b64Str1 === b64Str2;

  const b64Arr1 = Array.from(b64Str1);
  const b64Arr1Len = b64Arr1.length;

  const b64Arr2 = Array.from(b64Str2);
  const b64Arr2Len = b64Arr2.length;

  const maxLen = Math.max(b64Arr1Len, b64Arr2Len);

  for (let i = 0; i < maxLen; i++) {
    let c1,
      c2 = "";
    if (i < b64Arr1Len) {
      c1 = b64Arr1[i];
    }
    if (i < b64Arr2Len) {
      c2 = b64Arr2[i];
    }

    // c2 has to exist since we must be using the max length from array 2 which
    // is longer than array 1, hence why c1 doesn't exist
    if (!c1) {
      b64Arr2[i] = colorizeChar(c2);
    } else if (!c2) {
      // similar situation here as above conditional except we also get the
      // benefit of having verified c1 exists by virtue of that conditional of
      // this if else statement failing and falling through to this one
      b64Arr1[i] = colorizeChar(c1);
    } else if (c1 !== c2) {
      b64Arr1[i] = colorizeChar(c1);
      b64Arr2[i] = colorizeChar(c2);
    } else {
      b64Arr1[i] = dimChar(c1);
      b64Arr2[i] = dimChar(c2);
    }
  }
  // b64Arr1.forEach((c1, i, arr) => {
  //   if (c1 !== b64Arr2[i]) {
  //     arr[i] = colorizeChar(c1);
  //     b64Arr2[i] = colorizeChar(b64Arr2[i]);
  //   }
  // });

  console.log();
  console.log("(image 1 b64 encoded == image 2 b64 encoded) \t=\t", rImgsSame);
  console.log(
    `word1 length = ${b64Arr1.length} \t word2 length = ${b64Arr2.length}`,
  );
  console.log();

  // printTerminalWidthChars(b64Arr1, b64Arr2);
  // printTerminalWidthChars(b64Arr1, b64Arr2);

  // const rows = 4;

  // const startIndex = 2000;
  const startIndex = startingCharIndex || 0;
  const endIndex = rows
    ? startIndex + getTerminalWidth() * rows - rows * 3
    : (endingCharIndex ?? startIndex + getTerminalWidth() - 3);

  // print2WordsTerminalWidthChars(
  //   b64Arr1.slice(startIndex, endIndex),
  //   b64Arr2.slice(startIndex, endIndex),
  // );

  // printTerminalWidthChars(b64Arr1.slice(0, 1000), b64Arr2.slice(0, 1000));
  // printWordTerminalWidthChars(b64Arr1);
  // printWordTerminalWidthChars(b64Arr2);
  const n1 = name1 || "";
  const n2 = name2 || "";
  console.log(`1: ${n1} (chars from (${startIndex}, ${endIndex}))`);
  console.log(b64Arr1.slice(0, endIndex).join("") + "...");
  console.log();
  console.log(`2: ${n2} (chars from (${startIndex}, ${endIndex}))`);
  console.log(b64Arr2.slice(0, endIndex).join("") + "...");
  console.log();

  return rImgsSame;
};

const compareFilesB64Enc = async (
  filename,
  filename2,
  startingCharIndex,
  endingCharIndex,
  rows,
) => {
  const fd1 = openSync(filename);
  const fd2 = openSync(filename2);
  const b64Str1 = await b64EncFile(fd1, true);
  const b64Str2 = await b64EncFile(fd2, true);
  const name1 = getFilenameFromPath(filename);
  const name2 = getFilenameFromPath(filename2);

  const rImgsSame = await compareB64EncBuffers(
    b64Str1,
    b64Str2,
    name1,
    name2,
    rows,
    startingCharIndex,
    endingCharIndex,
    rows,
  );
  // const rImgsSame = b64Str1 === b64Str2;

  // const b64Arr1 = Array.from(b64Str1);
  // const b64Arr1Len = b64Arr1.length;

  // const b64Arr2 = Array.from(b64Str2);
  // const b64Arr2Len = b64Arr2.length;

  // const maxLen = Math.max(b64Arr1Len, b64Arr2Len);

  // for (let i = 0; i < maxLen; i++) {
  //   let c1,
  //     c2 = "";
  //   if (i < b64Arr1Len) {
  //     c1 = b64Arr1[i];
  //   }
  //   if (i < b64Arr2Len) {
  //     c2 = b64Arr2[i];
  //   }

  //   // c2 has to exist since we must be using the max length from array 2 which
  //   // is longer than array 1, hence why c1 doesn't exist
  //   if (!c1) {
  //     b64Arr2[i] = colorizeChar(c2);
  //   } else if (!c2) {
  //     // similar situation here as above conditional except we also get the
  //     // benefit of having verified c1 exists by virtue of that conditional of
  //     // this if else statement failing and falling through to this one
  //     b64Arr1[i] = colorizeChar(c1);
  //   } else if (c1 !== c2) {
  //     b64Arr1[i] = colorizeChar(c1);
  //     b64Arr2[i] = colorizeChar(c2);
  //   } else {
  //     b64Arr1[i] = dimChar(c1);
  //     b64Arr2[i] = dimChar(c2);
  //   }
  // }
  // // b64Arr1.forEach((c1, i, arr) => {
  // //   if (c1 !== b64Arr2[i]) {
  // //     arr[i] = colorizeChar(c1);
  // //     b64Arr2[i] = colorizeChar(b64Arr2[i]);
  // //   }
  // // });

  // console.log();
  // console.log("(image 1 b64 encoded == image 2 b64 encoded) \t=\t", rImgsSame);
  // console.log(
  //   `word1 length = ${b64Arr1.length} \t word2 length = ${b64Arr2.length}`,
  // );
  // console.log();

  // // printTerminalWidthChars(b64Arr1, b64Arr2);
  // // printTerminalWidthChars(b64Arr1, b64Arr2);

  // // const rows = 4;

  // // const startIndex = 2000;
  // const startIndex = startingCharIndex;
  // const endIndex = startIndex + getTerminalWidth() * rows - rows * 3;

  // // print2WordsTerminalWidthChars(
  // //   b64Arr1.slice(startIndex, endIndex),
  // //   b64Arr2.slice(startIndex, endIndex),
  // // );

  // // printTerminalWidthChars(b64Arr1.slice(0, 1000), b64Arr2.slice(0, 1000));
  // // printWordTerminalWidthChars(b64Arr1);
  // // printWordTerminalWidthChars(b64Arr2);

  // console.log("1st (first 5000 chars)");
  // console.log(b64Arr1.slice(0, 5000).join("") + "...");
  // console.log();
  // console.log("2nd (first 5000 chars)");
  // console.log(b64Arr2.slice(0, 5000).join("") + "...");
  // console.log();

  return rImgsSame;
};

try {
  // convertDir(DIR);
  // convert(FILE);
  const rImgsSame = await compareFilesB64Enc(FILE1, FILE2);
} catch (err) {
  console.error(err);
}
