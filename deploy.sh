#!/bin/bash

git status

git checkout master
git add -f frontend/build
git status

git commit -m "build"
git status
