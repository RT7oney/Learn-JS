#!/bin/sh


rm -rf dist

webpack --config build/webpack.build.js

cp -rf ./static ./dist/static

