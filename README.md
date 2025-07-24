# then-recursively-search

[![Code Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com/)
[![Test](https://github.com/DPassarelli/then-recursively-search/actions/workflows/node.js.yml/badge.svg)](https://github.com/DPassarelli/then-recursively-search/actions/workflows/node.js.yml)
[![Code Coverage](https://codecov.io/gh/DPassarelli/then-recursively-search/branch/main/graph/badge.svg?token=VU8TSEK50Y)](https://codecov.io/gh/DPassarelli/then-recursively-search)

A Promise-based Node module that recursively searches for a file, moving up the directory tree until found.

## Why

I needed to start my GitHub/NPM publishing journey somewhere, and this seemed like a good starting point. I wanted it to be [FIRST](https://addyosmani.com/first/).


## How to use it

### Install

```
npm install then-recursively-search
```


### API

#### `fn(filename[, startIn])`

* @param {String} `filename` - The name (including extension) of the file to search for. Not case-sensitive.
* @param {String?} `startIn` - The directory to begin searching in. If not specified, then defaults to the same value as the location of the caller.
* @return {Promise} - Fulfilled with the complete path to the file (if found); otherwise, rejected.


#### Example

```
const findFile = require('then-recursively-search')

findFile('package.json')
  .then(function (pathspec) {
    // `pathspec` will be a complete path to the nearest `package.json` file in any folder above `__dirname`
  })
```


## Test

Couldn't be easier...

```
npm test
```


## License

**ISC**

Copyright (c) [David Passarelli](mailto:dpassarelli@camelotcg.com)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
