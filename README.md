jshlint
=======

Use Douglas Crockford's [JSLint](https://github.com/douglascrockford/JSLint) on a JavaScript or JSON file directly in a console.

Dependencies
------------

- `jslint` - Required for linting ([link](https://github.com/douglascrockford/JSLint))
- `js` - Required to run the linter in a console

Usage
-----

`jshlint` is a shell script that runs the `js` JavaScript interpreter with `lint.js`.  
`lint.js` is a (poorly) written JS application that will load the provided file, run it through `jslint`, and return information and warnings about the source.

```
$ ./jslint lint.js
(JSLint) 2016-03-20

JSON file: false

Modules: false
Imports: 0
Directives: 1
Functions: 4

Warnings
========

line 70, column 21
------------------
      lineCol = "line " + warning.line + ", column " + warning.column + "\n";
      lineCol += new Array(lineCol.length).join('-');
                     ^ Expected '[]' and instead saw 'new Array'.

line 81, column 16
------------------
      msg = new Array(warning.column + 1).join(' ');
                ^ Expected '[]' and instead saw 'new Array'.

line 115, column 2
------------------
}(arguments));
  ^ Unexpected 'arguments'.

Warnings: 3
```

License
-------

All work is licensed under the JSON license, the same one that `jslint` uses. It has been redistributed here for packaging purposes.

*If you decide to use this for evil, you do so at your own legal risk.*
