/*!
 * JavaScript for PHPMaker v2021.0.1
 * Copyright (c) e.World Technology Limited. All rights reserved.
 */
(function ($) {
  'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  	  path: basedir,
  	  exports: {},
  	  require: function (path, base) {
        return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      }
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings

  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.6.5',
    mode:  'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = new WeakMap$1();
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set = function (it, metadata) {
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var useSymbolAsUid = nativeSymbol
    // eslint-disable-next-line no-undef
    && !Symbol.sham
    // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
      else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var SPECIES = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else if (IS_EVERY) return false;  // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6)
  };

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var defineProperty = Object.defineProperty;
  var cache = {};

  var thrower = function (it) { throw it; };

  var arrayMethodUsesToLength = function (METHOD_NAME, options) {
    if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
    if (!options) options = {};
    var method = [][METHOD_NAME];
    var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
    var argument0 = has(options, 0) ? options[0] : thrower;
    var argument1 = has(options, 1) ? options[1] : undefined;

    return cache[METHOD_NAME] = !!method && !fails(function () {
      if (ACCESSORS && !descriptors) return true;
      var O = { length: -1 };

      if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
      else O[1] = 1;

      method.call(O, argument0, argument1);
    });
  };

  var $findIndex = arrayIteration.findIndex;

  var FIND_INDEX = 'findIndex';
  var SKIPS_HOLES = true;

  var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);

  // Shouldn't skip holes
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findindex
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND_INDEX);

  var $includes = arrayIncludes.includes;

  var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  _export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$1 }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  var nativeAssign = Object.assign;
  var defineProperty$1 = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign
  var objectAssign = !nativeAssign || fails(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$1({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$1(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    } return T;
  } : nativeAssign;

  // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign
  _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

  // `Object.{ entries, values }` methods implementation
  var createMethod$2 = function (TO_ENTRIES) {
    return function (it) {
      var O = toIndexedObject(it);
      var keys = objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;
      while (length > i) {
        key = keys[i++];
        if (!descriptors || propertyIsEnumerable.call(O, key)) {
          result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
        }
      }
      return result;
    };
  };

  var objectToArray = {
    // `Object.entries` method
    // https://tc39.github.io/ecma262/#sec-object.entries
    entries: createMethod$2(true),
    // `Object.values` method
    // https://tc39.github.io/ecma262/#sec-object.values
    values: createMethod$2(false)
  };

  var $entries = objectToArray.entries;

  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  _export({ target: 'Object', stat: true }, {
    entries: function entries(O) {
      return $entries(O);
    }
  });

  var $values = objectToArray.values;

  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  _export({ target: 'Object', stat: true }, {
    values: function values(O) {
      return $values(O);
    }
  });

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.github.io/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    } return it;
  };

  var MATCH$1 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (e) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (f) { /* empty */ }
    } return false;
  };

  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

  var nativeEndsWith = ''.endsWith;
  var min$2 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('endsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG =  !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'endsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.endsWith` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.endswith
  _export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    endsWith: function endsWith(searchString /* , endPosition = @length */) {
      var that = String(requireObjectCoercible(this));
      notARegexp(searchString);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = toLength(that.length);
      var end = endPosition === undefined ? len : min$2(toLength(endPosition), len);
      var search = String(searchString);
      return nativeEndsWith
        ? nativeEndsWith.call(that, search, end)
        : that.slice(end - search.length, end) === search;
    }
  });

  // `String.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.includes
  _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~String(requireObjectCoercible(this))
        .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;

  var nativeStartsWith = ''.startsWith;
  var min$3 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegexpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG$1 =  !CORRECT_IS_REGEXP_LOGIC$1 && !!function () {
    var descriptor = getOwnPropertyDescriptor$3(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.startswith
  _export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = String(requireObjectCoercible(this));
      notARegexp(searchString);
      var index = toLength(min$3(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = String(searchString);
      return nativeStartsWith
        ? nativeStartsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search;
    }
  });

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

  function ownKeys$1(object, enumerableOnly) {
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
        ownKeys$1(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$1(Object(source)).forEach(function (key) {
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

  /* global FormData self Blob File */

  /* eslint-disable no-inner-declarations */

  if (typeof Blob !== 'undefined' && (typeof FormData === 'undefined' || !FormData.prototype.keys)) {
    var normalizeValue = function normalizeValue(_ref) {
      var value = _ref[0],
          filename = _ref[1];

      if (value instanceof Blob) {
        // Should always returns a new File instance
        // console.assert(fd.get(x) !== fd.get(x))
        value = new File([value], filename, {
          type: value.type,
          lastModified: value.lastModified
        });
      }

      return value;
    };

    var ensureArgs = function ensureArgs(args, expected) {
      if (args.length < expected) {
        throw new TypeError(expected + " argument required, but only " + args.length + " present.");
      }
    };

    var normalizeArgs = function normalizeArgs(name, value, filename) {
      return value instanceof Blob // normalize name and filename if adding an attachment
      ? [String(name), value, filename !== undefined ? filename + '' // Cast filename to string if 3th arg isn't undefined
      : typeof value.name === 'string' // if name prop exist
      ? value.name // Use File.name
      : 'blob'] // otherwise fallback to Blob
      // If no attachment, just cast the args to strings
      : [String(name), String(value)];
    }; // normalize linefeeds for textareas
    // https://html.spec.whatwg.org/multipage/form-elements.html#textarea-line-break-normalisation-transformation

    var normalizeLinefeeds = function normalizeLinefeeds(value) {
      return value.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
    };

    var each = function each(arr, cb) {
      for (var i = 0; i < arr.length; i++) {
        cb(arr[i]);
      }
    };
    /**
     * @implements {Iterable}
     */

    var global$1 = typeof window === 'object' ? window : typeof self === 'object' ? self : commonjsGlobal; // keep a reference to native implementation

    var _FormData = global$1.FormData; // To be monkey patched

    var _send = global$1.XMLHttpRequest && global$1.XMLHttpRequest.prototype.send;

    var _fetch = global$1.Request && global$1.fetch;

    var _sendBeacon = global$1.navigator && global$1.navigator.sendBeacon; // Unable to patch Request constructor correctly
    // const _Request = global.Request
    // only way is to use ES6 class extend
    // https://github.com/babel/babel/issues/1966

    var stringTag = global$1.Symbol && Symbol.toStringTag; // Add missing stringTags to blob and files

    if (stringTag) {
      if (!Blob.prototype[stringTag]) {
        Blob.prototype[stringTag] = 'Blob';
      }

      if ('File' in global$1 && !File.prototype[stringTag]) {
        File.prototype[stringTag] = 'File';
      }
    } // Fix so you can construct your own File

    try {
      new File([], ''); // eslint-disable-line
    } catch (a) {
      global$1.File = function File(b, d, c) {
        var blob = new Blob(b, c);
        var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();
        Object.defineProperties(blob, {
          name: {
            value: d
          },
          lastModifiedDate: {
            value: t
          },
          lastModified: {
            value: +t
          },
          toString: {
            value: function value() {
              return '[object File]';
            }
          }
        });

        if (stringTag) {
          Object.defineProperty(blob, stringTag, {
            value: 'File'
          });
        }

        return blob;
      };
    }

    var FormDataPolyfill = /*#__PURE__*/function () {
      /**
       * FormData class
       *
       * @param {HTMLElement=} form
       */
      function FormDataPolyfill(form) {
        this._data = Object.create(null);
        if (!form) return this;
        var self = this;
        each(form.elements, function (elm) {
          if (!elm.name || elm.disabled || elm.type === 'submit' || elm.type === 'button') return;

          if (elm.type === 'file') {
            var files = elm.files && elm.files.length ? elm.files : [new File([], '', {
              type: 'application/octet-stream'
            })]; // #78

            each(files, function (file) {
              self.append(elm.name, file);
            });
          } else if (elm.type === 'select-multiple' || elm.type === 'select-one') {
            each(elm.options, function (opt) {
              !opt.disabled && opt.selected && self.append(elm.name, opt.value);
            });
          } else if (elm.type === 'checkbox' || elm.type === 'radio') {
            if (elm.checked) self.append(elm.name, elm.value);
          } else {
            var value = elm.type === 'textarea' ? normalizeLinefeeds(elm.value) : elm.value;
            self.append(elm.name, value);
          }
        });
      }
      /**
       * Append a field
       *
       * @param   {string}           name      field name
       * @param   {string|Blob|File} value     string / blob / file
       * @param   {string=}          filename  filename to use with blob
       * @return  {undefined}
       */

      var _proto = FormDataPolyfill.prototype;

      _proto.append = function append(name, value, filename) {
        ensureArgs(arguments, 2);

        var _normalizeArgs$apply = normalizeArgs.apply(null, arguments);

        name = _normalizeArgs$apply[0];
        value = _normalizeArgs$apply[1];
        filename = _normalizeArgs$apply[2];
        var map = this._data;
        if (!map[name]) map[name] = [];
        map[name].push([value, filename]);
      }
      /**
       * Delete all fields values given name
       *
       * @param   {string}  name  Field name
       * @return  {undefined}
       */
      ;

      _proto.delete = function _delete(name) {
        ensureArgs(arguments, 1);
        delete this._data[String(name)];
      }
      /**
       * Iterate over all fields as [name, value]
       *
       * @return {Iterator}
       */
      ;

      _proto.entries =
      /*#__PURE__*/
      regeneratorRuntime.mark(function entries() {
        var map, name, _iterator, _step, value;

        return regeneratorRuntime.wrap(function entries$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                map = this._data;
                _context.t0 = regeneratorRuntime.keys(map);

              case 2:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 13;
                  break;
                }

                name = _context.t1.value;
                _iterator = _createForOfIteratorHelperLoose(map[name]);

              case 5:
                if ((_step = _iterator()).done) {
                  _context.next = 11;
                  break;
                }

                value = _step.value;
                _context.next = 9;
                return [name, normalizeValue(value)];

              case 9:
                _context.next = 5;
                break;

              case 11:
                _context.next = 2;
                break;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, entries, this);
      })
      /**
       * Iterate over all fields
       *
       * @param   {Function}  callback  Executed for each item with parameters (value, name, thisArg)
       * @param   {Object=}   thisArg   `this` context for callback function
       * @return  {undefined}
       */
      ;

      _proto.forEach = function forEach(callback, thisArg) {
        ensureArgs(arguments, 1);

        for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done;) {
          var _step2$value = _step2.value,
              name = _step2$value[0],
              value = _step2$value[1];
          callback.call(thisArg, value, name, this);
        }
      }
      /**
       * Return first field value given name
       * or null if non existen
       *
       * @param   {string}  name      Field name
       * @return  {string|File|null}  value Fields value
       */
      ;

      _proto.get = function get(name) {
        ensureArgs(arguments, 1);
        var map = this._data;
        name = String(name);
        return map[name] ? normalizeValue(map[name][0]) : null;
      }
      /**
       * Return all fields values given name
       *
       * @param   {string}  name  Fields name
       * @return  {Array}         [{String|File}]
       */
      ;

      _proto.getAll = function getAll(name) {
        ensureArgs(arguments, 1);
        return (this._data[String(name)] || []).map(normalizeValue);
      }
      /**
       * Check for field name existence
       *
       * @param   {string}   name  Field name
       * @return  {boolean}
       */
      ;

      _proto.has = function has(name) {
        ensureArgs(arguments, 1);
        return String(name) in this._data;
      }
      /**
       * Iterate over all fields name
       *
       * @return {Iterator}
       */
      ;

      _proto.keys =
      /*#__PURE__*/
      regeneratorRuntime.mark(function keys() {
        var _iterator3, _step3, _step3$value, name;

        return regeneratorRuntime.wrap(function keys$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iterator3 = _createForOfIteratorHelperLoose(this);

              case 1:
                if ((_step3 = _iterator3()).done) {
                  _context2.next = 7;
                  break;
                }

                _step3$value = _step3.value, name = _step3$value[0];
                _context2.next = 5;
                return name;

              case 5:
                _context2.next = 1;
                break;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, keys, this);
      })
      /**
       * Overwrite all values given name
       *
       * @param   {string}    name      Filed name
       * @param   {string}    value     Field value
       * @param   {string=}   filename  Filename (optional)
       * @return  {undefined}
       */
      ;

      _proto.set = function set(name, value, filename) {
        ensureArgs(arguments, 2);
        var args = normalizeArgs.apply(null, arguments);
        this._data[args[0]] = [[args[1], args[2]]];
      }
      /**
       * Iterate over all fields
       *
       * @return {Iterator}
       */
      ;

      _proto.values =
      /*#__PURE__*/
      regeneratorRuntime.mark(function values() {
        var _iterator4, _step4, _step4$value, value;

        return regeneratorRuntime.wrap(function values$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iterator4 = _createForOfIteratorHelperLoose(this);

              case 1:
                if ((_step4 = _iterator4()).done) {
                  _context3.next = 7;
                  break;
                }

                _step4$value = _step4.value, value = _step4$value[1];
                _context3.next = 5;
                return value;

              case 5:
                _context3.next = 1;
                break;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, values, this);
      })
      /**
       * Return a native (perhaps degraded) FormData with only a `append` method
       * Can throw if it's not supported
       *
       * @return {FormData}
       */
      ;

      _proto['_asNative'] = function _asNative() {
        var fd = new _FormData();

        for (var _iterator5 = _createForOfIteratorHelperLoose(this), _step5; !(_step5 = _iterator5()).done;) {
          var _step5$value = _step5.value,
              name = _step5$value[0],
              value = _step5$value[1];
          fd.append(name, value);
        }

        return fd;
      }
      /**
       * [_blob description]
       *
       * @return {Blob} [description]
       */
      ;

      _proto['_blob'] = function _blob() {
        var boundary = '----formdata-polyfill-' + Math.random();
        var chunks = [];

        for (var _iterator6 = _createForOfIteratorHelperLoose(this), _step6; !(_step6 = _iterator6()).done;) {
          var _step6$value = _step6.value,
              name = _step6$value[0],
              value = _step6$value[1];
          chunks.push("--" + boundary + "\r\n");

          if (value instanceof Blob) {
            chunks.push("Content-Disposition: form-data; name=\"" + name + "\"; filename=\"" + value.name + "\"\r\n", "Content-Type: " + (value.type || 'application/octet-stream') + "\r\n\r\n", value, '\r\n');
          } else {
            chunks.push("Content-Disposition: form-data; name=\"" + name + "\"\r\n\r\n" + value + "\r\n");
          }
        }

        chunks.push("--" + boundary + "--");
        return new Blob(chunks, {
          type: 'multipart/form-data; boundary=' + boundary
        });
      }
      /**
       * The class itself is iterable
       * alias for formdata.entries()
       *
       * @return  {Iterator}
       */
      ;

      _proto[Symbol.iterator] = function () {
        return this.entries();
      }
      /**
       * Create the default string description.
       *
       * @return  {string} [object FormData]
       */
      ;

      _proto.toString = function toString() {
        return '[object FormData]';
      };

      return FormDataPolyfill;
    }();

    if (stringTag) {
      /**
       * Create the default string description.
       * It is accessed internally by the Object.prototype.toString().
       */
      FormDataPolyfill.prototype[stringTag] = 'FormData';
    } // Patch xhr's send method to call _blob transparently

    if (_send) {
      var setRequestHeader = global$1.XMLHttpRequest.prototype.setRequestHeader;
      /**
       * @param {string} name
       * @param {string} value
       * @returns {undefined}
       * @see https://xhr.spec.whatwg.org/#dom-xmlhttprequest-setrequestheader
       */

      global$1.XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
        setRequestHeader.call(this, name, value);
        if (name.toLowerCase() === 'content-type') this._hasContentType = true;
      };
      /**
       * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=} data
       * @return {undefined}
       * @see https://xhr.spec.whatwg.org/#the-send()-method
       */

      global$1.XMLHttpRequest.prototype.send = function (data) {
        // need to patch send b/c old IE don't send blob's type (#44)
        if (data instanceof FormDataPolyfill) {
          var blob = data['_blob']();
          if (!this._hasContentType) this.setRequestHeader('Content-Type', blob.type);

          _send.call(this, blob);
        } else {
          _send.call(this, data);
        }
      };
    } // Patch fetch's function to call _blob transparently

    if (_fetch) {
      var _fetch2 = global$1.fetch;

      global$1.fetch = function (input, init) {
        if (init && init.body && init.body instanceof FormDataPolyfill) {
          init.body = init.body['_blob']();
        }

        return _fetch2.call(this, input, init);
      };
    } // Patch navigator.sendBeacon to use native FormData

    if (_sendBeacon) {
      global$1.navigator.sendBeacon = function (url, data) {
        if (data instanceof FormDataPolyfill) {
          data = data['_asNative']();
        }

        return _sendBeacon.call(this, url, data);
      };
    }

    global$1['FormData'] = FormDataPolyfill;
  }

  function MultiPage(formid) {
    var self = this;
    this.$form = null;
    this.formID = formid;
    this.pageIndex = 1;
    this.maxPageIndex = 0;
    this.minPageIndex = 0;
    this.pageIndexes = [];
    this.$pages = null;
    this.$collapses = null;
    this.isTab = false; // Is tabs

    this.isCollapse = false; // Is collapses (accordion)

    this.lastPageSubmit = false; // Enable submit button for the last page only

    this.hideDisabledButton = false; // Hide disabled submit button

    this.hideInactivePages = false; // Hide inactive pages

    this.lockTabs = false; // Set inactive tabs as disabled

    this.hideTabs = false; // Hide all tabs

    this.showPagerTop = false; // Show pager at top

    this.showPagerBottom = false; // Show pager at bottom

    this.pagerTemplate = '<nav><ul class="pagination"><li class="page-item previous ew-prev"><a href="#" class="page-link"><span class="icon-prev"></span> {Prev}</a></li><li class="page-item next ew-next"><a href="#" class="page-link">{Next} <span class="icon-next"></span></a></li></ul></nav>'; // Pager template
    // "show" handler (for disabled tabs)

    var _show = function _show(e) {
      e.preventDefault();
    }; // Set properties

    var _properties = ["lastPageSubmit", "hideDisabledButton", "hideInactivePages", "lockTabs", "hideTabs", "showPagerTop", "showPagerBottom", "pagerTemplate"];

    this.set = function () {
      if (arguments.length == 1 && $.isObject(arguments[0])) {
        var obj = arguments[0];

        for (var i in obj) {
          var p = i[0].toLowerCase() + i.substr(1); // Camel case

          if (_properties.includes(p)) this[p] = obj[i];
        }
      }
    }; // DOM loaded

    this.init = function () {
      var tpl = this.pagerTemplate.replace(/\{prev\}/i, ew.language.phrase("Prev")).replace(/\{next\}/i, ew.language.phrase("Next"));

      if (this.isTab) {
        if (this.showPagerTop) this.$pages.closest(".tabbable, .ew-nav-tabs").before(tpl);
        if (this.showPagerBottom) this.$pages.closest(".tabbable, .ew-nav-tabs").after(tpl);
        this.$form.find(".ew-prev").click(function (e) {
          self.$pages.off("show.bs.tab", _show).filter(".active").parent().prev(":has([data-toggle=tab]:not(.ew-hidden):not(.ew-disabled))").find("[data-toggle=tab]").toggleClass("disabled d-none", false).click();
          return false;
        });
        this.$form.find(".ew-next").click(function (e) {
          self.$pages.off("show.bs.tab", _show).filter(".active").parent().next(":has([data-toggle=tab]:not(.ew-hidden):not(.ew-disabled))").find("[data-toggle=tab]").toggleClass("disabled d-none", false).click();
          return false;
        });
        if (this.hideTabs) this.$form.find(".ew-multi-page > .tabbable > .nav-tabs, .ew-multi-page > .ew-nav-tabs > .nav-tabs").hide();
      } else if (this.isCollapse) {
        if (this.showPagerTop) this.$collapses.closest(".ew-accordion").before(tpl);
        if (this.showPagerBottom) this.$collapses.closest(".ew-accordion").after(tpl);
        this.$form.find(".ew-prev").click(function (e) {
          self.$pages.closest(".card").filter(":has(.collapse.show)").prev(":has([data-toggle=collapse]:not(.ew-hidden):not(.ew-disabled))").toggleClass("disabled d-none", false).find("[data-toggle=collapse]").click();
          return false;
        });
        this.$form.find(".ew-next").click(function (e) {
          self.$pages.closest(".card").filter(":has(.collapse.show)").next(":has([data-toggle=collapse]:not(.ew-hidden):not(.ew-disabled))").toggleClass("disabled d-none", false).find("[data-toggle=collapse]").click();
          return false;
        });
      }

      this.pageShow();
    }; // Page show

    this.pageShow = function () {
      if (this.isTab) {
        if (this.lockTabs) this.$pages.on("show.bs.tab", _show);
        this.$pages.each(function () {
          var $this = $(this);
          if (self.hideInactivePages) $this.toggleClass("d-none", !$this.hasClass("active"));
          if (self.lockTabs) $this.toggleClass("disabled", !$this.hasClass("active"));
        });
      } else if (this.isCollapse) {
        this.$pages.closest(".card").each(function () {
          var $this = $(this);
          if (self.hideInactivePages) $this.toggleClass("d-none", !$this.find(".collapse.show")[0]);
        });
      }

      var disabled = this.lastPageSubmit && this.pageIndex != this.maxPageIndex;
      var $btn = this.$form.closest(".content, .modal-content").find("#btn-action, button.ew-submit").prop("disabled", disabled).toggle(!this.hideDisabledButton || !disabled);
      $(".ew-captcha").toggle($btn.is(":visible:not(:disabled)")); // Re-captcha uses class "disabled", not "disabled" property.

      disabled = this.pageIndex <= this.minPageIndex;
      this.$form.find(".ew-prev").toggleClass("disabled", disabled);
      disabled = this.pageIndex >= this.maxPageIndex;
      this.$form.find(".ew-next").toggleClass("disabled", disabled);
    }; // Go to page by index

    this.gotoPage = function (i) {
      if (i <= 0 || i < this.minPageIndex || i > this.maxPageIndex) return;

      if (this.pageIndex != i) {
        var $page = this.$pages.eq(i - 1);

        if (this.isTab) {
          if ($page.is(":not(.d-none):not(.disabled)")) $page.click();else $page.parent().next(":has([data-toggle=tab]):not(.d-none):not(.disabled)").find("[data-toggle=tab]").toggleClass("disabled", false).click();
        } else if (this.isCollapse) {
          var $p = $page.closest(".card");
          if ($p.is(":not(.d-none)")) $page.click();else $p.next(":has([data-toggle=collapse]):not(.d-none)").find("[data-toggle=collapse]").click();
        }

        this.pageIndex = i;
      }
    };

    this.gotoPageByIndex = this.gotoPage; // Go to page by element

    this.gotoPageByElement = function (el) {
      this.gotoPage(parseInt($(el).data("page"), 10) || -1);
    }; // Go to page by element's id or name or data-field attribute

    this.gotoPageByElementId = function (id) {
      var $el = this.$form.find("[data-page]").filter("[id='" + id + "'],[name='" + id + "'],[data-field='" + id + "']");
      this.gotoPageByElement($el);
    }; // Toggle page

    this.togglePage = function (i, show) {
      if (this.isTab) {
        this.$pages.eq(i - 1).toggleClass("d-none", !show);
      } else if (this.isCollapse) {
        this.$pages.eq(i - 1).closest(".card").toggle("d-none", !show);
      }
    }; // Render

    this.render = function () {
      this.$form = $("#" + formid);
      this.pageIndexes = this.$form.find("[data-page]").map(function () {
        var index = parseInt($(this).data("page"), 10);
        return index > 0 ? index : null;
      }).get();
      this.pageIndexes.sort(function (a, b) {
        return a - b;
      });
      this.minPageIndex = this.pageIndexes[0];
      this.maxPageIndex = this.pageIndexes[this.pageIndexes.length - 1];
      var $tabs = this.$form.find("[data-toggle=tab]");

      if ($tabs[0]) {
        this.$pages = $tabs;
        this.isTab = true;
        $tabs.on("shown.bs.tab", function (e) {
          self.pageIndex = $tabs.index(e.target) + 1;
          self.pageShow();
          $($(this).attr("href")).find(".ew-google-map").each(function () {
            var m = ew.googleMaps[this.id];

            if (m && m["map"]) {
              google.maps.event.trigger(m["map"], "resize");
              m["map"].setCenter(m["latlng"]);
            }
          });
        });
        this.pageIndex = $tabs.index($tabs.parent(".active")) + 1;
      } else {
        this.$collapses = this.$form.find("[data-toggle=collapse]");

        if (this.$collapses[0]) {
          this.$pages = this.$collapses;
          this.isCollapse = true;
          var $bodies = this.$collapses.closest(".card-header").next();
          $bodies.on("shown.bs.collapse", function (e) {
            self.pageIndex = $bodies.index(e.target) + 1;
            self.pageShow();
            $(this).find(".ew-google-map").each(function () {
              var m = ew.googleMaps[this.id];

              if (m && m["map"]) {
                google.maps.event.trigger(m["map"], "resize");
                m["map"].setCenter(m["latlng"]);
              }
            });
          });
          this.pageIndex = $bodies.index($bodies.hasClass("show")) + 1;
        }
      }

      $(function () {
        self.init();
      });
    };
  }

  /**
   * User level ID validator
   */

  function userLevelId(el) {
    if (el && !ew.checkInteger(el.value)) return {
      userLevelId: ew.language.phrase("UserLevelIDInteger")
    };
    var level = parseInt(el.value, 10);
    if (level < 1) return {
      userLevelId: ew.language.phrase("UserLevelIDIncorrect")
    };
    return false;
  }
  /**
   * User level name validator
   * @param {string} id User ID Field input element ID
   */

  function userLevelName(id) {
    return function (el) {
      var elId = document.getElementById("x_" + id);

      if (elId && el) {
        var name = el.value.trim(),
            level = parseInt(elId.value.trim(), 10);

        if (level === 0 && !ew.sameText(name, "Default")) {
          return {
            userLevelName: ew.language.phrase("UserLevelDefaultName")
          };
        } else if (level === -1 && !ew.sameText(name, "Administrator")) {
          return {
            userLevelName: ew.language.phrase("UserLevelAdministratorName")
          };
        } else if (level === -2 && !ew.sameText(name, "Anonymous")) {
          return {
            userLevelName: ew.language.phrase("UserLevelAnonymousName")
          };
        } else if (level > 0 && ["anonymous", "administrator", "default"].includes(name.toLowerCase())) {
          return {
            userLevelName: ew.language.phrase("UserLevelNameIncorrect")
          };
        }
      }

      return false;
    };
  }
  /**
   * Required validator
   */

  function required(fieldName) {
    return function (el) {
      if (el && !ew.hasValue(el)) {
        return {
          required: ew.language.phrase("EnterRequiredField").replace("%s", fieldName)
        };
      }

      return false;
    };
  }
  /**
   * File required validator
   */

  function fileRequired(fieldName) {
    return function (el) {
      var elFn = document.getElementById("fn_" + el.id);

      if (elFn && !ew.hasValue(elFn)) {
        return {
          fileRequired: ew.language.phrase("EnterRequiredField").replace("%s", fieldName)
        };
      }

      return false;
    };
  }
  /**
   * Mismatch password validator
   */

  function mismatchPassword(el) {
    var id;
    if (el.id.startsWith("c_")) // Confirm Password field in Register page
      id = el.id.replace(/^c_/, "x_");else if (el.id == "cpwd") // Change Password page
      id = "npwd";
    var elPwd = document.getElementById(id);

    if (el.value !== elPwd.value) {
      return {
        mismatchPassword: ew.language.phrase("MismatchPassword")
      };
    }

    return false;
  }
  /**
   * Between validator
   */

  function between(el) {
    var x, z;

    if (el.id.startsWith("y_")) {
      x = document.getElementById(el.id.replace(/^y_/, "x_"));
      z = document.getElementById(el.id.replace(/^y_/, "z_"));
    }

    if (ew.hasValue(x) && $(z).val() == "BETWEEN" && !ew.hasValue(el)) {
      return {
        between: ew.language.phrase("EnterValue2")
      };
    }

    return false;
  }
  /**
   * Password strength validator
   */

  function passwordStrength(el) {
    var $el = $(el);

    if ($el.hasClass("ew-password-strength") && !$el.data("validated")) {
      return {
        passwordStrength: ew.language.phrase("PasswordTooSimple")
      };
    }

    return false;
  }
  /**
   * User name validator
   */

  function username(raw) {
    return function (el) {
      if (!raw && el.value.match(new RegExp('[' + ew.escapeRegExChars(ew.INVALID_USERNAME_CHARACTERS) + ']'))) return {
        username: ew.language.phrase("InvalidUsernameChars")
      };
      return false;
    };
  }
  /**
   * Password validator
   */

  function password(raw) {
    return function (el) {
      if (!raw && !ew.ENCRYPTED_PASSWORD && el.value.match(new RegExp('[' + ew.escapeRegExChars(ew.INVALID_PASSWORD_CHARACTERS) + ']'))) return {
        password: ew.language.phrase("InvalidPasswordChars")
      };
      return false;
    };
  }
  /**
   * Email validator
   */

  function email(el) {
    var value = ew.getValue(el);

    if (!ew.checkEmail(value)) {
      return {
        email: ew.language.phrase("IncorrectEmail")
      };
    }

    return false;
  }
  /**
   * Emails validator
   */

  function emails(cnt, err) {
    return function (el) {
      var value = ew.getValue(el);

      if (!ew.checkEmails(value, cnt)) {
        return {
          email: err
        };
      }

      return false;
    };
  }
  /**
   * DateTime validator
   * @param {number} dateFormat DateTime format ID
   */

  function datetime(dateFormat) {
    return function (el) {
      var fn,
          phraseId,
          value = ew.getValue(el),
          newSubStr = ew.DATE_SEPARATOR;

      if ([12, 15, 115].includes(dateFormat)) {
        fn = ew.checkShortDate;
        phraseId = "IncorrectShortDateYMD";
      } else if ([5, 9, 109].includes(dateFormat)) {
        fn = ew.checkDate;
        phraseId = "IncorrectDateYMD";
      } else if ([14, 17, 117].includes(dateFormat)) {
        fn = ew.checkShortEuroDate;
        phraseId = "IncorrectShortDateDMY";
      } else if ([7, 11, 111].includes(dateFormat)) {
        fn = ew.checkEuroDate;
        phraseId = "IncorrectDateDMY";
      } else if ([13, 16, 116].includes(dateFormat)) {
        fn = ew.checkShortUSDate;
        phraseId = "IncorrectShortDateMDY";
      } else if ([6, 10, 110].includes(dateFormat)) {
        fn = ew.checkUSDate;
        phraseId = "IncorrectDateMDY";
      } else {
        // Default date format
        fn = ew.checkDateDef;
        phraseId = "IncorrectDate";
        newSubStr = ew.DATE_FORMAT;
      }

      if (fn && !fn(value)) {
        return {
          datetime: ew.language.phrase(phraseId).replace("%s", newSubStr)
        };
      }

      return false;
    };
  }
  /**
   * Time validator
   */

  function time(el) {
    var value = ew.getValue(el);

    if (!ew.checkTime(value)) {
      return {
        time: ew.language.phrase("IncorrectTime")
      };
    }

    return false;
  }
  /**
   * Float validator
   */

  function float(el) {
    var value = ew.getValue(el);

    if (!ew.checkNumber(value)) {
      return {
        time: ew.language.phrase("IncorrectFloat")
      };
    }

    return false;
  }
  /**
   * Range validator
   * @param {number} min Min value
   * @param {number} max Max value
   */

  function range(min, max) {
    return function (el) {
      var value = ew.getValue(el);

      if (!ew.checkRange(value, min, max)) {
        return {
          range: ew.language.phrase("IncorrectRange").replace("%1", min).replace("%2", max)
        };
      }

      return false;
    };
  }
  /**
   * Integer validator
   */

  function integer(el) {
    var value = ew.getValue(el);

    if (!ew.checkInteger(value)) {
      return {
        integer: ew.language.phrase("IncorrectInteger")
      };
    }

    return false;
  }
  /**
   * US phone validator
   */

  function phone(el) {
    var value = ew.getValue(el);

    if (!ew.checkPhone(value)) {
      return {
        phone: ew.language.phrase("IncorrectPhone")
      };
    }

    return false;
  }
  /**
   * US ZIP validator
   */

  function zip(el) {
    var value = ew.getValue(el);

    if (!ew.checkZip(value)) {
      return {
        zip: ew.language.phrase("IncorrectZip")
      };
    }

    return false;
  }
  /**
   * Credit card validator
   */

  function creditCard(el) {
    var value = ew.getValue(el);

    if (!ew.checkCreditCard(value)) {
      return {
        creditCard: ew.language.phrase("IncorrectCreditCard")
      };
    }

    return false;
  }
  /**
   * US SSN validator
   */

  function ssn(el) {
    var value = ew.getValue(el);

    if (!ew.checkSsn(value)) {
      return {
        ssn: ew.language.phrase("IncorrectSSN")
      };
    }

    return false;
  }
  /**
   * GUID validator
   */

  function guid(el) {
    var value = ew.getValue(el);

    if (!ew.checkGuid(value)) {
      return {
        guid: ew.language.phrase("IncorrectGUID")
      };
    }

    return false;
  }
  /**
   * Regular expression validator
   * @param {string} pattern Regular expression pattern
   */

  function regex(pattern) {
    return function (el) {
      var value = ew.getValue(el);

      if (!ew.checkByRegEx(value, pattern)) {
        return {
          regex: ew.language.phrase("IncorrectField")
        };
      }

      return false;
    };
  }
  /**
    * Custom validator
    * @param {*} fn Function(value, ...args)
    * @param  {...any} args Additional arguments for the function
    */

  function custom(fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return function (el) {
      if (typeof fn == "function") {
        var value = ew.getValue(el);
        if (fn.apply(void 0, [value].concat(args))) return {
          custom: ew.language.phrase("IncorrectField")
        };
      }

      return false;
    };
  }
  /**
   * Captcha validator
   */

  function captcha(el) {
    if (el && !ew.hasValue(el)) {
      return {
        captcha: ew.language.phrase("EnterValidateCode")
      };
    }

    return false;
  }
  /**
   * reCaptcha validator
   * @param {number} id reCaptcha ID
   */

  function recaptcha(el) {
    var _grecaptcha;

    if (el && !ew.hasValue(el) && ((_grecaptcha = grecaptcha) === null || _grecaptcha === void 0 ? void 0 : _grecaptcha.getResponse(el.dataset.id)) === "") {
      return {
        recaptcha: ew.language.phrase("ClickReCaptcha")
      };
    }

    return false;
  }

  var Validators = /*#__PURE__*/Object.freeze({
    __proto__: null,
    userLevelId: userLevelId,
    userLevelName: userLevelName,
    required: required,
    fileRequired: fileRequired,
    mismatchPassword: mismatchPassword,
    between: between,
    passwordStrength: passwordStrength,
    username: username,
    password: password,
    email: email,
    emails: emails,
    datetime: datetime,
    time: time,
    float: float,
    range: range,
    integer: integer,
    phone: phone,
    zip: zip,
    creditCard: creditCard,
    ssn: ssn,
    guid: guid,
    regex: regex,
    custom: custom,
    captcha: captcha,
    recaptcha: recaptcha
  });

  function FormBase(id, pageId) {
    var self = this;
    this._initiated = false;
    this.id = id; // Same ID as the form

    this.pageId = pageId;
    this.$element = null; // jQuery object of the form or div

    this.htmlForm = null; // HTML form element

    this.initSearchPanel = false; // Expanded by default

    this.modified = false;
    this.validateRequired = true;
    this.validate = null;
    this.emptyRow = null; // Check empty row

    this.multiPage = null; // Multi-page

    this.autoSuggests = {}; // AutoSuggests

    this.lists = {}; // Dynamic selection lists
    // Disable form

    this.disableForm = function () {
      var form = this.getForm();
      $(form).find(":submit:not(.dropdown-toggle)").prop("disabled", true).addClass("disabled");
    }; // Enable form

    this.enableForm = function () {
      var form = this.getForm(),
          $form = $(form);
      $form.find(".ew-disabled-element").removeClass("ew-disabled-element").prop("disabled", false);
      $form.find(".ew-enabled-element").removeClass("ew-enabled-element").prop("disabled", true);
      $form.find(":submit:not(.dropdown-toggle)").prop("disabled", false).removeClass("disabled");
    }; // Append hidden element with form name

    this.appendHidden = function (el) {
      var form = this.getForm(),
          $form = $(form),
          $dp = $(el).closest(".ew-form"),
          name = $dp.attr("id") + "$" + el.name;
      if ($form.find("input:hidden[name='" + name + "']")[0]) // Already appended
        return;
      var ar = $dp.find('[name="' + el.name + '"]').serializeArray();

      if (ar.length) {
        ar.forEach(function (o, i) {
          $('<input type="hidden" name="' + name + '">').val(o.value).appendTo($form);
        });
      } else {
        $('<input type="hidden" name="' + name + '">').val("").appendTo($form);
      }
    }; // Can submit

    this.canSubmit = function () {
      var form = this.getForm(),
          $form = $(form);
      this.disableForm();
      this.updateTextArea();

      if (!this.validate || this.validate() && !$form.find(".is-invalid")[0]) {
        $form.find("input[name^=sv_], input[name^=p_], .ew-template input") // Do not submit these values
        .prop("disabled", true).addClass("ew-disabled-element");
        $form.find("[data-readonly=1][disabled]").prop("disabled", false).addClass("ew-enabled-element"); // Submit readonly values

        var $dps = $($form.find("input[name='detailpage']").map(function (i, el) {
          return $form.find("#" + el.value).get();
        }));

        if ($dps.length > 1) {
          // Multiple Master/Detail, check element names
          $dps.each(function (i, dp) {
            $(dp).find(":input").each(function (j, el) {
              if (/^(fn_)?(x|o)\d*_/.test(el.name)) {
                var $els = $dps.not(dp).find(":input[name='" + el.name + "']");

                if ($els.length) {
                  // Elements with same name found
                  self.appendHidden(el); // Append element with form name

                  $els.each(function () {
                    self.appendHidden(this); // Append elements with same name and form name
                  });
                }
              }
            });
          });
        }

        return true;
      } else {
        this.enableForm();
      }

      return false;
    }; // Submit

    this.submit = function (action) {
      var form = this.getForm();

      if (this.canSubmit()) {
        if (action) form.action = action;
        form.submit();
      }

      return false;
    }; // Get dynamic selection list by element name or id

    this.getList = function (name) {
      name = name.replace(/^(sv_)?[xy](\d*|\$rowindex\$)_|\[\]$/g, ""); // Remove element name prefix/suffix

      return this.lists[name];
    }; // Compile templates

    this.compileTemplates = function () {
      var lists = Object.values(this.lists);

      for (var _i = 0, _lists = lists; _i < _lists.length; _i++) {
        var list = _lists[_i];
        if (list.template && $.isString(list.template)) list.template = $.templates(list.template);
      }
    }; // Get the HTML form element

    this.getForm = function () {
      if (!this.htmlForm) {
        this.$element = $("#" + this.id);

        if (this.$element.is("form")) {
          // HTML form
          this.htmlForm = this.$element[0];
        } else if (this.$element.is("div")) {
          // HTML div => Grid page
          this.htmlForm = this.$element.closest("form")[0];
        }
      }

      return this.htmlForm;
    }; // Get form element as single element

    this.getElement = function (name) {
      if (!this.$element) this.$element = $("#" + this.id);
      return name ? ew.getElement(name, this.$element) : this.$element[0];
    }; // Get form element(s) as single element or array of radio/checkbox

    this.getElements = function (name) {
      if (!this.$element) this.$element = $("#" + this.id);
      var selector = "[name='" + name + "']";
      selector = "input" + selector + ",select" + selector + ",textarea" + selector + ",button" + selector;
      var $els = this.$element.find(selector);
      return $els.length == 0 ? null : $els.length == 1 && $els.is(":not([type=checkbox]):not([type=radio])") ? $els[0] : $els.get();
    }; // Update selection lists
    // @param {(null|undefined|number)*} rowindex Row index

    this.updateLists = function (rowindex) {
      if (rowindex === null) // rowindex == $rowindex$ == null
        return;
      if (!$.isNumber(rowindex) && this.pageId == "grid") return;
      var form = this.getForm(),
          // Set up $element and htmlForm
      confirm = form.querySelector("input#confirm");

      if (confirm && confirm.value == "confirm") {
        // Confirm page
        ew.removeSpinner();
        return;
      }

      var fixId = function fixId(id, multiple) {
        var t = "",
            i = rowindex,
            ar = id.split(" ");

        if (ar.length > 1) {
          t = ar[0];
          i = "";
          id = ar[1];
        }

        var prefix = $.isNumber(i) ? "x" + i + "_" : "x_"; // Add row index

        if (id.startsWith("x_")) // Field element name
          id = id.replace(/^x_/, prefix);else // Field var
          id = prefix + id;
        if (multiple && !id.endsWith("[]")) // Add [] if select-multiple
          id += "[]";
        return t ? t + " " + id : id;
      };

      var selector = Object.entries(this.lists).map(function (_ref) {
        var id = _ref[0],
            list = _ref[1];
        return "[name='" + fixId(id, list.multiple) + "']";
      }).join();

      if (!selector || !form.querySelector(selector)) {
        // Lists not found
        ew.removeSpinner();
        return;
      }

      var actions = [],
          promises = [];
      this.compileTemplates(); // For grid where updateList() called before init()

      for (var _i2 = 0, _Object$entries = Object.entries(this.lists); _i2 < _Object$entries.length; _i2++) {
        var _Object$entries$_i = _Object$entries[_i2],
            _id = _Object$entries$_i[0],
            list = _Object$entries$_i[1];
        var parents = list.parentFields.slice().map(function (parent) {
          return fixId(parent);
        }),
            // Clone and fix index
        ajax = list.ajax;
        _id = fixId(_id, list.multiple);

        if ($.isBoolean(ajax)) {
          // Ajax
          var pvalues = parents.map(function (parent) {
            return ew.getOptionValues(parent, form);
          }); // Save the initial values of the parent lists

          actions.push([_id, pvalues, ajax, false]);
        } else {
          // Non-Ajax
          ew.updateOptions.call(this, _id, parents, null, false);
        }
      } // Update the Ajax lists

      for (var i = 0; i < actions.length; i++) {
        promises.push(new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(ew.updateOptions.apply(self, actions.shift()));
          }, ew.AJAX_DELAY * i); // Delay a little in case of large number of lists
        }));
      }

      Promise.all(promises).then(function () {
        $(document).trigger("updatedone", [{
          source: self,
          target: form
        }]);
      }).catch(function (error) {
        console.log(error);
      });
    }; // Create AutoSuggest

    this.createAutoSuggest = function (settings) {
      var options = Object.assign({
        limit: ew.AUTO_SUGGEST_MAX_ENTRIES,
        form: this
      }, ew.autoSuggestSettings, settings); // Global settings + field specific settings

      self.autoSuggests[settings.id] = new ew.AutoSuggest(options);
    }; // Init editors

    this.initEditors = function () {
      var form = this.getForm();
      $(form.elements).filter("textarea.editor").each(function (i, el) {
        var ed = $(el).data("editor");
        if (ed && !ed.active && !ed.name.includes("$rowindex$")) ed.create();
      });
    }; // Update textareas

    this.updateTextArea = function (name) {
      var form = this.getForm();
      $(form.elements).filter("textarea.editor").each(function (i, el) {
        var ed = $(el).data("editor");
        if (!ed || name && ed.name != name) return true; // Continue

        ed.save();
        if (name) return false; // Break
      });
    }; // Destroy editor(s)

    this.destroyEditor = function (name) {
      var form = this.getForm();
      $(form.elements).filter("textarea.editor").each(function (i, el) {
        var ed = $(el).data("editor");
        if (!ed || name && ed.name != name) return true; // Continue

        ed.destroy();
        if (name) return false; // Break
      });
    }; // Show error message

    this.onError = function (el, msg) {
      return ew.onError(this, el, msg);
    }; // Init file upload

    this.initUpload = function () {
      var form = this.getForm();
      $(form.elements).filter("input:file:not([name*='$rowindex$'],[id='importfiles'])").each(function (index) {
        $.later(ew.AJAX_DELAY * index, null, ew.upload, this); // Delay a little in case of large number of upload fields
      });
    }; // Set up filters

    this.setupFilters = function (e, filters) {
      var id = this.id,
          data = this.filterList ? this.filterList.data : null,
          $sf = $(".ew-save-filter[data-form=" + id + "]").toggleClass("disabled", !data),
          $df = $(".ew-delete-filter[data-form=" + id + "]").toggleClass("disabled", !filters.length).toggleClass("dropdown-toggle", !!filters.length),
          $delete = $df.parent("li").toggleClass("dropdown-submenu dropdown-hover", !!filters.length).toggleClass("disabled", !filters.length),
          $save = $sf.parent("li").toggleClass("disabled", !data),
          $btn = $(e.target);

      var saveFilters = function saveFilters(id, filters) {
        if (ew.SEARCH_FILTER_OPTION == "Client") {
          window.localStorage.setItem(id + "_filters", JSON.stringify(filters));
        } else if (ew.SEARCH_FILTER_OPTION == "Server") {
          var $body = $("body");
          $body.css("cursor", "wait");
          $.ajax(ew.currentPage(), {
            type: "POST",
            dataType: "json",
            data: {
              "ajax": "savefilters",
              "filters": JSON.stringify(filters)
            }
          }).done(function (result) {
            if (result[0] && result[0].success) self.filterList.filters = filters; // Save filters
          }).always(function () {
            $body.css("cursor", "default");
          });
        }
      };

      $save.off("click.ew").on("click.ew", function (e) {
        // Save filter
        if ($save.hasClass("disabled")) return false;
        ew.prompt(ew.language.phrase("EnterFilterName"), function (name) {
          if (name) {
            filters.push([name, data]);
            saveFilters(id, filters);
          }
        }, true);
      }).prevAll().remove();
      $df.next("ul.dropdown-menu").remove();

      if (filters.length) {
        var $submenu = $("<ul class='dropdown-menu'></ul>");

        for (var i in filters) {
          if (!Array.isArray(filters[i])) continue;
          $('<li><a class="dropdown-item" data-index="' + i + '" href="#" onclick="return false;">' + filters[i][0] + '</a></li>').on("click", function (e) {
            // Delete
            var i = $(this).find("a[data-index]").data("index");
            ew.prompt(ew.language.phrase("DeleteFilterConfirm").replace("%s", filters[i][0]), function (result) {
              if (result) {
                filters.splice(i, 1);
                saveFilters(id, filters);
              }
            });
          }).appendTo($submenu);
          $('<li><a class="dropdown-item ew-filter-list" data-index="' + i + '" href="#" onclick="return false;">' + filters[i][0] + '</a></li>').insertBefore($save).on("click", function (e) {
            var i = $(this).find("a[data-index]").data("index");
            $("<form>").attr({
              method: "post",
              action: ew.currentPage()
            }).append($("<input type='hidden'>").attr({
              name: "cmd",
              value: "resetfilter"
            }), $("<input type='hidden'>").attr({
              name: ew.TOKEN_NAME_KEY,
              value: ew.TOKEN_NAME
            }), // PHP
            $("<input type='hidden'>").attr({
              name: ew.ANTIFORGERY_TOKEN_KEY,
              value: ew.ANTIFORGERY_TOKEN
            }), // PHP
            $("<input type='hidden'>").attr({
              name: "filter",
              value: JSON.stringify(filters[i][1])
            })).appendTo("body").submit();
          });
        }

        $("<li class='dropdown-divider'></li>").insertBefore($save);
        $delete.append($submenu);
      }
    }; // Init form

    this.init = function () {
      if (this._initiated) return; // Filters button

      if (ew.SEARCH_FILTER_OPTION == "Client" && window.localStorage || ew.SEARCH_FILTER_OPTION == "Server" && ew.IS_LOGGEDIN && !ew.IS_SYS_ADMIN && ew.CURRENT_USER_NAME != "") {
        $(".ew-filter-option." + this.id + " .ew-btn-dropdown").on("show.bs.dropdown", function (e) {
          var filters = [];

          if (ew.SEARCH_FILTER_OPTION == "Client") {
            var item = window.localStorage.getItem(self.id + "_filters");
            if (item) filters = ew.parseJson(item) || [];
          } else if (ew.SEARCH_FILTER_OPTION == "Server") filters = self.filterList && self.filterList.filters ? self.filterList.filters : [];

          var ar = $.grep(filters, function (val) {
            if (Array.isArray(val) && val.length == 2) return val;
          });
          self.setupFilters(e, ar);
        });
        $(".ew-filter-option").show();
      } else {
        $(".ew-filter-option").hide();
      } // Check form

      var form = this.getForm(),
          $form = $(form);
      if (!form) return; // Compile templates

      this.compileTemplates(); // Check if Search panel

      var isSearch = /s(ea)?rch$/.test(this.id); // Search panel

      if (isSearch && this.initSearchPanel && !ew.hasFormData(form)) $("#" + this.id + "-search-panel").removeClass("show"); // Search panel toggle

      $(".ew-search-toggle[data-form=" + this.id + "]").on("click.bs.button", function () {
        $("#" + $(this).data("form") + "-search-panel").collapse("toggle");
      }); // Hide search operator column

      if (!$(".ew-table .ew-search-operator").text().trim()) $(".ew-table .ew-search-operator").parent("td").hide(); // Highlight button

      if (isSearch) {
        $(".ew-highlight[data-form=" + this.id + "]").on("click.bs.button", function () {
          $("span." + $(this).data("name")).toggleClass("ew-highlight-search");
        });
      } // Search operators

      if (isSearch) {
        // Search form
        $form.find("select[id^=z_]").each(function () {
          var $this = $(this).change();
          if ($this.val() != "BETWEEN") $form.find("#w_" + this.id.substr(2)).change();
        });
      } // Multi-page

      if (this.multiPage) this.multiPage.render(); // HTML editors

      loadjs.ready(["editor"], this.initEditors.bind(this)); // Dynamic selection lists

      this.updateLists(); // Init file upload

      this.initUpload(); // Submit/Cancel

      if (this.$element.is("form")) {
        // Not Grid page
        // Detail pages
        this.$element.find(".ew-detail-pages .ew-nav-tabs a[data-toggle=tab]").on("shown.bs.tab", function (e) {
          var $tab = $(e.target.getAttribute("href")),
              $panel = $tab.find(".table-responsive.ew-grid-middle-panel"),
              $container = $tab.closest(".container-fluid");
          if ($panel.width() >= $container.width()) $panel.width($container.width() + "px");else $panel.width("auto");
        });
        $form.submit(function (e) {
          // Bind submit event
          return self.submit();
        });
        $form.find("[data-field], .ew-priv").change(function () {
          if (ew.CONFIRM_CANCEL) self.modified = true;
        });
        $form.find("#btn-cancel[data-href]").click(function () {
          // Cancel
          self.updateTextArea();
          var href = $(this).data("href");

          if (self.modified && ew.hasFormData(form)) {
            ew.prompt(ew.language.phrase("ConfirmCancel"), function (result) {
              if (result) window.location = href;
            });
          } else {
            window.location = href;
          }
        });
      }

      this._initiated = true; // Store form object as data

      this.$element.data("form", this);
    }; // Add to the global forms object

    ew.forms.add(this);
  }

  /**
   * Class Field
   */
  var Field = /*#__PURE__*/function () {
    /**
     * Constructor
     * @param {string} fldvar Field variable name
     * @param {Function[]|Function} validators Validators
     * @param {bool} invalid Initial valid status (e.g. server side)
     */
    function Field(fldvar, validators, invalid) {
      _defineProperty(this, "name", "");

      _defineProperty(this, "validators", []);

      _defineProperty(this, "_validate", true);

      this.name = fldvar;

      if (Array.isArray(validators)) {
        for (var _iterator = _createForOfIteratorHelperLoose(validators), _step; !(_step = _iterator()).done;) {
          var validator = _step.value;
          this.addValidator(validator);
        }
      } else if (typeof validators === "function") {
        this.addValidator(validators);
      }

      this.invalid = invalid;
    }
    /**
     * Add validator
     * @param {Function} validator Validator function
     */

    var _proto = Field.prototype;

    _proto.addValidator = function addValidator(validator) {
      if (typeof validator === "function") this.validators.push(validator);
    }
    /**
     * Get error
     * @returns {Object}
     */
    ;

    /**
     * Add error
     * @param {Object} err Error
     */
    _proto.addError = function addError(err) {
      if (err) {
        var _this$_error;

        var error = (_this$_error = this._error) !== null && _this$_error !== void 0 ? _this$_error : {};
        this._error = _objectSpread2(_objectSpread2({}, error), err);
        this.invalid = true;
      }
    }
    /**
     * Clear all errors
     */
    ;

    _proto.clearErrors = function clearErrors() {
      this._error = null;
      this.invalid = false;
    }
    /**
     * Clear all validators
     */
    ;

    _proto.clearValidators = function clearValidators() {
      this.validators = [];
    }
    /**
     * Get error message
     * @returns {string} HTML
     */
    ;

    /**
     * Validate field value
     * @returns {boolean}
     */
    _proto.validate = function validate() {
      var result = true;
      this.clearErrors(); // Reset error

      if (this._element && this.shouldValidate) {
        if (Array.isArray(this.validators)) {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.validators), _step2; !(_step2 = _iterator2()).done;) {
            var validator = _step2.value;
            var err = validator(this._element);

            if (err !== false) {
              this.addError(err);
              result = false;
            }
          }

          this.updateFeedback();
        }
      }

      return result;
    }
    /**
     * Update the error message to feedback element
     */
    ;

    _proto.updateFeedback = function updateFeedback() {
      var err = this.errorMessage;

      if (this._element && err) {
        jQuery(this._element).closest("[id^=el_], .form-group").find(".invalid-feedback").html(err);
        ew.setInvalid(this._element);
      }
    }
    /**
     * Set focus
     */
    ;

    _proto.focus = function focus() {
      if (this._element) ew.setFocus(this._element);
    };

    _createClass(Field, [{
      key: "error",
      get: function get() {
        return this._error;
      }
    }, {
      key: "errorMessage",
      get: function get() {
        if (this._error) {
          return Array.from(Object.values(this._error)).join("<br>");
        }

        return "";
      }
      /**
       * Check if the field should be validated
       */

    }, {
      key: "shouldValidate",
      get: function get() {
        return !this._checkbox || this._checkbox.checked;
      }
      /**
       * Set form element
       */

    }, {
      key: "element",
      set: function set(el) {
        var _this$_element, _this$_element$id;

        this._element = el;
        this._checkbox = ((_this$_element = this._element) === null || _this$_element === void 0 ? void 0 : (_this$_element$id = _this$_element.id) === null || _this$_element$id === void 0 ? void 0 : _this$_element$id.match(/^[xy]_/)) ? document.getElementById(this._element.id.replace(/^[xy]_/, "u_")) : null; // Find the checkbox for the field in Update page
      }
      /**
       * Get form element
       * @returns {HTMLElement|HTMLElement[]}
       */
      ,
      get: function get() {
        return this._element;
      }
      /**
       * Get field value from form element
       * @returns {string|Array}
       */

    }, {
      key: "value",
      get: function get() {
        return this._element ? ew.getValue(this._element) : "";
      }
    }]);

    return Field;
  }();

  /**
   * Class Form
   */

  var Form = /*#__PURE__*/function (_FormBase) {
    _inheritsLoose(Form, _FormBase);

    /**
     * Constructor
     * @param {string} id Form ID
     * @param {string} pageId Page ID
     */
    function Form(id, pageId) {
      var _this;

      _this = _FormBase.call(this, id, pageId) || this;

      _defineProperty(_assertThisInitialized(_this), "row", {});

      _defineProperty(_assertThisInitialized(_this), "fields", {});

      return _this;
    }
    /**
     * Add field
     * @param {string} fldvar Field variable name
     * @param {Function[]} validators Validators
     * @param {bool} invalid Invalid
     */

    var _proto = Form.prototype;

    _proto.addField = function addField(fldvar, validators, invalid) {
      if (!(fldvar in this.fields)) this.fields[fldvar] = new Field(fldvar, validators, invalid);
    }
    /**
     * Get field
     * @param {string} fldvar Field variable name
     * @returns Field
     */
    ;

    _proto.getField = function getField(fldvar) {
      return this.fields[fldvar];
    }
    /**
     * Add fields by field definitions
     * @param {Array} fields
     */
    ;

    _proto.addFields = function addFields(fields) {
      if (Array.isArray(fields)) {
        for (var _iterator = _createForOfIteratorHelperLoose(fields), _step; !(_step = _iterator()).done;) {
          var field = _step.value;

          if (Array.isArray(field)) {
            this.addField.apply(this, field);
          }
        }
      }
    }
    /**
     * Add error
     * @param {string} fldvar Field variable name
     * @param {Object} err Error
     */
    ;

    _proto.addError = function addError(fldvar, err) {
      if (err) {
        var _this$_error;

        this._error = (_this$_error = this._error) !== null && _this$_error !== void 0 ? _this$_error : {};
        this._error[fldvar] = err;
      }
    }
    /**
     * Add custom error
     * @param {string} fldvar Field variable name
     * @param {string} msg Error message
     */
    ;

    _proto.addCustomError = function addCustomError(fldvar, msg) {
      if (fldvar in this.fields) {
        var field = this.fields[fldvar],
            err = {
          custom: msg
        };
        field.addError(err);
        field.updateFeedback();
        this.addError(fldvar, err);
      }

      return false;
    }
    /**
     * Get error
     */
    ;

    /**
     * Set focus to the first field with error
     */
    _proto.focus = function focus() {
      for (var _i = 0, _Object$entries = Object.entries(this.fields); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _Object$entries[_i],
            fldvar = _Object$entries$_i[0],
            field = _Object$entries$_i[1];

        if (field.invalid || this._error && this._error[fldvar]) {
          field.focus();
          this.makeVisible(field.element);
          break;
        }
      }
    }
    /**
     * Make the form visible
     * @param {HTMLElement} el Focused element
     */
    ;

    _proto.makeVisible = function makeVisible(el) {
      if (this.multiPage) {
        // Multi-page
        this.multiPage.gotoPageByElement(el);
      } else if (this.$element.is("div")) {
        // Multiple Master/Detail
        var $pane = this.$element.closest(".tab-pane");
        if ($pane[0] && !$pane.hasClass("active")) $pane.closest(".tabbable, .ew-nav-tabs").find("a[data-toggle=tab][href='#" + $pane.attr("id") + "']").click();
      }
    }
    /**
     * Validate all fields of the specified row
     * @param {number} rowIndex Row index
     */
    ;

    _proto.validateFields = function validateFields(rowIndex) {
      this.rowIndex = rowIndex !== null && rowIndex !== void 0 ? rowIndex : "";
      this.row = {};
      this._error = null; // Reset

      var result = true;

      for (var _i2 = 0, _Object$values = Object.values(this.fields); _i2 < _Object$values.length; _i2++) {
        var field = _Object$values[_i2];
        field.element = this.getElements("x" + this.rowIndex + "_" + field.name); // Set element

        if (!field.element) field.element = this.getElements("x" + this.rowIndex + "_" + field.name + "[]"); // Field with []

        if (!field.element) field.element = this.getElements(field.name); // Field by name directly (e.g. email form)

        this.row[field.name] = field.value; // Get field value

        if (!field.validate()) {
          // Invalid field value
          this.addError(field.name, field.error);
          result = false;
        }
      } // Save the field values of the row

      if (!this.value) {
        this.value = _objectSpread2({}, this.row);
      } else {
        if (!Array.isArray(this.value)) this.value = [this.value];
        var index = parseInt(rowIndex, 10) || 0;
        index = index > 1 ? index - 1 : 0;
        this.value[index] = _objectSpread2({}, this.row);
      }

      this.focus();
      return result;
    }
    /**
     * Set invalid fields of the specified row
     * @param {number} rowIndex Row index
     */
    ;

    _proto.setInvalid = function setInvalid(rowIndex) {
      this.rowIndex = rowIndex !== null && rowIndex !== void 0 ? rowIndex : "";

      for (var _i3 = 0, _Object$values2 = Object.values(this.fields); _i3 < _Object$values2.length; _i3++) {
        var field = _Object$values2[_i3];
        if (!field.invalid) continue;
        field.element = this.getElements("x" + this.rowIndex + "_" + field.name); // Set element

        if (!field.element) field.element = this.getElements("x" + this.rowIndex + "_" + field.name + "[]"); // Fields with []

        if (!field.element) field.element = this.getElements(field.name); // Fields without prefix (e.g. email form)

        ew.setInvalid(field.element);
      }
    };

    _createClass(Form, [{
      key: "error",
      get: function get() {
        return this._error;
      }
    }]);

    return Form;
  }(FormBase);

  var AjaxLookup = /*#__PURE__*/function () {
    /**
     * Constructor
     * @param {Object} settings Settings
     * @param {string} settings.id - Input element ID
     * @param {string|Form} settings.form - Form of the input element
     * @param {Number} settings.limit - Options per page
     * @param {Object} settings.data - Data submitted by Ajax
     */
    function AjaxLookup(settings) {
      _defineProperty(this, "_isAutoSuggest", null);

      this.elementId = settings.id; // Id

      this.form = settings.form; // Form

      if ($.isString(this.form)) // Form is string => Form id
        this.form = ew.forms.get(this.form);
      this.element = this.form.getElement(this.elementId); // Actual HTML element

      this.formElement = this.form.getElement(); // HTML form or DIV

      this.list = this.form.getList(this.elementId);
      var m = this.elementId.match(/^[xy](\d*|\$rowindex\$)_/),
          rowindex = m ? m[1] : "";
      this.parentFields = this.list.parentFields.slice() // Clone
      .map(function (pf) {
        return pf.split(" ").length == 1 ? pf.replace(/^x_/, "x" + rowindex + "_") : pf;
      }); // Parent field in the same table, add row index

      this.limit = settings.limit;
      this.debounce = settings.debounce;
      this.data = settings.data;
      this.recordCount = 0;
    }
    /**
     * Is AutoSuggest
     */

    var _proto = AjaxLookup.prototype;

    /**
     * Format display value
     * @param {Array} opt Option
     */
    _proto.formatResult = function formatResult(opt) {
      if (this.list.template && !this.isAutoSuggest) {
        return this.list.template.render(opt, ew.jsRenderHelpers);
      } else {
        return ew.displayValue(opt, this.element) || opt[0];
      }
    }
    /**
     * Generate request
     */
    ;

    _proto.generateRequest = function generateRequest() {
      var _this = this;

      var data = Object.assign({}, this.data, {
        name: this.element.name,
        page: this.list.page,
        field: this.list.field,
        ajax: "autosuggest",
        language: ew.LANGUAGE_ID
      }, ew.getUserParams("#p_" + this.elementId, this.formElement));

      if (this.parentFields.length > 0) {
        this.parentFields.forEach(function (pf, i) {
          var arp = ew.getOptionValues(pf, _this.formElement);
          data["v" + (i + 1)] = arp.join(ew.MULTIPLE_OPTION_SEPARATOR);
        });
      }

      return data;
    }
    /**
     * Get URL
     */
    ;

    _proto.getUrl = function getUrl(query, start) {
      var params = new URLSearchParams({
        q: query,
        n: this.limit,
        rnd: ew.random(),
        start: $.isNumber(start) ? start : -1
      });
      return ew.getApiUrl(ew.API_LOOKUP_ACTION, params.toString());
    }
    /**
     * Prepare URL and data for sending request
     * @param {string} query Search term
     * @param {Number} start Start page
     */
    ;

    _proto.prepare = function prepare(query, start) {
      return {
        url: this.getUrl(query, start),
        type: "POST",
        dataType: "json",
        data: this.generateRequest()
      };
    }
    /**
     * Transform options (virtual)
     * @param {Object[]} data Data from server
     */
    ;

    _proto.transform = function transform(data) {
      var results = [];

      if (data && data.result == "OK") {
        this.recordCount = data.totalRecordCount;
        results = data.records;
      }

      return results;
    };

    _createClass(AjaxLookup, [{
      key: "isAutoSuggest",
      get: function get() {
        if (this._isAutoSuggest === null) this._isAutoSuggest = ew.isAutoSuggest(this.element);
        return this._isAutoSuggest;
      }
    }]);

    return AjaxLookup;
  }();

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

  function AutoSuggest(settings) {
    AjaxLookup.call(this, settings); // Extends AjaxLookup

    var emptyObj = {
      typeahead: {}
    }; // Empty Auto-Suggest object

    if (this.elementId.includes("$rowindex$")) return emptyObj;
    this.input = this.form.getElement("sv_" + this.elementId); // User input

    if (!this.input) return emptyObj;
    var self = this,
        $input = $(this.input),
        $element = $(this.element),
        timer; // Properties

    this.minWidth = settings.minWidth;
    this.maxHeight = settings.maxHeight;
    this.highlight = settings.highlight;
    this.hint = settings.hint;
    this.minLength = settings.minLength;
    this.templates = Object.assign({}, settings.templates); // Clone

    this.trigger = settings.trigger; // For loading more results

    this.delay = settings.delay; // For loading more results

    this.debounce = settings.debounce;
    this.display = settings.display || "text";
    this.forceSelection = settings.forceSelect;
    this.$input = $input;
    this.$element = $element; // Save initial option

    if ($input.val() && $element.val()) this.element.add($element.val(), $input.val(), true); // Set the selected item to the actual field

    this.setValue = function (v) {
      v = v || $input.val();
      var index = this.element.options.findIndex(function (option) {
        return option.text == v;
      });

      if (index < 0) {
        // Not found in results
        if (this.forceSelection && v) {
          // Force selection and query not empty => error
          $input.typeahead("val", "").attr("placeholder", ew.language.phrase("ValueNotExist")).addClass("is-invalid");
          $element.val("").change();
          return;
        }
      } else {
        // Found in results
        this.element.options[index].selected = true;
        if (!/s(ea)?rch$/.test(this.formElement.id) || this.forceSelection) // Force selection or not search form
          v = this.element.options[index].value; // Replace the display value by Link Field value
      }

      if (v !== $element.attr("value")) $element.attr("value", v).change(); // Set value to the actual field
    }; // Transform suggestion

    this.transform = function (data) {
      var results = AjaxLookup.prototype.transform.call(this, data);
      this.element.options = results.map(function (item) {
        return new SelectionListOption(item[0], self.formatResult(item));
      });
      return this.element.options;
    }; // Get suggestions by Ajax

    this.source = function (query, syncResults, asyncResults) {
      if (timer) timer.cancel();
      timer = $.later(self.debounce, null, function () {
        self.recordCount = 0; // Reset

        var settings = self.prepare(query);
        $.ajax(settings).done(function (data) {
          asyncResults(self.transform(data));
        });
      });
    }; // Get current suggestion count

    this.count = function () {
      return self.typeahead.menu.$node.find(".tt-suggestion.tt-selectable").length;
    }; // Get more suggestions by Ajax

    this.more = function () {
      var $body = $("body");
      $body.css("cursor", "wait");
      var ta = self.typeahead,
          query = ta.menu.query,
          dataset = ta.menu.datasets[0];
      var start = self.count();
      var settings = self.prepare(query, start);
      $.ajax(settings).done(function (data) {
        data = self.transform(data);

        dataset._append(query, data);

        ta.menu.$node.find(".tt-dataset").scrollTop(dataset.$lastSuggestion.outerHeight() * start);
      }).always(function () {
        $body.css("cursor", "default");
      });
    }; // Add events

    $input.on("typeahead:select", function (e, d) {
      self.setValue(d[self.display]);
    }).change(function (e) {
      var ta = $input.data("tt-typeahead");

      if (ta && ta.isOpen() && !ta.menu.empty()) {
        var $item = ta.menu.getActiveSelectable();

        if ($item) {
          // A suggestion is highlighted
          var i = $item.index(),
              val = self.element.options[i].text;
          $input.typeahead("val", val);
        }
      }

      self.setValue();
    }).blur(function (e) {
      // "change" fires before blur
      var ta = $input.data("tt-typeahead");
      if (ta && ta.isOpen()) ta.menu.close();
    }).focus(function (e) {
      $input.attr("placeholder", $input.data("placeholder")).removeClass("is-invalid");
    }); // Option template ("suggestion" template)

    var tpl = self.list.template || self.templates["suggestion"];
    if (tpl && $.isString(tpl)) tpl = $.templates(tpl);
    if (tpl) self.templates["suggestion"] = tpl.render.bind(tpl); // Save

    $element.data("autosuggest", this); // Create Typeahead

    $(function () {
      // Typeahead options and dataset
      var options = {
        highlight: self.highlight,
        minLength: self.minLength,
        hint: self.hint,
        trigger: self.trigger,
        delay: self.delay
      };
      var dataset = {
        name: self.form.id + "-" + self.elementId,
        source: self.source,
        templates: self.templates,
        display: self.display,
        limit: self.limit,
        async: true
      };
      var args = [options, dataset]; // Trigger "typeahead" event

      $element.trigger("typeahead", [args]);
      self.limit = dataset.limit; // Create Typeahead

      $input.typeahead.apply($input, args);
      $input.on("typeahead:rendered", function () {
        var $node = self.typeahead.menu.$node;
        var $more = $node.find(".tt-more").html(ew.language.phrase("More"));

        if (arguments.length > 1 && // Arguments: event, suggestion, suggestion, ...
        self.recordCount > self.count()) {
          $more.one(options.trigger, function (e) {
            setTimeout(function () {
              self.more();
            }, options.delay);
            e.preventDefault();
            e.stopPropagation();
          });
        } else {
          $more.hide();
        }
      });
      $input.off("blur.tt");
      self.typeahead = $input.data("tt-typeahead");
      var $menu = self.typeahead.menu.$node.css("z-index", 1000);
      if (self.minWidth) $menu.css("min-width", self.minWidth);
      var $dataset = $menu.find(".tt-dataset");
      var maxHeight = self.maxHeight || (parseInt($dataset.css("line-height"), 10) + 6) * (dataset.limit + 1); // Match .tt-suggestion padding

      $dataset.css({
        "max-height": maxHeight,
        "overflow-y": "auto"
      });
    });
  }

  AutoSuggest.prototype = Object.create(AjaxLookup.prototype);

  /**
   * Class Forms
   */

  var Forms = /*#__PURE__*/function () {
    function Forms() {
      _defineProperty(this, "_forms", {});
    }

    var _proto = Forms.prototype;

    /**
     * Get form by element or id
     * @param {HTMLElement|string} el Element or id
     */
    _proto.get = function get(el) {
      var id = $.isString(el) ? el : ew.getForm(el).id;
      return this._forms[id];
    }
    /**
     * Add form
     * @param {Form} f Form
     */
    ;

    _proto.add = function add(f) {
      this._forms[f.id] = f;
    }
    /**
     * Get all ids
     * @returns {string[]}
     */
    ;

    _proto.ids = function ids() {
      return Object.keys(this._forms);
    };

    return Forms;
  }();

  /**
   * Select2 decorator for results adapter
   */

  function getSelect2CustomOptionClass (Utils) {
    var Select2CustomOption = /*#__PURE__*/function () {
      function Select2CustomOption() {}

      var _proto = Select2CustomOption.prototype;

      _proto.render = function render(decorated) {
        var $results = $('<div class="select2-results__options ' + this.options.get('containerClass') + '" role="listbox"></div>'); //***

        if (this.options.get('multiple')) {
          $results.attr('aria-multiselectable', 'true');
        }

        this.$results = $results;
        return $results;
      };

      _proto.displayMessage = function displayMessage(decorated, params) {
        var escapeMarkup = this.options.get('escapeMarkup');
        this.clear();
        this.hideLoading();
        var $message = $('<div role="alert" aria-live="assertive"' + ' class="select2-results__option"></div>'); //***

        if (params.message.includes("<") && params.message.includes(">")) {
          // HTML //***
          $message.append(params.message);
        } else {
          var message = this.options.get('translations').get(params.message);
          $message.append(escapeMarkup(message(params.args)));
        }

        $message[0].className += ' select2-results__message';
        this.$results.append($message);
      };

      _proto.append = function append(decorated, data) {
        var _this = this;

        this.hideLoading();

        if (data.results == null || data.results.length === 0) {
          if (this.$results.children().length === 0) {
            if (this.$element.data("updating")) {
              this.trigger('results:message', {
                message: '<div class="spinner-border spinner-border-sm text-primary ew-select-spinner" role="status"><span class="sr-only">' + ew.language.phrase('Loading') + '</span></div> ' + ew.language.phrase('Loading')
              });
              this.$element.one("updatedone", function () {
                return _this.$element.select2("close").select2("open");
              });
            } else {
              this.trigger('results:message', {
                message: 'noResults'
              });
            }
          }

          return;
        }

        data.results = this.sort(data.results); //***

        var cols = this.options.get('columns'),
            len = data.results.length,
            $row = this.$results.find("." + this.options.get('rowClass')).last();

        for (var d = 0; d < data.results.length; d++) {
          var item = data.results[d];
          var $option = this.option(item);

          if (!$row.length || $row.children().length == cols) {
            // Add new row
            $row = $('<div class="' + this.options.get('rowClass') + '"></div>');
            this.$results.append($row);
          }

          $row.append($option);

          if (d == len - 1) {
            // Last
            var cnt = cols - $row.children().length;

            for (var i = 0; i < cnt; i++) {
              $row.append('<div class="' + this.options.get('colClass') + '"></div>');
            }
          }
        }
      };

      _proto.option = function option(decorated, data) {
        // var option = document.createElement('li');
        var option = document.createElement('div'); //***

        option.className = 'select2-results__option ' + this.options.get('cellClass'); //***

        var attrs = {
          'role': 'option',
          'aria-selected': 'false'
        };
        var matches = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;

        if (data.element != null && matches.call(data.element, ':disabled') || data.element == null && data.disabled) {
          delete attrs['aria-selected'];
          attrs['aria-disabled'] = 'true';
        }

        if (data.id == null) {
          delete attrs['aria-selected'];
        }

        if (data._resultId != null) {
          option.id = data._resultId;
        }

        if (data.title) {
          option.title = data.title;
        } // if (data.children) { //***
        //   attrs.role = 'group';
        //   attrs['aria-label'] = data.text;
        //   delete attrs['aria-selected'];
        // }

        for (var attr in attrs) {
          var val = attrs[attr];
          option.setAttribute(attr, val);
        } // if (data.children) { //***
        //   var $option = $(option);
        //   var label = document.createElement('strong');
        //   label.className = 'select2-results__group';
        //   var $label = $(label);
        //   this.template(data, label);
        //   var $children = [];
        //   for (var c = 0; c < data.children.length; c++) {
        //     var child = data.children[c];
        //     var $child = this.option(child);
        //     $children.push($child);
        //   }
        //   var $childrenContainer = $('<ul></ul>', {
        //     'class': 'select2-results__options select2-results__options--nested'
        //   });
        //   $childrenContainer.append($children);
        //   $option.append(label);
        //   $option.append($childrenContainer);
        // } else {

        this.template(data, option); // }

        Utils.StoreData(option, 'data', data);
        return option;
      };

      return Select2CustomOption;
    }();

    return Select2CustomOption;
  }

  var currentUrl = new URL(window.location);
  var forms = new Forms();
  var $document = $(document),
      $body = $("body"); // Remove spinner (immediately)

  var _removeSpinner = ew.removeSpinner; // Remove spinner

  function removeSpinner() {
    var timer = $body.data("_spinner");
    if (timer) timer.cancel();
    timer = $.later(500, null, function () {
      if ($document.data("_ajax") !== true) {
        // Ajax not running
        _removeSpinner();

        $("form.ew-form").each(function () {
          var frm = forms.get(this.id);

          if (frm) {
            frm.focus();
            return false;
          }
        });
      }
    });
    $body.data("_spinner", timer);
  } // Create select2

  function createSelect(options) {
    if (options.selectId.includes("$rowindex$")) return;

    $.fn.select2.amd.require(["select2/utils", "select2/results", "select2/dropdown/infiniteScroll", "select2/dropdown/hidePlaceholder", "select2/dropdown/selectOnClose"], function (opts) {
      return function (Utils, ResultsList, InfiniteScroll, HidePlaceholder, SelectOnClose) {
        var options = Object.assign({}, ew.selectOptions, opts);

        if (options.resultsAdapter == null) {
          options.resultsAdapter = ResultsList;

          if (options.dropdown && options.columns && options.customOption) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, getSelect2CustomOptionClass(Utils));

            if (options.iconClass && options.multiple && !options.templateResult) {
              options.templateResult = function (result) {
                return '<label class="' + options.iconClass + ' ew-dropdown-label">' + result.text + '</label>';
              };
            }
          }

          if (options.ajax != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
          }

          if (options.placeholder != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
          }

          if (options.selectOnClose) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
          }
        }

        if ($.isObject(options.ajax)) {
          var lookup = new ew.AjaxLookup(options.ajax);
          options.ajax = {
            url: function url(params) {
              var start = params.page ? (params.page - 1) * (settings.limit || ew.AUTO_SUGGEST_MAX_ENTRIES) : -1;
              return lookup.getUrl(params.term, start);
            },
            type: "POST",
            dataType: "json",
            data: lookup.generateRequest(),
            delay: options.debounce,
            processResults: function processResults(data) {
              return {
                results: lookup.transform(data).map(function (item) {
                  return {
                    id: item[0],
                    text: lookup.formatResult({
                      lf: item[0],
                      df: item[1],
                      df2: item[2],
                      df3: item[3],
                      df4: item[4]
                    })
                  };
                }),
                pagination: {
                  more: data.length < lookup.recordCount
                }
              };
            }
          };
        }

        $("select[data-select2-id='" + options.selectId + "']").select2(options);

        if (options.multiple && options.minimumResultsForSearch === Infinity) {
          $("select[id='<#= ctl #>']").on("select2:opening select2:closing", function (event) {
            $(this).parent().find(".select2-search__field").prop("disabled", true);
          });
        }
      };
    }(options));
  } // Init icon tooltip

  function initIcons(e) {
    var el = e && e.target ? e.target : document;
    $(el).find(".ew-icon").closest("a, button").add(".ew-tooltip").tooltip({
      container: "body",
      trigger: ew.IS_MOBILE ? "manual" : "hover",
      placement: "bottom",
      sanitizeFn: ew.sanitizeFn
    });
  } // Init password options

  function initPasswordOptions(e) {
    var el = e && e.target ? e.target : document;

    if ($.fn.pStrength && typeof ew.MIN_PASSWORD_STRENGTH != "undefined") {
      $(el).find(".ew-password-strength").each(function () {
        var $this = $(this);
        if (!$this.data("pStrength")) $this.pStrength({
          "changeBackground": false,
          "backgrounds": [],
          "passwordValidFrom": ew.MIN_PASSWORD_STRENGTH,
          "onPasswordStrengthChanged": function onPasswordStrengthChanged(strength, percentage) {
            var $this = $(this),
                $pst = $("[id='" + $this.attr("data-password-strength") + "']"),
                // Do not use #
            $pb = $pst.find(".progress-bar");
            $pst.width($this.outerWidth());

            if ($this.val()) {
              var pct = percentage + "%";

              if (percentage < 25) {
                $pb.addClass("bg-danger").removeClass("bg-warning bg-info bg-success");
              } else if (percentage < 50) {
                $pb.addClass("bg-warning").removeClass("bg-danger bg-info bg-success");
              } else if (percentage < 75) {
                $pb.addClass("bg-info").removeClass("bg-danger bg-warning bg-success");
              } else {
                $pb.addClass("bg-success").removeClass("bg-danger bg-warning bg-info");
              }

              $pb.css("width", pct);
              if (percentage > 25) pct = ew.language.phrase("PasswordStrength").replace("%p", pct);
              $pb.html(pct);
              $pst.removeClass("d-none").show();
              $this.data("validated", percentage >= ew.MIN_PASSWORD_STRENGTH);
            } else {
              $pst.addClass("d-none").hide();
              $this.data("validated", null);
            }
          }
        });
      });
    }

    if ($.fn.pGenerator) {
      $(el).find(".ew-password-generator").each(function () {
        var $this = $(this);
        if (!$this.data("pGenerator")) $this.pGenerator({
          "passwordLength": ew.GENERATE_PASSWORD_LENGTH,
          "uppercase": ew.GENERATE_PASSWORD_UPPERCASE,
          "lowercase": ew.GENERATE_PASSWORD_LOWERCASE,
          "numbers": ew.GENERATE_PASSWORD_NUMBER,
          "specialChars": ew.GENERATE_PASSWORD_SPECIALCHARS,
          "onPasswordGenerated": function onPasswordGenerated(pwd) {
            var $this = $(this);
            $("#" + $this.attr("data-password-field")).val(pwd).change().focus().triggerHandler("click"); // Trigger click to remove "is-invalid" class (Do not use $this.data)

            $("#" + $this.attr("data-password-confirm")).val(pwd);
            $("#" + $this.attr("data-password-strength")).addClass("d-none").hide();
          }
        });
      });
    }
  } // Get API action URL

  function getApiUrl(action, query) {
    var url = ew.PATH_BASE + ew.API_URL,
        params = new URLSearchParams(query);

    if (ew.USE_URL_REWRITE) {
      if ($.isString(action)) {
        // Route as string
        url += action ? action : "";
      } else if (Array.isArray(action)) {
        // Route as array
        var route = action.map(function (v) {
          return encodeURIComponent(v);
        }).join("/");
        url += route ? route : "";
      }
    } else {
      if (action) params.set(ew.API_ACTION_NAME, action);
    }

    var qs = params.toString();
    return url + (qs ? "?" + qs : "");
  } // Set session timer

  function setSessionTimer() {
    var timeoutTime,
        timer,
        keepAliveTimer,
        counter,
        useKeepAlive = ew.SESSION_KEEP_ALIVE_INTERVAL > 0 || ew.IS_LOGGEDIN && ew.IS_AUTOLOGIN; // Keep alive

    var keepAlive = function keepAlive() {
      $.get(getApiUrl(ew.API_SESSION_ACTION), {
        "rnd": random()
      }, function (token) {
        if (token && $.isObject(token)) {
          // PHP
          ew.TOKEN_NAME = token[ew.TOKEN_NAME_KEY];
          ew.ANTIFORGERY_TOKEN = token[ew.ANTIFORGERY_TOKEN_KEY];
        }
      });
    }; // Reset timer

    var resetTimer = function resetTimer() {
      counter = ew.SESSION_TIMEOUT_COUNTDOWN;
      timeoutTime = ew.SESSION_TIMEOUT - ew.SESSION_TIMEOUT_COUNTDOWN;

      if (timeoutTime < 0) {
        // Timeout now
        timeoutTime = 0;
        counter = ew.SESSION_TIMEOUT;
      }

      if (timer) timer.cancel(); // Clear timer
    }; // Timeout

    var timeout = function timeout() {
      if (keepAliveTimer) keepAliveTimer.cancel(); // Stop keep alive

      if (counter > 0) {
        var timerInterval;
        Swal.fire(_objectSpread2(_objectSpread2({}, ew.sweetAlertSettings), {}, {
          html: '<p class="text-danger">' + ew.language.phrase("SessionWillExpire").replace("%s", '<span class="ew-session-counter">' + counter + '</span>') + '</p>',
          showConfirmButton: true,
          confirmButtonText: ew.language.phrase("OKBtn"),
          timer: counter * 1000,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          onBeforeOpen: function onBeforeOpen() {
            timerInterval = setInterval(function () {
              var content = Swal.getContent();
              var cnt = content.querySelector(".ew-session-counter");
              if (cnt) cnt.textContent = Math.round(Swal.getTimerLeft() / 1000);
            }, 1000);
          },
          onClose: function onClose() {
            clearInterval(timerInterval);
          }
        })).then(function (result) {
          if (result.value) {
            // OK button pressed
            keepAlive();
            if (!useKeepAlive && ew.SESSION_TIMEOUT > 0) setTimer();
          } else if (result.dismiss === Swal.DismissReason.timer) {
            // Timeout
            resetTimer();
            window.location = ew.TIMEOUT_URL + "?expired=1";
          }
        });
      }
    }; // Set timer

    var setTimer = function setTimer() {
      resetTimer(); // Reset timer first

      timer = $.later(timeoutTime * 1000, null, timeout);
    };

    if (useKeepAlive) {
      // Keep alive
      var keepAliveInterval = ew.SESSION_KEEP_ALIVE_INTERVAL > 0 ? ew.SESSION_KEEP_ALIVE_INTERVAL : ew.SESSION_TIMEOUT - ew.SESSION_TIMEOUT_COUNTDOWN;
      if (keepAliveInterval <= 0) keepAliveInterval = 60;
      keepAliveTimer = $.later(keepAliveInterval * 1000, null, keepAlive, null, true); // Periodic
    } else {
      if (ew.SESSION_TIMEOUT > 0) // Set session timeout
        setTimer();
    }
  } // Init export links

  function initExportLinks(e) {
    var el = e && e.target ? e.target : document;
    $(el).find(".ew-export-link[href]:not(.ew-email):not(.ew-print):not(.ew-xml)").click(function (e) {
      var href = $(this).attr("href");
      if (href && href != "#") fileDownload(href);
      e.preventDefault();
    });
  } // Init multi-select checkboxes

  function initMultiSelectCheckboxes(e) {
    var el = e && e.target ? e.target : document,
        $el = $(el),
        $cbs = $el.find("input[type=checkbox].ew-multi-select");

    var _update = function _update(id) {
      var $els = $cbs.filter("[name^='" + id + "_']"),
          cnt = $els.length,
          len = $els.filter(":checked").length;
      $els.closest("form").find("input[type=checkbox]#" + id).prop("checked", len == cnt).prop("indeterminate", len != cnt && len != 0);
    };

    $cbs.click(function (e) {
      _update(this.name.split("_")[0]);
    });
    $el.find("input[type=checkbox].ew-priv:not(.ew-multi-select)").each(function () {
      _update(this.id); // Init

    });
  } // Download file

  function fileDownload(href, data) {
    var win = window.parent,
        jq = win.jQuery,
        swal = win.Swal,
        doc = win.document,
        $doc = jq(doc),
        method = data ? "POST" : "GET",
        isHtml = href.includes("export=html");
    return swal.fire(_objectSpread2(_objectSpread2({}, ew.sweetAlertSettings), {}, {
      html: "<p>" + ew.language.phrase("Exporting") + "</p>",
      allowOutsideClick: false,
      allowEscapeKey: false,
      onBeforeOpen: function onBeforeOpen() {
        swal.showLoading(), jq.ajax({
          url: href,
          type: method,
          cache: false,
          data: data || null,
          xhrFields: {
            responseType: isHtml ? "text" : "blob"
          }
        }).done(function (data, textStatus, jqXHR) {
          var url = win.URL.createObjectURL(isHtml ? new Blob([data], {
            type: "text/html"
          }) : data),
              a = doc.createElement("a"),
              cd = jqXHR.getResponseHeader("Content-Disposition"),
              m = cd.match(/\bfilename=((['"])(.+)\2|([^;]+))/i);
          a.style.display = "none";
          a.href = url;
          if (m) a.download = m[3] || m[4];
          doc.body.appendChild(a);
          a.click();
          $doc.trigger("export", [{
            "type": "done",
            "url": href,
            "objectUrl": url
          }]);
          win.URL.revokeObjectURL(url);
          swal.close();
        }).fail(function () {
          swal.showValidationMessage("<div class='text-danger'><h4>" + ew.language.phrase("FailedToExport") + "</h4>" + response + "</div>");
          $doc.trigger("export", [{
            "type": "fail",
            "url": href
          }]);
        }).always(function () {
          $doc.trigger("export", [{
            "type": "always",
            "url": href
          }]);
        });
      }
    }));
  } // Lazy load images

  function lazyLoad(e) {
    if (!ew.LAZY_LOAD) return;
    var el = e && e.target ? e.target : document;
    $(el).find("img.ew-lazy").each(function () {
      this.src = this.dataset.src;
    });
    $document.trigger("lazyload"); // All images loaded
  } // Update select2 dropdown position

  function updateDropdownPosition() {
    var select = $(".select2-container--open").prev(".ew-select").data("select2");

    if (select) {
      select.dropdown._positionDropdown();

      select.dropdown._resizeDropdown();
    }
  } // Colorboxes

  function initLightboxes(e) {
    if (!ew.USE_COLORBOX) return;
    var el = e && e.target ? e.target : document;
    var settings = Object.assign({}, ew.lightboxSettings, {
      title: ew.language.phrase("LightboxTitle"),
      current: ew.language.phrase("LightboxCurrent"),
      previous: ew.language.phrase("LightboxPrevious"),
      next: ew.language.phrase("LightboxNext"),
      close: ew.language.phrase("LightboxClose"),
      xhrError: ew.language.phrase("LightboxXhrError"),
      imgError: ew.language.phrase("LightboxImgError")
    });
    $(el).find(".ew-lightbox").each(function () {
      var $this = $(this);
      $this.colorbox(Object.assign({
        rel: $this.data("rel")
      }, settings));
    });
  } // PDFObjects

  function initPdfObjects(e) {
    if (!ew.EMBED_PDF) return;
    var el = e && e.target ? e.target : document,
        options = Object.assign({}, ew.PDFObjectOptions);
    $(el).find(".ew-pdfobject").not(":has(.pdfobject)").each(function () {
      // Not already embedded
      var $this = $(this),
          url = $this.data("url"),
          html = $this.html();
      if (url) PDFObject.embed(url, this, Object.assign(options, {
        fallbackLink: html
      }));
    });
  } // Tooltips and popovers

  function initTooltips(e) {
    var el = e && e.target ? e.target : document,
        $el = $(el);
    $el.find("input[data-toggle=tooltip],textarea[data-toggle=tooltip],select[data-toggle=tooltip]").each(function () {
      var $this = $(this);
      $this.tooltip(Object.assign({
        html: true,
        placement: "bottom",
        sanitizeFn: ew.sanitizeFn
      }, $this.data()));
    });
    $el.find("a.ew-tooltip-link").each(tooltip); // Init tooltips

    $el.find(".ew-tooltip").tooltip({
      placement: "bottom",
      sanitizeFn: ew.sanitizeFn
    });
    $el.find(".ew-popover").popover({
      sanitizeFn: ew.sanitizeFn
    });
  } // Parse JSON

  function parseJson(data) {
    if ($.isString(data)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return undefined;
      }
    }

    return data;
  } // Change search operator

  function searchOperatorChanged(el) {
    var $el = $(el),
        $p = $el.closest("[id^=r_], [id^=xsc_]"),
        parm = el.id.substr(2),
        $fld = $p.find(".ew-search-field"),
        $fld2 = $p.find(".ew-search-field2"),
        $y = $fld2.find("[name='y_" + parm + "'], [name='y_" + parm + "[]']"),
        hasY = $y.length,
        $cond = $p.find(".ew-search-cond"),
        hasCond = $cond.length,
        // Has condition and operator 2
    $and = $p.find(".ew-search-and"),
        $opr = $p.find(".ew-search-operator"),
        opr = $opr.find("[name='z_" + parm + "']").val(),
        $opr2 = $p.find(".ew-search-operator2"),
        opr2 = $opr2.find("[name='w_" + parm + "']").val(),
        isBetween = opr == "BETWEEN",
        // Can only be operator 1
    isNullOpr = ["IS NULL", "IS NOT NULL"].includes(opr),
        isNullOpr2 = ["IS NULL", "IS NOT NULL"].includes(opr2),
        hideOpr2 = !hasY || isBetween,
        hideX = isNullOpr,
        hideY = !isBetween && (!hasCond || isNullOpr2);
    $cond.toggleClass("d-none", hideOpr2).find(":input").prop("disabled", hideOpr2);
    $and.toggleClass("d-none", !isBetween);
    $opr2.toggleClass("d-none", hideOpr2).find(":input").prop("disabled", hideOpr2);
    $fld.toggleClass("d-none", hideX).find(":input").prop("disabled", hideX);
    $fld2.toggleClass("d-none", hideY).find(":input").prop("disabled", hideY);
  } // Init forms

  function initForms(e) {
    var el = e && e.target ? e.target : document,
        $el = $(el),
        ids = ew.forms.ids();

    for (var _iterator = _createForOfIteratorHelperLoose(ids), _step; !(_step = _iterator()).done;) {
      var id = _step.value;
      if ($el.find("#" + id)) forms.get(id).init();
    }
  } // Prompt/Confirm/Alert

  function _prompt(text, cb, input, validator) {
    if (input) {
      // Prompt
      return Swal.fire(_objectSpread2(_objectSpread2({}, ew.sweetAlertSettings), {}, {
        html: text,
        input: "text",
        confirmButtonText: ew.language.phrase("OKBtn"),
        showCancelButton: $.isFunction(cb),
        cancelButtonText: ew.language.phrase("CancelBtn"),
        inputValidator: validator || function (value) {
          if (!value) return ew.language.phrase("EnterValue");
        }
      })).then(function (result) {
        if ($.isFunction(cb)) cb(result.value);
      });
    } else {
      // Confirm or Alert
      return Swal.fire(_objectSpread2(_objectSpread2({}, ew.sweetAlertSettings), {}, {
        html: "<div>" + text + "</div>",
        confirmButtonText: ew.language.phrase("OKBtn"),
        showCancelButton: $.isFunction(cb),
        cancelButtonText: ew.language.phrase("CancelBtn")
      })).then(function (result) {
        if ($.isFunction(cb)) cb(result.value);
      });
    }
  }

  function toast(options) {
    options = Object.assign({}, ew.toastOptions, options);
    $document.Toasts("create", options);
    var position = options.position,
        $container = $("#toastsContainer" + position[0].toUpperCase() + position.substring(1));
    return $container.children().first();
  }
  /**
   * Show toast
   *
   * @param {string} msg - Message
   * @param {string} type - CSS class: "muted|primary|success|info|warning|danger"
   */

  function showToast(msg, type) {
    type = type || "danger";
    return toast({
      class: "ew-toast bg-" + type,
      title: ew.language.phrase(type),
      body: msg,
      autohide: type == "success" ? ew.autoHideSuccessMessage : false,
      // Autohide for success message
      delay: type == "success" ? ew.autoHideSuccessMessageDelay : 500
    });
  } // Get form.ew-form or div.ew-form HTML element

  function getForm(el) {
    if (el instanceof Form) return el.$element[0];
    var $el = $(el),
        $f = $el.closest(".ew-form");
    if (!$f[0]) // Element not inside form
      $f = $el.closest(".ew-grid, .ew-multi-column-grid").find(".ew-form").not(".ew-pager-form");
    return $f[0];
  } // Check form data

  function hasFormData(form) {
    var selector = "[name^=x_],[name^=y_],[name^=z_],[name^=w_],[name=psearch]",
        els = $(form).find(selector).filter(":enabled").get();

    for (var i = 0, len = els.length; i < len; i++) {
      var el = els[i];

      if (/^(z|w)_/.test(el.name)) {
        if (/^IS/.test($(el).val())) return true;
      } else if (el.type == "checkbox" || el.type == "radio") {
        if (el.checked) return true;
      } else if (el.type == "select-one" || el.type == "select-multiple") {
        if (!!$(el).val()) return true;
      } else if (el.type == "text" || el.type == "hidden" || el.type == "textarea") {
        if (el.value) return true;
      }
    }

    return false;
  } // Set search type

  function setSearchType(el, val) {
    var $this = $(el),
        $form = $this.closest("form"),
        text = "";
    $form.find("input[name=psearchtype]").val(val || "");

    if (val == "=") {
      text = ew.language.phrase("QuickSearchExactShort");
    } else if (val == "AND") {
      text = ew.language.phrase("QuickSearchAllShort");
    } else if (val == "OR") {
      text = ew.language.phrase("QuickSearchAnyShort");
    } else {
      text = ew.language.phrase("QuickSearchAutoShort");
    }

    $form.find("#searchtype").html(text + (text ? "&nbsp;" : ""));
    $this.closest("ul").find("li").removeClass("active");
    $this.closest("li").addClass("active");
    return false;
  }
  /**
   * Update a dynamic selection list
   *
   * @param {(HTMLElement|HTMLElement[]|string|string[])} obj - Target HTML element(s) or the ID of the element(s)
   * @param {(string[]|array[])} parentId - Parent field element names or data
   * @param {(boolean|null)} async - async(true) or sync(false) or non-Ajax(null)
   * @param {boolean} change - Trigger onchange event
   * @returns
   */

  function updateOptions(obj, parentId, async, change) {
    var f = this.$element ? this.$element[0] : this.form ? this.form : null; // Get form/div element from this

    if (!f) return;
    var frm = this.htmlForm ? this : forms.get(f.id); // Get Form object

    if (!frm) return;
    if (this.form && $.isUndefined(obj)) // Target unspecified
      obj = forms.get(this).getList(this.name).childFields.slice(); // Clone
    else if ($.isString(obj)) obj = getElements(obj, f);
    if (!obj || Array.isArray(obj) && obj.length == 0) return;
    var self = this,
        promise = Promise.resolve();

    if (Array.isArray(obj) && $.isString(obj[0])) {
      // Array of id (onchange/onclick event)
      var els = [];

      for (var i = 0, len = obj.length; i < len; i++) {
        var ar = obj[i].split(" ");

        if (ar.length == 1 && self.form) {
          // Parent/Child fields in the same table
          var m = getId(self, false).match(/^([xy]\d*_)/);
          if (m) obj[i] = obj[i].replace(/^([xy]\d*_)/, m[1]);
        }

        var el = getElements(obj[i], f),
            names = [];
        els.push(el);

        if (ar.length == 2 && Array.isArray(el)) {
          // Check if id is "tblvar fldvar" and multiple inputs
          var $el = $(el);
          $el.each(function () {
            if (!names.includes(this.name)) {
              names.push(this.name);
              var $elf = $el.filter("[name='" + this.name + "']"),
                  typ = $elf.attr("type"),
                  elf = ["radio", "checkbox"].includes(typ) ? $elf.get() : $elf[0];
              promise = promise.then(_updateOptions.bind(self, elf, parentId, async, change));
            }
          });
        } else {
          promise = promise.then(_updateOptions.bind(self, el, parentId, async, change));
        }
      }

      obj = els;
      var list = forms.get(self).getList(self.name);
      if (list && Array.isArray(list.autoFillTargetFields) && list.autoFillTargetFields[0]) // AutoFill
        promise = promise.then(autoFill.bind(null, self));
    } else {
      promise = promise.then(_updateOptions.bind(self, obj, parentId, async, change));
    }

    return promise.then(function () {
      $document.trigger("updatedone", [{
        source: self,
        target: obj
      }]); // Document "updatedone" event fired after all the target elements are updated
    });
  }
  /**
   * Update a dynamic selection list
   *
   * @param {(HTMLElement|HTMLElement[]} obj - Target HTML element(s) or the ID of the element(s)
   * @param {(string[]|array[])} parentId - Parent field element names or data
   * @param {(boolean|null)} async - async(true) or sync(false) or non-Ajax(null)
   * @param {boolean} change - Trigger onchange event
   * @returns Promise
   */

  function _updateOptions(obj, parentId, async, change) {
    var id = getId(obj, false);
    if (!id) return;
    var fo = getForm(obj); // Get form/div element from obj

    if (!fo || !fo.id) return;
    var frmo = forms.get(fo.id);
    if (!frmo) return;
    var self = this,
        args = Array.from(arguments),
        ar = getOptionValues(obj),
        m = id.match(/^([xy])(\d*)_/),
        prefix = m ? m[1] : "",
        rowindex = m ? m[2] : "",
        arp = [],
        list = frmo.getList(id),
        $obj = $(obj).data("updating", true);

    if ($.isUndefined(parentId)) {
      // Parent IDs not specified, use default
      parentId = list.parentFields.slice(); // Clone

      if (rowindex != "") {
        for (var i = 0, len = parentId.length; i < len; i++) {
          var arr = parentId[i].split(" ");
          if (arr.length == 1) // Parent field in the same table, add row index
            parentId[i] = parentId[i].replace(/^x_/, "x" + rowindex + "_");
        }
      }
    }

    if (Array.isArray(parentId) && parentId.length > 0) {
      if (Array.isArray(parentId[0])) {
        // Array of array => data
        arp = parentId;
      } else if ($.isString(parentId[0])) {
        // Array of string => Parent IDs
        for (var i = 0, len = parentId.length; i < len; i++) {
          arp.push(getOptionValues(parentId[i], fo));
        }
      }
    }

    if (!isAutoSuggest(obj)) // Do not clear Auto-Suggest
      clearOptions(obj);

    var addOpt = function addOpt(results) {
      var name = getId(obj);
      results.forEach(function (result) {
        var args = {
          "data": result,
          "parents": arp,
          "valid": true,
          "name": name,
          "form": fo
        };
        $document.trigger("addoption", [args]);
        if (args.valid) newOption(obj, result, fo);
      });
      if (obj.list) obj.render();
      selectOption(obj, ar);

      if (change !== false) {
        if (!obj.options && obj.length) $obj.first().triggerHandler("click");else $obj.first().change();
      }
    };

    if ($.isUndefined(async)) // Async not specified, use default
      async = list.ajax;

    var _updateSibling = function _updateSibling() {
      // Update the y_* element
      if (/s(ea)?rch$/.test(fo.id) && prefix == "x") {
        // Search form
        args[0] = id.replace(/^x_/, "y_");
        updateOptions.apply(self, args); // args[0] is string, use updateOptions()
      }
    };

    if (!$.isBoolean(async) || Array.isArray(list.lookupOptions) && list.lookupOptions.length > 0) {
      // Non-Ajax or Options loaded
      var ds = list.lookupOptions;
      addOpt(ds);

      _updateSibling();

      return ds;
    } else {
      // Ajax
      var name = getId(obj),
          data = Object.assign({
        page: list.page,
        field: list.field,
        ajax: "updateoption",
        language: ew.LANGUAGE_ID,
        name: name // Name of the target element

      }, getUserParams("#p_" + id, fo)); // Add user parameters

      if (isAutoSuggest(obj) && self.htmlForm) // Auto-Suggest (init form or auto-fill)
        data["v0"] = ar[0] || random(); // Filter by the current value
      else if (isModalLookup(obj)) // Modal-Lookup
          data["v0"] = ar[0] ? obj.multiple ? ar.join(ew.MULTIPLE_OPTION_SEPARATOR) : ar[0] : random(); // Filter by the current value

      for (var i = 0, cnt = arp.length; i < cnt; i++) {
        // Filter by parent fields
        data["v" + (i + 1)] = arp[i].join(ew.MULTIPLE_OPTION_SEPARATOR);
      }

      return $.ajax(getApiUrl(ew.API_LOOKUP_ACTION), {
        "type": "POST",
        "dataType": "json",
        "data": data,
        "async": async
      }).done(function (result) {
        var ds = result.records || [];
        addOpt(ds);

        _updateSibling();

        $obj.first().trigger("updated", [Object.assign({}, result, {
          target: obj
        })]); // Object "updatedone" event fired after the object is updated

        return ds;
      }).always(function () {
        return $obj.data("updating", false);
      });
    }
  } // Get user parameters from id

  function getUserParams(id, root) {
    var id = id.replace(/\[\]$/, ""),
        o = {};
    var root = !$.isString(root) ? root : /^#/.test(root) ? root : "#" + root;
    var $els = root ? $(root).find(id) : $(id);
    var val = $els.val();

    if (val) {
      var params = new URLSearchParams(val);
      params.forEach(function (value, key) {
        o[key] = value;
      });
    }

    return o;
  } // Apply client side template to a DIV

  function applyTemplate(divId, tmplId, classId, exportType, data) {
    // Note: classId = fileName
    var args = {
      "data": data || {},
      "id": divId,
      "template": tmplId,
      "class": classId,
      "export": exportType,
      "enabled": true
    };
    $document.trigger("rendertemplate", [args]);

    if (args.enabled) {
      var template = document.getElementById(tmplId).content;
      template.querySelectorAll(".ew-slot").forEach(function (el) {
        var subtmpl = document.getElementById(el.name || el.id);

        if (subtmpl && subtmpl.content) {
          if (el.dataset.rowspan > 1) Array.prototype.slice.call(subtmpl.content.childNodes).forEach(function (node) {
            return node.rowSpan = el.dataset.rowspan;
          });
          el.replaceWith(subtmpl.content);
        } else {
          el.remove();
        }
      });

      if ($.views) {
        var textContent = template.textContent;

        if (textContent.includes("{{") && textContent.includes("}}")) {
          // Includes JsRender template
          var scripts = Array.prototype.slice.call(template.querySelectorAll("script")); // Extract scripts

          scripts.forEach(function (item) {
            return item.remove();
          });
          var div = document.createElement("div");
          div.appendChild(template);
          var html = div.innerHTML,
              tmpl = $.templates(html);
          document.getElementById(divId).innerHTML = tmpl.render(args.data, ew.jsRenderHelpers);
          scripts.forEach(function (item) {
            return document.body.appendChild(item);
          }); // Add scripts
        } else {
          document.getElementById(divId).appendChild(template);
        }
      } else {
        document.getElementById(divId).appendChild(template);
      }
    }

    if (exportType && exportType != "print") {
      // Export custom
      $(function () {
        var $meta = $("meta[http-equiv='Content-Type']"),
            html = "<html><head>",
            $div = $("#" + divId);
        if ($div.children(0).is("div[id^=ct_]")) // Remove first div tag
          $div = $div.children(0);
        if ($meta[0]) html += "<meta http-equiv='Content-Type' content='" + $meta.attr("content") + "'>";

        if (exportType == "pdf") {
          html += "<link rel='stylesheet' type='text/css' href='" + ew.PDF_STYLESHEET_FILENAME + "'>";
        } else {
          html += "<style>" + $.ajax({
            async: false,
            type: "GET",
            url: ew.PROJECT_STYLESHEET_FILENAME
          }).responseText + "</style>";
        }

        html += "</" + "head><body>";
        $(".ew-chart-top").each(function () {
          html += $(this).html();
        });
        html += $div.html();
        $(".ew-chart-bottom").each(function () {
          html += $(this).html();
        });
        html += "</body></html>";
        var url = currentPage(),
            data = {
          "customexport": exportType,
          "data": html,
          "filename": args.class
        };
        data[ew.TOKEN_NAME] = ew.ANTIFORGERY_TOKEN;

        if (exportType == "email") {
          var str = currentUrl.searchParams.toString() + "&" + $.param(data); // Add data

          $.post(url, str, function (result) {
            showMessage(result);
          });
        } else {
          fileDownload(url, data);
        }

        window.parent.jQuery("body").css("cursor", "default"); // Use window.parent in case in iframe
      });
    }
  } // Toggle group

  function toggleGroup(el) {
    var $el = $(el),
        $tr = $el.closest("tr"),
        selector = "tr",
        level;

    for (var i = 1; i <= 6; i++) {
      var idx = i == 1 ? "" : "-" + i;
      var data = $tr.data("group" + idx);

      if ($.isValue(data)) {
        level = i;
        if (data != "") selector += "[data-group" + idx + "='" + String(data).replace(/'/g, "\\'") + "']";
      }
    }

    if ($el.hasClass("icon-collapse")) {
      // Hide
      $(selector).slice(1).addClass("ew-rpt-grp-hide-" + level);
      $el.toggleClass("icon-expand icon-collapse");
    } else {
      $(selector).slice(1).removeClass("ew-rpt-grp-hide-" + level);
      $el.toggleClass("icon-expand icon-collapse");
    }
  } // Check if boolean value is true

  function convertToBool(value) {
    return value && ["1", "y", "t", "true"].includes(value.toLowerCase());
  } // Check if element value changed

  function valueChanged(fobj, infix, fld, bool) {
    var nelm = getElements("x" + infix + "_" + fld, fobj);
    var oelm = getElement("o" + infix + "_" + fld, fobj); // Hidden element

    var fnelm = getElement("fn_x" + infix + "_" + fld, fobj); // Hidden element

    if (!oelm && (!nelm || Array.isArray(nelm) && nelm.length == 0)) return false;

    var getValue = function getValue(obj) {
      return getOptionValues(obj).join();
    };

    if (oelm && nelm) {
      if (bool) {
        if (convertToBool(getValue(oelm)) === convertToBool(getValue(nelm))) return false;
      } else {
        var oldvalue = getValue(oelm);
        var newvalue = fnelm ? getValue(fnelm) : getValue(nelm);
        if (oldvalue == newvalue) return false;
      }
    }

    return true;
  } // Set language

  function setLanguage(el) {
    var $el = $(el),
        val = $el.val() || $el.data("language");
    if (!val) return;
    var params = new URLSearchParams();
    currentUrl.searchParams.forEach(function (value, key) {
      params.append(key, ew.sanitize(value));
    });
    params.set("language", ew.sanitize(val));
    currentUrl.search = params.toString();
    window.location = currentUrl.toString();
  }
  /**
   * Submit action
   *
   * @param {Event} e
   * @param {Object} args - Arguments
   * @param {HTMLElement} args.f - HTML form (default is the form of the source element)
   * @param {string} args.url - URL to which the request is sent (default is current page)
   * @param {Object} args.key - Key as object (for single record only)
   * @param {string} args.msg - Confirm message
   * @param {string} args.action - Custom action name
   * @param {string} args.select - "single"|"s" (single record) or "multiple"|"m" (multiple records, default)
   * @param {string} args.method - "ajax"|"a" (Ajax by HTTP POST) or "post"|"p" (HTTP POST, default)
   * @param {Object} args.data - Object of user data that is sent to the server
   * @param {string|callback|Object} success - Function to be called if the request succeeds, or settings for jQuery.ajax() (for Ajax only)
   * @returns
   */

  function submitAction(e, args) {
    var el = e.target || e.srcElement,
        $el = $(el),
        f = args.f || $el.closest("form")[0] || currentForm,
        $f = $(f),
        key = args.key,
        action = args.action,
        url = args.url || currentPage(),
        msg = args.msg,
        data = args.data,
        success = args.success,
        isPost = !args.method || sameText(args.method[0], "p"),
        isMultiple = !args.select && !args.key || args.select && sameText(args.select[0], "m");
    if (isMultiple && !$f[0]) return false;

    if (isMultiple && !keySelected($f[0])) {
      _prompt("<p class=\"text-danger\">" + ew.language.phrase("NoRecordSelected") + "</p>");

      return false;
    }

    var _success = function _success(result) {
      showMessage(result);
    };

    var _submit = function _submit() {
      if (isPost) {
        // Post back
        if (action) // Action
          $("<input>").attr({
            type: "hidden",
            name: "useraction",
            value: action
          }).appendTo($f);

        if ($.isObject(data)) {
          // User data
          for (var k in data) {
            var $input = $f.find("input[type=hidden][name='" + k + "']");
            if ($input[0]) $input.val(data[k]);else $("<input>").attr({
              type: "hidden",
              name: k,
              value: data[k]
            }).appendTo($f);
          }
        }

        if (!isMultiple && $.isObject(key)) {
          // Key
          for (var k in key) {
            $("<input>").attr({
              type: "hidden",
              name: k,
              value: key[k]
            }).appendTo($f);
          }
        }

        $f.prop("action", url).submit();
        if (action) // Action
          $f.find("input[type=hidden][name=useraction]").remove(); // Remove the "useraction" element
      } else {
        // Ajax
        data = $.isObject(data) ? $.param(data) : $.isString(data) ? data : ""; // User data

        if (action) data += "&useraction=" + action + "&ajax=" + action; // Action

        if (isMultiple) // Multiple records
          data += "&" + $f.find("input[name='key_m[]']:checked").serialize(); // Keys
        else if (key) // Single record
            data += "&" + ($.isObject(key) ? $.param(key) : key); // Key

        if (success && $.isString(success)) success = window[success];

        if ($.isFunction(success)) {
          $.post(url, data, success);
        } else if ($.isObject(success)) {
          // "success" is Ajax settings
          success.data = data;
          success.method = success.method || "POST";
          success.success = success.success || _success;
          $.ajax(url, success);
        } else {
          $.post(url, data, _success);
        }
      }
    };

    if (msg) {
      _prompt(msg, function (result) {
        if (result) _submit();
      });
    } else {
      _submit();
    }

    return false;
  }
  /**
   * Export with selected records and/or Custom Template
   *
   * @param {string} f - Form ID
   * @param {string} url - Form action
   * @param {string} type - Export type
   * @param {boolean} custom - Using Custom Template
   * @param {boolean} sel - Selected records only
   * @param {Object} fobj - email form object
   * @returns false
   */

  function _export$1(f, url, type, custom, sel, fobj) {
    if (!f) return false;
    var $f = $(f),
        target = $f.attr("target"),
        action = $f.attr("action"),
        cb = sel && $f.find("input[type=checkbox][name='key_m[]']")[0];

    if (cb && !keySelected(f)) {
      _alert(ew.language.phrase("NoRecordSelected"));

      return false;
    }

    if (custom) {
      // Use Custom Template
      $("iframe.ew-export").remove();
      if (type == "email") url += ("&" + $(fobj).serialize()).replace(/&export=email/i, ""); // Remove duplicate export=email

      if (cb) {
        $("<iframe>").attr("name", "ew-export-frame").addClass("ew-export d-none").appendTo($body);

        try {
          $f.append($("<input type='hidden'>").attr({
            name: "custom",
            value: "1"
          })).attr({
            "action": url,
            "target": "ew-export-frame"
          }).find("input[name=exporttype]").val(type).end().submit();
        } finally {
          // Reset
          $f.attr({
            "target": target || "",
            "action": action
          }).find("input[name=custom]").remove();
        }
      } else {
        $("<iframe>").attr({
          name: "ew-export-frame",
          src: url
        }).addClass("ew-export d-none").appendTo($body);
      }
    } else {
      // No Custom Template
      $f.find("input[name=exporttype]").val(type);
      if (["xml", "print"].includes(type)) $f.submit(); // Submit the form directly
      else fileDownload(action, $f.serialize());
    }

    return false;
  }
  /**
   * Remove spaces
   * @param {string} value
   * @returns {string}
   */

  function removeSpaces(value) {
    return /^(<(p|br)\/?>(&nbsp;)?(<\/p>)?)?$/i.test(value.replace(/\s/g, "")) ? "" : value;
  }
  /**
   * Check if hidden text area (HTML editor)
   * @param {HTMLElement|jQuery} el HTML element or jQuery object
   * @returns {boolean}
   */

  function isHiddenTextArea(el) {
    var $el = $(el);
    return $el.is(":hidden") && $el.data("editor");
  }
  /**
   * Check if modal lookup
   * @param {HTMLElement|jQuery} el HTML element or jQuery object
   * @returns {boolean}
   */

  function isModalLookup(el) {
    var $el = $(el);
    return $el.is(":hidden") && $el.data("lookup");
  }
  /**
   * Check if hidden textbox (Auto-Suggest)
   * @param {HTMLElement|jQuery} el HTML element or jQuery object
   * @returns {boolean}
   */

  function isAutoSuggest(el) {
    var $el = $(el);
    return $el.is(":hidden") && $el.data("autosuggest");
  }
  /**
   * Alert
   *
   * @param {string} msg - Message
   * @param {callback} cb - Callback function
   * @param {string} type - CSS class: "muted|primary|success|info|warning|danger"
   */

  function _alert(msg, cb, type) {
    return Swal.fire(_objectSpread2(_objectSpread2({}, ew.sweetAlertSettings), {}, {
      html: '<p class="text-' + (type || 'danger') + '">' + msg + '</p>',
      confirmButtonText: ew.language.phrase("OKBtn")
    })).then(function (result) {
      if ($.isFunction(cb)) cb(result.value);
    });
  }
  /**
   * Clear error message
   * @param {HTMLElement|HTMLElement[]|jQuery} el HTML element(s) or jQuery
   */

  function clearError(el) {
    if (el.jquery) {
      // el is jQuery object
      var typ = el.attr("type");
      el = typ == "checkbox" || typ == "radio" ? el.get() : el[0];
    }

    $(el).closest("[id^=el_], .form-group").find(".invalid-feedback").html("");
  }
  /**
   * Show error message
   * @param {Form} frm Form object
   * @param {HTMLElement|HTMLElement[]|jQuery} el HTML element(s) or jQuery
   * @param {string} msg Error message
   * @param {boolean} focus Set focus
   */

  function onError(frm, el, msg, focus) {
    if (el.jquery) {
      // el is jQuery object
      var typ = el.attr("type");
      el = typ == "checkbox" || typ == "radio" ? el.get() : el[0];
    } else if (el instanceof Field) {
      // el is Field object
      el = el.element;
    }

    $(el).closest("[id^=el_], .form-group").find(".invalid-feedback").append("<p>" + msg + "</p>");
    if (focus) setFocus(el);
    frm === null || frm === void 0 ? void 0 : frm.makeVisible(el);
    return false;
  }
  /**
   * Set focus
   * @param {HTMLElement|HTMLElement[]} obj HTML element(s)
   */

  function setFocus(obj) {
    if (!obj) return;
    var $obj = $(obj);
    if (isHidden($obj)) return;

    if (isHiddenTextArea(obj)) {
      // HTML editor
      return $obj.data("editor").focus();
    } else if (isModalLookup(obj)) {
      // Modal lookup
      return $obj.parent().find(".ew-lookup-text").focus();
    } else if (!obj.options && obj.length) {
      // Radio/Checkbox list
      obj = $obj[0];
    } else if (isAutoSuggest(obj)) {
      // Auto-Suggest
      obj = obj.input;
    }

    $(obj).focus(); //.select();
  }
  /**
   * Set invalid
   * @param {HTMLElement|HTMLElement[]} obj HTML element(s)
   */

  function setInvalid(obj) {
    if (!obj) return;
    var $obj = $(obj);
    if (isHidden($obj)) return;
    if (!obj.options && obj.length) // Radio/Checkbox list
      obj = $obj[0];
    var $p = $obj.closest(".form-group, [id^='el']");

    if (isAutoSuggest(obj)) {
      $p.find(".ew-auto-suggest").addClass("is-invalid").one("click keydown", function () {
        $p.find(".is-invalid").removeClass("is-invalid");
      });
    } else if (isModalLookup(obj)) {
      $p.find(".input-group").addClass("is-invalid").one("click keydown", function () {
        $p.find(".is-invalid").removeClass("is-invalid");
      });
    } else {
      if (obj.type == "checkbox" || obj.type == "radio") {
        $obj.addClass("is-invalid").one("click keydown", function () {
          $p.find(".is-invalid").removeClass("is-invalid");
        });
      } else {
        $obj.addClass("is-invalid").parent().one("click keydown", function () {
          $p.find(".is-invalid").removeClass("is-invalid");
        });
        $obj.closest(".input-group").addClass("is-invalid");
      }
    }
  } // Check if object has value

  function hasValue(obj) {
    return getOptionValues(obj).join("") != "";
  } // Get Ctrl key for multiple column sort

  function sort(e, url, type) {
    if (e.shiftKey && !e.ctrlKey) url = url.split("?")[0] + "?cmd=resetsort";else if (type == 2 && e.ctrlKey) url += "&ctrl=1";
    location = url;
    return true;
  } // Confirm Delete Message

  function confirmDelete(el) {
    clickDelete(el);

    _prompt(ew.language.phrase("DeleteConfirmMsg"), function (result) {
      result && el.href ? window.location = el.href : clearDelete(el);
    });

    return false;
  } // Check if any key selected // PHP

  function keySelected(f) {
    return $(f).find("input[type=checkbox][name='key_m[]']:checked", f).length > 0;
  } // Select all key

  function selectAllKey(cb) {
    selectAll(cb);
    var tbl = $(cb).closest(".ew-table")[0];
    if (!tbl) return;
    $(tbl.tBodies).each(function () {
      $(this.rows).each(function (i, r) {
        var $r = $(r);

        if ($r.is(":not(.ew-template):not(.ew-table-preview-row)")) {
          $r.data({
            selected: cb.checked,
            checked: cb.checked
          });
          setColor(i, r);
        }
      });
    });
  } // Select all related checkboxes

  function selectAll(cb) {
    if (!cb || !cb.form) return;
    $(cb.form.elements).filter("input[type=checkbox][name^=" + cb.name + "_], [type=checkbox][name=" + cb.name + "]").not(cb).not(":disabled").prop("checked", cb.checked);
  } // Update selected checkbox

  function updateSelected(f) {
    return $(f).find("input[type=checkbox][name^=u_]:checked,input:hidden[name^=u_][value=1]").length > 0;
  } // Set row color

  function setColor(index, row) {
    var $row = $(row),
        $tbl = $row.closest(".ew-table");
    if (!$tbl[0]) return;

    if ($row.data("selected")) {
      $row.removeClass($tbl.data("rowhighlightclass") || "ew-table-highlight-row").removeClass($tbl.data("roweditclass") || "ew-table-edit-row").addClass($tbl.data("rowselectclass") || "ew-table-select-row");
    } else if ([ew.ROWTYPE_ADD, ew.ROWTYPE_EDIT].includes($row.data("rowtype"))) {
      $row.removeClass($tbl.data("rowselectclass") || "ew-table-select-row").removeClass($tbl.data("rowhighlightclass") || "ew-table-highlight-row").addClass($tbl.data("roweditclass") || "ew-table-edit-row");
    } else {
      $row.removeClass($tbl.data("rowselectclass") || "ew-table-select-row").removeClass($tbl.data("roweditclass") || "ew-table-edit-row").removeClass($tbl.data("rowhighlightclass") || "ew-table-highlight-row");
    }
  } // Clear selected rows color

  function clearSelected(tbl) {
    $(tbl.rows).each(function (i, r) {
      var $r = $(r);

      if (!$r.data("checked") && $r.data("selected")) {
        $r.data("selected", false);
        setColor(i, r);
      }
    });
  } // Clear all row delete status

  function clearDelete(el) {
    var $el = $(el),
        tbl = $el.closest(".ew-table")[0];
    if (!tbl) return;
    var $tr = $el.closest(".ew-table > tbody > tr");
    $tr.siblings("[data-rowindex='" + $tr.data("rowindex") + "']").addBack().each(function (i, r) {
      var $r = $(r);
      $r.data("selected", $r.data("checked"));
    });
  } // Click single delete link

  function clickDelete(el) {
    var $el = $(el),
        tbl = $el.closest(".ew-table")[0];
    if (!tbl) return;
    clearSelected(tbl);
    var $tr = $el.closest(".ew-table > tbody > tr");
    $tr.siblings("[data-rowindex='" + $tr.data("rowindex") + "']").addBack().each(function (i, r) {
      $(r).data("selected", true);
      setColor(i, r);
    });
  } // Click multiple checkbox

  function clickMultiCheckbox(e) {
    var cb = e.target || e.srcElement,
        $cb = $(cb),
        tbl = $cb.closest(".ew-table")[0];
    if (!tbl) return;
    clearSelected(tbl);
    var $tr = $cb.closest(".ew-table > tbody > tr");
    $tr.siblings("[data-rowindex='" + $tr.data("rowindex") + "']").addBack().each(function (i, r) {
      $(r).data("checked", cb.checked).data("selected", cb.checked).find("input[type=checkbox][name='key_m[]']").each(function () {
        if (this != cb) this.checked = cb.checked;
      });
      setColor(i, r);
    });
    e.stopPropagation();
  } // Setup table

  function setupTable(index, tbl, force) {
    var $tbl = $(tbl),
        $rows = $(tbl.rows);
    if (!tbl || !tbl.rows || !force && $tbl.data("isset") || tbl.tBodies.length == 0) return; // Set mouse over color

    var mouseOver = function mouseOver(e) {
      var $this = $(this);

      if (!$this.data("selected") && ![ew.ROWTYPE_ADD, ew.ROWTYPE_EDIT].includes($this.data("rowtype"))) {
        var $tbl = $this.closest(".ew-table");
        if (!$tbl[0]) return;
        $this.siblings("[data-rowindex='" + $this.data("rowindex") + "']").addBack().each(function (i, r) {
          $(r).addClass($tbl.data("rowhighlightclass") || "ew-table-highlight-row");
        });
      }
    }; // Set mouse out color

    var mouseOut = function mouseOut(e) {
      var $this = $(this);
      if (!$this.data("selected") && ![ew.ROWTYPE_ADD, ew.ROWTYPE_EDIT].includes($this.data("rowtype"))) $this.siblings("[data-rowindex='" + $this.data("rowindex") + "']").addBack().each(setColor);
    }; // Set selected row color

    var click = function click(e) {
      var $this = $(this),
          tbl = $this.closest(".ew-table")[0],
          $target = $(e.target);
      if (!tbl || $target.hasClass("btn") || $target.hasClass("ew-preview-row-btn") || $target.is(":input")) return;

      if (!$this.data("checked")) {
        var selected = $this.data("selected");
        clearSelected(tbl); // Clear all other selected rows

        $this.siblings("[data-rowindex='" + $this.data("rowindex") + "']").addBack().each(function (i, r) {
          $(r).data("selected", !selected); // Toggle

          setColor(i, r);
        });
      }
    };

    var n = $rows.filter("[data-rowindex=1]").length || $rows.filter("[data-rowindex=0]").length || 1; // Alternate color every n rows

    var rows = $rows.filter(":not(.ew-template)").each(function () {
      $(this.cells).removeClass("ew-table-last-row").last().addClass("ew-table-last-col"); // Cell of last column
    }).get();
    var div = $tbl.parentsUntil(".ew-grid", "." + ew.RESPONSIVE_TABLE_CLASS)[0];

    if (rows.length) {
      for (var i = 1; i <= n; i++) {
        var r = rows[rows.length - i]; // Last rows

        $(r.cells).each(function () {
          if (this.rowSpan == i) // Cell of last row
            $(this).addClass("ew-table-last-row").toggleClass("ew-table-border-bottom", !!div && div.clientHeight > tbl.offsetHeight);
        });
      }
    }

    var form = $tbl.closest("form")[0];
    var attach = form && $(form.elements).filter("input#action:not([value^=grid])").length > 0;
    $(tbl.tBodies[tbl.tBodies.length - 1].rows) // Use last TBODY (avoid Opera bug)
    .filter(":not(.ew-template):not(.ew-table-preview-row)").each(function (i) {
      var $r = $(this);

      if (attach && !$r.data("isset")) {
        if ([ew.ROWTYPE_ADD, ew.ROWTYPE_EDIT].includes($r.data("rowtype"))) // Add/Edit row
          $r.on("mouseover", function () {
            this.edit = true;
          }).addClass("ew-table-edit-row");
        $r.on("mouseover", mouseOver).on("mouseout", mouseOut).on("click", click);
        $r.data("isset", true);
      }

      var sw = i % (2 * n) < n;
      $r.toggleClass("ew-table-row", sw).toggleClass("ew-table-alt-row", !sw);
    });
    setupGrid(index, $tbl.closest(".ew-grid")[0], force);
    $tbl.data("isset", true);
  } // Setup grid

  function setupGrid(index, grid, force) {
    var $grid = $(grid);
    if (!grid || !force && $grid.data("isset")) return;
    var multi = $grid.find("table.ew-multi-column-table").length,
        rowcnt;

    if (multi) {
      rowcnt = $grid.find("td[data-rowindex]").length;
    } else {
      rowcnt = $grid.find("table.ew-table > tbody").first().children("tr:not(.ew-table-preview-row, .ew-template)").length;
    }

    if (rowcnt == 0 && !$grid.find(".ew-grid-upper-panel, .ew-grid-lower-panel")[0]) $grid.hide(); // if (!$grid.find(".ew-grid-upper-panel:visible")[0])
    // 	$grid.css({"border-top-left-radius": 0, "border-top-right-radius": 0});
    // if (!$grid.find(".ew-grid-lower-panel:visible")[0])
    // 	$grid.css({"border-bottom-left-radius": 0, "border-bottom-right-radius": 0});

    if ($grid.find(".ew-grid-middle-panel:visible").hasClass(ew.RESPONSIVE_TABLE_CLASS) && $grid.width() > $(".content").width()) {
      $grid.addClass("d-flex");
      $grid.closest(".ew-detail-pages").addClass("d-block");
      $grid.closest(".ew-form").addClass("w-100");
      if (ew.USE_OVERLAY_SCROLLBARS) $grid.find(".ew-grid-middle-panel:not(.ew-preview-middle-panel)").overlayScrollbars(ew.overlayScrollbarsOptions);
    }

    $grid.data("isset", true);
  } // Add a row to grid

  function addGridRow(el) {
    var $grid = $(el).closest(".ew-grid"),
        $tbl = $grid.find("table.ew-table").last(),
        $p = $tbl.parent("div"),
        $tpl = $tbl.find("tr.ew-template");
    if (!el || !$grid[0] || !$tbl[0] || !$tpl[0]) return false;
    var $lastrow = $($tbl[0].rows).last();
    $tbl.find("td.ew-table-last-row").removeClass("ew-table-last-row");
    var $row = $tpl.clone(true, true).removeClass("ew-template");
    var $form = $grid.find("div.ew-form[id^=f][id$=grid]");
    if (!$form[0]) $form = $grid.find("form.ew-form[id^=f][id$=list]");
    var suffix = $form.is("div") ? "_" + $form.attr("id") : "";
    var $elkeycnt = $form.find("#key_count" + suffix);
    var keycnt = parseInt($elkeycnt.val(), 10) + 1;
    $row.attr({
      "id": "r" + keycnt + $row.attr("id").substring(2),
      "data-rowindex": keycnt
    });
    var $els = $tpl.find("script:contains('$rowindex$')"); // Get scripts with rowindex

    $row.children("td").each(function () {
      $(this).find("*").each(function () {
        $.each(this.attributes, function (i, attr) {
          attr.value = attr.value.replace(/\$rowindex\$/g, keycnt); // Replace row index
        });
      });
    });
    $row.find(".ew-icon").closest("a, button").removeData("bs.tooltip").tooltip({
      container: "body",
      placement: "bottom",
      trigger: "hover",
      sanitizeFn: ew.sanitizeFn
    });
    $elkeycnt.val(keycnt).after($("<input>").attr({
      type: "hidden",
      id: "k" + keycnt + "_action" + suffix,
      name: "k" + keycnt + "_action" + suffix,
      value: "insert"
    }));
    $lastrow.after($row);
    $els.each(function () {
      addScript(this.text.replace(/\$rowindex\$/g, keycnt));
    });
    var frm = $form.data("form");

    if (frm) {
      frm.initEditors();
      frm.initUpload();
    }

    setupTable(-1, $tbl[0], true);
    $p.scrollTop($p[0].scrollHeight);
    return false;
  } // Delete a row from grid

  function deleteGridRow(el, infix) {
    var $el = $(el).tooltip("hide").removeData("bs.tooltip"),
        $grid = $el.closest(".ew-grid, .ew-multi-column-grid"),
        $row = $el.closest("tr, div[data-rowindex]"),
        $tbl = $row.closest(".ew-table");
    if (!el || !$grid[0] || !$row[0]) return false;
    var rowidx = parseInt($row.data("rowindex"), 10);
    var $form = $grid.find("div.ew-form[id^=f][id$=grid]");
    if (!$form[0]) $form = $grid.find("form.ew-form[id^=f][id$=list]");
    var frm = $form.data("form");
    if (!$form[0] || !frm) return false;
    var suffix = $form.is("div") ? "_" + $form.attr("id") : "";
    var keycntname = "#key_count" + suffix;

    var _delete = function _delete() {
      $row.remove();
      if ($grid.is(".ew-grid")) setupTable(-1, $tbl[0], true);

      if (rowidx > 0) {
        var $keyact = $form.find("#k" + rowidx + "_action" + suffix);

        if ($keyact[0]) {
          $keyact.val($keyact.val() == "insert" ? "insertdelete" : "delete");
        } else {
          $form.find(keycntname).after($("<input>").attr({
            type: "hidden",
            id: "k" + rowidx + "_action" + suffix,
            name: "k" + rowidx + "_action" + suffix,
            value: "delete"
          }));
        }
      }
    };

    if ($.isFunction(frm.emptyRow) && frm.emptyRow(infix)) {
      // Empty row
      _delete();
    } else {
      // Confirm
      _prompt(ew.language.phrase("DeleteConfirmMsg"), function (result) {
        if (result) _delete();
      });
    }

    return false;
  } // HTML encode text

  function htmlEncode(text) {
    var str = String(text);
    return str.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  } // Get form element(s) as single element or array of radio/checkbox

  function getElements(el, root) {
    var selector;

    if ($.isObject(el) && el.dataset) {
      // HTML element (e.g. radio/checkbox)
      selector = "[data-table='" + el.dataset.table + "'][data-field='" + el.dataset.field + "']:not([name^=o]):not([name^='x$'])";
    } else if ($.isString(el)) {
      selector = "[name='" + el + "']";
      var ar = el.split(" "); // Check if "#id name"

      if (ar.length == 2) selector = "[data-table='" + ar[0] + "'][data-field='" + getId(ar[1]) + "']:not([name^=o]):not([name^='x$'])"; // Remove []
    }

    var root = !$.isString(root) ? root : /^#/.test(root) ? root : "#" + root;
    selector = "input" + selector + ",select" + selector + ",textarea" + selector + ",button" + selector;
    var $els = root ? $(root).find(selector) : $(selector);
    if ($els.length == 1 && $els.is(":not([type=checkbox]):not([type=radio])")) return $els[0];
    return $els.get();
  } // Get first element (not necessarily form element)

  function getElement(name, root) {
    var root = $.isString(root) ? "#" + root : root,
        selector = "#" + name.replace(/([\$\[\]])/g, "\\$1") + ",[name='" + name + "']";
    return root ? $(root).find(selector)[0] : $(selector).first()[0];
  } // Get ancestor by function

  function getAncestorBy(node, fn) {
    while (node = node.parentNode) {
      if (node && node.nodeType == 1 && (!fn || fn(node))) return node;
    }

    return null;
  } // Check if an element is hidden

  function isHidden(el) {
    var $el = $(el);
    return $el.css("display") == "none" && !$el.closest(".dropdown-menu")[0] && !isModalLookup(el) && !isAutoSuggest(el) && !isHiddenTextArea(el) || getAncestorBy(el, function (node) {
      return node.style.display == "none" && !node.classList.contains("tab-pane") && !node.classList.contains("collapse");
    }) != null;
  } // Check if same text

  function sameText(o1, o2) {
    return String(o1).toLowerCase() == String(o2).toLowerCase();
  } // Check if same string

  function sameString(o1, o2) {
    return String(o1) == String(o2);
  } // Get element value

  function getValue(el, form) {
    if (!el) return "";
    var obj;

    if ($.isString(el)) {
      var ar = el.split(" ");

      if (ar.length == 2) {
        // Parent field in master table
        obj = getElements(el);
      } else {
        obj = getElements(el, form);
      }
    } else if (el.type == "radio" || el.type == "checkbox") {
      // Single radio/checkbox
      obj = getElements(el);
    } else {
      obj = el;
    }

    if (obj.options) {
      // Selection list
      if (obj.list) {
        var val = obj.values;
        return obj.multiple ? val : val[0] || "";
      } else {
        var _val = Array.prototype.filter.call(obj.options, function (option) {
          return option.selected && option.value !== "";
        }).map(function (option) {
          return option.value;
        });

        return obj.type == "select-multiple" ? _val : _val[0] || "";
      }
    } else if ($.isNumber(obj.length)) {
      // Radio/Checkbox list, or element not found
      var _val2 = $(obj).filter(":checked").map(function () {
        return this.value;
      }).get();

      return obj.length == 1 ? _val2[0] : _val2;
    } else if (ew.isHiddenTextArea(obj)) {
      $(obj).data("editor").save();
      return obj.value;
    } else {
      // text/hidden
      var data = $(obj).data();
      if (data.lookup && data.multiple) // Modal-Lookup
        return obj.value.split(ew.MULTIPLE_OPTION_SEPARATOR);else return obj.value;
    }
  } // Get existing selected values as an array

  function getOptionValues(el, form) {
    var obj;

    if ($.isString(el)) {
      var ar = el.split(" ");

      if (ar.length == 2) {
        // Parent field in master table
        obj = getElements(el);
      } else {
        obj = getElements(el, form);
      }
    } else if (el.type == "radio" || el.type == "checkbox") {
      // Single radio/checkbox
      obj = getElements(el);
    } else {
      obj = el;
    }

    if (obj.options) {
      // Selection list
      if (obj.list) return obj.values;else return Array.prototype.filter.call(obj.options, function (option) {
        return option.selected && option.value !== "";
      }).map(function (option) {
        return option.value;
      });
    } else if ($.isNumber(obj.length)) {
      // Radio/Checkbox list, or element not found
      return $(obj).filter(":checked").map(function () {
        return this.value;
      }).get();
    } else if (ew.isHiddenTextArea(obj)) {
      $(obj).data("editor").save();
      return [obj.value];
    } else {
      // text/hidden
      var data = $(obj).data();
      if (data.lookup && data.multiple) // Modal-Lookup
        return obj.value.split(ew.MULTIPLE_OPTION_SEPARATOR);else return [obj.value];
    }
  } // Get existing text of selected values as an array

  function getOptionTexts(el, form) {
    var obj;

    if ($.isString(el)) {
      var ar = el.split(" ");

      if (ar.length == 2) {
        // Parent field in master table
        obj = getElements(el);
      } else {
        obj = getElements(el, form);
      }
    } else {
      obj = el;
    }

    if (isAutoSuggest(obj)) {
      // AutoSuggest (before obj.options)
      return [obj.input.value];
    } else if (isModalLookup(obj)) {
      // Modal-Lookup (before obj.options)
      var $obj = $(obj);
      return $obj.parent().find(".ew-lookup-text .ew-option").map(function () {
        return $(this).text().trim();
      }).get();
    } else if (obj.options) {
      // Selection list
      return Array.prototype.filter.call(obj.options, function (option) {
        return option.selected && option.value !== "";
      }).map(function (option) {
        return option.text;
      });
    } else if ($.isNumber(obj.length)) {
      // Radio/Checkbox list, or element not found
      return $(obj).filter(":checked").map(function () {
        return $(this).parent().text();
      }).get();
    } else if (ew.isHiddenTextArea(obj)) {
      $(obj).data("editor").save();
      return [obj.value];
    } else {
      return [obj.value];
    }
  } // Clear existing options

  function clearOptions(obj) {
    if (obj.options) {
      // Selection list
      var lo = obj.type == "select-multiple" || // multiple
      obj.hasAttribute("data-dropdown") || // dropdown
      convertToBool(obj.getAttribute("data-pleaseselect")) === false || // data-pleaseselect="false"
      obj.length > 0 && obj.options[0].value != "" ? // non-empty first element
      0 : 1;

      if (obj.list) {
        obj.removeAll();
      } else {
        for (var i = obj.length - 1; i >= lo; i--) {
          obj.remove(i);
        }
      }

      if (isAutoSuggest(obj)) {
        obj.input.value = "";
        obj.value = "";
      }
    }
  }
  /**
   * Get the name or id of an element
   *
   * @param {*} el - Element
   * @param {boolean} [remove=true] - Remove square brackets
   * @returns
   */

  function getId(el, remove) {
    var id = $.isString(el) ? el : $(el).attr("name") || $(el).attr("id"); // Use name first (id may have suffix)

    return remove !== false ? id.replace(/\[\]$/, "") : id;
  } // Get display value separator

  function valueSeparator(index, obj) {
    var sep = $(obj).data("value-separator");
    return Array.isArray(sep) ? sep[index - 1] : sep || ", ";
  }
  /**
   * Get display value
   *
   * @param {Object} opt - Option being displayed
   * @param {HTMLElment} obj - HTML element
   * @returns {string} Display value
   */

  function displayValue(opt, obj) {
    var text = opt.df;

    for (var i = 2; i <= 4; i++) {
      if (opt["df" + i] && opt["df" + i] != "") {
        var sep = valueSeparator(i - 1, obj);
        if ($.isUndefined(sep)) break;
        if ($.isValue(text)) text += sep;
        text += opt["df" + i];
      }
    }

    return text;
  }
  /**
   * Get HTML for a single option
   *
   * @param {*} val - Value of the option
   * @returns {string} HTML
   */

  function optionHtml(val) {
    return ew.OPTION_HTML_TEMPLATE.replace(/\{value\}/g, val);
  }
  /**
   * Get HTML for diplaying all options
   *
   * @param {string[]} options - Array of all options (HTML)
   * @param {number} max - Maximum number of options to show
   * @returns {string} HTML
   */

  function optionsHtml(options, max) {
    if (options.length > (max || ew.MAX_OPTION_COUNT)) {
      // More than max option count
      return ew.language.phrase("CountSelected").replace("%s", options.length);
    } else if (options.length) {
      // Some options
      var html = "";

      for (var i = 0; i < options.length; i++) {
        html += optionHtml(options[i]);
      }

      return html;
    } else {
      // No options
      return ew.language.phrase("PleaseSelect");
    }
  }
  /**
   * Create new option
   *
   * @param {(HTMLElement|array)} obj - Selection list
   * @param {Object} opt - Object for the new option
   * @param {form} f - form object of obj
   * @returns
   */

  function newOption(obj, opt, f) {
    var frm = forms.get(f.id),
        id = getId(obj),
        list = frm.getList(id),
        value = opt.lf,
        item = {
      lf: opt.lf,
      df1: opt.df,
      df2: opt.df2,
      df3: opt.df3,
      df4: opt.df4
    },
        text;

    if (list.template && !isAutoSuggest(obj)) {
      text = list.template.render(item, ew.jsRenderHelpers);
    } else {
      text = displayValue(opt, obj) || value;
    }

    var args = {
      "data": item,
      "name": id,
      "form": f.$element,
      "value": value,
      "text": text
    };

    if (obj.options) {
      // Selection list
      var option;

      if (obj.list) {
        option = new SelectionListOption(args.value, args.text);
      } else {
        option = document.createElement("option");
        option.value = args.value;
        option.innerHTML = args.text;
      }

      args = _objectSpread2(_objectSpread2({}, args), {}, {
        option: option
      });
      $document.trigger("newoption", [args]); // Fire "newoption" event for selection list

      if (obj.list) {
        obj.add(args.option.value, args.option.text);
      } else {
        obj.add(args.option);
      }
    }

    return args.text;
  } // Select combobox option

  function selectOption(obj, values) {
    if (!obj || !values) return;
    var $obj = $(obj);

    if (Array.isArray(values)) {
      if (obj.options) {
        // Selection list
        if (obj.list) {
          obj.value = values;
        } else {
          $obj.val(values);
          if (obj.type == "select-one" && obj.selectedIndex == -1) obj.selectedIndex = 0; // Make sure an option is selected (IE)
        }

        if (isAutoSuggest(obj) && values.length == 1) {
          var opts = obj.options || [];

          for (var _iterator2 = _createForOfIteratorHelperLoose(opts), _step2; !(_step2 = _iterator2()).done;) {
            var opt = _step2.value;

            if (opt.value == values[0]) {
              obj.value = opt.value;
              obj.input.value = opt.text;
              break;
            }
          }
        } else if (isModalLookup(obj)) {
          var vals = [],
              html = [],
              _opts = obj.options || [];

          for (var _iterator3 = _createForOfIteratorHelperLoose(values), _step3; !(_step3 = _iterator3()).done;) {
            var value = _step3.value;

            for (var _iterator4 = _createForOfIteratorHelperLoose(_opts), _step4; !(_step4 = _iterator4()).done;) {
              var _opt = _step4.value;

              if (value == _opt.value) {
                vals.push(_opt.value);
                html.push(optionHtml(_opt.text));
                break;
              }
            }
          }

          $obj.val(vals.join(ew.MULTIPLE_OPTION_SEPARATOR));
          $obj.parent().find(".ew-lookup-text").html(optionsHtml(html, $obj.data("maxcount")));
        }
      } else if (obj.type) {
        obj.value = values.join(ew.MULTIPLE_OPTION_SEPARATOR);
      }
    } // Auto-select if only one option

    function isAutoSelect(el) {
      if (!$(el).data("autoselect")) // data-autoselect="false"
        return false;
      var form = getForm(el);

      if (form) {
        if (/s(ea)?rch$/.test(form.id)) // Search forms
          return false;
        var list = forms.get(form.id).getList(el.id);
        if (list && list.parentFields.length == 0) // No parent fields
          return false;
        return true;
      }

      return false;
    }

    if (!isAutoSelect(obj)) return;

    if (obj.options) {
      // Selection List
      if (!obj.list && obj.type == "select-one" && obj.options.length == 2 && !obj.options[1].selected) {
        obj.options[1].selected = true;
      } else if (obj.options.length == 1 && !obj.options[0].selected) {
        obj.options[0].selected = true;
      }

      if (obj.list) obj.render();

      if (isAutoSuggest(obj)) {
        var _opts2 = obj.options || [];

        if (_opts2.length == 1) {
          obj.value = _opts2[0].value;
          obj.input.value = _opts2[0].text;
        }
      }
    }
  } // Ajax send

  $document.ajaxSend(function (event, jqxhr, settings) {
    var url = settings.url;
    if (url.match(/\/(\w+preview|session)\?/i)) // Preview/Session page
      _removeSpinner(); // Preview has spinner already

    var apiUrl = getApiUrl(),
        isApi = url.startsWith(apiUrl),
        // Is API request
    allowed = isApi || url.startsWith(currentPage());

    if (!allowed && url.match(/^http/i)) {
      var objUrl = new URL(url);
      allowed = objUrl.hostname == currentUrl.hostname; // Same host name
    }

    if (allowed) {
      if (isApi && ew.API_JWT_TOKEN && !ew.IS_WINDOWS_AUTHENTICATION) // Do NOT set JWT authorization header if Windows Authentication
        jqxhr.setRequestHeader(ew.API_JWT_AUTHORIZATION_HEADER, "Bearer " + ew.API_JWT_TOKEN);

      if (settings.type == "GET") {
        // GET
        var ar = settings.url.split("?"),
            params = new URLSearchParams(ar[1]);
        params.set(ew.TOKEN_NAME_KEY, ew.TOKEN_NAME); // Add token name // PHP

        params.set(ew.ANTIFORGERY_TOKEN_KEY, ew.ANTIFORGERY_TOKEN); // Add antiforgery token // PHP

        ar[1] = params.toString();
        settings.url = ar[0] + (ar[1] ? "?" + ar[1] : "");
      } else {
        // POST
        if (settings.data instanceof FormData) {
          // FormData
          settings.data.set(ew.TOKEN_NAME_KEY, ew.TOKEN_NAME); // Add token name // PHP

          settings.data.set(ew.ANTIFORGERY_TOKEN_KEY, ew.ANTIFORGERY_TOKEN); // Add antiforgery token // PHP
        } else {
          var params = new URLSearchParams(settings.data);
          params.set(ew.TOKEN_NAME_KEY, ew.TOKEN_NAME); // Add token name // PHP

          params.set(ew.ANTIFORGERY_TOKEN_KEY, ew.ANTIFORGERY_TOKEN); // Add antiforgery token // PHP

          settings.data = params.toString();
        }
      }
    }
  }); // Ajax start

  $document.ajaxStart(function () {
    $document.data("_ajax", true);
    ew.addSpinner();
    $("form.ew-form").addClass("ew-wait").each(function () {
      var frm = forms.get(this.id);

      if (frm) {
        if (!frm.multiPage || !frm.multiPage.lastPageSubmit) frm.disableForm();
      }
    });
  }); // Ajax stop (internal)

  function _ajaxStop() {
    $("form.ew-form.ew-wait").removeClass("ew-wait").each(function () {
      var frm = forms.get(this.id);

      if (frm) {
        if (!frm.multiPage || !frm.multiPage.lastPageSubmit) {
          frm.enableForm();
        }
      }
    });
    ew.removeSpinner();
    $document.data("_ajax", false);
  } // Ajax stop/error

  $document.ajaxStop(_ajaxStop).ajaxError(_ajaxStop); // Execute JavaScript in HTML loaded by Ajax

  function executeScript(html, id) {
    var matches = html.replace(/<head>[\s\S]*<\/head>/, "").matchAll(/<script([^>]*)>([\s\S]*?)<\/script\s*>/ig);
    Array.from(matches).forEach(function (ar, i) {
      var text = ar[2];
      if (/(\s+type\s*=\s*['"]*text\/javascript['"]*)|^((?!\s+type\s*=).)*$/i.test(ar[1]) && text) addScript(text, "scr_" + id + "_" + i++);
    });
  } // Strip JavaScript in HTML loaded by Ajax

  function stripScript(html) {
    var matches = html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script\s*>/ig);

    for (var _iterator5 = _createForOfIteratorHelperLoose(matches), _step5; !(_step5 = _iterator5()).done;) {
      var ar = _step5.value;
      var text = ar[0];
      if (/(\s+type\s*=\s*['"]*text\/javascript['"]*)|^((?!\s+type\s*=).)*$/i.test(ar[1])) html = html.replace(text, "");
    }

    return html;
  } // Add SCRIPT tag

  function addScript(text, id) {
    var scr = document.createElement("SCRIPT");
    if (id) scr.id = id;
    scr.text = text;
    return document.body.appendChild(scr); // Do not use jQuery so it can be removed
  } // Remove JavaScript added by Ajax

  function removeScript(id) {
    if (id) $("script[id^='scr_" + id + "_']").remove();
  } // Clean HTML loaded by Ajax for modal dialog

  function getContent(html) {
    var body = stripScript(html).match(/<body[\s\S]*>[\s\S]*<\/body>/i);
    return body ? $(body[0]).not("div[id^=ew].modal, #ew-tooltip, #ew-drilldown-panel, #cookie-consent, #template-upload, #template-download") : "";
  } // Get all options of Selection list or Radio/Checkbox list as array

  function getOptions(obj) {
    return obj.options ? Array.prototype.map.call(obj.options, function (opt) {
      return [opt.value, opt.text];
    }) : [];
  }
  /**
   * Show Add Option dialog
   *
   * @param {Object} args - Arguments
   * @param {Object} args.frm - form object
   * @param {HTMLElement} args.lnk - Add option anchor element
   * @param {string} args.el - Form element name
   * @param {string} args.url - URL of the Add form
   * @returns
   */

  function addOptionDialogShow(args) {
    // Hide dialog
    var _hide = function _hide() {
      removeScript($dlg.data("args").el);
      var frm = $dlg.removeData("args").find(".modal-body form").data("form");
      if (frm) frm.destroyEditor();
      $dlg.find(".modal-body").html("");
      $dlg.find(".modal-footer .btn-primary").unbind();
      $dlg.data("showing", false);
    };

    var $dlg = ew.addOptionDialog || $("#ew-add-opt-dialog").on("hidden.bs.modal", _hide);

    if (!$dlg[0]) {
      _alert("DIV #ew-add-opt-dialog not found.");

      return;
    }

    if ($dlg.data("showing")) return;
    $dlg.data("showing", true); // Submission success

    var _submitSuccess = function _submitSuccess(data) {
      var _results;

      var results = data,
          args = $dlg.data("args"),
          frm = forms.get(args.lnk),
          // form object
      objName = $dlg.find(".modal-body form input[name='" + ew.API_OBJECT_NAME + "']").val(),
          // Get object name from form
      el = args.el,
          // HTML element name
      re = /^x(\d+)_/,
          m = el.match(re),
          // Check row index
      prefix = m ? m[0] : "x_",
          index = m ? m[1] : -1,
          name = el.replace(re, "x_"),
          list = frm.getList(el);
      if ($.isString(data)) results = parseJson(data);

      if (((_results = results) === null || _results === void 0 ? void 0 : _results.success) && results[objName]) {
        // Success
        $dlg.modal("hide");
        var result = results[objName],
            form = frm.$element[0],
            // HTML form or DIV
        obj = getElements(el, form);

        if (obj) {
          var lf = list.linkField,
              dfs = list.displayFields.slice(),
              // Clone
          ffs = list.filterFields.slice(),
              // Clone
          pfs = list.parentFields.slice(); // Clone

          pfs.forEach(function (pf, i) {
            if (pf.split(" ").length == 1) // Parent field in the same table, add row index
              pfs[i] = pfs[i].replace(/^x_/, prefix);
          });
          var lfv = lf != "" ? result[lf] : "",
              row = {
            lf: lfv
          };
          dfs.forEach(function (df, i) {
            if (df in result) row["df" + (i || "")] = result[df];
          });
          ffs.forEach(function (ff, i) {
            if (ff in result) row["ff" + (i || "")] = result[ff];
          });

          if (lfv && dfs.length > 0 && row["df"]) {
            if (list.ajax === null) // Non-Ajax
              list.lookupOptions.push(row);
            var arp = pfs.map(function (pf) {
              return getOptionValues(pf, form);
            }),
                // Get the parent field values
            args = {
              "data": row,
              "parents": arp,
              "valid": true,
              "name": getId(obj),
              "form": form
            };
            $document.trigger("addoption", [args]);

            if (args.valid) {
              // Add the new option
              var ar = getOptions(obj),
                  vals = [];
              var txt = newOption(obj, row, form);

              if (obj.options) {
                obj.options[obj.options.length - 1].selected = true;

                if (obj.list) {
                  // Radio/Checkbox list
                  obj.render();
                  $(obj.target).find("input").last().focus();
                }

                if (isAutoSuggest(obj)) {
                  $(obj).val(lfv).change();
                  $(obj.input).val(txt).focus();
                } else if (isModalLookup(obj)) {
                  var $obj = $(obj),
                      $lu = $(getElement("lu_" + args.name, form));

                  if (obj.multiple) {
                    // Add to existing values
                    var val = $(obj).val(),
                        vals = [],
                        nv = String(lfv);
                    if (val !== "") vals = val.split(ew.MULTIPLE_OPTION_SEPARATOR);

                    if (!vals.includes(nv)) {
                      vals.push(nv);
                      $obj.val(vals.join()).change();
                      var html = $lu.html(),
                          arOpt = $lu.find(".ew-option").map(function () {
                        return $(this).html();
                      }).get();

                      if (arOpt.length) {
                        // Some options selected
                        arOpt.push(txt);
                        $lu.html(optionsHtml(arOpt, $obj.data("maxcount")));
                      } else if (html == ew.language.phrase("PleaseSelect")) {
                        // No options selected
                        $lu.html(optionHtml(txt));
                      } else if (html) {
                        // Many options selected
                        $lu.html(ew.language.phrase("CountSelected").replace("%s", vals.length));
                      }
                    }
                  } else {
                    $obj.val(lfv).change();
                    $lu.html(txt);
                  }
                } else {
                  $(obj).change().focus();
                }
              }

              var $form = $(form),
                  suffix = $form.is("div") ? "_" + $form.attr("id") : "";
              var cnt = $form.find("#key_count" + suffix).val();

              if (cnt > 0) {
                // Grid-Add/Edit, update other rows
                for (var i = 1; i <= cnt; i++) {
                  if (i == index) continue;
                  var obj2 = getElements(name.replace(/^x/, "x" + i), form);
                  var ar2 = getOptions(obj2),
                      vals = [];
                  if (JSON.stringify(ar) != JSON.stringify(ar2)) // Not same options
                    continue;
                  newOption(obj2, row, form);
                  if (obj2.options && obj.list) // Radio/Checkbox list
                    obj2.render();
                }
              }
            }
          }
        }
      } else {
        var _results2;

        // Failure
        if ((_results2 = results) === null || _results2 === void 0 ? void 0 : _results2.error) {
          var _results$error;

          if ($.isString(results.error)) showToast(results.error);else if ($.isString((_results$error = results.error) === null || _results$error === void 0 ? void 0 : _results$error.description)) showToast(results.error.description);
        } else {
          var msg,
              $div = $("<div></div>").html(data).find("div.ew-message-dialog");

          if ($div[0]) {
            msg = $div.html();
          } else {
            var _results3;

            msg = ((_results3 = results) === null || _results3 === void 0 ? void 0 : _results3.failureMessage) || data;
            if (!msg || String(msg).trim() == "") msg = ew.language.phrase("InsertFailed");
          }

          showToast(msg);
        }
      }
    }; // Fail

    var _fail = function _fail(o) {
      $dlg.modal("hide");

      _alert("Server Error " + o.status + ": " + o.statusText);
    }; // Submit

    var _submit = function _submit(e) {
      var $dlg = ew.addOptionDialog,
          form = $dlg.find(".modal-body form")[0],
          frm = forms.get(form.id),
          btn = e ? e.target : null,
          $btn = $(btn);

      if (frm.canSubmit()) {
        $btn.prop("disabled", false).removeClass("disabled");
        $body.css("cursor", "wait");
        $.post(getApiUrl(ew.API_ADD_ACTION), $(form).serialize(), _submitSuccess).fail(_fail).always(function () {
          frm.enableForm();
          $btn.prop("disabled", false).removeClass("disabled");
          $body.css("cursor", "default");
        });
      }

      return false;
    };

    $dlg.modal("hide");
    $dlg.data("args", args); // Get form HTML

    var success = function success(data) {
      var frm = forms.get(args.lnk),
          prefix = "x_",
          m = args.el.match(/^(x\d+_)/);
      if (m) // Contains row index
        prefix = m[1];
      var list = frm.getList(args.el),
          pfs = list.parentFields.slice() // Clone
      .map(function (pf) {
        return pf.split(" ").length == 1 ? pf.replace(/^x_/, prefix) : pf;
      }),
          // Parent field in the same table, add row index
      form = frm.htmlForm,
          ar = pfs.map(function (pf) {
        return getOptionValues(pf, form);
      }),
          ar2 = pfs.map(function (pf) {
        return getOptionTexts(pf, form);
      }),
          ffs = list.filterFieldVars.slice(); // Clone

      $dlg.find(".modal-title").html($(args.lnk).closest(".ew-add-opt-btn").data("title"));
      $dlg.find(".modal-body").html(stripScript(data));
      var form = $dlg.find(".modal-body form")[0];

      if (form) {
        // Set the filter field value
        $(form).keypress(function (e) {
          if (e.which == 13 && e.target.nodeName != "TEXTAREA") return _submit();
        });
        ar.forEach(function (v, i) {
          (function () {
            var obj = getElements(ffs[i], form);

            if (obj) {
              if (obj.options || obj.length) {
                // Selection list
                $(obj).first().one("updatedone", function () {
                  return selectOption(obj, v);
                });
              } else {
                selectOption(obj, v);
              }
            }
          })();
        });
      }

      ew.addOptionDialog = $dlg.modal("show");
      $dlg.find(".modal-footer .btn-primary").click(_submit).focus();
      executeScript(data, args.el);

      if (form) {
        // Set the filter field value
        ar.forEach(function (v, i) {
          var obj = getElements(ffs[i], form);

          if (obj) {
            if (isAutoSuggest(obj)) {
              // AutoSuggest
              obj.value = v[0];
              obj.input.value = ar2[i][0];
              obj.add(v[0], ar2[i][0], true);
            } else if (isModalLookup(obj)) {
              // Modal-Lookup
              obj.value = v[0];
              updateOptions.call(forms.get(form.id), obj);
            } else if (obj.options || obj.length) ; else {
              // Text
              obj.value = v[0];
            }
          }
        });
      }

      $dlg.trigger("load.ew");
    };

    $.get(args.url, success).fail(_fail);
  } // Hide Modal dialog

  function modalDialogHide(e) {
    var $dlg = $(this),
        args = $dlg.data("args");
    removeScript("ModalDialog");
    var frm = $dlg.removeData("args").find(".modal-body form").data("form");
    if (frm) frm.destroyEditor();
    var $bd = $dlg.find(".modal-body").html("");
    if ($bd.ewjtable && $bd.ewjtable("instance")) $bd.ewjtable("destroy");
    $dlg.find(".modal-footer .btn-primary").unbind();
    $dlg.find(".modal-dialog").removeClass(function (index, className) {
      var m = className.match(/table\-\w+/);
      return m ? m[0] : "";
    });
    $dlg.data("showing", false);
    $dlg.data("url", null);
    if (args && args.reload) window.location.reload(true);
  }
  /**
   * Show modal dialog
   *
   * @param {Object} args - Arguments
   * @param {HTMLFormElement} args.f - Form of List page
   * @param {HTMLElement} args.lnk - Anchor element
   * @param {string} args.url - URL of the form
   * @param {string|null} args.btn - Button phrase ID
   * @param {string} args.caption - Caption in dialog header
   * @param {boolean} args.reload - Reload page after hiding dialog or not
   * @param {string} args.size - Size of the dialog 'modal-sm'|''|modal-lg'|'modal-xl'(default)
   * @returns false
   */

  function modalDialogShow(args) {
    $(args.lnk).tooltip("hide");
    var f = args.f;

    if (f && !keySelected(f)) {
      _prompt("<p class=\"text-danger\">" + ew.language.phrase("NoRecordSelected") + "</p>");

      return false;
    }

    var $dlg = ew.modalDialog || $("#ew-modal-dialog").on("hidden.bs.modal", modalDialogHide); // div#ew-modal-dialog always exists

    if ($dlg.data("showing") && $dlg.data("url") == args.url) return false;
    $dlg.data({
      showing: true,
      url: args.url
    });
    args.reload = false; // size

    if (args.size === "modal-sm") {
      // 300px
      $dlg.find(".modal-dialog").toggleClass("modal-sm", true).toggleClass("modal-lg modal-xl", false);
    } else if (args.size === "") {
      // 500px
      $dlg.find(".modal-dialog").toggleClass("modal-sm modal-lg modal-xl", false);
    } else if (args.size === "modal-lg") {
      // 800px
      $dlg.find(".modal-dialog").toggleClass("modal-lg", true).toggleClass("modal-sm modal-xl", false);
    } else {
      // Default = 1140px
      $dlg.find(".modal-dialog").toggleClass("modal-xl", true).toggleClass("modal-sm modal-lg", false);
    } // caption

    var _caption = function _caption() {
      var args = $dlg.data("args");
      var $lnk = $(args.lnk);
      return args.caption || $lnk.data("caption") || $lnk.data("original-title") || "";
    }; // button text

    var _button = function _button() {
      var args = $dlg.data("args");
      if ($.isNull(args.btn)) return "";else if (args.btn && args.btn != "") return ew.language.phrase(args.btn);else return _caption();
    }; // fail

    var _fail = function _fail(o) {
      $dlg.modal("hide");
      if (o.status) _alert("Server Error " + o.status + ": " + o.statusText);
    }; // always

    var _always = function _always(o) {
      $body.css("cursor", "default");
    }; // check if current page

    var _current = function _current(url) {
      var a = $("<a>", {
        href: url
      })[0];
      return window.location.pathname.endsWith(a.pathname);
    }; // submit success

    var _submitSuccess = function _submitSuccess(data) {
      var result = parseJson(data);

      if ($.isObject(result)) {
        if ($.isString(result.failureMessage)) {
          _alert(result.failureMessage);
        } else if (result.error) {
          var _result$error;

          if ($.isString(result.error)) _alert(result.error);else if ($.isString((_result$error = result.error) === null || _result$error === void 0 ? void 0 : _result$error.description)) _alert(result.error.description);
        } else {
          var url = result.url;

          if (result.modal && !_current(url)) {
            var args = $dlg.data("args");
            args.reload = true;
            if (result.caption) args.caption = result.caption;
            args.btn = result.view ? null : "";
            $dlg.data("args", args);
            url += (url.split("?").length > 1 ? "&" : "?") + "modal=1&rnd=" + random();
            $body.css("cursor", "wait");
            $.ajax(url).done(success).fail(_fail).always(_always);
          } else {
            $dlg.modal("hide");
            window.location = url;
          }
        }
      } else {
        var body = getContent(data);
        var $bd = $dlg.find(".modal-body").html(body);
        var footer = "";
        var cf = $bd.find("#confirm");
        var ct = $bd.find("#conflict");

        if (ct && ct.val() == "1") {
          // Conflict page
          footer += "<button type=\"button\" id=\"btn-overwrite\" class=\"btn btn-primary ew-btn\">" + ew.language.phrase("OverwriteBtn") + "</button>";
          footer += "<button type=\"button\" id=\"btn-reload\" class=\"btn btn-default ew-btn\">" + ew.language.phrase("ReloadBtn") + "</button>";
          footer += "<button type=\"button\" class=\"btn btn-default ew-btn\" data-dismiss=\"modal\">" + ew.language.phrase("CancelBtn") + "</button>";
          $dlg.find(".modal-footer").html(footer);
          $dlg.find(".modal-footer #btn-overwrite").on('click', {
            action: 'overwrite'
          }, _submit);
          $dlg.find(".modal-footer #btn-reload").on('click', {
            action: 'show'
          }, _submit);
        } else if (cf && cf.val() == "confirm") {
          // Confirm page
          footer += "<button type=\"button\" class=\"btn btn-primary ew-btn\">" + ew.language.phrase("ConfirmBtn") + "</button>";
          footer += "<button type=\"button\" class=\"btn btn-default ew-btn\">" + ew.language.phrase("CancelBtn") + "</button>";
          $dlg.find(".modal-footer").html(footer);
          $dlg.find(".modal-footer .btn-primary").click(_submit).focus();
          $dlg.find(".modal-footer .btn-default").on("click", {
            action: "cancel"
          }, _submit);
        } else {
          // Normal page
          var btn = _button();

          if (btn) footer += "<button type=\"button\" class=\"btn btn-primary ew-btn\">" + btn + "</button>";
          footer += "<button type=\"button\" class=\"btn btn-default ew-btn\" data-dismiss=\"modal\">" + ew.language.phrase("CancelBtn") + "</button>";
          $dlg.find(".modal-footer").html(footer);
          $dlg.find(".modal-footer .btn-primary").addClass("ew-submit").click(_submit).focus();
        }

        executeScript(data, "ModalDialog");
        $dlg.trigger("load.ew"); // Trigger load event for, e.g. Use JavaScript popup message
      }
    }; // submit

    var _submit = function _submit(e) {
      var form = $dlg.find(".modal-body form")[0],
          $form = $(form),
          frm = forms.get(form.id),
          action = e && e.data ? e.data.action : null,
          btn = e ? e.target : null;

      if (btn) {
        if (btn.classList.contains("disabled")) return false;

        frm.enableForm = function () {
          $(btn).prop("disabled", false).removeClass("disabled");
        };

        frm.disableForm = function () {
          $(btn).prop("disabled", true).addClass("disabled");
        };
      }

      var input = form.elements["action"];
      if (action && input) input.value = action; // Update action

      if (action == "cancel") {
        // Cancel
        $.post($form.attr("action"), $form.serialize(), success).fail(_fail).always(_always);
      } else if (frm.canSubmit()) {
        $body.css("cursor", "wait");
        $.post($form.attr("action"), $form.serialize(), _submitSuccess).fail(_fail).always(function () {
          frm.enableForm();

          _always();
        });
      }

      return false;
    };

    $dlg.modal("hide");
    $dlg.data("args", args);

    var success = function success(data) {
      var result = parseJson(data);

      if ($.isObject(result)) {
        if (result.error) _alert(result.error);
      } else {
        var args = $dlg.data("args");
        var $lnk = $(args.lnk);
        $dlg.find(".modal-title").html(_caption());
        var footer = "";

        var btn = _button();

        if (btn) footer += "<button type=\"button\" class=\"btn btn-primary ew-btn\">" + btn + "</button>";
        if (footer != "") footer += "<button type=\"button\" class=\"btn btn-default ew-btn\" data-dismiss=\"modal\">" + ew.language.phrase("CancelBtn") + "</button>";else footer = "<button type=\"button\" class=\"btn btn-default ew-btn\" data-dismiss=\"modal\">" + ew.language.phrase("CloseBtn") + "</button>";
        $dlg.find(".modal-footer").html(footer);
        var body = getContent(data);
        $dlg.find(".modal-body").html(body);
        var table = $lnk.data("table");
        if (table) $dlg.find(".modal-dialog").addClass("table-" + table);
        var $btn = $dlg.find(".modal-footer .btn-primary").addClass("ew-submit").click(_submit);
        $dlg.find(".modal-body form").keypress(function (e) {
          if (e.which == 13 && e.target.nodeName != "TEXTAREA") return $btn.click();
        });
        ew.modalDialog = $dlg.modal("show");
        executeScript(data, "ModalDialog");
        $dlg.trigger("load.ew"); // Trigger load event for, e.g. YouTube videos, ReCAPTCHA and Google maps

        $btn.focus();
      }
    };

    $body.css("cursor", "wait");
    var url = args.url;

    if (f) {
      // Post form
      var $f = $(f);
      if (!f.elements.modal) $("<input>").attr({
        type: "hidden",
        name: "modal",
        value: "1"
      }).appendTo($f);
      $.post(url, $f.serialize(), success).fail(_fail).always(_always);
    } else {
      url += (url.split("?").length > 1 ? "&" : "?") + "modal=1&rnd=" + random();
      $.get(url, success).fail(_fail).always(_always);
    }

    return false;
  } // Show Modal Lookup

  function modalLookupShow(args) {
    var el = args.el,
        f = getForm(args.lnk);
    if (!f || !el) return;
    var $dlg = ew.modalLookupDialog || $("#ew-modal-lookup-dialog").on("hidden.bs.modal", modalDialogHide);

    if (!$dlg[0]) {
      _alert("DIV #ew-modal-lookup-dialog not found.");

      return;
    }

    if ($dlg.data("showing")) return;
    $dlg.data("showing", true);
    var $f = $(f),
        $input = $f.find("[id='" + el + "']"),
        // id may contains "[]"
    $bd = $dlg.find(".modal-body"),
        $lnk = $(args.lnk),
        $lu = $lnk.closest(".ew-lookup-list").find(".ew-lookup-text").focus(),
        oid = getId(el, false),
        m = oid.match(/^([xy])(\d*)_/),
        rowindex = m ? m[2] : "",
        list = forms.get(f.id).getList(el); // Format data

    var _format = function _format(data) {
      if (data.result == "OK" && Array.isArray(data.records)) {
        data.records.forEach(function (ar, index) {
          var item;
          if (Array.isArray(ar)) item = {
            "lf": ar[0],
            "df1": ar[1],
            "df2": ar[2],
            "df3": ar[3],
            "df4": ar[4]
          };else if ($.isObject(ar)) item = {
            lf: ar.lf,
            df1: ar.df,
            df2: ar.df2,
            df3: ar.df3,
            df4: ar.df4
          };
          var txt = displayValue(ar, $input);

          if (list.template) {
            item["df"] = list.template.render(item, ew.jsRenderHelpers);
          } else {
            item["df"] = txt;
          }

          item["txt"] = txt;
          data.records[index] = item;
        });
      }

      return data;
    }; // Set AutoSuggest

    var setAutoSuggest = function setAutoSuggest(value, text) {
      if (!isAutoSuggest($input)) return;
      var el = $input[0];
      el.add(value, text, true);
      el.input.value = text;
    }; // Add option

    var addOpt = function addOpt(ar) {
      // Check if selected records are in the current page
      var vals = [],
          html = [],
          opts = [],
          txts = [],
          useText = !args.m && args.srch;
      $bd.ewjtable("selectedRows").each(function () {
        var record = $(this).data("record");
        vals.push(record.lf);
        html.push(record.df);
        opts.push(record.df);
        txts.push(record.txt); // Text for Auto-Suggest
      });

      if (ar.sort().join() === vals.sort().join()) {
        // All selected records are from the current page
        $lu.html(optionsHtml(opts, $input.data("maxcount")));
        setAutoSuggest(vals.join(), txts.join(", "));
        $input.val(useText ? html.join(", ") : vals.join()).change();
      } else {
        // Get selected records from server
        var data = Object.assign({
          page: list.page,
          field: list.field,
          ajax: "modal",
          keys: ar
        }, getUserParams('#p_' + oid, f));
        $body.css("cursor", "wait");
        $.ajax(getApiUrl(ew.API_LOOKUP_ACTION), {
          type: "POST",
          dataType: "json",
          data: data
        }).done(_format).then(function (data) {
          if (data.result == "OK" && Array.isArray(data.records)) {
            var vals = [],
                html = [],
                opts = [],
                txts = [],
                results = data.records;

            for (var _iterator6 = _createForOfIteratorHelperLoose(results), _step6; !(_step6 = _iterator6()).done;) {
              var result = _step6.value;
              vals.push(result.lf);
              html.push(result.df);
              opts.push(result.df);
              txts.push(result.txt); // Text for Auto-Suggest
            }

            $lu.html(optionsHtml(opts, $input.data("maxcount")));
            setAutoSuggest(vals.join(), txts.join(", "));
            $input.val(useText ? html.join(", ") : vals.join()).change();
          }
        }).always(function () {
          $body.css("cursor", "default");
        });
      }
    }; // Submit

    var _submit = function _submit() {
      addOpt(arLinkValue);
      $dlg.modal("hide");
      return false;
    }; // Hide

    $dlg.modal("hide");
    $dlg.data("args", args);

    var _timer, $search; // Success

    var success = function success(data) {
      if (data.result == "OK") {
        $dlg.find(".modal-title").html($lnk.attr("title") || $lnk.data("original-title"));
        $dlg.find(".modal-body .ewjtable thead").toggle(!!args.m);
        $dlg.find(".modal-footer").html('<button type="button" id="btn-select" class="btn btn-primary ew-btn">' + ew.language.phrase("SelectBtn") + '</button>' + '<button type="button" class="btn btn-default ew-btn" data-dismiss="modal">' + ew.language.phrase("CancelBtn") + '</button>');
        $search = $dlg.find(".modal-header .modal-tools input[name=sv]").off("keyup.ew").on("keyup.ew", function (e) {
          if (_timer) _timer.cancel();
          _timer = $.later(ew.LOOKUP_DELAY, null, function () {
            $bd.ewjtable("load", {
              "sv": $search.val()
            });
          });
        });
        $dlg.find(".modal-footer #btn-select").click(_submit); // Select

        ew.modalLookupDialog = $dlg.modal("show");
        $search.focus();
      } else {
        _alert(data.message);
      }
    };

    var arp = [];
    var linkValue = $input.val(); // Link values

    var arLinkValue = linkValue !== "" ? linkValue.split(ew.MULTIPLE_OPTION_SEPARATOR) : [];
    var data = Object.assign({
      page: list.page,
      field: list.field
    }, getUserParams('#p_' + oid, f)); // Add parent field values

    var parentId = list.parentFields.slice(); // Clone

    if (rowindex != "") {
      for (var i = 0, len = parentId.length; i < len; i++) {
        var ar = parentId[i].split(" ");
        if (ar.length == 1) // Parent field in the same table, add row index
          parentId[i] = parentId[i].replace(/^x_/, "x" + rowindex + "_");
      }
    }

    if (parentId.length > 0) {
      for (var i = 0, len = parentId.length; i < len; i++) {
        arp.push(getOptionValues(parentId[i], f));
      }
    }

    for (var i = 0, cnt = arp.length; i < cnt; i++) {
      // Filter by parent fields
      data["v" + (i + 1)] = arp[i].join(ew.MULTIPLE_OPTION_SEPARATOR);
    }

    $body.css("cursor", "wait");
    $bd.ewjtable({
      paging: true,
      pageSize: args.n,
      pageSizes: [],
      pageSizeChangeArea: false,
      pageList: "minimal",
      selecting: true,
      selectingCheckboxes: true,
      multiselect: !!args.m,
      actions: {
        "listAction": function listAction(postData, jtParams) {
          var _data = Object.assign({}, data, {
            ajax: "modal",
            start: jtParams.start,
            recperpage: jtParams.recperpage
          });

          if ($.isObject(postData)) // Search
            Object.assign(_data, postData);
          return $.ajax(getApiUrl(ew.API_LOOKUP_ACTION), {
            type: "POST",
            dataType: "json",
            data: _data
          }).done(_format).always(function () {
            $body.css("cursor", "default");
          });
        }
      },
      messages: {
        serverCommunicationError: ew.language.phrase("ServerCommunicationError"),
        loadingMessage: '<div class="' + ew.spinnerClass + ' m-3 ew-loading" role="status"><span class="sr-only">' + ew.language.phrase("Loading") + '</span></div>',
        noDataAvailable: ew.language.phrase("NoRecord"),
        close: ew.language.phrase("CloseBtn"),
        pagingInfo: ew.language.phrase("Record") + " {0}-{1} " + ew.language.phrase("Of") + " {2}",
        pageSizeChangeLabel: ew.language.phrase("RecordsPerPage"),
        gotoPageLabel: ew.language.phrase("Page")
      },
      fields: {
        "lf": {
          key: true,
          list: false
        },
        "df": {}
      },
      recordsLoaded: function recordsLoaded(e, data) {
        var selectedRows = $(e.target).find(".ewjtable-data-row").filter(function () {
          return arLinkValue.includes(String($(this).data("record-key")));
        });
        $(e.target).ewjtable("selectRows", selectedRows);
      },
      selectionChanged: function selectionChanged(e, data) {
        var $rows = data.rows;

        if ($rows) {
          if (!args.m) arLinkValue = [];
          $rows.each(function () {
            var $row = $(this);
            var key = String($row.data("record-key"));
            var index = arLinkValue.indexOf(key);
            var selected = $row.hasClass("ewjtable-row-selected");
            if (selected && index == -1) arLinkValue.push(key);else if (!selected && index > -1) arLinkValue.splice(index, 1);
          });
        }
      }
    }).ewjtable("load", null, success);
  }
  /**
   * Show dialog for import
   *
   * @param {Object} args - Arguments
   * @param {string} args.hdr - Dialog header
   * @param {HTMLElement} args.lnk - Anchor element
   * @returns
   */

  function importDialogShow(args) {
    $(args.lnk).tooltip("hide");
    var $dlg = ew.importDialog || $("#ew-import-dialog");

    if (!$dlg[0]) {
      _alert("DIV #ew-import-dialog not found.");

      return false;
    }

    var $input = $dlg.find("#importfiles"),
        $bd = $dlg.find(".modal-body"),
        $data = $bd.find(":input[id!=importfiles]"),
        $message = $bd.find(".message"),
        $progress = $bd.find(".progress"),
        timer; // Disable buttons

    var enableButtons = function enableButtons() {
      $dlg.find(".modal-footer .btn").prop("disabled", false);
    }; // Show message

    var showMessage = function showMessage(msg, classname) {
      var $msg = $("<div>" + msg + "</div>");
      if (classname) $msg.addClass(classname);
      $message.removeClass("d-none").html($msg);
      if (classname == "text-danger") enableButtons();
    }; // Hide message

    var hideMessage = function hideMessage() {
      $message.addClass("d-none").html("");
    }; // Show progress

    var showProgress = function showProgress(pc, classname) {
      $progress.removeClass("d-none").find(".progress-bar").removeClass("bg-success bg-info").addClass(classname || "bg-success").attr("aria-valuenow", pc).css("width", pc + "%").html(pc + "%");
    }; // Hide progress

    var hideProgress = function hideProgress() {
      $progress.addClass("d-none").find(".progress-bar").attr("aria-valuenow", 0).css("width", "0%").html("0%");
    }; // Upload progress

    var uploadProgress = function uploadProgress(data) {
      var pc = parseInt(100 * data.loaded / data.total);
      showProgress(pc, "bg-info");

      if (pc === 100) {
        showMessage(ew.language.phrase("ImportMessageUploadComplete"), "text-info");
      } else {
        showMessage(ew.language.phrase("ImportMessageUploadProgress").replace("%p", pc), "text-info");
      }
    }; // Update progress (import)

    var updateProgress = function updateProgress(result) {
      try {
        var cnt = parseInt(result.count),
            tcnt = parseInt(result.totalCount),
            filename = result.file;

        if (tcnt > 0 && $dlg.find(".modal-footer .ew-close-btn").data("import-progress")) {
          // Show progress
          var pc = parseInt(100 * cnt / tcnt);
          showProgress(pc);
          showMessage(ew.language.phrase("ImportMessageProgress").replace("%t", tcnt).replace("%c", cnt).replace("%f", filename), "text-info");
        }
      } catch (e) {}
    }; // Import progress

    var importProgress = function importProgress() {
      var url = getApiUrl(ew.API_PROGRESS_ACTION),
          data = {
        "rnd": random()
      };
      data[ew.API_FILE_TOKEN_NAME] = $input.data(ew.API_FILE_TOKEN_NAME);
      $.get(url, data, updateProgress, "json");
    }; // Import complete

    var importComplete = function importComplete(result) {
      var maxErrorCount = 5;
      var msg = "";
      showProgress(100);
      var fileResults = result.files;
      $dlg.find(".modal-footer .ew-close-btn").data("import-progress", false); // Stop import progress

      if (Array.isArray(fileResults)) {
        for (var i = 0, len = fileResults.length; i < len; i++) {
          var fileResult = fileResults[i],
              tcnt = fileResult.totalCount || 0,
              cnt = fileResult.count || 0,
              scnt = fileResult.successCount || 0,
              fcnt = fileResult.failCount || 0;
          if (msg != "") msg += "<br>";

          if (fileResult.success) {
            msg += ew.language.phrase("ImportMessageSuccess").replace("%t", tcnt).replace("%c", cnt).replace("%f", fileResult.file);
          } else {
            msg += ew.language.phrase("ImportMessageError1").replace("%t", tcnt).replace("%c", cnt).replace("%f", fileResult.file).replace("%s", scnt).replace("%e", fcnt);
            if (fileResult.error) msg += ew.language.phrase("ImportMessageError2").replace("%e", fileResult.error);
            var showLog = true;

            if (fileResult.failList) {
              var ecnt = 0;

              for (var i = 1; i <= cnt; i++) {
                if (fileResult.failList["row" + i]) {
                  ecnt += 1;
                  msg += "<br>" + ew.language.phrase("ImportMessageError3").replace("%i", i).replace("%d", fileResult.failList["row" + i]);
                }

                if (ecnt >= maxErrorCount) break;
              }

              if (fcnt > maxErrorCount) msg += "<br>" + ew.language.phrase("ImportMessageMore").replace("%s", fcnt - maxErrorCount);else showLog = false;
            }

            if (fileResult.log && showLog) msg += "<br>" + ew.language.phrase("ImportMessageError4").replace("%l", fileResult.log);
            showMessage(msg, "text-danger"); // Show error message
          }
        }
      }

      if (result.success) {
        showMessage(msg, "text-success");
        $dlg.find(".modal-footer .ew-close-btn").data("imported", true);
      } else {
        if (result.error) msg = result.error;
        showMessage(msg, "text-danger"); // Show error message
      }

      hideProgress();
    }; // Import fail

    var importFail = function importFail(o) {
      $dlg.find(".modal-footer .ew-close-btn").data("import-progress", false); // Stop import progress

      showMessage(ew.language.phrase("ImportMessageServerError").replace("%s", o.status).replace("%t", o.statusText), "text-danger");
    }; // Import file

    var importFiles = function importFiles(filetoken) {
      $body.css("cursor", "wait");
      $input.data(ew.API_FILE_TOKEN_NAME, filetoken);
      $dlg.find(".modal-footer .ew-close-btn").data("import-progress", true); // Show import progress

      var data = ew.API_ACTION_NAME + "=import&" + ew.API_FILE_TOKEN_NAME + "=" + encodeURIComponent(filetoken);
      if ($data.length) data += "&" + $data.serialize();
      $.ajax(currentPage(), {
        "data": data,
        "method": "POST",
        "dataType": "json",
        "beforeSend": function beforeSend(xhr, settings) {
          timer = $.later(100, null, importProgress, null, true); // Use time to show progress periodically
        }
      }).done(importComplete).fail(importFail).always(function () {
        $body.css("cursor", "default");
        if (timer) timer.cancel(); // Clear timer
      });
    };

    var formData = {
      session: ew.SESSION_ID
    };
    formData[ew.TOKEN_NAME_KEY] = ew.TOKEN_NAME; // Add token name for $.ajax() sent by jQuery File Upload (not by ajaxSend) // PHP

    formData[ew.ANTIFORGERY_TOKEN_KEY] = ew.ANTIFORGERY_TOKEN; // Add antiforgery token for $.ajax() sent by jQuery File Upload (not by ajaxSend) // PHP

    var options = ew.importUploadOptions;
    if (!options.acceptFileTypes) options.acceptFileTypes = new RegExp('\\.(' + ew.IMPORT_FILE_ALLOWED_EXT.replace(/,/g, '|') + ')$', 'i');

    if (!$input.data("blueimpFileupload")) {
      $input.fileupload(Object.assign({
        url: getApiUrl(ew.API_UPLOAD_ACTION),
        dataType: "json",
        autoUpload: true,
        formData: formData,
        singleFileUploads: false,
        messages: {
          acceptFileTypes: ew.language.phrase("UploadErrMsgAcceptFileTypes"),
          maxFileSize: ew.language.phrase("UploadErrMsgMaxFileSize"),
          maxNumberOfFiles: ew.language.phrase("UploadErrMsgMaxNumberOfFiles"),
          minFileSize: ew.language.phrase("UploadErrMsgMinFileSize")
        },
        done: function done(e, data) {
          if (data.result && data.result.files && Array.isArray(data.result.files.importfiles)) {
            var ok = true;
            data.result.files.importfiles.forEach(function (file, index) {
              if (file.error) {
                showMessage(ew.language.phrase("ImportMessageUploadError").replace("%f", file.name).replace("%s", file.error), "text-danger");
                ok = false;
              }
            }); // Show upload errors for each file

            if (ok) importFiles(data.result[ew.API_FILE_TOKEN_NAME]); // Import uploaded files
          }
        },
        change: function change(e, data) {
          hideMessage();
        },
        processfail: function processfail(e, data) {
          data.files.forEach(function (file, index) {
            if (file.error) showMessage(ew.language.phrase("ImportMessageUploadError").replace("%f", file.name).replace("%s", file.error), "text-danger");
          }); // Show process errors for each file
        },
        fail: function fail(e, data) {
          showMessage(ew.language.phrase("ImportMessageServerError").replace("%s", data.textStatus).replace("%t", data.errorThrown), "text-danger");
        },
        progressall: function progressall(e, data) {
          uploadProgress(data);
        }
      }, options));
    }

    $dlg.modal("hide").find(".modal-title").html(args.hdr);
    $dlg.find(".modal-footer .ew-close-btn").off("click.ew").on("click.ew", function () {
      var $this = $(this);

      if ($this.data("imported")) {
        $this.data("imported", false);
        window.location.reload(true);
      }
    });
    hideMessage();
    ew.importDialog = $dlg.modal("show");
    return false;
  } // Auto-fill

  function autoFill(el) {
    var f = forms.get(el).$element[0];
    if (!f) return;
    var ar = getOptionValues(el),
        id = getId(el),
        m = id.match(/^([xy])(\d*)_/),
        rowindex = m ? m[2] : "",
        list = forms.get(el).getList(id),
        dest_array = list.autoFillTargetFields;

    var success = function success(data) {
      var results = data && data.records || "";
      var result = results ? results[0] : [];

      for (var j = 0; j < dest_array.length; j++) {
        var destEl = getElements(dest_array[j].replace(/^x_/, "x" + rowindex + "_"), f);

        if (destEl) {
          var val = $.isValue(result["af" + j]) ? result["af" + j] : "";
          var args = {
            results: results,
            result: result,
            data: val,
            form: f,
            name: id,
            target: dest_array[j],
            cancel: false,
            trigger: true
          };
          $(el).trigger("autofill", [args]); // Fire event

          if (args.cancel) continue;
          val = args.data; // Process the value

          if (destEl.options) {
            // Selection list
            selectOption(destEl, val.split(","));

            if (isAutoSuggest(destEl)) {
              // Auto-Suggest
              destEl.input.value = val;
              updateOptions.call(forms.get(f.id), destEl);
            } else if (isModalLookup(destEl)) {
              // Modal-Lookup
              //$(destEl).parent().find(".ew-lookup-text").html(val);
              updateOptions.call(forms.get(f.id), destEl);
            }
          } else if (isHiddenTextArea(destEl)) {
            // HTML editor
            destEl.value = val;
            $(destEl).data("editor").set();
          } else {
            destEl.value = val;
          }

          if (args.trigger) $(destEl).change();
        }
      }

      return result;
    };

    if (ar.length > 0 && ar[0] != "") {
      var data = Object.assign({
        page: list.page,
        field: list.field,
        ajax: "autofill",
        v0: ar[0],
        language: ew.LANGUAGE_ID
      }, getUserParams('#p_' + id, f)); // Add parent field values

      var parentId = list.parentFields.slice(); // Clone

      if (rowindex != "") {
        for (var i = 0, len = parentId.length; i < len; i++) {
          var ar = parentId[i].split(" ");
          if (ar.length == 1) // Parent field in the same table, add row index
            parentId[i] = parentId[i].replace(/^x_/, "x" + rowindex + "_");
        }
      }

      var arp = parentId.map(function (pid) {
        return getOptionValues(pid, f);
      });

      for (var i = 0, cnt = arp.length; i < cnt; i++) {
        // Filter by parent fields
        data["v" + (i + 1)] = arp[i].join(ew.MULTIPLE_OPTION_SEPARATOR);
      }

      return $.post(getApiUrl(ew.API_LOOKUP_ACTION), data, success, "json");
    }

    return success();
  } // Setup tooltip links

  function tooltip(i, el) {
    var $this = $(el),
        $tt = $("#" + $this.data("tooltip-id")),
        trig = $this.data("trigger") || "hover",
        dir = $this.data("placement") || (ew.CSS_FLIP ? "left" : "right"); // dir = "left|right"

    if (!$tt[0] || $tt.text().trim() == "" && !$tt.find("img[src!='']")[0]) return;

    if (!$this.data("bs.popover")) {
      $this.popover({
        html: true,
        placement: dir,
        trigger: trig,
        delay: 100,
        container: $("#ew-tooltip")[0],
        content: $tt.html(),
        sanitizeFn: ew.sanitizeFn
      }).on("show.bs.popover", function (e) {
        var wd,
            $tip = $($this.data("bs.popover").getTipElement()).css("z-index", 9999); // Make z-index higher than modal dialog

        if (wd = $this.data("tooltip-width")) // Set width before show
          $tip.css("max-width", parseInt(wd, 10) + "px");
      });
    }
  }
  /**
   * Show dialog for email sending
   *
   * @param {Object} args - Arguments
   * @param {string} args.lnk - Email link ID
   * @param {string} args.hdr - Dialog header
   * @param {string} args.url - URL of the email content
   * @param {HTMLElement} args.f - Form
   * @param {Object} args.key - Key as object
   * @param {boolean} args.sel - Exported selected
   * @returns false
   */

  function emailDialogShow(args) {
    var $dlg = ew.emailDialog || $("#ew-email-dialog");

    if (!$dlg[0]) {
      _alert("DIV #ew-email-dialog not found.");

      return false;
    }

    if (args.sel && !keySelected(args.f)) {
      _alert(ew.language.phrase("NoRecordSelected"));

      return false;
    }

    var $f = $dlg.find(".modal-body form"),
        frm = $f.data("form");

    if (!frm) {
      frm = new Form($f.attr("id"));
      frm.addFields([["sender", [ew.Validators.required(ew.language.phrase("Sender")), ew.Validators.email]], ["recipient", [ew.Validators.required(ew.language.phrase("Recipient")), ew.Validators.emails(ew.MAX_EMAIL_RECIPIENT, ew.language.phrase("EnterProperRecipientEmail"))]], ["cc", ew.Validators.emails(ew.MAX_EMAIL_RECIPIENT, ew.language.phrase("EnterProperCcEmail"))], ["bcc", ew.Validators.emails(ew.MAX_EMAIL_RECIPIENT, ew.language.phrase("EnterProperBccEmail"))], ["subject", ew.Validators.required(ew.language.phrase("Subject"))]]);

      frm.validate = function () {
        return this.validateFields();
      };

      frm.submit = function () {
        if (!this.validate()) return false;
        var qs = $f.serialize(),
            data = "";
        if (args.f && args.sel) // Export selected
          data = $(args.f).find("input[type=checkbox][name='key_m[]']:checked").serialize();
        if (args.key) qs += "&" + $.param(args.key);
        var fobj = this.getForm();

        if (args.url) {
          // Custom Template
          $dlg.modal("hide");
          if (args.exportid) ew.exportWithCharts(args.el, args.url, args.exportid, fobj);else _export$1(args.f, args.url, "email", true, args.sel, fobj);
        } else {
          $.post($(args.f).attr("action"), qs + "&" + data, function (result) {
            showMessage(result);
          });
        }

        return true;
      };

      $f.data("form", frm);
    }

    $dlg.modal("hide").find(".modal-title").html(args.hdr);
    $dlg.find(".modal-footer .btn-primary").off().click(function (e) {
      e.preventDefault();
      if (frm.submit()) $dlg.modal("hide");
    });
    ew.emailDialog = $dlg.modal("show");
    return false;
  } // Show drill down

  function showDrillDown(e, obj, url, id, hdr) {
    if (e && e.ctrlKey) {
      var arUrl = url.split("?"),
          params = new URLSearchParams(arUrl[1]);
      params.set("d", "2"); // Change d parameter to 2

      redirect(arUrl[0] + "?" + params.toString());
      return false;
    }

    var $obj = $.isString(obj) ? $("#" + obj) : $(obj);
    var pos = $obj.data("drilldown-placement") || ($obj.hasClass("ew-chart-canvas") ? ew.CSS_FLIP ? "left" : "right" : "bottom");
    $obj.tooltip("hide");
    var args = {
      "obj": $obj[0],
      "id": id,
      "url": url,
      "hdr": hdr,
      "placement": pos
    };
    $document.trigger("drilldown", [args]);
    var ar = args.url.split("?");
    args.file = ar[0] || "";
    args.data = ar[1] || "";

    if (!$obj.data("bs.popover")) {
      $obj.popover({
        html: true,
        placement: args.placement,
        trigger: "manual",
        template: '<div class="popover"><h3 class="popover-header d-none" style="cursor: move;"></h3><div class="popover-body"></div></div>',
        content: '<div class="' + ew.spinnerClass + ' m-3 ew-loading" role="status"><span class="sr-only">' + ew.language.phrase("Loading") + '</span></div>',
        container: $("#ew-drilldown-panel"),
        sanitizeFn: ew.sanitizeFn,
        boundary: "viewport"
      }).on("show.bs.popover", function (e) {
        $obj.attr("data-original-title", "");
      }).on("shown.bs.popover", function (e) {
        if (!$obj.data("args")) return;
        var data = $obj.data("args").data;
        data += (data ? "&" : "") + ew.TOKEN_NAME_KEY + "=" + ew.TOKEN_NAME; // Add token name // PHP

        data += (data ? "&" : "") + ew.ANTIFORGERY_TOKEN_KEY + "=" + ew.ANTIFORGERY_TOKEN; // Add antiforgery token // PHP

        $.ajax({
          cache: false,
          dataType: "html",
          type: "POST",
          data: data,
          url: $obj.data("args").file,
          success: function success(data) {
            var $tip = $($obj.data("bs.popover").getTipElement()).on("mousedown", function (e) {
              var $this = $(this).addClass("drag"),
                  height = $this.outerHeight(),
                  width = $this.outerWidth(),
                  ypos = $this.offset().top + height - e.pageY,
                  xpos = $this.offset().left + width - e.pageX;
              $body.on("mousemove", function (e) {
                var top = e.pageY + ypos - height,
                    left = e.pageX + xpos - width;
                if ($this.hasClass("drag")) $this.offset({
                  top: top,
                  left: left
                });
              }).on("mouseup", function (e) {
                $this.removeClass("drag");
              });
            });
            if (args.hdr) $tip.find(".popover-header").empty().removeClass("d-none").append('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + args.hdr).find(".close").click(function () {
              $obj.popover("hide");
            });
            var m = data.match(/<body[^>]*>([\s\S]*?)<\/body\s*>/i); // Use HTML in document body only

            data = m ? m[0] : data;
            var html = ew.stripScript(data);
            $tip.find(".popover-body").html($("<div></div>").html(html).find("#ew-report")) // Insert the container table only
            .find(".ew-table").each(ew.setupTable);
            ew.executeScript(data, id);
            $obj.popover("update");
          },
          error: function error(o) {
            if (o.responseText) {
              var $tip = $($el.data("bs.popover").getTipElement());
              $tip.find(".popover-body").empty().append('<p class="text-danger">' + o.responseText + '</p>');
            }
          }
        });
      }).on("hidden.bs.popover", function (e) {
        $.each(ew.drillDownCharts, function (key, cht) {
          // Dispose charts
          cht.dispose();
        });
        ew.drillDownCharts = {};
        ew.removeScript(id);
      });
    }

    $obj.data("args", args).popover("show");
  }
  /**
   * Ajax query
   * @param {Object} data - object to passed to API
   * @param {callback} callback - Callback function for async request (see http://api.jquery.com/jQuery.post/), empty for sync request
   * @returns {string|string[]}
   */

  function ajax(data, callback) {
    if (!$.isObject(data)) return undefined;
    var action = data.action;
    if (!action) return undefined;
    delete data.action;
    var obj = Object.assign({}, data);

    var _convert = function _convert(response) {
      if ($.isObject(response) && response.result == "OK") {
        var results = response.records;

        if (Array.isArray(results) && results.length == 1) {
          // Single row
          results = results[0];
          if (Array.isArray(results) && results.length == 1) // Single column
            return results[0]; // Return a value
          else return results; // Return a row
        }

        return results;
      }

      return response;
    };

    var url = getApiUrl(action),
        // URL
    type = obj.type || "POST";
    delete obj.type;
    obj.dataType = "json";

    if ($.isFunction(callback)) {
      // Async
      $.ajax({
        url: url,
        type: type,
        data: obj,
        success: function success(response) {
          callback(_convert(response));
        }
      });
    } else {
      // Sync
      var response = $.ajax({
        url: url,
        async: false,
        type: type,
        data: obj
      });
      return _convert(response.responseJSON);
    }
  } // Get URL of current page

  function currentPage() {
    return location.href.split("#")[0].split("?")[0];
  } // Toggle search operator

  function toggleSearchOperator(id, value) {
    var el = this.form.elements[id];
    if (!el) return;
    el.value = el.value != value ? value : "=";
  } // Validators
  // Check US Date format (mm/dd/yyyy)

  function checkUSDate(object_value) {
    return checkDateEx(object_value, "us", ew.DATE_SEPARATOR);
  } // Check US Date format (mm/dd/yy)

  function checkShortUSDate(object_value) {
    return checkDateEx(object_value, "usshort", ew.DATE_SEPARATOR);
  } // Check Date format (yyyy/mm/dd)

  function checkDate(object_value) {
    return checkDateEx(object_value, "std", ew.DATE_SEPARATOR);
  } // Check Date format (yy/mm/dd)

  function checkShortDate(object_value) {
    return checkDateEx(object_value, "stdshort", ew.DATE_SEPARATOR);
  } // Check Euro Date format (dd/mm/yyyy)

  function checkEuroDate(object_value) {
    return checkDateEx(object_value, "euro", ew.DATE_SEPARATOR);
  } // Check Euro Date format (dd/mm/yy)

  function checkShortEuroDate(object_value) {
    return checkDateEx(object_value, "euroshort", ew.DATE_SEPARATOR);
  } // Check default date format

  function checkDateDef(object_value) {
    if (ew.DATE_FORMAT.match(/^yyyy/)) return checkDate(object_value);else if (ew.DATE_FORMAT.match(/^yy/)) return checkShortDate(object_value);else if (ew.DATE_FORMAT.match(/^m/) && ew.DATE_FORMAT.match(/yyyy$/)) return checkUSDate(object_value);else if (ew.DATE_FORMAT.match(/^m/) && ew.DATE_FORMAT.match(/yy$/)) return checkShortUSDate(object_value);else if (ew.DATE_FORMAT.match(/^d/) && ew.DATE_FORMAT.match(/yyyy$/)) return checkEuroDate(object_value);else if (ew.DATE_FORMAT.match(/^d/) && ew.DATE_FORMAT.match(/yy$/)) return checkShortEuroDate(object_value);
    return false;
  } // Check date format
  // format: std/stdshort/us/usshort/euro/euroshort

  function checkDateEx(value, format, sep) {
    if (!value || value.length == "") return true;
    value = value.replace(/ +/g, " ").trim();
    var arDT = value.split(" ");

    if (arDT.length > 0) {
      var re, ar, sYear, sMonth, sDay;
      re = /^(\d{4})-([0][1-9]|[1][0-2])-([0][1-9]|[1|2]\d|[3][0|1])$/;

      if (ar = re.exec(arDT[0])) {
        sYear = ar[1];
        sMonth = ar[2];
        sDay = ar[3];
      } else {
        var wrksep = escapeRegExChars(sep);

        switch (format) {
          case "std":
            re = new RegExp("^(\\d{4})" + wrksep + "([0]?[1-9]|[1][0-2])" + wrksep + "([0]?[1-9]|[1|2]\\d|[3][0|1])$");
            break;

          case "stdshort":
            re = new RegExp("^(\\d{2})" + wrksep + "([0]?[1-9]|[1][0-2])" + wrksep + "([0]?[1-9]|[1|2]\\d|[3][0|1])$");
            break;

          case "us":
            re = new RegExp("^([0]?[1-9]|[1][0-2])" + wrksep + "([0]?[1-9]|[1|2]\\d|[3][0|1])" + wrksep + "(\\d{4})$");
            break;

          case "usshort":
            re = new RegExp("^([0]?[1-9]|[1][0-2])" + wrksep + "([0]?[1-9]|[1|2]\\d|[3][0|1])" + wrksep + "(\\d{2})$");
            break;

          case "euro":
            re = new RegExp("^([0]?[1-9]|[1|2]\\d|[3][0|1])" + wrksep + "([0]?[1-9]|[1][0-2])" + wrksep + "(\\d{4})$");
            break;

          case "euroshort":
            re = new RegExp("^([0]?[1-9]|[1|2]\\d|[3][0|1])" + wrksep + "([0]?[1-9]|[1][0-2])" + wrksep + "(\\d{2})$");
            break;
        }

        if (!re.test(arDT[0])) return false;
        var arD = arDT[0].split(sep);

        switch (format) {
          case "std":
          case "stdshort":
            sYear = unformatYear(arD[0]);
            sMonth = arD[1];
            sDay = arD[2];
            break;

          case "us":
          case "usshort":
            sYear = unformatYear(arD[2]);
            sMonth = arD[0];
            sDay = arD[1];
            break;

          case "euro":
          case "euroshort":
            sYear = unformatYear(arD[2]);
            sMonth = arD[1];
            sDay = arD[0];
            break;
        }
      }

      if (!checkDay(sYear, sMonth, sDay)) return false;
    }

    if (arDT.length > 1 && !checkTime(arDT[1])) return false;
    return true;
  } // Unformat 2 digit year to 4 digit year

  function unformatYear(yr) {
    if (yr.length == 2) return yr > ew.UNFORMAT_YEAR ? "19" + yr : "20" + yr;
    return yr;
  } // Check day

  function checkDay(checkYear, checkMonth, checkDay) {
    checkYear = parseInt(checkYear, 10);
    checkMonth = parseInt(checkMonth, 10);
    checkDay = parseInt(checkDay, 10);
    var maxDay = [4, 6, 9, 11].includes(checkMonth) ? 30 : 31;
    if (checkMonth == 2) maxDay = checkYear % 4 > 0 || checkYear % 100 == 0 && checkYear % 400 > 0 ? 28 : 29;
    return checkRange(checkDay, 1, maxDay);
  } // Check integer

  function checkInteger(object_value) {
    if (!object_value || object_value.length == 0) return true;
    if (object_value.includes(ew.DECIMAL_POINT)) return false;
    return checkNumber(object_value);
  } // Check number

  function checkNumber(object_value) {
    object_value = String(object_value);
    if (!object_value || object_value.length == 0) return true;
    object_value = object_value.trim();
    var ts = escapeRegExChars(ew.THOUSANDS_SEP),
        dp = escapeRegExChars(ew.DECIMAL_POINT),
        re = new RegExp("^[+-]?(\\d{1,3}(" + (ts ? ts + "?" : "") + "\\d{3})*(" + dp + "\\d+)?|" + dp + "\\d+)$");
    return re.test(object_value);
  } // Convert to float

  function stringToFloat(object_value) {
    object_value = String(object_value);

    if (ew.THOUSANDS_SEP != "") {
      var re = new RegExp(escapeRegExChars(ew.THOUSANDS_SEP), "g");
      object_value = object_value.replace(re, "");
    }

    if (ew.DECIMAL_POINT != "") object_value = object_value.replace(ew.DECIMAL_POINT, ".");
    return parseFloat(object_value);
  } // Convert string (yyyy-mm-dd hh:mm:ss) to date object

  function stringToDate(object_value) {
    var re = /^(\d{4})-([0][1-9]|[1][0-2])-([0][1-9]|[1|2]\d|[3][0|1]) (?:(0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d))?$/;
    var ar = object_value.replace(re, "$1 $2 $3 $4 $5 $6").split(" ");
    return new Date(ar[0], ar[1] - 1, ar[2], ar[3], ar[4], ar[5]);
  } // Escape regular expression chars

  function escapeRegExChars(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  } // Check range

  function checkRange(object_value, min_value, max_value) {
    if (!object_value || object_value.length == 0) return true;

    if ($.isNumber(min_value) || $.isNumber(max_value)) {
      // Number
      if (checkNumber(object_value)) object_value = stringToFloat(object_value);
    }

    if (!$.isNull(min_value) && object_value < min_value) return false;
    if (!$.isNull(max_value) && object_value > max_value) return false;
    return true;
  } // Check time

  function checkTime(object_value) {
    if (!object_value || object_value.length == 0) return true;
    object_value = object_value.trim();
    var re = new RegExp('^(0\\d|1\\d|2[0-3])' + escapeRegExChars(ew.TIME_SEPARATOR) + '[0-5]\\d(( (' + escapeRegExChars(ew.language.phrase("AM")) + '|' + escapeRegExChars(ew.language.phrase("PM")) + '))|(' + escapeRegExChars(ew.TIME_SEPARATOR) + '[0-5]\\d(\\.\\d+|[+-][\\d:]+)?)?)$', 'i');
    return re.test(object_value);
  } // Check phone

  function checkPhone(object_value) {
    if (!object_value || object_value.length == 0) return true;
    return /^\(\d{3}\) ?\d{3}( |-)?\d{4}|^\d{3}( |-)?\d{3}( |-)?\d{4}$/.test(object_value.trim());
  } // Check zip

  function checkZip(object_value) {
    if (!object_value || object_value.length == 0) return true;
    return /^\d{5}$|^\d{5}-\d{4}$/.test(object_value.trim());
  } // Check credit card

  function checkCreditCard(object_value) {
    if (!object_value || object_value.length == 0) return true;
    var creditcard_string = object_value.replace(/\D/g, "");
    if (creditcard_string.length == 0) return false;
    var doubledigit = creditcard_string.length % 2 == 1 ? false : true;
    var tempdigit,
        checkdigit = 0;

    for (var i = 0, len = creditcard_string.length; i < len; i++) {
      tempdigit = parseInt(creditcard_string.charAt(i), 10);

      if (doubledigit) {
        tempdigit *= 2;
        checkdigit += tempdigit % 10;
        if (tempdigit / 10 >= 1.0) checkdigit++;
        doubledigit = false;
      } else {
        checkdigit += tempdigit;
        doubledigit = true;
      }
    }

    return checkdigit % 10 == 0;
  } // Check social security number

  function checkSsn(object_value) {
    if (!object_value || object_value.length == 0) return true;
    return /^(?!000)([0-6]\d{2}|7([0-6]\d|7[012]))([ -]?)(?!00)\d\d\3(?!0000)\d{4}$/.test(object_value.trim());
  } // Check emails

  function checkEmails(object_value, email_cnt) {
    if (!object_value || object_value.length == 0) return true;
    var arEmails = object_value.replace(/,/g, ";").split(";");

    for (var i = 0, len = arEmails.length; i < len; i++) {
      if (email_cnt > 0 && len > email_cnt) return false;
      if (!checkEmail(arEmails[i])) return false;
    }

    return true;
  } // Check email

  function checkEmail(object_value) {
    if (!object_value || object_value.length == 0) return true;
    return /^[\w.%+-]+@[\w.-]+\.[A-Z]{2,18}$/i.test(object_value.trim());
  } // Check GUID {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}

  function checkGuid(object_value) {
    if (!object_value || object_value.length == 0) return true;
    return /^(\{\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\}|\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/.test(object_value.trim());
  } // Check by regular expression

  function checkByRegEx(object_value, pattern) {
    if (!object_value || object_value.length == 0) return true;
    return !!object_value.match(pattern);
  }
  /**
   * Show message dialog
   *
   * @param {Event|string} arg - Event or message
   * @returns
   */

  function showMessage(arg) {
    var _arg$target;

    var win = window.parent,
        // Note: If a window does not have a parent, its parent property is a reference to itself.
    p = (_arg$target = arg === null || arg === void 0 ? void 0 : arg.target) !== null && _arg$target !== void 0 ? _arg$target : win.document,
        swal = win.Swal,
        $div = $(p).find("div.ew-message-dialog:hidden").first(),
        msg = $div.length ? $div.text() : ""; // Text only

    if ($.isString(arg)) msg = $("<div>" + arg.trim() + "</div>").text();
    if (msg.trim() == "") return;

    if ($div.length) {
      ["success", "info", "warning", "danger"].forEach(function (value, index) {
        var $alert = $div.find(".alert-" + value).toggleClass("alert-" + value),
            $heading = $alert.find(".alert-heading").detach(),
            $content = $alert.children(":not(.icon)");
        $alert.find(".icon").remove();

        if ($alert[0]) {
          var w = parseInt($content.css("width"), 10); // Width specified

          if (w > 0) $content.first().css("width", "auto");
          var $toast = toast({
            class: "ew-toast bg-" + value,
            title: $heading[0] ? $heading.html() : ew.language.phrase(value),
            body: $alert.html(),
            autohide: value == "success" ? ew.autoHideSuccessMessage : false,
            // Autohide for success message
            delay: value == "success" ? ew.autoHideSuccessMessageDelay : 500
          });
          if (w > 0) $toast.css("max-width", w); // Override bootstrap .toast max-width

          return;
        }
      });
    }

    if ($.isString(arg)) {
      return swal.fire(_objectSpread2(_objectSpread2({}, ew.sweetAlertSettings), {}, {
        html: arg
      }));
    }
  } // Random number

  function random() {
    return Math.floor(Math.random() * 100001) + 100000;
  } // File upload

  function upload(input) {
    var $input = $(input);
    if ($input.data("blueimpFileupload")) return;
    var id = $input.attr("name"),
        nid = id.replace(/\$/g, "\\$"),
        tbl = $input.data("table"),
        multiple = $input.is("[multiple]"),
        $p = $input.closest(".form-group, [id^='el']"),
        readonly = $input.prop("disabled") || $input.closest("form").find("#confirm").val() == "confirm",
        $ft = $p.find("#ft_" + nid),
        $fn = $p.find("#fn_" + nid),
        $fa = $p.find("#fa_" + nid),
        $fs = $p.find("#fs_" + nid),
        $exts = $p.find("#fx_" + nid),
        $maxsize = $p.find("#fm_" + nid),
        $maxfilecount = $p.find("#fc_" + nid),
        $label = $p.find(".custom-file-label"),
        label = $label.html();

    var _done = function _done(e, data) {
      if (data.result.files[0].error) return;
      var name = data.result.files[0].name;
      var ar = multiple ? $fn.val() ? $fn.val().split(ew.MULTIPLE_UPLOAD_SEPARATOR) : [] : [];
      ar.push(name);
      $fn.val(ar.join(ew.MULTIPLE_UPLOAD_SEPARATOR));
      $fa.val("0");
      if (!multiple) // Remove other entries if not multiple upload
        $ft.children("tr:not(:last-child)").remove();
    };

    var _deleted = function _deleted(e, data) {
      var url = $(e.originalEvent.target).data("url"),
          param = new URLSearchParams(url.split("?")[1]),
          fid = param.get("id"),
          name = param.get(fid);

      if (name) {
        var ar = $fn.val() ? $fn.val().split(ew.MULTIPLE_UPLOAD_SEPARATOR) : [];
        var index = ar.indexOf(name);
        if (index > -1) ar.splice(index, 1);
        $fn.val(ar.join(ew.MULTIPLE_UPLOAD_SEPARATOR));
        $fa.val("0");
      }
    };

    var _change = function _change(e, data) {
      var _data$files;

      $ft.toggleClass("ew-has-rows", ((_data$files = data.files) === null || _data$files === void 0 ? void 0 : _data$files.length) > 0);
      var ar = $fn.val() ? $fn.val().split(ew.MULTIPLE_UPLOAD_SEPARATOR) : [];

      for (var i = 0; i < data.files.length; i++) {
        ar.push(data.files[i].name);
      }

      var cnt = parseInt($maxfilecount.val(), 10);

      if ($.isNumber(cnt) && cnt > 0 && ar.length > cnt) {
        _alert(ew.language.phrase("UploadErrMsgMaxNumberOfFiles"));

        return false;
      }

      var l = parseInt($fs.val(), 10);

      if ($.isNumber(l) && l > 0 && ar.join(ew.MULTIPLE_UPLOAD_SEPARATOR).length > l) {
        _alert(ew.language.phrase("UploadErrMsgMaxFileLength"));

        return false;
      }
    };

    var _confirmDelete = function _confirmDelete(e) {
      if (!multiple && $fn.val()) {
        if (!confirm(ew.language.phrase("UploadOverwrite"))) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    var _changed = function _changed(e, data) {
      var _data$files2, _data$result, _data$result$files;

      $ft.toggleClass("ew-has-rows", ((_data$files2 = data.files) === null || _data$files2 === void 0 ? void 0 : _data$files2.length) > 0 || ((_data$result = data.result) === null || _data$result === void 0 ? void 0 : (_data$result$files = _data$result.files) === null || _data$result$files === void 0 ? void 0 : _data$result$files.length) > 0);
      var ar = $fn.val() ? $fn.val().split(ew.MULTIPLE_UPLOAD_SEPARATOR) : [];
      $label.html(ar.join(", ") || label);
    };

    var _clicked = function _clicked() {
      $input.closest("span.fileinput-button").tooltip("hide");
    }; // var _process = function(e, data) {
    //     $ft.toggleClass("ew-has-rows", data.files?.length > 0);
    // };

    var _downloadTemplate = $.templates("#template-download");

    var _uploadTemplate = $.templates("#template-upload");

    var _completed = function _completed(e, data) {
      // After download template rendered
      var e = {
        target: data.context
      };
      initLightboxes(e);
      initPdfObjects(e);
      ew.updateDropdownPosition();
      data.context.find("img").on("load", ew.updateDropdownPosition);
    };

    var _added = function _added(e, data) {
      var _data$files3;

      // After upload template rendered
      $ft.toggleClass("ew-has-rows", ((_data$files3 = data.files) === null || _data$files3 === void 0 ? void 0 : _data$files3.length) > 0);
      data.context.find(".start").click(_confirmDelete);
    }; // Hide input button if readonly

    var form = getForm(input),
        $form = $(form);
    var readonly = $form.find("#confirm").val() == "confirm";
    if (readonly) $form.find("span.fileinput-button").hide();
    var cnt = parseInt($maxfilecount.val(), 10);
    var uploadUrl = getApiUrl(ew.API_JQUERY_UPLOAD_ACTION);
    var formData = {
      id: id,
      table: tbl,
      session: ew.SESSION_ID,
      replace: multiple ? "0" : "1",
      exts: $exts.val(),
      maxsize: $maxsize.val(),
      maxfilecount: $maxfilecount.val()
    };
    $input.fileupload({
      url: uploadUrl,
      type: "POST",
      multipart: true,
      autoUpload: true,
      // Comment out to disable auto upload
      loadImageFileTypes: /^image\/(gif|jpe?g|png)$/i,
      loadVideoFileTypes: /^video\/mp4$/i,
      loadAudioFileTypes: /^audio\/(mpeg|mp3)$/i,
      acceptFileTypes: $exts.val() ? new RegExp('\\.(' + $exts.val().replace(/,/g, '|') + ')$', 'i') : null,
      maxFileSize: parseInt($maxsize.val(), 10),
      maxNumberOfFiles: cnt > 1 ? cnt : null,
      filesContainer: $ft,
      formData: formData,
      uploadTemplateId: null,
      downloadTemplateId: null,
      uploadTemplate: _uploadTemplate.render.bind(_uploadTemplate),
      downloadTemplate: _downloadTemplate.render.bind(_downloadTemplate),
      previewMaxWidth: ew.UPLOAD_THUMBNAIL_WIDTH,
      previewMaxHeight: ew.UPLOAD_THUMBNAIL_HEIGHT,
      dropZone: $p,
      pasteZone: $p,
      messages: {
        acceptFileTypes: ew.language.phrase("UploadErrMsgAcceptFileTypes"),
        maxFileSize: ew.language.phrase("UploadErrMsgMaxFileSize"),
        maxNumberOfFiles: ew.language.phrase("UploadErrMsgMaxNumberOfFiles"),
        minFileSize: ew.language.phrase("UploadErrMsgMinFileSize")
      },
      readOnly: readonly // Custom

    }).on("fileuploaddone", _done).on("fileuploaddestroy", _deleted).on("fileuploadchange", _change).on("fileuploadadded fileuploadfinished fileuploaddestroyed", _changed) //.on("fileuploadprocess", _process)
    .on('fileuploadadded', _added).on('fileuploadcompleted', _completed).click(_clicked);

    if ($fn.val()) {
      $.ajax({
        url: uploadUrl,
        data: {
          id: id,
          table: tbl,
          session: ew.SESSION_ID
        },
        dataType: "json",
        context: this,
        success: function success(result) {
          if (result && result[id]) {
            var done = $input.fileupload("option", "done");
            if (done) done.call(input, $.Event(), {
              result: {
                files: result[id]
              }
            }); // Use "files"
          }

          if (readonly) // Hide delete button if readonly
            $ft.find("td.delete").hide();
        }
      });
    }
  }
  /**
   * Convert data to number
   *
   * @param {*} data - Data being converted
   * @param {Object} [config] - Configuration
   * @param {string} config.decimalSeparator - Decimal separator
   * @param {string} config.thousandsSeparator - Thousands separator
   * @returns {(number|null)}
   */

  function parseNumber(data, config) {
    if ($.isString(data)) {
      config = config || {
        "thousandsSeparator": ew.THOUSANDS_SEP,
        "decimalSeparator": ew.DECIMAL_POINT
      };
      var regexBits = [],
          regex,
          separator = config.thousandsSeparator,
          decimal = config.decimalSeparator;
      if (separator) regexBits.push(escapeRegExChars(separator) + "(?=\\d)");
      regex = new RegExp("(?:" + regexBits.join("|") + ")", "g");
      if (decimal === ".") decimal = null;
      data = data.replace(regex, "");
      data = decimal ? data.replace(decimal, ".") : data;
    }

    if ($.isString(data) && data.trim() !== "") data = +data;
    if (!$.isNumber || !isFinite(data)) // Catch NaN and Infinity
      data = null;
    return data;
  }
  /**
   * Format a Number to string for display
   *
   * @param {*} data - Data being converted
   * @param {Object} [config] - Configuration
   * @param {number} config.decimalPlaces - Number of decimal places to round. Must be a number 0 to 20.
   * @param {string} config.decimalSeparator - Decimal separator
   * @param {string} config.thousandsSeparator - Thousands separator
   * @returns {string} Note: null, undefined, NaN and "" returns as "".
   */

  function formatNumber(data, config) {
    if ($.isNumber(data)) {
      config = config || {
        "thousandsSeparator": ew.THOUSANDS_SEP,
        "decimalSeparator": ew.DECIMAL_POINT
      };
      var isNeg = data < 0,
          output = data + "",
          decPlaces = config.decimalPlaces,
          decSep = config.decimalSeparator || ".",
          thouSep = config.thousandsSeparator,
          decIndex,
          newOutput,
          count,
          i;
      if ($.isNumber(decPlaces) && decPlaces >= 0 && decPlaces <= 20) // Decimal precision
        output = data.toFixed(decPlaces);
      if (decSep !== ".") // Decimal separator
        output = output.replace(".", decSep);

      if (thouSep) {
        // Add the thousands separator
        decIndex = output.lastIndexOf(decSep); // Find the dot or where it would be

        decIndex = decIndex > -1 ? decIndex : output.length;
        newOutput = output.substring(decIndex); // Start with the dot and everything to the right

        for (count = 0, i = decIndex; i > 0; i--) {
          // Working left, every third time add a separator, every time add a digit
          if (count % 3 === 0 && i !== decIndex && (!isNeg || i > 1)) newOutput = thouSep + newOutput;
          newOutput = output.charAt(i - 1) + newOutput;
          count++;
        }

        output = newOutput;
      }

      return output;
    } else {
      // Not a Number, return as string
      return $.isValue(data) && data.toString ? data.toString() : "";
    }
  }
  /**
   * Convert data to Moment object (see http://momentjs.com/docs/)
   *
   * @param {*} data - Data being converted
   * @param {number} format - Date format matching server side FormatDateTime()
   * @returns {Moment}
   */

  function parseDate(data, format) {
    var args = $.makeArray(arguments);

    if ($.isNumber(format) && format >= 0 && format <= 17) {
      var f,
          def = ew.DATE_FORMAT.toUpperCase(),
          sep = ew.DATE_SEPARATOR,
          timesep = ew.TIME_SEPARATOR;

      switch (format) {
        case 0:
        case 1:
        case 2:
        case 8:
          f = def + " HH" + timesep + "mm" + timesep + "ss";
          break;
        // ew.DATE_FORMAT + " %H:%M:%S"

        case 3:
          f = "hh:mm:ss A";
          break;
        // "%I:%M:%S %p"

        case 4:
          f = "HH:mm:ss";
          break;
        // "%H:%M:%S"

        case 5:
          f = "YYYY" + sep + "MM" + sep + "DD";
          break;
        // "%Y" + sep + "%m" + sep + "%d"

        case 6:
          f = "MM" + sep + "DD" + sep + "YYYY";
          break;
        // "%m" + sep + "%d" + sep + "%Y"

        case 7:
          f = "DD" + sep + "MM" + sep + "YYYY";
          break;
        // "%d" + sep + "%m" + sep + "%Y"

        case 9:
          f = "YYYY" + sep + "MM" + sep + "DD HH" + timesep + "mm" + timesep + "ss";
          break;
        // "%Y" + sep + "%m" + sep + "%d %H:%M:%S"

        case 10:
          f = "MM" + sep + "DD" + sep + "YYYY HH" + timesep + "mm" + timesep + "ss";
          break;
        // "%m" + sep + "%d" + sep + "%Y %H:%M:%S"

        case 11:
          f = "DD" + sep + "MM" + sep + "YYYY HH" + timesep + "mm" + timesep + "ss";
          break;
        // "%d" + sep + "%m" + sep + "%Y %H:%M:%S"

        case 12:
          f = "YY" + sep + "MM" + sep + "DD";
          break;
        // "%y" + sep + "%m" + sep + "%d"

        case 13:
          f = "MM" + sep + "DD" + sep + "YY";
          break;
        // "%m" + sep + "%d" + sep + "%y"

        case 14:
          f = "DD" + sep + "MM" + sep + "YY";
          break;
        // "%d" + sep + "%m" + sep + "%y"

        case 15:
          f = "YY" + sep + "MM" + sep + "DD HH" + timesep + "mm" + timesep + "ss";
          break;
        // "%y" + sep + "%m" + sep + "%d %H:%M:%S"

        case 16:
          f = "MM" + sep + "DD" + sep + "YY HH" + timesep + "mm" + timesep + "ss";
          break;
        // "%m" + sep + "%d" + sep + "%y %H:%M:%S"

        case 17:
          f = "DD" + sep + "MM" + sep + "YY HH" + timesep + "mm" + timesep + "ss";
          break;
        // "%d" + sep + "%m" + sep + "%y %H:%M:%S"
      }

      args[1] = [f, "YYYY-MM-DD HH" + timesep + "mm" + timesep + "ss"];
    }

    return moment.apply(this, args);
  }
  /**
   * Format date time
   *
   * @param {*} data - Date being formatted
   * @param {string} format - Date format (see http://momentjs.com/docs/#/displaying/format/)
   * @returns {string}
   */

  function formatDate(data, format) {
    return moment(data).format(format || ew.DATE_FORMAT.toUpperCase());
  }
  /**
   * Init page
   *
   * @param {Event|undefined} e - Event
   */

  function initPage(e) {
    var el = e && e.target ? e.target : document,
        $el = $(el),
        $tables = $el.find("table.ew-table:not(.ew-export-table)");
    Array.prototype.forEach.call(el.querySelectorAll(".ew-grid-upper-panel, .ew-grid-lower-panel"), ew.initGridPanel); // Init grid panels

    ew.renderJsTemplates(e);
    lazyLoad(e);
    initForms(e);
    initTooltips(e);
    initPasswordOptions(e);
    initIcons(e);
    initLightboxes(e);
    initPdfObjects(e);
    $el.find("[data-widget='treeview']").each(function () {
      adminlte.Treeview._jQueryInterface.call($(this), "init");
    });
    $tables.each(setupTable); // Init tables

    $el.find(".ew-btn-dropdown").on("shown.bs.dropdown", function () {
      var $this = $(this).removeClass("dropup"),
          $window = $(window),
          $menu = $this.find("> .dropdown-menu");
      $this.toggleClass("dropup", $menu.offset().top + $menu.height() > $window.scrollTop() + $window.height());
    });
    $el.find("input[name=pageno]").keypress(function (e) {
      if (e.which == 13) {
        currentUrl.searchParams.append(this.name, parseInt(this.value));
        window.location = currentUrl.toString();
        return false;
      }
    });

    if (!ew.IS_SCREEN_SM_MIN) {
      $el.find("." + ew.RESPONSIVE_TABLE_CLASS + " [data-toggle='dropdown']").parent().on("shown.bs.dropdown", function () {
        var $this = $(this),
            $menu = $this.find(".dropdown-menu"),
            div = $this.closest("." + ew.RESPONSIVE_TABLE_CLASS)[0];

        if (div.scrollHeight - div.clientHeight) {
          var d = $menu.offset().top + $menu.outerHeight() - $(div).offset().top - div.clientHeight;
          if (d > 0) $menu.css(ew.CSS_FLIP ? "right" : "left", "100%").css("top", parseFloat($menu.css("top")) - d);
        }
      });
    }

    initExportLinks(e);
    initMultiSelectCheckboxes(e); // Report

    var $rpt = $el.find(".ew-report");

    if ($rpt[0]) {
      $rpt.find(".card").on("collapsed.lte.widget", function () {
        // Fix min-height when .lte.widget is collapsed
        var $card = $(this),
            $div = $card.closest("[class^='col-']"),
            mh = $div.css("min-height");
        if (mh) $div.data("min-height", mh);
        $div.css("min-height", 0);
      }).on("expanded.lte.widget", function () {
        // Fix min-height when .lte.widget is expanded
        var $card = $(this),
            $div = $card.closest("[class^='col-']"),
            mh = $div.css("min-height");
        if (mh) $div.css("min-height", mh); // Restore min-height
      }); // Group expand/collapse button

      $rpt.find("span.ew-group-toggle").on("click", function () {
        ew.toggleGroup(this);
      });
    } // Show message

    if (typeof ew.USE_JAVASCRIPT_MESSAGE != "undefined" && ew.USE_JAVASCRIPT_MESSAGE) showMessage(e);
  } // Redirect by HTTP GET or POST

  function redirect(url, f, method) {
    var ar = url.split("?"),
        params = new URLSearchParams(ar[1]);
    params.set(ew.TOKEN_NAME_KEY, ew.TOKEN_NAME); // PHP

    params.set(ew.ANTIFORGERY_TOKEN_KEY, ew.ANTIFORGERY_TOKEN); // PHP

    if (sameText(method, "post")) {
      // POST
      var $form = f ? $(f) : $("<form></form>").appendTo("body");
      $form.attr({
        action: ar[0],
        method: "post"
      });
      params.forEach(function (value, key) {
        $('<input type="hidden">').attr({
          name: key,
          value: sanitize(value)
        }).appendTo($form);
      });
      $form.submit();
    } else {
      // GET
      var search = params.toString();
      window.location = ar[0] + (search ? "?" + search : "");
    }
  } // Show/Hide password

  function togglePassword(e) {
    var $btn = $(e.currentTarget),
        $input = $btn.closest(".input-group").find("input"),
        $i = $btn.find("i");

    if ($input.attr("type") == "text") {
      $input.attr("type", "password");
      $i.toggleClass("fa-eye-slash fa-eye");
    } else if ($input.attr("type") == "password") {
      $input.attr("type", "text");
      $i.toggleClass("fa-eye-slash fa-eye");
    }
  } // Export with charts

  function exportWithCharts(e, url, exportId, f) {
    var el = e.target,
        exportUrl = new URL(window.location.href),
        ar = url.split("?"),
        $el = $(el),
        method = f ? "post" : "get";
    exportId += "_" + Date.now();
    exportUrl.pathname = ar[0];
    exportUrl.search = ar[1];
    exportUrl.searchParams.set("exportid", exportId);
    if ($el.is(".dropdown-menu a")) $el = $el.closest(".btn-group");

    var _export = function _export() {
      var params = exportUrl.searchParams,
          custom = params.get("custom") == "1";

      if (f && !custom) {
        // Not custom
        var data = $(f).serialize(); // Add token

        $.post(exportUrl, data, function (result) {
          showMessage(result);
        });
      } else {
        // Custom
        var exp = params.get("export");

        if (custom && ["word", "excel", "pdf", "email"].includes(exp)) {
          if (exp == "email") {
            params.delete("export"); // Remove duplicate export=email (exists in form)

            exportUrl.search = params.toString() + "&" + $(f).serialize();
          }

          $("iframe.ew-export").remove();
          $("<iframe></iframe>").addClass("ew-export d-none").attr("src", exportUrl.toString()).appendTo($body.css("cursor", "wait"));
          setTimeout(function () {
            $body.css("cursor", "default");
          }, 5000);
        } else if (exp == "print") {
          redirect(exportUrl.toString(), f, method);
        } else {
          fileDownload(exportUrl.toString(), null);
        }
      }

      return false;
    };

    var keys = Object.keys(window.exportCharts);
    if (keys.length == 0) // No charts, just submit the form
      return _export(); // Success callback

    var success = function success(result) {
      if ($.isString(result)) result = parseJson(result);

      if (result.success) {
        _export();
      } else {
        ew.alert(result.error);
      }
    }; // Failure callback

    var fail = function fail(xhr, status, error) {
      ew.alert(error + ": " + xhr.responseText); // Show detailed export error message
    }; // Export charts

    $body.css("cursor", "wait");
    var charts = [];

    for (var i = 0; i < keys.length; i++) {
      var id = keys[i],
          o = window.exportCharts[id],
          params = "exportfilename=" + exportId + "_" + id + ".png|exportformat=png|exportaction=download|exportparameters=undefined";
      if (o && o.toBase64Image) // Chart.js chart
        charts.push({
          "chart_engine": "Chart.js",
          "stream_type": "base64",
          "stream": o.toBase64Image(),
          "parameters": params
        });
    }

    $.ajax({
      "url": getApiUrl(ew.API_EXPORT_CHART_ACTION),
      "data": {
        "charts": JSON.stringify(charts)
      },
      "cache": false,
      "type": "POST"
    }).done(success).fail(fail).always(function () {
      $body.css("cursor", "default");
    });
    return false;
  } // Layout

  var _fixLayoutHeightTimer; // Fix layout height

  function fixLayoutHeight() {
    if (_fixLayoutHeightTimer) _fixLayoutHeightTimer.cancel(); // Clear timer

    _fixLayoutHeightTimer = $.later(50, null, function () {
      var layout = $body.data("lte.layout");
      if (layout) layout.fixLayoutHeight();
    });
  } // Add user event handlers

  function addEventHandlers(tblVar) {
    var fields = ew.events[tblVar];

    if (fields) {
      for (var _i = 0, _Object$entries = Object.entries(fields); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _Object$entries[_i],
            fldVar = _Object$entries$_i[0],
            events = _Object$entries$_i[1];
        $('[data-table=' + tblVar + '][data-field=' + fldVar + ']').on(events);
      }
    }
  }

  var functions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    currentUrl: currentUrl,
    forms: forms,
    AjaxLookup: AjaxLookup,
    AutoSuggest: AutoSuggest,
    Form: Form,
    SelectionListOption: SelectionListOption,
    removeSpinner: removeSpinner,
    createSelect: createSelect,
    initIcons: initIcons,
    initPasswordOptions: initPasswordOptions,
    getApiUrl: getApiUrl,
    setSessionTimer: setSessionTimer,
    initExportLinks: initExportLinks,
    initMultiSelectCheckboxes: initMultiSelectCheckboxes,
    fileDownload: fileDownload,
    lazyLoad: lazyLoad,
    updateDropdownPosition: updateDropdownPosition,
    initLightboxes: initLightboxes,
    initPdfObjects: initPdfObjects,
    initTooltips: initTooltips,
    parseJson: parseJson,
    searchOperatorChanged: searchOperatorChanged,
    prompt: _prompt,
    toast: toast,
    showToast: showToast,
    getForm: getForm,
    hasFormData: hasFormData,
    setSearchType: setSearchType,
    updateOptions: updateOptions,
    getUserParams: getUserParams,
    applyTemplate: applyTemplate,
    toggleGroup: toggleGroup,
    convertToBool: convertToBool,
    valueChanged: valueChanged,
    setLanguage: setLanguage,
    submitAction: submitAction,
    'export': _export$1,
    removeSpaces: removeSpaces,
    isHiddenTextArea: isHiddenTextArea,
    isModalLookup: isModalLookup,
    isAutoSuggest: isAutoSuggest,
    alert: _alert,
    clearError: clearError,
    onError: onError,
    setFocus: setFocus,
    setInvalid: setInvalid,
    hasValue: hasValue,
    sort: sort,
    confirmDelete: confirmDelete,
    keySelected: keySelected,
    selectAllKey: selectAllKey,
    selectAll: selectAll,
    updateSelected: updateSelected,
    setColor: setColor,
    clearSelected: clearSelected,
    clearDelete: clearDelete,
    clickDelete: clickDelete,
    clickMultiCheckbox: clickMultiCheckbox,
    setupTable: setupTable,
    setupGrid: setupGrid,
    addGridRow: addGridRow,
    deleteGridRow: deleteGridRow,
    htmlEncode: htmlEncode,
    getElements: getElements,
    getElement: getElement,
    getAncestorBy: getAncestorBy,
    isHidden: isHidden,
    sameText: sameText,
    sameString: sameString,
    getValue: getValue,
    getOptionValues: getOptionValues,
    getOptionTexts: getOptionTexts,
    clearOptions: clearOptions,
    getId: getId,
    valueSeparator: valueSeparator,
    displayValue: displayValue,
    optionHtml: optionHtml,
    optionsHtml: optionsHtml,
    newOption: newOption,
    selectOption: selectOption,
    executeScript: executeScript,
    stripScript: stripScript,
    addScript: addScript,
    removeScript: removeScript,
    getContent: getContent,
    getOptions: getOptions,
    addOptionDialogShow: addOptionDialogShow,
    modalDialogHide: modalDialogHide,
    modalDialogShow: modalDialogShow,
    modalLookupShow: modalLookupShow,
    importDialogShow: importDialogShow,
    autoFill: autoFill,
    tooltip: tooltip,
    emailDialogShow: emailDialogShow,
    showDrillDown: showDrillDown,
    ajax: ajax,
    currentPage: currentPage,
    toggleSearchOperator: toggleSearchOperator,
    checkUSDate: checkUSDate,
    checkShortUSDate: checkShortUSDate,
    checkDate: checkDate,
    checkShortDate: checkShortDate,
    checkEuroDate: checkEuroDate,
    checkShortEuroDate: checkShortEuroDate,
    checkDateDef: checkDateDef,
    checkDateEx: checkDateEx,
    unformatYear: unformatYear,
    checkDay: checkDay,
    checkInteger: checkInteger,
    checkNumber: checkNumber,
    stringToFloat: stringToFloat,
    stringToDate: stringToDate,
    escapeRegExChars: escapeRegExChars,
    checkRange: checkRange,
    checkTime: checkTime,
    checkPhone: checkPhone,
    checkZip: checkZip,
    checkCreditCard: checkCreditCard,
    checkSsn: checkSsn,
    checkEmails: checkEmails,
    checkEmail: checkEmail,
    checkGuid: checkGuid,
    checkByRegEx: checkByRegEx,
    showMessage: showMessage,
    random: random,
    upload: upload,
    parseNumber: parseNumber,
    formatNumber: formatNumber,
    parseDate: parseDate,
    formatDate: formatDate,
    initPage: initPage,
    redirect: redirect,
    togglePassword: togglePassword,
    exportWithCharts: exportWithCharts,
    fixLayoutHeight: fixLayoutHeight,
    addEventHandlers: addEventHandlers
  });

  ew.IS_SCREEN_SM_MIN = window.matchMedia("(min-width: 768px)").matches; // Should matches $screen-sm-min

  ew.MOBILE_DETECT = new MobileDetect(window.navigator.userAgent);
  ew.IS_MOBILE = !!ew.MOBILE_DETECT.mobile();
  ew.IS_IE = ew.MOBILE_DETECT.version("MSIE") > 0; // Charts

  window.exportCharts = {}; // Per window

  window.drillDownCharts = {}; // Per window
  // Init spinner

  ew.addSpinner(); // Extend

  Object.assign(ew, {
    MultiPage: MultiPage,
    Form: Form,
    Validators: Validators
  }, functions);
  var $document$1 = $(document); // Init document

  loadjs.ready("load", function () {
    $.views.settings.debugMode(ew.DEBUG);
    ew.setSessionTimer();
    ew.initPage();
    $("#ew-modal-dialog").on("load.ew", ew.initPage);
    $("#ew-add-opt-dialog").on("load.ew", ew.initPage);
    var hash = ew.currentUrl.searchParams.get("hash");
    if (hash) $("html, body").animate({
      scrollTop: $("#" + hash).offset().top
    }, 800);
    ew.removeSpinner();
    $document$1.trigger("load");
  }); // Default "addoption" event (fired before adding new option to selection list)

  $document$1.on("addoption", function (e, args) {
    var row = args.data; // New row to be validated

    var arp = args.parents; // Parent field values

    for (var i = 0, cnt = arp.length; i < cnt; i++) {
      // Iterate parent values
      var p = arp[i];
      if (!p.length) // Empty parent
        //continue; // Allow
        return args.valid = false; // Disallow

      var val = row["ff" + (i > 0 ? i + 1 : "")]; // Filter fields start from the 6th field

      if (!$.isUndefined(val) && !p.includes(String(val))) // Filter field value not in parent field values
        return args.valid = false; // Returns false if invalid
    }
  }); // Fix z-index of multiple modals

  $document$1.on("show.bs.modal", ".modal", function () {
    var zIndex = 1050 + $(".modal:visible").length;
    $(this).css("z-index", zIndex);
    setTimeout(function () {
      $(".modal-backdrop").not(".modal-stack").css("z-index", zIndex - 1).addClass("modal-stack");
    }, 0);
  }); // Fix scrolling of multiple modals

  $document$1.on("hidden.bs.modal", ".modal", function () {
    $(".modal:visible").length && $("body").addClass("modal-open");
  });

  $.extend({
    isBoolean: function isBoolean(o) {
      return typeof o === 'boolean';
    },
    isNull: function isNull(o) {
      return o === null;
    },
    isNumber: function isNumber(o) {
      return typeof o === 'number' && isFinite(o);
    },
    isObject: function isObject(o) {
      return o && (typeof o === 'object' || this.isFunction(o)) || false;
    },
    isString: function isString(o) {
      return typeof o === 'string';
    },
    isUndefined: function isUndefined(o) {
      return typeof o === 'undefined';
    },
    isValue: function isValue(o) {
      return this.isObject(o) || this.isString(o) || this.isNumber(o) || this.isBoolean(o);
    },
    isDate: function isDate(o) {
      return this.type(o) === 'date' && o.toString() !== 'Invalid Date' && !isNaN(o);
    },
    later: function later(when, o, fn, data, periodic) {
      when = when || 0;
      o = o || {};
      var m = fn,
          d = data,
          f,
          r;
      if (this.isString(fn)) m = o[fn];
      if (!m) return;
      if (!this.isUndefined(data) && !this.isArray(d)) d = [data];

      f = function f() {
        m.apply(o, d || []);
      };

      r = periodic ? setInterval(f, when) : setTimeout(f, when);
      return {
        interval: periodic,
        cancel: function cancel() {
          if (this.interval) {
            clearInterval(r);
          } else {
            clearTimeout(r);
          }
        }
      };
    }
  });

  /**
   * jQuery.fields() plugin
   *
   * @param {string|undefined} fldvar - Field variable name or undefined
   *  If field variable name, returns jQuery object of the specified field element(s).
   *  If unspecified, returns object of jQuery objects of all fields.
   * @returns jQuery object
   */

  $.fn.fields = function (fldvar) {
    // Note: fldvar has NO "x_" prefix
    var rec = {},
        id = this.attr("id"),
        obj = this[0],
        m = id.match(/^[xy](\d*)_/),
        f,
        tbl,
        infix;

    if (m) {
      // "this" is input element
      f = ew.getForm(obj); // form

      tbl = this.data("table"); // table var

      infix = m[1]; // row index
    } else if (obj && obj.htmlForm) {
      // "this" is form
      f = obj.$element; // form

      tbl = obj.id.replace(new RegExp("^f|" + obj.pageId + "$", "g"), ""); // table var

      infix = $(obj.htmlForm).data("rowindex"); // row index
    }

    var selector = "[data-table" + (tbl ? "=" + tbl : "") + "][data-field" + (fldvar ? "=x_" + fldvar : "") + "]";
    if ($.isValue(infix)) selector += "[name^=x" + infix + "_]";

    if (f && selector) {
      $(f).find(selector).each(function () {
        var key = this.getAttribute("data-field").substr(2),
            name = this.getAttribute("name");
        key = /^y_/.test(name) ? "y_" + key : key; // Use "y_fldvar" as key for 2nd search input

        rec[key] = rec[key] ? rec[key].add(this) : $(this); // Create jQuery object for each field
      });
    }

    return fldvar ? rec[fldvar] : rec;
  };

  $.fn.extend({
    // Get jQuery object of the row (<div> or <tr>)
    row: function row() {
      var $row = this.closest("#r_" + this.data("field").substr(2));
      if (!$row[0]) $row = this.closest(".ew-table > tbody > tr"); // Grid page

      return $row;
    },
    // Show/Hide field
    visible: function visible(v) {
      var $el = this.closest("#r_" + this.data("field").substr(2)); // Find the row

      if (!$el[0]) // If not found, find the <span>
        $el = this.closest("[id^=el]");

      if (typeof v != "undefined") {
        $el.toggle(v);
        return this;
      } else {
        return $el.is(":visible");
      }
    },
    // Get/Set field "readonly" attribute
    // Note: This attribute is ignored if the value of the type attribute is hidden, range, color, checkbox, radio, file, or a button type
    readonly: function readonly(v) {
      if (typeof v != "undefined") {
        this.prop("readOnly", v);
        return this;
      } else {
        return this.prop("readOnly");
      }
    },
    // Get/Set field "disabled" attribute
    // Note: A disabled control's value isn't submitted with the form
    disabled: function disabled(v) {
      if (typeof v != "undefined") {
        this.prop("disabled", v);
        return this;
      } else {
        return this.prop("disabled");
      }
    },
    // Get/Set field value(s)
    // Note: Return array if select-multiple
    value: function value(v) {
      var type = this.attr("type");

      if (typeof v != "undefined") {
        if (!Array.isArray(v)) v = [v];
        var type = this.attr("type");
        var el = type == "radio" || type == "checkbox" ? this.get() : this[0];
        if (ew.isHiddenTextArea(this)) this.val(v).data("editor").save();else ew.selectOption(el, v);
        return this;
      } else {
        if (type == "checkbox") {
          var val = ew.getOptionValues(this.get());
          return this.length == 1 ? val.join() : val;
        } else if (type == "radio") {
          return ew.getOptionValues(this.get()).join();
        } else if (ew.isHiddenTextArea(this)) {
          this.data("editor").save();
          return this.val();
        } else {
          return this.val();
        }
      }
    },
    // Get field value as number
    toNumber: function toNumber() {
      return ew.parseNumber(this.value());
    },
    // Get field value as moment object
    toDate: function toDate() {
      return ew.parseDate(this.value(), this.data("format"));
    },
    // Get field value as native Date object
    toJsDate: function toJsDate() {
      return ew.parseDate(this.value(), this.data("format")).toDate();
    }
  });

  $(window).off("load.lte.treeview"); // Treeview

  var Treeview = adminlte.Treeview;
  Treeview.prototype._toggle = Treeview.prototype.toggle;

  Treeview.prototype.toggle = function toggle(event) {
    var $relativeTarget = $(event.currentTarget),
        treeviewMenu = $relativeTarget.next(),
        href = $relativeTarget.attr("href"),
        $text = $(event.target).closest(".menu-item-text");
    if (!treeviewMenu.is(".nav-treeview") || $text[0] && href && href != "#" && href != "javascript:void(0);") // Menu text with href
      return;

    this._toggle(event);
  }; // Dropdown menu parent item with href // Override AdminLTE

  $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (e) {
    var href = $(this).attr("href");
    if (href && href != "#" && e.target.nodeName == "SPAN") window.location = href;
  });

}(jQuery));
//# sourceMappingURL=ew.js.map
