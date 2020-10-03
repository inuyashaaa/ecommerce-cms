/*!
 * Core JavaScript for PHPMaker v2021.0.1
 * Copyright (c) e.World Technology Limited. All rights reserved.
 */
var ew = (function () {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        return function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  commonjsGlobal.loadjs = function () {
    //***

    /**
     * Global dependencies.
     * @global {Object} document - DOM
     */
    var devnull = function devnull() {},
        bundleIdCache = {},
        bundleResultCache = {},
        bundleCallbackQueue = {};
    /**
     * Subscribe to bundle load event.
     * @param {string[]} bundleIds - Bundle ids
     * @param {Function} callbackFn - The callback function
     */

    function subscribe(bundleIds, callbackFn) {
      // listify
      bundleIds = bundleIds.push ? bundleIds : [bundleIds];
      var depsNotFound = [],
          i = bundleIds.length,
          numWaiting = i,
          fn,
          bundleId,
          r,
          q; // define callback function

      fn = function fn(bundleId, pathsNotFound) {
        if (pathsNotFound.length) depsNotFound.push(bundleId);
        numWaiting--;
        if (!numWaiting) callbackFn(depsNotFound);
      }; // register callback

      while (i--) {
        bundleId = bundleIds[i]; // execute callback if in result cache

        r = bundleResultCache[bundleId];

        if (r) {
          fn(bundleId, r);
          continue;
        } // add to callback queue

        q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
        q.push(fn);
      }
    }
    /**
     * Publish bundle load event.
     * @param {string} bundleId - Bundle id
     * @param {string[]} pathsNotFound - List of files not found
     */

    function publish(bundleId, pathsNotFound) {
      // exit if id isn't defined
      if (!bundleId) return;
      var q = bundleCallbackQueue[bundleId]; // cache result

      bundleResultCache[bundleId] = pathsNotFound; // exit if queue is empty

      if (!q) return; // empty callback queue

      while (q.length) {
        q[0](bundleId, pathsNotFound);
        q.splice(0, 1);
      }
    }
    /**
     * Execute callbacks.
     * @param {Object or Function} args - The callback args
     * @param {string[]} depsNotFound - List of dependencies not found
     */

    function executeCallbacks(args, depsNotFound) {
      // accept function as argument
      if (args.call) args = {
        success: args
      }; // success and error callbacks

      if (depsNotFound.length) (args.error || devnull)(depsNotFound);else (args.success || devnull)(args);
    }
    /**
     * Load individual file.
     * @param {string} path - The file path
     * @param {Function} callbackFn - The callback function
     */

    function loadFile(path, callbackFn, args, numTries) {
      var doc = document,
          async = args.async,
          maxTries = (args.numRetries || 0) + 1,
          beforeCallbackFn = args.before || devnull,
          pathname = path.replace(/[\?|#].*$/, ''),
          pathStripped = path.replace(/^(css|img)!/, ''),
          isLegacyIECss,
          e;
      numTries = numTries || 0;

      if (/(^css!|\.css$)/.test(pathname)) {
        // css
        e = doc.createElement('link');
        e.rel = 'stylesheet';
        e.href = pathStripped; // tag IE9+

        isLegacyIECss = 'hideFocus' in e; // use preload in IE Edge (to detect load errors)

        if (isLegacyIECss && e.relList) {
          isLegacyIECss = 0;
          e.rel = 'preload';
          e.as = 'style';
        }
      } else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(pathname)) {
        // image
        e = doc.createElement('img');
        e.src = pathStripped;
      } else {
        // javascript
        e = doc.createElement('script');
        e.src = path;
        e.async = async === undefined ? true : async;
      }

      e.onload = e.onerror = e.onbeforeload = function (ev) {
        var result = ev.type[0]; // treat empty stylesheets as failures to get around lack of onerror
        // support in IE9-11

        if (isLegacyIECss) {
          try {
            if (!e.sheet.cssText.length) result = 'e';
          } catch (x) {
            // sheets objects created from load errors don't allow access to
            // `cssText` (unless error is Code:18 SecurityError)
            if (x.code != 18) result = 'e';
          }
        } // handle retries in case of load failure

        if (result == 'e') {
          // increment counter
          numTries += 1; // exit function and try again

          if (numTries < maxTries) {
            return loadFile(path, callbackFn, args, numTries);
          }
        } else if (e.rel == 'preload' && e.as == 'style') {
          // activate preloaded stylesheets
          return e.rel = 'stylesheet'; // jshint ignore:line
        } // execute callback

        callbackFn(path, result, ev.defaultPrevented);
      }; // add to document (unless callback returns `false`)

      if (beforeCallbackFn(path, e) !== false && e.tagName != "IMG") doc.head.appendChild(e); //***
    }
    /**
     * Load multiple files.
     * @param {string[]} paths - The file paths
     * @param {Function} callbackFn - The callback function
     */

    function loadFiles(paths, callbackFn, args) {
      // listify paths
      paths = paths.push ? paths : [paths];
      var numWaiting = paths.length,
          x = numWaiting,
          pathsNotFound = [],
          fn,
          i; // define callback function

      fn = function fn(path, result, defaultPrevented) {
        // handle error
        if (result == 'e') pathsNotFound.push(path); // handle beforeload event. If defaultPrevented then that means the load
        // will be blocked (ex. Ghostery/ABP on Safari)

        if (result == 'b') {
          if (defaultPrevented) pathsNotFound.push(path);else return;
        }

        numWaiting--;
        if (!numWaiting) callbackFn(pathsNotFound);
      }; // load scripts

      for (i = 0; i < x; i++) {
        loadFile(paths[i], fn, args);
      }
    }
    /**
     * Initiate script load and register bundle.
     * @param {(string|string[])} paths - The file paths
     * @param {(string|Function|Object)} [arg1] - The (1) bundleId or (2) success
     *   callback or (3) object literal with success/error arguments, numRetries,
     *   etc.
     * @param {(Function|Object)} [arg2] - The (1) success callback or (2) object
     *   literal with success/error arguments, numRetries, etc.
     */

    function loadjs(paths, arg1, arg2) {
      var bundleId, args; // bundleId (if string)

      if (arg1 && arg1.trim) bundleId = arg1; // args (default is {})

      args = (bundleId ? arg2 : arg1) || {}; // throw error if bundle is already defined

      if (bundleId) {
        if (bundleId in bundleIdCache) {
          throw "LoadJS";
        } else {
          bundleIdCache[bundleId] = true;
        }
      }

      function loadFn(resolve, reject) {
        loadFiles(paths, function (pathsNotFound) {
          // execute callbacks
          executeCallbacks(args, pathsNotFound); // resolve Promise

          if (resolve) {
            executeCallbacks({
              success: resolve,
              error: reject
            }, pathsNotFound);
          } // publish bundle load event

          publish(bundleId, pathsNotFound);
        }, args);
      }

      if (args.returnPromise) return new Promise(loadFn);else loadFn();
    }
    /**
     * Execute callbacks when dependencies have been satisfied.
     * @param {(string|string[])} deps - List of bundle ids
     * @param {Object} args - success/error arguments
     */

    loadjs.ready = function ready(deps, args) {
      // subscribe to bundle load event
      subscribe(deps, function (depsNotFound) {
        // execute callbacks
        executeCallbacks(args, depsNotFound);
      });
      return loadjs;
    };
    /**
     * Manually satisfy bundle dependencies.
     * @param {string} bundleId - The bundle id
     */

    loadjs.done = function done(bundleId) {
      publish(bundleId, []);
    };
    /**
     * Reset loadjs dependencies statuses
     */

    loadjs.reset = function reset() {
      bundleIdCache = {};
      bundleResultCache = {};
      bundleCallbackQueue = {};
    };
    /**
     * Determine if bundle has already been defined
     * @param String} bundleId - The bundle id
     */

    loadjs.isDefined = function isDefined(bundleId) {
      return bundleId in bundleIdCache;
    }; // export

    return loadjs;
  }(); //***

  (function (global) {
    var rafPrefix; // do not inject RAF in order to avoid broken performance

    var nowOffset = Date.now(); // use performance api if exist, otherwise use Date.now.
    // Date.now polyfill required.

    var pnow = function pnow() {
      if (global.performance && typeof global.performance.now === 'function') {
        return global.performance.now();
      } // fallback

      return Date.now() - nowOffset;
    };

    if ('mozRequestAnimationFrame' in global) {
      rafPrefix = 'moz';
    } else if ('webkitRequestAnimationFrame' in global) {
      rafPrefix = 'webkit';
    }

    if (rafPrefix) {
      if (!global.requestAnimationFrame) //***
        global.requestAnimationFrame = function (callback) {
          return global[rafPrefix + 'RequestAnimationFrame'](function () {
            callback(pnow());
          });
        };
      if (!global.cancelAnimationFrame) //***
        global.cancelAnimationFrame = global[rafPrefix + 'CancelAnimationFrame'];
    } else {
      var lastTime = Date.now();

      global.requestAnimationFrame = function (callback) {
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }

        var currentTime = Date.now(),
            delay = 16 + lastTime - currentTime;

        if (delay < 0) {
          delay = 0;
        }

        lastTime = currentTime;
        return setTimeout(function () {
          lastTime = Date.now();
          callback(pnow());
        }, delay);
      };

      global.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  })(commonjsGlobal);

  (function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: null
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    window.CustomEvent = CustomEvent;
  })();

  /**
   * Language class
   */
  var Language =
  /**
   * Constructor
   * @param {Object} obj Phrases
   */
  function Language(obj) {
    this.obj = obj;

    this.phrase = function (id) {
      return this.obj[id.toLowerCase()];
    };
  };

  /**
   * Class selection list option
   */
  var SelectionListOption =
  /**
   * Constructor
   */
  function SelectionListOption(value, text, selected) {
    this.value = String(value || "");
    this.text = String(text || "");
    this.selected = !!selected;
  };

  /**
   * Class Dynamic Selection List
   */

  var SelectionList = /*#__PURE__*/function (_HTMLInputElement) {
    _inheritsLoose(SelectionList, _HTMLInputElement);

    _createClass(SelectionList, null, [{
      key: "observedAttributes",

      /**
       * Options
       * @type {SelectionListOption[]}
       */

      /**
       * Specify observed attributes so that attributeChangedCallback will work
       */
      get: function get() {
        return ["class"];
      }
      /**
       * Constructor
       */

    }]);

    function SelectionList() {
      var _this;

      _this = _HTMLInputElement.call(this) || this;

      _defineProperty(_assertThisInitialized(_this), "containerClass", "d-table");

      _defineProperty(_assertThisInitialized(_this), "rowClass", "d-table-row");

      _defineProperty(_assertThisInitialized(_this), "cellClass", "d-table-cell");

      _defineProperty(_assertThisInitialized(_this), "options", []);

      return _this;
    }
    /**
     * Connected
     */

    var _proto = SelectionList.prototype;

    _proto.connectedCallback = function connectedCallback() {
      var value = this.getAttribute("value") || "",
          values = this.multiple ? value.split(ew.MULTIPLE_OPTION_SEPARATOR) : [value];

      for (var _iterator = _createForOfIteratorHelperLoose(values), _step; !(_step = _iterator()).done;) {
        var val = _step.value;
        this.add(val, "", true);
      }
    }
    /**
     * Target element id
     */
    ;

    /**
     * Add an option
     */
    _proto.add = function add(value, text, selected) {
      var option = new SelectionListOption(value, text, selected),
          index = this.options.findIndex(function (option) {
        return option.value == value;
      });
      if (index > -1) this.options[index] = option;else this.options.push(option);
    }
    /**
     * Remove an option
     */
    ;

    _proto.remove = function remove(index) {
      var option = this.options[index];
      if (option) this.options.splice(index, 1);
    }
    /**
     * Remove all options
     */
    ;

    _proto.removeAll = function removeAll() {
      this.options.splice(0);
    }
    /**
     * Clear selection
     */
    ;

    _proto.clear = function clear() {
      for (var _iterator2 = _createForOfIteratorHelperLoose(this.options), _step2; !(_step2 = _iterator2()).done;) {
        var option = _step2.value;
        option.selected = false;
      }

      this.render();
    }
    /**
     * Get random number
     */
    ;

    _proto.getRandom = function getRandom() {
      return Math.floor(Math.random() * (999999 - 100000)) + 100000;
    }
    /**
     * Trigger change event
     */
    ;

    _proto.triggerChange = function triggerChange() {
      var event = new Event("change", {
        view: window,
        bubbles: true,
        cancelable: false
      });
      this.dispatchEvent(event);
    }
    /**
     * Check if invalid
     */
    ;

    _proto.isInvalid = function isInvalid(className) {
      return /\bis-invalid\b/.test(className);
    }
    /**
     * Check class
     */
    ;

    _proto.attributeChangedCallback = function attributeChangedCallback(name, oldValue, newValue) {
      if (name == "class") {
        if (this.targetId && this.isInvalid(oldValue) != this.isInvalid(newValue)) {
          // "is-invalid" toggled
          var target = document.getElementById(this.targetId),
              inputs = target.querySelectorAll("input"),
              isInvalid = this.isInvalid(newValue);
          Array.prototype.forEach.call(inputs, function (input) {
            return input.classList.toggle("is-invalid", isInvalid);
          });
        }
      }
    }
    /**
     * Render checkbox or radio in the target element
     */
    ;

    _proto.render = function render() {
      var _this2 = this;

      var target = this.target,
          template = this.template;
      if (!target || !template || !this.list) return; // Clear the target

      while (target.firstChild) {
        target.removeChild(target.firstChild);
      } // Render

      target.style.cursor = "wait";
      var self = this,
          content = template.content,
          cols = this.columns || 1,
          tbl = document.createElement("div"),
          cnt = this.length,
          radioSuffix = "_" + this.getRandom(),
          isInvalid = this.classList.contains("is-invalid"),
          row;

      if (this.layout == "grid") {
        this.containerClass = "container";
        this.rowClass = "row";
        this.cellClass = "col";
      }

      tbl.className = this.containerClass + " ew-item-container";
      target.append(tbl);

      try {
        var options = this.options.filter(function (opt) {
          return opt.value;
        });
        options.forEach(function (option, i) {
          var clone = content.cloneNode(true),
              input = clone.querySelector("input"),
              label = clone.querySelector("label"),
              suffix = "_" + _this2.getRandom(); // Make sure the id is unique

          input.name = input.name + (input.type == "radio" ? radioSuffix : suffix);
          input.id = input.id + suffix;
          input.value = option.value;
          input.setAttribute("data-index", i);
          input.checked = option.selected;
          if (isInvalid) input.classList.add("is-invalid");
          input.addEventListener("click", function () {
            var index = parseInt(this.getAttribute("data-index"), 10);

            if (self.type == "select-one") {
              for (var _iterator3 = _createForOfIteratorHelperLoose(self.options), _step3; !(_step3 = _iterator3()).done;) {
                var _option = _step3.value;
                _option.selected = false;
              }
            }

            self.options[index].selected = this.checked;
            self.setAttribute("value", self.value);
            self.triggerChange();
          });
          label.innerHTML = option.text;
          label.htmlFor = input.id;
          var cell = document.createElement("div");
          cell.className = _this2.cellClass;
          cell.appendChild(clone);

          if (i % cols == 0) {
            row = document.createElement("div");
            row.className = _this2.rowClass;
          }

          row.append(cell);

          if (i % cols == cols - 1) {
            tbl.append(row);
          } else if (i == cnt - 1) {
            // Last
            for (var j = i % cols + 1; j < cols; j++) {
              var c = document.createElement("div");
              c.className = _this2.cellClass;
              row.append(c);
            }

            tbl.append(row);
          }
        });
        this.setAttribute("value", this.value);
      } finally {
        target.style.cursor = "default";
      }
    }
    /**
     * Set focus
     */
    ;

    _proto.focus = function focus() {
      if (this.list) {
        var _this$target, _this$target$querySel;

        (_this$target = this.target) === null || _this$target === void 0 ? void 0 : (_this$target$querySel = _this$target.querySelector("input")) === null || _this$target$querySel === void 0 ? void 0 : _this$target$querySel.focus();
      } else {
        _HTMLInputElement.prototype.focus.call(this);
      }
    };

    _createClass(SelectionList, [{
      key: "targetId",
      get: function get() {
        return this.getAttribute("data-target");
      }
      /**
       * Target
       */

    }, {
      key: "target",
      get: function get() {
        return this.parentNode.querySelector("#" + this.targetId);
      }
      /**
       * Template id
       */

    }, {
      key: "templateId",
      get: function get() {
        return this.getAttribute("data-template");
      }
      /**
       * Template
       */

    }, {
      key: "template",
      get: function get() {
        return this.parentNode.querySelector("#" + this.templateId);
      }
      /**
       * Input element id (for AutoSuggest)
       */

    }, {
      key: "inputId",
      get: function get() {
        return this.getAttribute("data-input");
      }
      /**
       * Input element (for AutoSuggest)
       */

    }, {
      key: "input",
      get: function get() {
        return this.parentNode.querySelector("#" + this.inputId);
      }
      /**
       * Is list
       */

    }, {
      key: "list",
      get: function get() {
        return this.options;
      }
      /**
       * Number of columns
       */

    }, {
      key: "columns",
      get: function get() {
        if (ew && ew.IS_MOBILE) {
          return 1;
        } else {
          var cols = this.getAttribute("data-repeatcolumn");
          return cols ? parseInt(cols, 10) : 1;
        }
      }
      /**
       * Layout
       */

    }, {
      key: "layout",
      get: function get() {
        var type = this.getAttribute("data-layout");
        return type == "grid" ? type : "";
      }
      /**
       * Length
       */

    }, {
      key: "length",
      get: function get() {
        return this.options.length;
      }
      /**
       * Get selected index
       */

    }, {
      key: "selectedIndex",
      get: function get() {
        for (var _iterator4 = _createForOfIteratorHelperLoose(this.options), _step4; !(_step4 = _iterator4()).done;) {
          var option = _step4.value;
          if (option.selected) return option.index;
        }

        return -1;
      }
      /**
       * Set selected index
       */
      ,
      set: function set(index) {
        var option = this.options[index];

        if (option) {
          this.options.forEach(function (option) {
            return option.selected = false;
          });
          option.selected = true;
          this.render();
        }
      }
      /**
       * Type
       */

    }, {
      key: "type",
      get: function get() {
        return this.getAttribute("data-type") || this.getAttribute("type");
      }
      /**
       * Multiple
       */

    }, {
      key: "multiple",
      get: function get() {
        if (this.hasAttribute("data-multiple")) {
          return this.getAttribute("data-multiple") != "0";
        } else {
          return this.type == "select-multiple";
        }
      }
      /**
       * Get value
       * @returns {string}
       */

    }, {
      key: "value",
      get: function get() {
        if (this.type == "select-one" || this.type == "select-multiple") {
          return this.values.join(ew.MULTIPLE_OPTION_SEPARATOR || ",");
        } else {
          return this.getAttribute("value");
        }
      }
      /**
       * Get value as array
       * @returns {string[]}
       */
      ,

      /**
       * Set value
       * @param {string|string[]} val
       */
      set: function set(val) {
        if (this.type == "select-one") {
          for (var _iterator5 = _createForOfIteratorHelperLoose(this.options), _step5; !(_step5 = _iterator5()).done;) {
            var option = _step5.value;
            option.selected = option.value == val;
          }
        } else if (this.type == "select-multiple") {
          var ar;

          if (Array.isArray(val)) {
            // Array
            ar = val.map(function (v) {
              return v !== null && v !== void 0 ? v : String(v);
            });
          } else {
            var _val;

            // String
            val = (_val = val) !== null && _val !== void 0 ? _val : String(val);
            ar = val ? val.split(ew.MULTIPLE_OPTION_SEPARATOR || ",") : [];
          }

          for (var _iterator6 = _createForOfIteratorHelperLoose(this.options), _step6; !(_step6 = _iterator6()).done;) {
            var _option2 = _step6.value;
            _option2.selected = ar.includes(String(_option2.value));
          }
        } else {
          this.setAttribute("value", val);
        }

        this.render();
      }
    }, {
      key: "values",
      get: function get() {
        if (this.type == "select-one" || this.type == "select-multiple") {
          return Array.prototype.filter.call(this.options, function (option) {
            return option.selected;
          }).map(function (option) {
            return option.value;
          });
        } else {
          var val = this.getAttribute("value");
          return val ? val.split(ew.MULTIPLE_OPTION_SEPARATOR || ",") : [];
        }
      }
    }]);

    return SelectionList;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLInputElement));

  customElements.define("selection-list", SelectionList, {
    extends: "input"
  });
  window.SelectionList = SelectionList;
  window.SelectionListOption = SelectionListOption;
  var ew$1 = {
    PAGE_ID: "",
    // Page ID // To be updated in page
    RELATIVE_PATH: "",
    // Relative path // To be updated in page
    MULTIPLE_OPTION_SEPARATOR: ",",
    GENERATE_PASSWORD_UPPERCASE: true,
    GENERATE_PASSWORD_LOWERCASE: true,
    GENERATE_PASSWORD_NUMBER: true,
    GENERATE_PASSWORD_SPECIALCHARS: true,
    CONFIRM_CANCEL: true,
    ROWTYPE_ADD: 2,
    ROWTYPE_EDIT: 3,
    UNFORMAT_YEAR: 50,
    LAZY_LOAD_RETRIES: 3,
    AJAX_DELAY: 5,
    LOOKUP_DELAY: 250,
    MAX_OPTION_COUNT: 3,
    USE_OVERLAY_SCROLLBARS: true,
    // For responsive tables
    Language: Language,
    // Class
    language: null,
    // Language object
    vars: null,
    googleMaps: [],
    addOptionDialog: null,
    emailDialog: null,
    importDialog: null,
    modalDialog: null,
    modalLookupDialog: null,
    autoSuggestSettings: {
      highlight: true,
      hint: true,
      minLength: 1,
      trigger: "click",
      debounce: 250,
      delay: 0,
      // For loading more results
      templates: {
        // Custom templates for Typeahead (notFound, pending, header, footer, suggestion)
        footer: '<div class="tt-footer"><a href="#" class="tt-more"></a></div>' // "footer" template

      }
    },
    lightboxSettings: {
      transition: "none",
      photo: true,
      opacity: 0.5
    },
    importUploadOptions: {
      maxFileSize: 10000000,
      maxNumberOfFiles: 10
    },
    sweetAlertSettings: {
      showClass: {
        popup: "swal2-noanimation",
        backdrop: "swal2-noanimation"
      },
      hideClass: {
        popup: "",
        backdrop: ""
      },
      customClass: {
        container: "ew-swal2-container",
        popup: "ew-swal2-popup",
        header: "ew-swal2-header",
        title: "ew-swal2-title",
        closeButton: "ew-swal2-close-button",
        icon: "ew-swal2-icon",
        image: "ew-swal2-image",
        content: "ew-swal2-content",
        input: "ew-swal2-input",
        actions: "ew-swal2-actions",
        confirmButton: "ew-swal2-confirm-button",
        cancelButton: "ew-swal2-cancel-button",
        footer: "ew-swal2-footer"
      }
    },
    selectOptions: {
      // Select2 options
      allowClear: true,
      theme: "bootstrap4",
      width: "style",
      minimumResultsForSearch: 20,
      escapeMarkup: function escapeMarkup(v) {
        return v;
      },
      // Custom options
      debounce: 250,
      // For ajax.delay, see https://select2.org/data-sources/ajax#rate-limiting-requests
      customOption: true,
      containerClass: "d-table",
      rowClass: "d-table-row",
      cellClass: "d-table-cell text-nowrap",
      iconClass: "custom-control-label"
    },
    toastOptions: {
      position: "topRight" // topRight|topLeft|bottomRight|bottomLeft

    },
    DOMPurifyConfig: {},
    sanitize: function sanitize(str) {
      return DOMPurify.sanitize(str, this.DOMPurifyConfig);
    },
    sanitizeFn: null,
    // For Bootstrap Tooltips and Popovers
    PDFObjectOptions: {},
    chartConfig: {},
    spinnerClass: "spinner-border text-primary",
    // spinner-border or spinner-grow
    jsRenderHelpers: {},
    autoHideSuccessMessage: true,
    autoHideSuccessMessageDelay: 5000,
    searchOperatorChanged: function searchOperatorChanged() {},
    setLanguage: function setLanguage() {},
    addOptionDialogShow: function addOptionDialogShow() {},
    modalLookupShow: function modalLookupShow() {},
    importDialogShow: function importDialogShow() {},
    toggleSearchOperator: function toggleSearchOperator() {},
    togglePassword: function togglePassword() {},
    sort: function sort() {},
    clickMultiCheckbox: function clickMultiCheckbox() {},
    export: function _export() {},
    exportWithCharts: function exportWithCharts() {},
    setSearchType: function setSearchType() {},
    emailDialogShow: function emailDialogShow() {},
    selectAll: function selectAll() {},
    selectAllKey: function selectAllKey() {},
    submitAction: function submitAction() {},
    addGridRow: function addGridRow() {},
    confirmDelete: function confirmDelete() {
      return false;
    },
    deleteGridRow: function deleteGridRow() {
      return false;
    }
  };
  /**
   * Add spinner
   */

  ew$1.addSpinner = function () {
    if (document.getElementById("ew-page-spinner")) return;
    var div = document.createElement("div");
    div.id = "ew-page-spinner";
    div.setAttribute("class", ew$1.spinnerClass);
    div.setAttribute("role", "status");
    div.innerHTML = '<span class="sr-only">' + (ew$1.language ? ew$1.language.phrase("Loading") : "Loading...") + '</span>';
    if (document.body) document.body.appendChild(div);
  };
  /**
   * Remove spinner
   */

  ew$1.removeSpinner = function () {
    var el = document.getElementById("ew-page-spinner");
    if (el) el.parentNode.removeChild(el);
  };
  /**
   * Init grid upper/lower panel
   *
   * @param {HTMLElement} el - Element
   */

  ew$1.initGridPanel = function (el) {
    if (el.dataset.isset) return;
    var html = "";

    for (var i = 0; i < el.children.length; i++) {
      html = el.children[i].innerHTML.trim();
      if (html !== "") break;
    }

    if (html === "") el.classList.add("d-none");
    el.dataset.isset = true;
  };
  /**
   * Init grid upper and lower panels
   */

  ew$1.initGridPanels = function () {
    Array.prototype.forEach.call(document.querySelectorAll(".ew-grid-upper-panel, .ew-grid-lower-panel"), this.initGridPanel);
  }; // Request animation frame to init grid lower and upper panels

  var _initGridPanelsReq;

  function _initGridPanels(timestamp) {
    ew$1.initGridPanels();
    _initGridPanelsReq = requestAnimationFrame(_initGridPanels);
  }

  _initGridPanelsReq = requestAnimationFrame(_initGridPanels); // DOM content loaded

  document.addEventListener("DOMContentLoaded", function () {
    ew$1.addSpinner();
    ew$1.initGridPanels();
    cancelAnimationFrame(_initGridPanelsReq);
    window.loadjs.done("dom");
  });
  /**
   * Overlay scrollbars options
   */

  ew$1.overlayScrollbarsOptions = {
    className: "os-theme-dark",
    sizeAutoCapable: true,
    scrollbars: {
      autoHide: "leave",
      clickScrolling: true
    }
  }; // All bundle IDs

  ew$1.bundleIds = ["dom", "head"];
  /**
   * Initiate script load (async in series) and register bundle
   * @param {(string|string[])} paths - The file paths
   * @param {(string|Function|Object)} [arg1] - The (1) bundleId or (2) success
   *   callback or (3) object literal with success/error arguments, numRetries,
   *   etc.
   * @param {(Function|Object)} [arg2] - The (1) success callback or (2) object
   *   literal with success/error arguments, numRetries, etc.
   */

  ew$1.loadjs = function (paths, arg1, arg2) {
    var bundleId, args; // bundleId (if string)

    if (arg1 && arg1.trim) bundleId = arg1; // args (default is {})

    args = (bundleId ? arg2 : arg1) || {};
    if (bundleId && bundleId != "load" && !ew$1.bundleIds.includes(bundleId)) ew$1.bundleIds.push(bundleId);
    paths = Array.isArray(paths) ? paths : [paths];
    paths = paths.filter(function (path) {
      return path && (!Array.isArray(path) || path.length);
    }); // Valid paths

    if (args.call) // Accept function as argument
      args = {
        success: args
      };
    args = _objectSpread2(_objectSpread2({}, args), {}, {
      returnPromise: true
    });

    var clone = _objectSpread2({}, args),
        p = Promise.resolve();

    delete clone.success;
    paths.forEach(function (path, i, ar) {
      if (i == ar.length - 1) // Last
        p = p.then(function () {
          return window.loadjs(path, bundleId || args, bundleId ? args : null).catch(function (paths) {
            return console.log(paths);
          });
        });else p = p.then(function () {
        return window.loadjs(path, clone).catch(function (paths) {
          return console.log(paths);
        });
      });
    });
    return p;
  };
  /**
   * Initiate script load (async in series) when dependencies have been satisfied
   * @param {(string|string[])} deps - List of bundle ids
   * @param {(string|string[])} paths - The file paths
   * @param {(string|Function|Object)} [arg1] - The (1) bundleId or (2) success
   *   callback or (3) object literal with success/error arguments, numRetries,
   *   etc.
   * @param {(Function|Object)} [arg2] - The (1) success callback or (2) object
   *   literal with success/error arguments, numRetries, etc.
   */

  ew$1.ready = function (deps, paths, arg1, arg2) {
    window.loadjs.ready(deps, function () {
      ew$1.loadjs(paths, arg1, arg2);
    });
  }; // Global client script

  loadjs.ready("head", function () {
    ew$1.clientScript();
  }); // Global startup script

  loadjs.ready("foot", function () {
    ew$1.startupScript();
    loadjs.done("load");
  });
  /**
   * Render client side template, use the HTML in DOM and return the HTML
   *
   * @param {jQuery} tmpl Template
   * @param {Object} data Data
   * @returns HTML string
   */

  ew$1.renderTemplate = function (tmpl, data) {
    var $ = jQuery,
        $tmpl = tmpl && tmpl.render ? tmpl : $(tmpl);
    if (!$tmpl.render) return;
    var args = {
      $template: $tmpl,
      data: data
    };
    $(document).trigger("rendertemplate", [args]);
    var html = $tmpl.render(args.data, ew$1.jsRenderHelpers),
        method = args.$template.data("method"),
        target = args.$template.data("target");
    if (html && method && target) // Render by specified method to target
      $(html)[method](target);else if (html && !method && target) // No method, render as inner HTML of target
      $(target).html(html);else if (html && !method && !target) // No method and target, render locally
      $tmpl.parent().append(html);
    return html;
  };
  /**
   * Render all client side templates
   *
   * @param {*} e Event
   */

  ew$1.renderJsTemplates = function (e) {
    var $ = jQuery,
        el = e && e.target ? e.target : document;
    $(el).find(".ew-js-template").sort(function (a, b) {
      a = parseInt($(a).data("seq"), 10) || 0;
      b = parseInt($(b).data("seq"), 10) || 0;

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    }).each(function (index) {
      var $this = $(this),
          name = $this.data("name"),
          data = $this.data("data");

      if (data && typeof data == "string") {
        data = ew$1.vars[data] || window[data]; // Get data from ew.vars or global

        if (!data) // Data not found (e.g. no header)
          return;
      }

      if (name) {
        if (!$.render[name]) {
          // Render the first template of any named template only
          $.templates(name, $this.text());
          ew$1.renderTemplate($this, data);
        }
      } else {
        ew$1.renderTemplate($this, data);
      }
    });
  };

  return ew$1;

}());
//# sourceMappingURL=ewcore.js.map
