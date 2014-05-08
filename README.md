# grunt-gumup

> Concatenate Gumup units.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gumup --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gumup');
```

## Gumup task
_Run this task with the `grunt gumup` command._

Task targets, files and options may be specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

Any specified option will be passed through directly to [Gumup][], thus you can specify any option that Gumup supports.

[Gumup]: https://github.com/amsemy/gumup

#### cwd
Type: `String`  
Default: `'.'`

All `options` paths are relative to this path.

#### encoding
Type: `String`  
Default: `'utf-8'`

Unit files encoding.

#### externals
Type: `GumupOptions~externals[]`  
Default: `[]`

External units description.

#### gumupSpy
Type: `GumupOptions~gumupSpy`  
Default: `GumupSpy`

Constructor of the GumupSpy, used to parse the Gumup units.

#### onResolve
Type: `String` `Function`  
Default: `null`

Set the resolved dependencies as value into the project's Grunt configuration or pass them as an argument to user callback.
If it is `null` then the dependencies will be concatenated to the dest files.

#### separator
Type: `String`  
Default: `grunt.util.linefeed`

Concatenated files will be joined on this string. If you're post-processing concatenated JavaScript files with a minifier, you may need to use a semicolon `';'` as the separator.

#### unitPath
Type: `String[]`  
Default: `['.']`

Paths that are used to find the Gumup units (absolute or relative to `cwd`).

### Usage Examples

#### Default options
This configuration will resolve dependencies of the `main` unit and concatenate them.

```js
grunt.initConfig({
  gumup: {
    dist: {
      files: {
        'dest/index.js': ['main.js']
      },
    },
  },
});
```
#### Pass the result to a task 
This configuration will resolve dependencies of the `main` unit and pass them to `uglify:dist` task.

```js
grunt.initConfig({
  gumup: {
    dist: {
      options: {
        onResolve: 'uglify.dist.files'
      },
      files: {
        'dest/index.js': ['main.js']
      },
    },
  },
});
```
#### Process the result with a user callback
This configuration will resolve dependencies of the `main` unit and log them.

```js
grunt.initConfig({
  gumup: {
    dist: {
      options: {
        onResolve: function(fileList) {
          console.log(fileList);
        }
      },
      files: {
        'dest/index.js': ['main.js']
      },
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
