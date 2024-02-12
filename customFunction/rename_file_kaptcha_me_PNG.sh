#!/bin/bash

for file in ./*.png
do
  name=katpcha-me-`uuidgen -r`
  echo "${file}"
  echo "${name}"
  cp $file ${name}.png
done