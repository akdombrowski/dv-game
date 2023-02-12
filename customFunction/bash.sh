for file in *_h.png
do
  name=katpcha-me-`uuidgen -r`
  echo "${file/name}"
done