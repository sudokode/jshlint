jshlint
=======

Use Douglas Crockford's [JSLint](https://github.com/douglascrockford/JSLint) on a JavaScript or JSON file directly in a console.

Dependencies
------------

- `jslint` - Required for linting ([link](https://github.com/douglascrockford/JSLint))
- `js` - Required to run the linter in a console

Usage
-----

`jshlint` is a (hacky) shell script that runs the `js` JavaScript interpreter with `lint.js`.

`lint.js` is a (poorly written) JS application that will load the provided file, run it through `jslint`, and return information and warnings about the source.

```
$ jshlint lint.js
(JSLint) 2016-03-20

JSON file: false

Modules: false
Imports: 0
Directives: 1
Functions: 5

Warnings
========

line 155, column 3
-------------------
}(arguments));
  ^ Unexpected 'arguments'.

Warnings: 1
```

*Tabs may or may not break the warning message spacing.*

Notes
-----
`jshlint` expects `lint.js` to be in the current working directory or `/usr/lib/jshlint/`. Likewise, `lint.js` expects `jslint.js` to be in in the CWD or `/usr/lib/jshlint/`.

It might be better to use `#!/usr/bin/env js` and feed `lint.js` directly into the interpreter rather than relying on a hacky shell script to find `lint.js` and run it through `js`. This would mean renaming `lint.js` to `jshlint`.

License
-------

All work is licensed under the JSON license, the same one that `jslint` uses. It has been redistributed here for packaging purposes.

*If you decide to use this for evil, you do so at your own legal risk.*
