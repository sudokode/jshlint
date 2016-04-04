/*
 * Use JSLint on a source file
 *
 * Loads the given file, runs it through jslint(),
 * and prints out the warnings
 */

/*global load, read, print, quit, jslint*/

load("jslint.js");

(function(args) {
  "use strict";

  function lint(file) {
    let source;
    let result;

    try {
      source = read(file);
    } catch(err) {
      print(err);
      return false;
    }

    if (!source) {
      print("Empty file: " + file);
      return false;
    }

    result = jslint(source, {"white": true, "browser": true, "es6": true});

    if (result === undefined) {
      print("Problem with jslint");
      return false;
    }

    print(result.id, result.edition + "\n");

    print("JSON file:", result.json + "\n");

    if (!result.json) {
      print("Modules:", result.module);
      print("Imports:", result.imports.length);
      print("Directives:", result.directives.length);
      print("Functions:", result.functions.length + "\n");
    }

    if (result.ok) {
      print("No warnings");
      return true;
    }

    if (result.warnings.length === 0) {
      print("No warnings, but result not OK");
      return false;
    }

    print("Warnings");
    print("========");

    result.warnings.forEach(function(warning) {
      let lineCol;
      let prevLine;
      let line;
      let msg;

      print();

      lineCol = "line " + warning.line + ", column " + warning.column + "\n";
      lineCol += new Array(lineCol.length).join('-');
      print(lineCol);

      prevLine = result.lines[warning.line - 1];
      line = result.lines[warning.line];

      if (prevLine) {
        print(prevLine);
      }
      print(line);

      msg = new Array(warning.column + 1).join(' ');
      msg += "^ " + warning.message;
      print(msg);
    });

    print("\nWarnings: " + result.warnings.length);

    if (result.stop) {
      print("\nCould not process entire file: " + file);
      return false;
    }

    return true;
  }

  function main(args) {
    let success;

    if (!args[0]) {
      print("Source file required");
      quit();
    }

    success = lint(args[0]);

    if (!success) {
      quit(1);
    }

    quit();
  }

  main(args);

}(arguments));
