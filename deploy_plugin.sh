#!/bin/bash

# ENV
# https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836?permalink_comment_id=3710638#gistcomment-3710638
obsidian_vault_path=$(grep ^OBSIDIAN_VAULT_PATH=.* ./.env | cut -d "=" -f 2);

# BEGIN

mkdir -p plugin
cp main.js ./plugin/main.js
cp manifest.json ./plugin/manifest.json
cp versions.json ./plugin/versions.json
cp styles.css ./plugin/styles.css

# COPY
p="$obsidian_vault_path/obsidian-habit-calendar"
echo Copying to $p
mkdir -p $p
cp ./plugin/* $p/
