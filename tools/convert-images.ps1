param(
  [string]$ImgDir = "docs/assets/img",
  [int]$WebpQuality = 82,
  [int]$AvifQuality = 50
)

function Require-Magick {
  if (-not (Get-Command magick -ErrorAction SilentlyContinue)){
    Write-Error "ImageMagick 'magick' is required. Install it and re-run."
    exit 1
  }
}

Require-Magick

Get-ChildItem -Path $ImgDir -File -Include *.png,*.jpg,*.jpeg,*.JPG,*.JPEG,*.PNG | ForEach-Object {
  $src = $_.FullName
  $base = [System.IO.Path]::ChangeExtension($src, $null)
  $webp = "$base.webp"
  $avif = "$base.avif"
  Write-Host "Converting: $($_.Name) -> $(Split-Path $webp -Leaf), $(Split-Path $avif -Leaf)"
  magick "$src" -strip -interlace Plane -quality $WebpQuality "$webp"
  magick "$src" -strip -colorspace sRGB -quality $AvifQuality "$avif"
}

Write-Host "Done. Files written next to originals in $ImgDir."
Write-Host "Update HTML <picture> sources to use .avif/.webp where available."

