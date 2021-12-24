# Changelog for then-recursively-search

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/), and this project adheres to [Semantic Versioning](http://semver.org/).

## [5.0.0] - 2021-12-24

This was my starting point for learning [Cucumber](https://cucumber.io/docs/guides/overview/). Fun!

### Removed

* Dropped support for Node 8 and 10.

### Added

* The API now supports calling with a single parameter. In this case, the parameter is assumed to be the name of a file, and the starting directory is set to that of the caller.
* Added support for Node 14 and 16.

### Changed

* BREAKING - The parameter order has been swapped to better facilitate calling with a single parameter. Instead of `startIn, filename`, the signature is now `filename[, startIn]`.
* BREAKING - The case of the file name is no longer a factor in determining if the search was successful.
* Updated all dependencies.


## [4.0.0] - 2020-03-23

### Removed

* Dropped support for Node 6.

### Added

* Added support for Node 12.

### Changed

* Moved settings for `mocha` from `mocha.opts` to `package.json` (see https://github.com/mochajs/mocha/pull/3968)
* Updated `dev` dependencies.


## [3.0.1] - 2019-10-04

### Fixed

* Updated all dependencies.


## [3.0.0] - 2018-11-22

### Removed

* Dropped support for Node 4.

### Added

* Added support for Node 10.

### Changed

* Minor code simplifications.
* Updated all dependencies.


## [2.0.0] - 2018-02-19

### Removed

* Dropped support for Node < 4.
* Removed dependency on [bluebird](https://github.com/petkaantonov/bluebird).

### Added

* Added support for Node 8.

### Changed

* Updated all dependencies. Included a colorful badge for this in `README.md`.


## [1.0.1] - 2016-08-21

### Fixed

* Enabled support for Node v0.12 by fixing test case and removing `'use strict'`.
* Corrected repository links in `package.json` file.
