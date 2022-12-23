import { writeFileSync, readFileSync, opendirSync } from "node:fs";
import { Buffer } from "node:buffer";

const FILE = "./toonme/toonme_eda3e3_2_flipped (1) copy7.png";
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
      const relativePathFilename = "./"+ DIR + "/" + dirent.name;
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
try {
  // convertDir(DIR);
  convert(FILE);
} catch (err) {
  console.error(err);
}
