import { writeFileSync, readFileSync } from "node:fs";
import { Buffer } from "node:buffer";

const FILE = "toonmecom_eda3e3_2.png";

const convert = (filename) => {
  const buf = readFileSync(filename);
  const base64Output = buf.toString("base64");
  const base64OutputFile = filename + "_base64";

  console.log("writing to " + base64OutputFile);

  writeFileSync(base64OutputFile, base64Output);

  console.log("written!");

  return base64Output;
};

convert(FILE);
