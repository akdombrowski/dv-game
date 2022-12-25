import { readFileSync, readdirSync, opendirSync } from "node:fs";

const DIR = "./base64";
const ColorControl = "\x1b";
const FgBlue = "[34m";
const BgRed = "[41m";
const ControlEnd = "\x1b[0m";

const findMatchingFileContents = async (dirname) => {
  const matches = {};
  const dir = readdirSync(dirname);
  if (dir) {
    if (dir.length <= 0) {
      throw new Error(
        dirname + " exists but is empty",
        { cause: "reading directory: " + dirname },
        dirname
      );
    }
    for (let i = 0; i < dir.length; i++) {
      const filename = dir[i];
      const relativeDirPath = dirname + "/";
      const file1Contents = readFileSync(relativeDirPath + filename)
        .toString("base64")
        .trim();
      console.log(filename);
      for (let j = 0; j < dir.length; j++) {
        if (i === j) {
          continue;
        }
        const filename2 = dir[j];
        const file2Contents = readFileSync(relativeDirPath + filename2)
          .toString("base64")
          .trim();
        if (file1Contents === file2Contents) {
          const matchesArr = matches[i];
          if (!matchesArr) {
            matches[filename] = [filename2];
          } else {
            matches[filename] = matchesArr.push(filename2);
          }
        } else {
          let mismatchVisualizationString1 = "";
          let mismatchVisualizationString2 = "";
          let str1 =
            file1Contents.length < file2Contents.length
              ? file1Contents
              : file2Contents;
          let str2 =
            file1Contents.length > file2Contents.length
              ? file1Contents
              : file2Contents;
          for (let k = 0; k < str1.length; k++) {
            let char1 = str1.charAt(k);
            let char2 = str2.charAt(k);
            if (str1.charAt(k) != str2.charAt(k)) {
              char1 =
                // ColorControl +
                // FgBlue +
                ColorControl +
                BgRed +
                char1 +
                ControlEnd;
              char1 =
                // ColorControl +
                // FgBlue +
                ColorControl +
                BgRed +
                char2 +
                ControlEnd;
            }
            mismatchVisualizationString1 += char1;
            mismatchVisualizationString2 += char2;
          }
          // console.log("mismatchVisualizationString1");
          // console.log(mismatchVisualizationString1);
          // console.log("mismatchVisualizationString2");
          // console.log(mismatchVisualizationString1);
        }
      }
    }
    console.log("matches");
    console.log(matches);
  } else {
    throw new Error("no dir found");
  }

  return true;
};

try {
  findMatchingFileContents(DIR);
} catch (err) {
  console.error(err);
}
