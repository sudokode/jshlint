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
    let result = "";

    while (count > 0) {
      result += pattern;
      count -= 1;
    }

    return result;
  }

  /**
   * Read a file, run jslint() on it, and print the result
   * The return value decides the exit code, see main()
   *
   * @param {String} file
   * @return {Boolean}
   */
  function lint(file) {
    let source;
    let result;

    // Sane defaults?
    let options = {
      white: true,
      browser: true,
      es6: true
    };

    try {
      // `js` is weird
      source = read('../../..' + file);
    } catch(e1) {
      try {
        source = read(file);
      } catch (e2) {
        // Let the user know both files failed
        print(e1 + '\n' + e2);
        return false;
      }
    }

    // `jshlint` already checks for this *shrug*
    if ( ! source) {
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

    // Ignore if file is JSON
    if ( ! result.json) {
      print('Modules:', result.module);
      print('Imports:', result.imports.length);
      print('Directives:', result.directives.length);
      print('Functions:', result.functions.length + '\n');
    }

    if (result.ok) {
      print('No warnings');
      return true;
    }

    // Not likely, also not fatal
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

      // Print the line/column heading
      lineCol = ' line ' + (warning.line + 1) + ', column ' + (warning.column + 1) + '\n';
      lineCol += repeat('-', lineCol.length);
      print(lineCol);

      // Grab the previous line for reference
      prevLine = result.lines[warning.line - 1];
      line = result.lines[warning.line];

      /**
       * Tabs may still break the spacing, but this
       * seems to mitigate it most of the time. When
       * running this on jquery-2.2.2.js (which fails),
       * it breaks. When linting test/tabs.js, it works.
       * I'll leave it up to you to choose to use tabs.
       */
      if (beginsWithWhite.test(line)) {
        whitespace = beginsWithWhite.exec(line)[0];
      }

      // Print a blank line anyway, reference is good
      print(prevLine);
      print(line);

      // Add spacing without the whitespace from before
      msg = repeat(' ', warning.column - whitespace.length);

      // Then use the whitespace from before to accomodate tabs
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

    if ( ! args[0]) {
      print('Source file required');
      quit(1);
    }

    try {
      load('jslint.js');
    } catch (e1) {
      try {
        load('/usr/lib/jshlint/jslint.js');
      } catch (e2) {
        // Let the user know both files failed
        print(e1 + '\n' + e2);
        quit(1);
      }
    }

    success = lint(args[0]);

    // The entire point of returning boolean from lint()
    if ( ! success) {
      quit(1);
    }

    quit();
  }

  main(args);

}(arguments));
