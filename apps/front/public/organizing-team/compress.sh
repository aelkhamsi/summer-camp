#!/bin/bash

# Loop through all PNG files in the current directory
for img in *.jpeg; do
  # Check if there are any PNG files
  if [[ -f "$img" ]]; then
    # Convert PNG to WebP using cwebp and rename the output to lowercase
    output_name=$(echo "$img" | tr '[:upper:]' '[:lower:]') # Convert the filename to lowercase
    cwebp -q 60 "$img" -o "${output_name%.png}.webp"
    rm "$img"
  fi
done