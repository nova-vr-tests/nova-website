#!/bin/bash


git status

git checkout -b prod
git add -f frontend/build
git status

git commit -m "build"
git status
