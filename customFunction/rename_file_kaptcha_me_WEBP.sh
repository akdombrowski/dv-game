#!/bin/bash

# this is a filename change which should be fine
for file in ./*.webp
do
  name=katpcha-me-`uuidgen -r`
  echo "${file}"
  echo "${name}"
  cp $file ${name}.webp
done