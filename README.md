This is a basic app to use as a starter.

# Code Organization

The project is organized into two three main folders:

* /client - client-side code
* /server - server-side code
* /config - server-side configuration

See the README files in each of those directories for details on each.

Unless stated otherwise, all commands should always be run from the root
directory.

# NPM and Bower setup

The starter project comes with package.json and bower.json files which are
just shells. Run `bash jumpstart.sh` to load the latest versions of all the
standard packages.

# Gulp

This project uses Gulp for routine tasks. In particular, the following gulp
commands are setup by default.

## gulp lint

Runs JSHint on client and server files. JSHint options are read from
.jshintrc, but please avoid modifying this file.

## gulp beautify

Beautifies client and server files using 'js-beautify'. Beautification options
are read from .jsbeautifyrc, but please avoid modifying this file.

## gulp develop

Runs the server and watches for file changes. When something changes, the code
is re-linted and the server is restarted.




