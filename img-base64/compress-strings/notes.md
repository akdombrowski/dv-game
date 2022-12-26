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
