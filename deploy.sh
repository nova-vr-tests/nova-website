#!/bin/bash


git status

git checkout -b master
git add -f frontend/build
git status

git commit -m "build"
git status
