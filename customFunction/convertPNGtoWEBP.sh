#!/bin/bash

logFilename="convertPNGtoWEBP.txt"
touch "$logFilename"
for file in *.png
do
  echo "$file" | tee -a "$logFilename"
  name="${file%.png}"
  webpName="${name}.webp"
  echo "$webpName" | tee -a "$logFilename"
  convert "$file" -quality 100 -define webp:lossless=true "$webpName"
  echo "" | tee -a "$logFilename"
done