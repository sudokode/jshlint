// Copyright (c) 2016 sudokode

/**
 * This source ('lint.js') is licensed under the JSON License.
 * A copy is provided in the git repository:
 *    https://github.com/sudokode/jshlint
 */

/*global load, read, print, quit, jslint*/

/**
 * Use JSLint on a source file
 *
 * Loads the given file, runs it through jslint(),
 * and prints out the warnings
 */

(function (args) {
  'use strict';

  /**
   * Create a string with <pattern> repeated <count> times
   * The `js` interpreter lacks this function :(
   *
   * @param {String} pattern
   * @param {Number} count
   * @return {String} result
   */
  function repeat(pattern, count) {
    let result = '';

    while (count >= 1) {
      result += pattern;
      count -= 1;
    }

    return result;
  }

  /**
   * Read a file, run jslint() on it, and print the result
   *
   * @param {String} file
   * @return {Boolean}
   */
  function lint(file) {
    let source;
    let result;

    let options = {
      white: true,
      browser: true,
      es6: true
    };

    try {
      // why?
      source = read('../../..' + file);
    } catch(e1) {
      try {
        source = read(file);
      } catch (e2) {
        print(e1 + '\n' + e2);
        return false;
      }
    }

    if (!source) {
      print('Empty file:', file);
      return false;
    }

    result = jslint(source, options);

    if (result === undefined) {
      print('Problem with jslint');
      return false;
    }

    print(result.id, result.edition + '\n');

    print('JSON file:', result.json + '\n');

    if (!result.json) {
      print('Modules:', result.module);
      print('Imports:', result.imports.length);
      print('Directives:', result.directives.length);
      print('Functions:', result.functions.length + '\n');
    }

    if (result.ok) {
      print('No warnings');
      return true;
    }

    if (result.warnings.length === 0) {
      print('No warnings, but result not OK');
    }

    print(' Warnings');
    print('==========');

    result.warnings.forEach(function(warning) {
      const beginsWithWhite = /^\s+/;
      let lineCol;
      let prevLine;
      let line;
      let whitespace = '';
      let msg = '';

      print();

      lineCol = ' line ' + (warning.line + 1) + ', column ' + (warning.column + 1) + '\n';
      lineCol += repeat('-', lineCol.length);
      print(lineCol);

      prevLine = result.lines[warning.line - 1];
      line = result.lines[warning.line];

      if (beginsWithWhite.test(line)) {
        whitespace = beginsWithWhite.exec(line)[0];
      }

      if (prevLine) {
        print(prevLine);
      }
      print(line);

      msg = repeat(' ', warning.column - whitespace.length);
      msg += whitespace + '^ ' + warning.message;

      print(msg);
    });

    print('\nWarnings:', result.warnings.length);

    if (result.stop) {
      print('\nCould not process entire file:', file);
      return false;
    }

    return true;
  }

  /**
   * Verify file argument, load jslint.js, call lint() on the file
   *
   * @param {Array} args
   */
  function main(args) {
    let success;

    if (!args[0]) {
      print('Source file required');
      quit();
    }

    try {
      load('jslint.js');
    } catch (e1) {
      try {
        load('/usr/lib/jshlint/jslint.js');
      } catch (e2) {
        print(e1 + '\n' + e2);
        quit(1);
      }
    }

    success = lint(args[0]);

    if (!success) {
      quit(1);
    }

    quit();
  }

  main(args);

}(arguments));
