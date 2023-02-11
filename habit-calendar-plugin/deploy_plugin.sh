#!/bin/bash

# ENV
SRC="$(pwd)"
# https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836?permalink_comment_id=3710638#gistcomment-3710638

# Target directory to your Obsidian vault
DEST="/Users/$USER/Library/Mobile Documents/iCloud~md~obsidian/Documents/Zettelkasten/.obsidian/plugins"
# BEGIN

echo $SRC

rm -rf $SRC/plugin
mkdir -p $SRC/plugin
cp main.js $SRC/plugin/main.js
cp manifest.json $SRC/plugin/manifest.json
cp versions.json $SRC/plugin/versions.json
cp styles.css $SRC/plugin/styles.css

# COPY
echo Rsync to $DEST
rsync -av --verbose --whole-file --times --exclude=".DS_Store" "$SRC" "$DEST"
