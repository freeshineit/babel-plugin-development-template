const gulp = require('gulp')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const del = require('del')
const header = require('gulp-header')
const tsconfig = require('./tsconfig.json')
const packageJson = require('./package.json')

const banner = `/*
 * ${packageJson.name} ${packageJson.version}
 * ${packageJson.description}
 * ${packageJson.homepage}
 *
 * Copyright 2022, ${packageJson.author}
 * Released under the ${packageJson.license} license.
 */\n`

/** 清空lib下的文件 */
function clean() {
  return del('./lib/**')
}

function buildCJS() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
  })
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/__tests__/**/*', '**/*.{spec,test}.{ts,tsx}'],
    })
    .pipe(tsProject)
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(header(banner))
    .pipe(gulp.dest('lib/'))
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
    declaration: true,
    emitDeclarationOnly: true,
  })
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/__tests__/**/*', '**/*.{spec,test}.{ts,tsx}'],
    })
    .pipe(tsProject)
    .pipe(header(banner))
    .pipe(gulp.dest('lib/'))
}

exports.default = gulp.series(clean, buildCJS, gulp.parallel(buildDeclaration))
