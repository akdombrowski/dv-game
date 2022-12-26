# process for compressing and decompressing

## compression

1. base64 encode png

2. read base64

3. this creates a buffer (or a string if you provide an encoding when reading file with readfilesync)

4. brotli compress the buffer (buf) or string

   ```javascript
   zlib.brotliCompressSync(buf, {
        [zlib.constants.BROTLI_PARAM_MODE]:
            zlib.constants.BROTLI_MODE_TEXT,
        [zlib.constants.BROTLI_PARAM_QUALITY]:
            zlib.constants.BROTLI_MAX_QUALITY,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]:
            statSync(filename).size,
   });
   ```

5. Output is a buffer. Save or write that compressed buffer output to a
   file without converting to a string

    &nbsp;

    ***

    &nbsp;
    &nbsp;

## decompression

6. Take the previous contents or read from file

7. decompress the buffer (bufBin)

   ```javascript

   zlib.brotliDecompressSync(bufBin, {
     [zlib.constants.BROTLI_PARAM_MODE]:
        zlib.constants.BROTLI_MODE_TEXT,
     [zlib.constants.BROTLI_PARAM_QUALITY]:
        zlib.constants.BROTLI_MAX_QUALITY,
     [zlib.constants.BROTLI_PARAM_SIZE_HINT]:
        len,
   });

   ```

8. convert to string with utf8 encoding or write buffer to file (default was utf8 encoding for writing a buffer)

    &nbsp;

***

&nbsp;
&nbsp;

## need to figure out how to store as plain text in between compression and deconpression

- try converting output of compression to base64url (or base64)
- hex looks like it'll be bigger in size and could possibly drop some data

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
