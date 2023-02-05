#!/bin/bash

# ENV
# https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836?permalink_comment_id=3710638#gistcomment-3710638
DEST="/Users/$USER/Library/Mobile Documents/iCloud~md~obsidian/Documents/Zettelkasten/.obsidian/plugins/obsidian-habit-calendar/"
SRC="/Users/$USER/Code/obsidian-habit-calendar/habit-calendar-plugin/plugin/"
# BEGIN

rm -rf plugin
mkdir -p plugin
cp main.js ./plugin/main.js
cp manifest.json ./plugin/manifest.json
cp versions.json ./plugin/versions.json
cp styles.css ./plugin/styles.css

# COPY
echo Rsync to $DEST
# cp -R ./plugin "$p/"


rsync -av --verbose --whole-file --times --exclude=".DS_Store" "$SRC" "$DEST"
