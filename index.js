(function (global) {
  var process = {
    title: 'browser',
    browser: true,
    env: {},
    argv: [],
    nextTick: function (fn) {
      setTimeout(fn, 0)
    },
    cwd: function () {
      return '/'
    },
    chdir: function () {
    }
  };
  // Require module
  function require(file, cb) {
    // Handle async require
    if (typeof cb == 'function') {
      return require.load(file, cb)
    }
    // Return module from cache
    if ({}.hasOwnProperty.call(require.cache, file))
      return require.cache[file];
    var resolved = require.resolve(file);
    if (!resolved)
      throw new Error('Failed to resolve module ' + file);
    var mod = {
      id: file,
      require: require,
      filename: file,
      exports: {},
      loaded: false,
      parent: null,
      children: []
    };
    var dirname = file.slice(0, file.lastIndexOf('/') + 1);
    require.cache[file] = mod.exports;
    resolved.call(mod.exports, mod, mod.exports, dirname, file, process);
    mod.loaded = true;
    return require.cache[file] = mod.exports
  }
  require.modules = {};
  require.cache = {};
  require.resolve = function (file) {
    return {}.hasOwnProperty.call(require.modules, file) ? require.modules[file] : void 0
  };
  // define normal static module
  require.define = function (file, fn) {
    require.modules[file] = fn
  };
  require.waiting = {};
  // Determine base path for all modules
  var scripts = document.getElementsByTagName('script');
  var file = scripts[scripts.length - 1].src;
  require.basePath = file.slice(0, file.lastIndexOf('/') + 1);
  // Generate URL for module
  require.urlFor = function (file) {
    var url = file.replace(/^\.?\//, '');
    if (!/\.js$/.test(url))
      url = url + '.js';
    return require.basePath + url
  };
  // Load module async module
  require.load = function (file, cb) {
    // Immediately return previously loaded modules
    if (require.modules[file] != null)
      return cb(require(file));
    // Build URL to request module at
    var url = require.urlFor(file);
    var script = document.createElement('script'), scripts = document.getElementsByTagName('script')[0], callbacks = require.waiting[file] = require.waiting[file] || [];
    // We'll be called when async module is defined.
    callbacks.push(cb);
    // Load module
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.file = file;
    scripts.parentNode.insertBefore(script, scripts)
  };
  // Define async module
  require.async = function (file, fn) {
    require.modules[file] = fn;
    var cb;
    while (cb = require.waiting[file].shift())
      cb(require(file))
  };
  global.require = require;
  // source: src/page.coffee
  require.define('./page', function (module, exports, __dirname, __filename, process) {
    var Page;
    module.exports = Page = function () {
      Page.prototype.el = null;
      Page.prototype.module = null;
      function Page(el, module1) {
        this.el = el;
        this.module = module1
      }
      Page.prototype.load = function (opts) {
        this.opts = opts != null ? opts : {}
      };
      Page.prototype.render = function () {
      };
      Page.prototype.unload = function () {
      };
      Page.prototype.annotations = function () {
      };
      return Page
    }()
  });
  // source: src/module.coffee
  require.define('./module', function (module, exports, __dirname, __filename, process) {
    var Module;
    module.exports = Module = function () {
      Module.prototype.json = null;
      function Module() {
      }
      Module.prototype.load = function (opts) {
        this.opts = opts != null ? opts : {}
      };
      Module.prototype.unload = function () {
      };
      return Module
    }()
  });
  // source: src/index.coffee
  require.define('./index', function (module, exports, __dirname, __filename, process) {
    module.exports = {
      Page: require('./page'),
      Module: require('./module')
    }
  });
  require('./index')
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuY29mZmVlIiwibW9kdWxlLmNvZmZlZSIsImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6WyJQYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsInByb3RvdHlwZSIsImVsIiwibW9kdWxlMSIsImxvYWQiLCJvcHRzIiwicmVuZGVyIiwidW5sb2FkIiwiYW5ub3RhdGlvbnMiLCJNb2R1bGUiLCJqc29uIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsSUFBSUEsSUFBSixDO0lBRUFDLE1BQUEsQ0FBT0MsT0FBUCxHQUFpQkYsSUFBQSxHQUFRLFlBQVc7QUFBQSxNQUNsQ0EsSUFBQSxDQUFLRyxTQUFMLENBQWVDLEVBQWYsR0FBb0IsSUFBcEIsQ0FEa0M7QUFBQSxNQUdsQ0osSUFBQSxDQUFLRyxTQUFMLENBQWVGLE1BQWYsR0FBd0IsSUFBeEIsQ0FIa0M7QUFBQSxNQUtsQyxTQUFTRCxJQUFULENBQWNJLEVBQWQsRUFBa0JDLE9BQWxCLEVBQTJCO0FBQUEsUUFDekIsS0FBS0QsRUFBTCxHQUFVQSxFQUFWLENBRHlCO0FBQUEsUUFFekIsS0FBS0gsTUFBTCxHQUFjSSxPQUZXO0FBQUEsT0FMTztBQUFBLE1BVWxDTCxJQUFBLENBQUtHLFNBQUwsQ0FBZUcsSUFBZixHQUFzQixVQUFTQyxJQUFULEVBQWU7QUFBQSxRQUNuQyxLQUFLQSxJQUFMLEdBQVlBLElBQUEsSUFBUSxJQUFSLEdBQWVBLElBQWYsR0FBc0IsRUFEQztBQUFBLE9BQXJDLENBVmtDO0FBQUEsTUFjbENQLElBQUEsQ0FBS0csU0FBTCxDQUFlSyxNQUFmLEdBQXdCLFlBQVc7QUFBQSxPQUFuQyxDQWRrQztBQUFBLE1BZ0JsQ1IsSUFBQSxDQUFLRyxTQUFMLENBQWVNLE1BQWYsR0FBd0IsWUFBVztBQUFBLE9BQW5DLENBaEJrQztBQUFBLE1Ba0JsQ1QsSUFBQSxDQUFLRyxTQUFMLENBQWVPLFdBQWYsR0FBNkIsWUFBVztBQUFBLE9BQXhDLENBbEJrQztBQUFBLE1Bb0JsQyxPQUFPVixJQXBCMkI7QUFBQSxLQUFaLEU7Ozs7SUNGeEIsSUFBSVcsTUFBSixDO0lBRUFWLE1BQUEsQ0FBT0MsT0FBUCxHQUFpQlMsTUFBQSxHQUFVLFlBQVc7QUFBQSxNQUNwQ0EsTUFBQSxDQUFPUixTQUFQLENBQWlCUyxJQUFqQixHQUF3QixJQUF4QixDQURvQztBQUFBLE1BR3BDLFNBQVNELE1BQVQsR0FBa0I7QUFBQSxPQUhrQjtBQUFBLE1BS3BDQSxNQUFBLENBQU9SLFNBQVAsQ0FBaUJHLElBQWpCLEdBQXdCLFVBQVNDLElBQVQsRUFBZTtBQUFBLFFBQ3JDLEtBQUtBLElBQUwsR0FBWUEsSUFBQSxJQUFRLElBQVIsR0FBZUEsSUFBZixHQUFzQixFQURHO0FBQUEsT0FBdkMsQ0FMb0M7QUFBQSxNQVNwQ0ksTUFBQSxDQUFPUixTQUFQLENBQWlCTSxNQUFqQixHQUEwQixZQUFXO0FBQUEsT0FBckMsQ0FUb0M7QUFBQSxNQVdwQyxPQUFPRSxNQVg2QjtBQUFBLEtBQVosRTs7OztJQ0YxQlYsTUFBQSxDQUFPQyxPQUFQLEdBQ0U7QUFBQSxNQUFBRixJQUFBLEVBQU1hLE9BQUEsQ0FBUSxRQUFSLENBQU47QUFBQSxNQUNBRixNQUFBLEVBQVFFLE9BQUEsQ0FBUSxVQUFSLENBRFI7QUFBQSxLIiwic291cmNlUm9vdCI6Ii9zcmMifQ==