# process for compressing and decompressing

   &nbsp;

   ***
   ***
   ***

## compression

1. base64 encode png

2. create a buffer from the base64 file or from a string

   ```js

   const buf = readFileSync(
         path.resolve(filenamePathObj.dir, filenamePathObj.base)
   );

   /**
   *
   *
   * or from a string
   *
   *
   */

   // Create buffer from the base64 encoded png
   const buf = Buffer.from("base64-encoded-png")

   ```

3. brotli compress the string

   ```js

   // This import syntax is for running in nodejs
   // Convert appropriately for running in browser
   import zlib from "node:zlib";

   const compressed = zlib.brotliCompressSync(buf, {
         [zlib.constants.BROTLI_PARAM_MODE]:
            zlib.constants.BROTLI_MODE_TEXT,
         [zlib.constants.BROTLI_PARAM_QUALITY]:
            zlib.constants.BROTLI_MAX_QUALITY,
         [zlib.constants.BROTLI_PARAM_SIZE_HINT]:
            statSync(filename).size,
   });

   ```

   Output is a buffer.

4.
   Save or write that compressed buffer output to a file with converting to a base64 encoded string.

      ```js

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

      // convert buffer to base64 string then write to file
      writeSync(compressedOutputFileB64FD, compressed.toString("base64"));

      ```

&nbsp;

***
***
***

&nbsp;

## storage

1. Take the compressed contents

   ```js

   // This import syntax is for running in nodejs
   // Convert appropriately for running in browser
   import zlib from "node:zlib";
   import { Buffer } from "node:buffer";

   // Create buffer from the base64 encoded png
   const buf = Buffer.from("base64-encoded-png")

   // Compress or get compressed contents
   const compressed = zlib.brotliCompressSync(buf, {
         [zlib.constants.BROTLI_PARAM_MODE]:
            zlib.constants.BROTLI_MODE_TEXT,
         [zlib.constants.BROTLI_PARAM_QUALITY]:
            zlib.constants.BROTLI_MAX_QUALITY,
         [zlib.constants.BROTLI_PARAM_SIZE_HINT]:
            statSync(filename).size,
   });

   const compressedB64String = compressed.toString("base64")

   ```

2. Store base64 encoded string

&nbsp;

***
***
***

## decompression

1. Take the previous contents as a string or read from file to a string

2. Create a buffer from the string (compressedB64String) specifying base64 encoding

   ```js

   /**
    * If using string (compressedB64String)
    */
   const decompressedCompressedB64ToB64Buf = Buffer.from(compressedB64String, "base64");
   const decompressedCompressedB64 = zlib.brotliDecompressSync(decompressedCompressedB64ToB64Buf, {
         [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
         [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
         [zlib.constants.BROTLI_PARAM_SIZE_HINT]: len,
   });

   ```

3. Transcode from binary to utf8

   ```js

   import buffer from "node:buffer";

   const decompressedCompressedB64AndTranscodedToUTF8 = buffer.transcode(
         decompressedCompressedB64,
         "binary",
         "utf8"
   );

   ```

4. convert to string with utf8 encoding or write buffer to file (default was utf8 encoding for writing a buffer)

   - Don't convert to a string with base64 encoding.

     - This will base64 encode our original base64 encoded contents (basically base64 encoding the original png binary twice)

&nbsp;

***
***
***

## testing

1. Use buffers and the equals() or compare() functions

   - Don't use '==='

   ```js
   console.log();
   console.log("originalB64Buf.equals(decompressedCompressedB64AndTranscodedToUTF8)");
   console.log(originalB64Buf.equals(decompressedCompressedB64AndTranscodedToUTF8));

   console.log();
   console.log("originalB64Buf.compare(decompressedCompressedB64AndTranscodedToUTF8)");
   console.log(originalB64Buf.compare(decompressedCompressedB64AndTranscodedToUTF8));
   ```

&nbsp;

***
***
***

&nbsp;

## need to figure out how to store as plain text in between compression and deconpression

&nbsp;

- try converting output of compression to base64url (or base64)

  - look at decompression func

  - figured it out! updated the above with storage section!

&nbsp;

- hex looks like it'll be bigger in size and could possibly drop some data

&nbsp;

## example output from run of script

```
node --trace-warnings --trace-sigint --trace-uncaught ./compress-strings/compressStrings.js

reading from 1.base64
read: 0.168ms

... compressing file contents ...
size hint: 115604

compressed!
compression: 84.179ms

... writing to ./base64CompressedBrotli/1_compressed_brotli.bin ...
... writing to ./base64CompressedBrotli/1_compressed_brotli_utf8.txt ...
... writing to ./base64CompressedBrotli/1_compressed_brotli_b64.txt ...

written!
write: 2.589ms

total for zlib's brotli compressing 1.base64: 89.189ms

len 115604

reading from 1_compressed_brotli.bin
read!

reading from 1_compressed_brotli_utf8.txt
read!

reading from 1_compressed_brotli_b64.txt
read!
read: 0.601ms

... decompressing file 1_compressed_brotli.bin ...
decompressed!

... decompressing file 1_compressed_brotli_b64.txt ...
decompressed!

all files decompressed!
decompression: 2.092ms

... writing to ./base64DecompressedBrotli/1_brotli_decompressed_brotli.bin ...
written!
... writing to ./base64DecompressedBrotli/1_brotli_decompressed_brotli_b64.txt ...
written!

written!
write: 0.269ms

beginningOfTranscodedBin
iVBORw0KGgoAAAANSUhEUgAAANAAAAFLCAYAAACncgJAAAAnK3

beginningOfTranscodedB64
iVBORw0KGgoAAAANSUhEUgAAANAAAAFLCAYAAACncgJAAAAnK3

originalFileBuf === decompressedBinAndTranscodedUTF8
false
originalFileBuf.equals(decompressedBinAndTranscodedUTF8)
true
originalFileBuf.compare(decompressedBinAndTranscodedUTF8)
0

originalFileBuf.equals(decompressedB64AndTranscodedUTF8)
true
originalFileBuf.compare(decompressedB64AndTranscodedUTF8)
0

transcoded === bufToUInt8Array2
0

transcoded === bufToUInt8Array
0

compare two bufs pre-anything then post-compression-then-decompression
-1
compare two bufs pre-anything then post-compression-then-decompression-b64-buffer
-1
compare two bufs pre-anything then post-compression-then-decompression-b64-const-buffer
-1
Buffer.byteLength(/home/adombrowski/workspace/dv-game/img-base64/base64/1.base64)
115604
Buffer.byteLength(/home/adombrowski/workspace/dv-game/img-base64/base64/1.base64, "base64")
115604
Buffer.byteLength(decompressedBinBuf.toString("base64"))
154140
Buffer.byteLength(decompressedBinBuf.toString("base64"), "base64")
115604

total for decompressing 1_compressed_brotli.bin: 4.669ms
```
