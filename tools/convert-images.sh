#!/usr/bin/env bash
set -euo pipefail

# Requires ImageMagick 'magick' in PATH
IMG_DIR="docs/assets/img"
QUALITY_WEBP=82
QUALITY_AVIF=50

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick 'magick' is required. Install it and re-run." >&2
  exit 1
fi

shopt -s nullglob
for f in "$IMG_DIR"/*.{png,jpg,jpeg,JPG,JPEG,PNG}; do
  base="${f%.*}"
  webp="$base.webp"
  avif="$base.avif"
  echo "Converting: $f -> ${webp##*/}, ${avif##*/}"
  magick "$f" -strip -interlace Plane -quality $QUALITY_WEBP "$webp"
  magick "$f" -strip -colorspace sRGB -quality $QUALITY_AVIF "$avif"
done

echo "Done. Files written next to originals in $IMG_DIR."
echo "Update HTML <picture> sources to use .avif/.webp where available."

