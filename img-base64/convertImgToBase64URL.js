import { writeFileSync, readFileSync } from "node:fs";

const FILE = "toonmecom_eda3e3_2_flipped (1).png";

const convert = (filename) => {
  const buf = readFileSync(filename);
  const base64Output = buf.toString("base64url");
  const base64OutputFile = filename + "_base64url";

  console.log("writing to " + base64OutputFile);

  writeFileSync(base64OutputFile, base64Output);

  console.log("written!");

  return base64Output;
};

convert(FILE);
