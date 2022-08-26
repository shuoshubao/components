'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var lodash = require('lodash');
var tools = require('@nbfe/tools');
var antd = require('antd');
var moment = require('moment');
var ColorsPicker = require('@nbfe/react-color');
var colors = require('@ant-design/colors');
var reactDnd = require('react-dnd');
var reactDndHtml5Backend = require('react-dnd-html5-backend');
var reactSortableHoc = require('react-sortable-hoc');
var reactIs = require('react-is');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var ColorsPicker__namespace = /*#__PURE__*/_interopNamespace(ColorsPicker);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
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

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
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
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
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

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var defaultSvgProps$1 = {
  viewBox: '64 64 896 896',
  focusable: 'false',
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'currentColor',
  width: '1em',
  height: '1em'
};

var getSvgProps$1 = function getSvgProps(props) {
  return _objectSpread2(_objectSpread2({}, defaultSvgProps$1), lodash.omit(props, 'className'));
};

var QuestionCircleOutlined$1 = function QuestionCircleOutlined(props) {
  var svgProps = getSvgProps$1(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", _extends({
    viewBox: "64 64 896 896",
    focusable: "false",
    xmlns: "http://www.w3.org/2000/svg"
  }, svgProps), /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
  })));
};
var CopyOutlined = function CopyOutlined(props) {
  var svgProps = getSvgProps$1(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"
  })));
};
var DeleteOutlined = function DeleteOutlined(props) {
  var svgProps = getSvgProps$1(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
  })));
};
var PlusOutlined = function PlusOutlined(props) {
  var svgProps = getSvgProps$1(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"
  })));
};
var UploadOutlined = function UploadOutlined(props) {
  var svgProps = getSvgProps$1(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
  })));
};
var DownOutlined = function DownOutlined(props) {
  var svgProps = getSvgProps$1(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
  })));
};

var isAntdV3$1 = lodash.inRange(parseInt(antd.version, 10), 3, 4);
lodash.inRange(parseInt(antd.version, 10), 4, 5);
var componentName$1 = 'DynamicForm';
var prefixClassName$1 = lodash.kebabCase(componentName$1);
var defaultExtraConfig$1 = {
  submitText: '查询',
  resetText: '重置',
  submitLabelWidth: null
};
var defaulCardProps = {
  size: 'small',
  bordered: false
};
var defaulFormProps = {
  layout: 'inline'
}; // Form.Item tooltip 与文字的边距

var formItemTooltopMargin = 4; // 默认 column

var defaultColumn$2 = {
  key: '',
  label: '',
  name: '',
  // 当 tpl = 'date-range-picker' 时, 传复合key, 例如: 'startTime,endTime'
  rules: [],
  visible: true,
  defaultValue: '',
  immediate: true,
  tooltip: '',
  placeholder: '',
  inline: true,
  style: {},
  formItemStyle: {},
  transform: null,
  // 数据转换器
  formListConfig: null,
  // Form.List
  template: {
    tpl: 'input',
    width: 200
  }
};
var pickerFormatMap = {
  date: 'YYYY-MM-DD',
  year: 'YYYY',
  month: 'YYYY-MM',
  week: 'YYYY-wo',
  quarter: 'quarter' // todo: Q1,Q2,Q3,Q4

}; // Input select + input 拼接的分隔符
// 日期范围 开始时间 + 结束时间 拼接的分隔符

var searchSeparator = '___'; // Input 的 inputType 属性

var inputTypeList = ['input', 'search', 'select-search', 'select-input', 'textarea', 'password'];

var getDisplayName = function getDisplayName() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return [componentName$1, name].join('');
};
var getClassNames$1 = function getClassNames() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return tools.classNames(args).split(' ').map(function (v) {
    return [prefixClassName$1, v].filter(Boolean).join('-');
  }).join(' ');
}; // 处理 props.columns

var mergeColumns$2 = function mergeColumns() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      disabled = _ref.disabled;

  return lodash.cloneDeep(columns).map(function (v) {
    var column = lodash.merge({}, defaultColumn$2, v);
    var name = column.name,
        label = column.label,
        defaultValue = column.defaultValue;
    var template = column.template;
    var _template = template,
        tpl = _template.tpl;
    column.rules = column.rules.map(function (v2) {
      if (lodash.isFunction(v2)) {
        return v2(label);
      }

      return v2;
    });

    if (tpl === 'input') {
      template = _objectSpread2({
        inputType: 'input'
      }, template);
      var _template2 = template,
          inputType = _template2.inputType;

      if (!column.placeholder) {
        column.placeholder = label ? ['请输入', label].join('') : '';
      }

      if (['select-search', 'select-input'].includes(inputType)) {
        template = _objectSpread2({
          inputWidth: defaultColumn$2.template.width,
          selectWidth: 100,
          options: []
        }, template);

        var _name$split = name.split(','),
            _name$split2 = _slicedToArray(_name$split, 2),
            selectKey = _name$split2[0],
            inputKey = _name$split2[1];

        column.name = [selectKey, inputKey].join(searchSeparator);
      }
    }

    if (tpl === 'auto-complete') {
      if (!column.placeholder) {
        column.placeholder = label ? ['请输入', label].join('') : '';
      }
    }

    if (['select', 'cascader', 'tree-select'].includes(tpl)) {
      if (!column.placeholder) {
        column.placeholder = label ? ['请选择', label].join('') : '';
      }
    }

    if (tpl === 'select') {
      column.defaultValue = defaultValue === defaultColumn$2.defaultValue ? undefined : defaultValue;
      column.template.options = column.template.options || [];
    }

    if (tpl === 'cascader') {
      column.defaultValue = defaultValue === defaultColumn$2.defaultValue ? [] : defaultValue;
    }

    if (tpl === 'tree-select') {
      column.defaultValue = defaultValue === defaultColumn$2.defaultValue ? undefined : defaultValue;
      column.template.treeData = column.template.treeData || [];
    }

    if (tpl === 'checkbox') {
      column.defaultValue = defaultValue === defaultColumn$2.defaultValue ? [] : defaultValue;
      column.template.options = column.template.options || [];
    }

    if (tpl === 'date-picker') {
      // picker: date | week | month | quarter | year
      template = _objectSpread2({
        picker: 'date'
      }, template);
      template = _objectSpread2({
        format: pickerFormatMap[template.picker]
      }, template);

      if (defaultValue) {
        column.defaultValue = moment__default["default"](defaultValue, template.format);
      } else {
        column.defaultValue = null;
      }

      column.placeholder = undefined;
    }

    if (tpl === 'date-range-picker') {
      var _name$split3 = name.split(','),
          _name$split4 = _slicedToArray(_name$split3, 2),
          key1 = _name$split4[0],
          key2 = _name$split4[1];

      column.name = [key1, key2].join(searchSeparator);
      template = _objectSpread2({
        format: 'YYYY-MM-DD HH:mm:ss'
      }, template);

      if (defaultValue) {
        column.defaultValue = defaultValue.map(function (v2) {
          return moment__default["default"](v2, template.format);
        });
      } else {
        column.defaultValue = null;
      }

      column.placeholder = undefined;
    }

    if (tpl === 'time-picker') {
      template = _objectSpread2({
        format: 'HH:mm:ss'
      }, template);

      if (defaultValue) {
        column.defaultValue = moment__default["default"](defaultValue, template.format);
      } else {
        column.defaultValue = null;
      }
    }

    if (tpl === 'time-range-picker') {
      var _name$split5 = name.split(','),
          _name$split6 = _slicedToArray(_name$split5, 2),
          _key2 = _name$split6[0],
          _key3 = _name$split6[1];

      column.name = [_key2, _key3].join(searchSeparator);
      template = _objectSpread2({
        format: 'HH:mm:ss'
      }, template);

      if (defaultValue) {
        column.defaultValue = defaultValue.map(function (v2) {
          return moment__default["default"](v2, template.format);
        });
      } else {
        column.defaultValue = null;
      }

      column.placeholder = undefined;
    }

    if (tpl === 'number-range') {
      var _name$split7 = name.split(','),
          _name$split8 = _slicedToArray(_name$split7, 2),
          minValueKey = _name$split8[0],
          maxValueKey = _name$split8[1];

      column.name = [minValueKey, maxValueKey].join(searchSeparator);
      column.placeholder = column.placeholder || '最小值,最大值';
      column.defaultValue = defaultValue === defaultColumn$2.defaultValue ? [] : defaultValue;
    }

    column.template = template; // 详情模式

    if (disabled) {
      column.template.disabled = true;
    }

    return column;
  });
}; // 校验参数

var validateColumns = function validateColumns() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  columns.forEach(function (column) {
    var name = column.name,
        template = column.template;
    var tpl = template.tpl;

    if (tpl === 'input') {
      var _template$inputType = template.inputType,
          inputType = _template$inputType === void 0 ? 'input' : _template$inputType;

      if (!inputTypeList.includes(inputType)) {
        throw new Error("[".concat(componentName$1, "] inputType \u53C2\u6570\u975E\u6CD5, \u9700\u4E3A\u5176\u4E2D\u4E00\u79CD: ").concat(inputTypeList.join('|')));
      }

      if (['select-search', 'select-input'].includes(inputType)) {
        var _name$split9 = name.split(searchSeparator),
            _name$split10 = _slicedToArray(_name$split9, 2),
            selectKey = _name$split10[0],
            inputKey = _name$split10[1];

        if (tools.isSomeFalsy(selectKey, inputKey)) {
          throw new Error("[".concat(componentName$1, "] ").concat(tpl, " \u5FC5\u987B\u4F20\u53C2\u6570: \"name\" \u5F62\u5F0F\u4E3A \"selectKey,inputKey\""));
        }
      }
    }

    if (tpl === 'auto-complete') {
      var fetchFunc = lodash.get(template, 'remoteConfig.fetch');

      if (!lodash.isFunction(fetchFunc)) {
        throw new Error("[".concat(componentName$1, "] auto-complete \u5FC5\u987B\u4F20\u53C2\u6570: \"template.remoteConfig.fetch\" \u9700\u4E3A\u51FD\u6570"));
      }
    } // 日期范围, 时间范围, 数字范围


    if (['date-range-picker', 'time-range-picker', 'number-range'].includes(tpl)) {
      var _name$split11 = name.split(searchSeparator),
          _name$split12 = _slicedToArray(_name$split11, 2),
          key1 = _name$split12[0],
          key2 = _name$split12[1];

      if (tools.isSomeFalsy(key1, key2)) {
        throw new Error("[".concat(componentName$1, "] ").concat(tpl, " \u5FC5\u987B\u4F20\u53C2\u6570: \"name\" \u5F62\u5F0F\u4E3A \"key1,key2\""));
      }
    }
  });
}; // 表单初始值

var getInitialValues = function getInitialValues() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return lodash.cloneDeep(columns).reduce(function (prev, cur) {
    var name = cur.name,
        defaultValue = cur.defaultValue,
        template = cur.template;
    var tpl = template.tpl; // 日期范围, 时间范围, 数字范围

    if (['date-range-picker', 'time-range-picker', 'number-range'].includes(tpl)) {
      var _name$split13 = name.split(searchSeparator),
          _name$split14 = _slicedToArray(_name$split13, 2),
          key1 = _name$split14[0],
          key2 = _name$split14[1];

      prev[key1] = (defaultValue || [])[0] || null;
      prev[key2] = (defaultValue || [])[1] || null;
    }

    prev[name] = defaultValue;
    return prev;
  }, {});
}; // 处理提交的值

var getSearchValues = function getSearchValues(params, columns) {
  var result = {};
  columns.filter(function (v) {
    return Boolean(v.visible);
  }).forEach(function (v) {
    var name = v.name,
        template = v.template;
    var tpl = template.tpl;
    var value = params[name];

    if (tpl === 'input') {
      var inputType = template.inputType;

      if (['select-search', 'select-input'].includes(inputType)) {
        var _name$split15 = name.split(searchSeparator),
            _name$split16 = _slicedToArray(_name$split15, 2),
            selectKey = _name$split16[0],
            inputKey = _name$split16[1];

        var _value = _slicedToArray(value, 2);

        result[selectKey] = _value[0];
        result[inputKey] = _value[1];
        return;
      }
    }

    if (tpl === 'date-picker') {
      var format = template.format;

      if (value) {
        result[name] = tools.formatTime(value, format);
      } else {
        result[name] = null;
      }

      return;
    }

    if (tpl === 'date-range-picker') {
      var _format = template.format;

      var _name$split17 = name.split(searchSeparator),
          _name$split18 = _slicedToArray(_name$split17, 2),
          key1 = _name$split18[0],
          key2 = _name$split18[1];

      if (value) {
        result[key1] = tools.formatTime(value[0], _format);
        result[key2] = tools.formatTime(value[1], _format);
      } else {
        result[key1] = null;
        result[key2] = null;
      }

      return;
    }

    if (tpl === 'time-picker') {
      var _format2 = template.format;

      if (value) {
        result[name] = tools.formatTime(value, _format2);
      } else {
        result[name] = null;
      }

      return;
    }

    if (tpl === 'time-range-picker') {
      var _format3 = template.format;

      var _name$split19 = name.split(searchSeparator),
          _name$split20 = _slicedToArray(_name$split19, 2),
          _key4 = _name$split20[0],
          _key5 = _name$split20[1];

      if (value) {
        result[_key4] = tools.formatTime(value[0], _format3);
        result[_key5] = tools.formatTime(value[1], _format3);
      } else {
        result[_key4] = null;
        result[_key5] = null;
      }

      return;
    }

    if (tpl === 'number-range') {
      var _name$split21 = name.split(searchSeparator),
          _name$split22 = _slicedToArray(_name$split21, 2),
          _key6 = _name$split22[0],
          _key7 = _name$split22[1];

      var _ref2 = value || [],
          _ref3 = _slicedToArray(_ref2, 2),
          value1 = _ref3[0],
          value2 = _ref3[1];

      result[_key6] = tools.isEmptyValue(value1) ? null : value1;
      result[_key7] = tools.isEmptyValue(value2) ? null : value2;
      return;
    }

    result[name] = value;
  });
  return Object.entries(result).reduce(function (prev, _ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        k = _ref5[0],
        v = _ref5[1];

    var column = lodash.find(columns, {
      name: k
    });

    if (column) {
      var transform = column.transform;

      if (lodash.isFunction(transform)) {
        prev[k] = transform(v);
      }
    }

    return prev;
  }, result);
}; // icon 的宽度

var iconWidth = 14; // 获取 Form.Item label 的宽度

var getFormItemLabelWidth = function getFormItemLabelWidth(columns) {
  var labelWidthList = columns.map(function (v) {
    var label = v.label,
        tooltip = v.tooltip;
    var labelWidth = label.length * iconWidth;

    if (tooltip.length) {
      labelWidth += iconWidth + formItemTooltopMargin;
    }

    return labelWidth;
  }); // 是否有星号

  var hasRequired = columns.some(function (v) {
    return v.required || !tools.isEmptyArray(v.rules);
  });
  return Math.max.apply(Math, _toConsumableArray(labelWidthList)) + (hasRequired ? 12 : 0);
}; // 获取 Form.Item value 的宽度

var getFormItemNodeStyle = function getFormItemNodeStyle(column) {
  var template = column.template;
  var tpl = template.tpl,
      width = template.width;
  var style = {}; // 单选 复选 日期范围

  if (['radio', 'checkbox', 'input-number', 'date-range-picker'].includes(tpl)) {
    style.width = undefined;
  } else {
    style.width = width;
  }

  return style;
}; // 强制更新 Columns

var forceUpdateColumns = function forceUpdateColumns(_ref6) {
  var columns = _ref6.columns,
      _ref6$fields = _ref6.fields,
      fields = _ref6$fields === void 0 ? [] : _ref6$fields,
      setFieldsValue = _ref6.setFieldsValue;
  columns.forEach(function (v) {
    if (fields.includes(v.name)) {
      v.key = Math.random();
    }
  });
  setFieldsValue(fields.reduce(function (prev, cur) {
    var column = lodash.find(columns, {
      name: cur
    });
    prev[cur] = column.defaultValue;
    return prev;
  }, {}));
  return columns;
}; // Tooltip 支持链接的写法

var getTooltipTitleNode$1 = function getTooltipTitleNode(tooltip) {
  return tools.getTooltipHtml(tooltip).map(function (v, i) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      key: [i].join(),
      dangerouslySetInnerHTML: {
        __html: v
      }
    });
  });
}; // Form.Item tooltip

var renderFormItemLabel = function renderFormItemLabel(column, _ref7) {
  var labelWidth = _ref7.labelWidth;
  var label = column.label,
      tooltip = column.tooltip;

  if (!label) {
    return null;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      width: labelWidth || undefined
    },
    className: getClassNames$1('form-item-label')
  }, /*#__PURE__*/React__default["default"].createElement("span", null, label), !!tooltip && /*#__PURE__*/React__default["default"].createElement(antd.Tooltip, {
    title: getTooltipTitleNode$1(tooltip),
    overlayClassName: getClassNames$1('tooltip')
  }, /*#__PURE__*/React__default["default"].createElement(QuestionCircleOutlined$1, {
    className: getClassNames$1('form-item-label-tooltip')
  })));
}; // Form.Item 的 props


var getFormItemProps = function getFormItemProps(column, _ref8) {
  var index = _ref8.index,
      labelWidth = _ref8.labelWidth;
  var label = column.label,
      name = column.name,
      inline = column.inline;
  var formItemProps = lodash.omit(column, ['key', 'label', 'visible', 'defaultValue', 'immediate', 'tooltip', 'placeholder', 'inline', 'formItemStyle', 'transform', 'formListConfig', 'template']);
  var labelNode = renderFormItemLabel(column, {
    labelWidth: labelWidth
  });
  var key = [index, label, name, column.key].join('_');
  return lodash.merge({
    label: labelNode,
    key: key,
    style: {
      width: inline ? undefined : '100%'
    }
  }, formItemProps);
}; // Form.Item 子组件的 props

var getFormItemNodeProps = function getFormItemNodeProps(column) {
  var _cloneDeep = lodash.cloneDeep(column),
      placeholder = _cloneDeep.placeholder,
      template = _cloneDeep.template;

  return _objectSpread2({
    placeholder: placeholder,
    style: getFormItemNodeStyle(column)
  }, lodash.omit(template, ['width', 'tpl']));
};
var IconMap = {
  upload: UploadOutlined
};
var getIconButtonProps = function getIconButtonProps() {
  var iconName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isAntdV3$1) {
    return {
      type: iconName
    };
  }

  var IconComponent = IconMap[iconName];
  return {
    icon: /*#__PURE__*/React__default["default"].createElement(IconComponent, null)
  };
};

var SubInputMap = {
  input: antd.Input,
  textarea: antd.Input.TextArea,
  password: antd.Input.Password,
  search: antd.Input.Search
};

var Index$g = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(_props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "onSelectChange", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(value) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return tools.setAsyncState(_assertThisInitialized(_this), {
                  selectValue: value
                });

              case 2:
                _this.onChange();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onInputChange", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return tools.setAsyncState(_assertThisInitialized(_this), {
                  inputValue: e.target.value.trim()
                });

              case 2:
                _this.onChange();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onSearch", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      var onSearch = props.onSearch;

      if (!lodash.isFunction(onSearch)) {
        return;
      }

      onSearch();
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          props = _assertThisInitialize2.props,
          state = _assertThisInitialize2.state;

      var onChange = props.onChange;

      if (!lodash.isFunction(onChange)) {
        return;
      }

      var inputType = props.inputType;
      var selectValue = state.selectValue,
          inputValue = state.inputValue;

      if (['select-search', 'select-input'].includes(inputType)) {
        onChange([selectValue, inputValue]);
        return;
      }

      onChange(inputValue);
    });

    _this.state = {
      selectValue: null,
      inputValue: _props.value
    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var props = this.props;
      var value = props.value,
          inputType = props.inputType,
          options = props.options;

      if (['select-search', 'select-input'].includes(inputType)) {
        if (value === '') {
          this.setState({
            selectValue: options[0].value
          });
        }

        if (Array.isArray(value) && value.length === 2) {
          this.setState({
            selectValue: value[0],
            inputValue: value[1]
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
          state = this.state,
          onSelectChange = this.onSelectChange,
          onInputChange = this.onInputChange,
          _onSearch = this.onSearch;
      var inputType = props.inputType,
          options = props.options,
          selectWidth = props.selectWidth,
          inputWidth = props.inputWidth;
      var selectValue = state.selectValue,
          inputValue = state.inputValue;
      var componentProps = lodash.omit(props, ['defaultValue', 'value', 'onChange', 'onSearch', 'inputType', 'inputWidth', 'selectWidth']);

      if (['input', 'textarea', 'password', 'search'].includes(inputType)) {
        var InputComponent = SubInputMap[inputType];

        if (['input', 'search'].includes(inputType)) {
          componentProps.onPressEnter = function () {
            _onSearch();
          };

          if (['search'].includes(inputType)) {
            componentProps.onSearch = function () {
              _onSearch();
            };
          }
        }

        return /*#__PURE__*/React__default["default"].createElement(InputComponent, _extends({}, componentProps, {
          value: inputValue,
          onChange: onInputChange
        }));
      }

      if (['select-search', 'select-input'].includes(inputType)) {
        var _ref3 = options.find(function (v) {
          return v.value === selectValue;
        }) || {},
            label = _ref3.label;

        return /*#__PURE__*/React__default["default"].createElement(antd.Input.Group, {
          compact: true
        }, /*#__PURE__*/React__default["default"].createElement(antd.Select, {
          disabled: props.disabled,
          value: selectValue,
          onChange: onSelectChange,
          style: {
            width: selectWidth
          }
        }, options.map(function (v) {
          return /*#__PURE__*/React__default["default"].createElement(antd.Select.Option, {
            value: v.value,
            key: v.value
          }, v.label);
        })), inputType === 'select-search' ? /*#__PURE__*/React__default["default"].createElement(antd.Input.Search, _extends({}, componentProps, {
          value: inputValue,
          onChange: onInputChange,
          onSearch: function onSearch() {
            _onSearch();
          },
          style: {
            width: inputWidth
          },
          placeholder: ['请输入', label].join('')
        })) : /*#__PURE__*/React__default["default"].createElement(antd.Input, _extends({}, lodash.omit(componentProps, ['enterButton']), {
          value: inputValue,
          onChange: onInputChange,
          style: {
            width: inputWidth
          },
          placeholder: ['请输入', label].join('')
        })));
      }

      return null;
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$g, "displayName", getDisplayName('Input'));

_defineProperty(Index$g, "defaultProps", {
  inputType: 'input',
  options: [],
  inputWidth: 200,
  selectWidth: 100
});

_defineProperty(Index$g, "propTypes", {
  value: PropTypes__default["default"].any,
  onChange: PropTypes__default["default"].func,
  onSearch: PropTypes__default["default"].func,
  inputType: PropTypes__default["default"].oneOf(['input', 'textarea', 'password', 'search', 'select-search', 'select-input']),
  options: PropTypes__default["default"].array,
  width: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
  inputWidth: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
  selectWidth: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string])
});

var Index$f = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);
    var value = props.value || [];
    _this.state = {
      minValue: value[0],
      maxValue: value[1]
    };
    return _this;
  }

  _createClass(Index, [{
    key: "onInputChange",
    value: function onInputChange() {
      var props = this.props,
          state = this.state;
      var onChange = props.onChange;
      var minValue = state.minValue,
          maxValue = state.maxValue; // 反转

      var isNeedReverse = tools.isEveryTruthy(!tools.isEmptyValue(minValue), !tools.isEmptyValue(maxValue), minValue > maxValue);

      if (isNeedReverse) {
        onChange([maxValue, minValue]);
      } else {
        onChange([minValue, maxValue]);
      }

      if (this.props.onCustomChange) {
        this.props.onCustomChange();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props,
          state = this.state;
      var placeholder = props.placeholder,
          style = props.style,
          separator = props.separator,
          separatorWidth = props.separatorWidth;
      var minValue = state.minValue,
          maxValue = state.maxValue;
      var inputWidth = "calc(50% - ".concat(separatorWidth / 2, "px)");
      var componentProps = lodash.omit(props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'style', 'separator', 'separatorWidth']);
      return /*#__PURE__*/React__default["default"].createElement(antd.Input.Group, {
        compact: true,
        className: getClassNames$1('number-range'),
        style: style
      }, /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, _extends({
        disabled: props.disabled,
        value: minValue,
        onChange: /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(value) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return tools.setAsyncState(_this2, {
                      minValue: value
                    });

                  case 2:
                    _this2.onInputChange();

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }(),
        className: getClassNames$1('number-range-min'),
        style: {
          width: inputWidth
        }
      }, componentProps, {
        placeholder: placeholder.split(',')[0]
      })), /*#__PURE__*/React__default["default"].createElement(antd.Input, {
        disabled: true,
        className: getClassNames$1('number-range-separator'),
        style: {
          width: separatorWidth
        },
        placeholder: separator
      }), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, _extends({
        disabled: props.disabled,
        value: maxValue,
        onChange: /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(value) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return tools.setAsyncState(_this2, {
                      maxValue: value
                    });

                  case 2:
                    _this2.onInputChange();

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }(),
        className: getClassNames$1('number-range-max'),
        style: {
          width: inputWidth
        }
      }, componentProps, {
        placeholder: placeholder.split(',')[1]
      })));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$f, "displayName", getDisplayName('NumberRange'));

_defineProperty(Index$f, "defaultProps", {
  placeholder: '最小值,最大值',
  separator: '~',
  separatorWidth: 30
});

_defineProperty(Index$f, "propTypes", {
  value: PropTypes__default["default"].any,
  onChange: PropTypes__default["default"].func,
  placeholder: PropTypes__default["default"].string,
  // placeholder
  separator: PropTypes__default["default"].string,
  // 分割符
  separatorWidth: PropTypes__default["default"].number // 分割符宽度

});

var CacheFetch$3 = [];

var getCacheFetch$3 = function getCacheFetch(remoteConfig) {
  var item = lodash.find(CacheFetch$3, {
    remoteConfig: remoteConfig
  });

  if (item) {
    return item.request;
  }

  var requestInstance = remoteConfig.fetch();
  CacheFetch$3.push({
    remoteConfig: remoteConfig,
    request: requestInstance
  });
  return requestInstance;
};

var Index$e = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(_props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "handleSearch", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(searchText) {
        var remoteConfig, value, fetchFunc, _remoteConfig$process, processFunc, responseData, options;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                remoteConfig = _this.props.remoteConfig;
                value = searchText.trim().replace(/'/g, '');

                if (value) {
                  _context.next = 5;
                  break;
                }

                _this.setState({
                  options: []
                });

                return _context.abrupt("return");

              case 5:
                fetchFunc = remoteConfig.fetch, _remoteConfig$process = remoteConfig.process, processFunc = _remoteConfig$process === void 0 ? lodash.noop : _remoteConfig$process;
                _context.next = 8;
                return fetchFunc(value);

              case 8:
                responseData = _context.sent;
                options = tools.convertDataToEnum(processFunc(responseData) || responseData, lodash.pick(remoteConfig, ['path', 'valueKey', 'labelKey']));

                _this.setState({
                  options: options
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (value) {
      var _this$state = _this.state,
          options = _this$state.options,
          isMultipleAllSelect = _this$state.isMultipleAllSelect;

      if (isMultipleAllSelect) {
        var indeterminate = !lodash.isEqual(lodash.map(options, 'value').sort(), value.sort());

        _this.setState({
          indeterminate: !tools.isEmptyArray(value) && indeterminate,
          checkAll: !indeterminate
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCheckAllChange", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props,
          state = _assertThisInitialize.state;

      var onChange = props.onChange;
      var options = state.options;
      var checked = e.target.checked;

      _this.setState({
        checkAll: checked,
        indeterminate: false
      });

      onChange(checked ? lodash.map(options, 'value') : []);
    });

    _this.state = {
      options: lodash.cloneDeep(_props.options),
      // 多选 + 全选
      isMultipleAllSelect: ['multiple', 'tags'].includes(_props.mode) && _props.allItem,
      checkAll: false,
      indeterminate: false // 多选模式的全选按钮的 indeterminate 状态

    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var props, value, remoteConfig, showSearch, isMultipleAllSelect, _options, indeterminate, _remoteConfig$process2, processFunc, responseData, options;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                props = this.props;
                value = props.value, remoteConfig = props.remoteConfig, showSearch = props.showSearch, isMultipleAllSelect = props.isMultipleAllSelect;

                if (lodash.isObject(remoteConfig)) {
                  _context2.next = 5;
                  break;
                }

                if (isMultipleAllSelect) {
                  _options = props.options;
                  indeterminate = !lodash.isEqual(lodash.map(_options, 'value').sort(), value.sort());
                  this.setState({
                    indeterminate: indeterminate,
                    checkAll: !indeterminate
                  });
                }

                return _context2.abrupt("return");

              case 5:
                if (!showSearch) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return");

              case 7:
                _remoteConfig$process2 = remoteConfig.process, processFunc = _remoteConfig$process2 === void 0 ? lodash.noop : _remoteConfig$process2;
                _context2.next = 10;
                return getCacheFetch$3(remoteConfig);

              case 10:
                responseData = _context2.sent;
                options = tools.convertDataToEnum(processFunc(responseData) || responseData, lodash.pick(remoteConfig, ['path', 'valueKey', 'labelKey']));
                this.setState({
                  options: options
                });

                if (isMultipleAllSelect) {
                  indeterminate = !lodash.isEqual(lodash.map(options, 'value').sort(), value.sort());
                  this.setState({
                    indeterminate: indeterminate,
                    checkAll: !indeterminate
                  });
                }

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props,
          state = this.state;
      var value = props.value,
          _onChange = props.onChange,
          allItem = props.allItem,
          showSearch = props.showSearch;
      var options = state.options,
          checkAll = state.checkAll,
          isMultipleAllSelect = state.isMultipleAllSelect,
          indeterminate = state.indeterminate;
      var componentProps = lodash.omit(props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'options', 'allItem', 'remoteConfig']);

      if (showSearch) {
        componentProps.onSearch = lodash.debounce(this.handleSearch, 200);
      } // 复选 - 全选


      if (isMultipleAllSelect && options.length) {
        componentProps.dropdownRender = function (menu) {
          return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, menu, /*#__PURE__*/React__default["default"].createElement(antd.Divider, {
            style: {
              margin: '4px 0'
            }
          }), /*#__PURE__*/React__default["default"].createElement("div", {
            style: {
              padding: '4px 12px'
            }
          }, /*#__PURE__*/React__default["default"].createElement(antd.Checkbox, {
            checked: checkAll,
            indeterminate: indeterminate,
            onChange: _this2.onCheckAllChange
          }, allItem.label)));
        };
      }

      return /*#__PURE__*/React__default["default"].createElement(antd.Select, _extends({}, componentProps, {
        value: value,
        onChange: function onChange(val) {
          _onChange(val);

          _this2.handleChange(val);

          if (props.onCustomChange) {
            props.onCustomChange(val, options);
          }
        }
      }), [isMultipleAllSelect ? null : allItem].concat(_toConsumableArray(options)).filter(Boolean).map(function (v) {
        var optionProps = lodash.pick(v, ['className', 'disabled', 'title', 'value']);
        return /*#__PURE__*/React__default["default"].createElement(antd.Select.Option, _extends({
          key: v.value
        }, optionProps), v.label);
      }));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$e, "displayName", getDisplayName('Select'));

_defineProperty(Index$e, "defaultProps", {
  options: []
});

_defineProperty(Index$e, "propTypes", {
  value: PropTypes__default["default"].any,
  onChange: PropTypes__default["default"].func,
  allItem: PropTypes__default["default"].object,
  options: PropTypes__default["default"].array,
  remoteConfig: PropTypes__default["default"].object
});

var CacheFetch$2 = [];

var getCacheFetch$2 = function getCacheFetch(remoteConfig) {
  var item = lodash.find(CacheFetch$2, {
    remoteConfig: remoteConfig
  });

  if (item) {
    return item.request;
  }

  var requestInstance = remoteConfig.fetch();
  CacheFetch$2.push({
    remoteConfig: remoteConfig,
    request: requestInstance
  });
  return requestInstance;
};

var Index$d = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onCheckAllChange", function (e) {
      var options = lodash.cloneDeep(_this.state.options);
      var checked = e.target.checked;
      var checkedList = checked ? lodash.map(options, 'value') : [];

      _this.setState({
        checkAll: checked,
        indeterminate: false
      });

      _this.props.onChange(checkedList);
    });

    _defineProperty(_assertThisInitialized(_this), "setCheckAll", function () {
      var value = _this.props.value;
      var options = _this.state.options;

      _this.setState({
        indeterminate: value.length && options.length !== value.length,
        checkAll: options.length === value.length
      });
    });

    var _options = lodash.cloneDeep(props.options);

    _this.state = {
      options: _options,
      indeterminate: false,
      checkAll: false
    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this2 = this;

        var props, defaultSelectAll, remoteConfig, _remoteConfig$process, processFunc, responseData, options;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                props = this.props;
                defaultSelectAll = props.defaultSelectAll, remoteConfig = props.remoteConfig;

                if (lodash.isObject(remoteConfig)) {
                  _context.next = 5;
                  break;
                }

                this.setCheckAll();
                return _context.abrupt("return");

              case 5:
                _remoteConfig$process = remoteConfig.process, processFunc = _remoteConfig$process === void 0 ? lodash.noop : _remoteConfig$process;
                _context.next = 8;
                return getCacheFetch$2(remoteConfig);

              case 8:
                responseData = _context.sent;
                options = tools.convertDataToEnum(processFunc(responseData) || responseData, lodash.pick(remoteConfig, ['path', 'valueKey', 'labelKey']));

                if (defaultSelectAll) {
                  this.setState({
                    options: options,
                    checkAll: true
                  }, function () {
                    var checkedList = lodash.map(options, 'value');

                    _this2.props.onChange(checkedList);
                  });
                } else {
                  this.setState({
                    options: options
                  }, function () {
                    _this2.setCheckAll();
                  });
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var props = this.props,
          state = this.state;
      var value = props.value,
          _onChange = props.onChange;
      var options = state.options,
          indeterminate = state.indeterminate,
          checkAll = state.checkAll;
      var componentProps = lodash.omit(props, ['defaultValue', 'value', 'onChange', 'options', 'onCustomChange', 'remoteConfig', 'indeterminate', 'defaultSelectAll']);
      return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, !!props.indeterminate && !tools.isEmptyArray(options) && /*#__PURE__*/React__default["default"].createElement(antd.Checkbox, {
        indeterminate: indeterminate,
        onChange: this.onCheckAllChange,
        checked: checkAll
      }, "\u5168\u9009"), /*#__PURE__*/React__default["default"].createElement(antd.Checkbox.Group, _extends({}, componentProps, {
        options: options,
        value: value,
        onChange: function onChange(val) {
          _onChange(val);

          _this3.setState({
            indeterminate: val.length && options.length !== val.length,
            checkAll: options.length === val.length
          });

          if (props.onCustomChange) {
            props.onCustomChange();
          }
        }
      })));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$d, "displayName", getDisplayName('Checkbox'));

_defineProperty(Index$d, "defaultProps", {
  // 是否展示全部
  indeterminate: false,
  defaultSelectAll: false // 默认选择全部

});

_defineProperty(Index$d, "propTypes", {
  indeterminate: PropTypes__default["default"].bool,
  defaultSelectAll: PropTypes__default["default"].bool,
  value: PropTypes__default["default"].any,
  onChange: PropTypes__default["default"].func,
  remoteConfig: PropTypes__default["default"].object
});

var TabPane = antd.Tabs.TabPane;

var Index$c = /*#__PURE__*/function (_PureComponent) {
  _inherits(Index, _PureComponent);

  var _super = _createSuper(Index);

  function Index() {
    _classCallCheck(this, Index);

    return _super.apply(this, arguments);
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var _onChange = props.onChange,
          options = props.options;
      var shouldBeNumber = lodash.isNumber(lodash.last(options).value);
      var innerValue = String(props.value);
      var componentProps = lodash.omit(props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'style', 'emitReset']);
      return /*#__PURE__*/React__default["default"].createElement(antd.Tabs, _extends({
        animated: false
      }, componentProps, {
        activeKey: innerValue,
        defaultActiveKey: innerValue,
        onChange: function onChange(activeKey) {
          _onChange(shouldBeNumber ? Number(activeKey) : activeKey);

          if (props.onCustomChange) {
            props.onCustomChange();
          }
        }
      }), options.map(function (v) {
        var value = v.value,
            label = v.label;
        return /*#__PURE__*/React__default["default"].createElement(TabPane, {
          tab: label,
          key: value
        });
      }));
    }
  }]);

  return Index;
}(React.PureComponent);

_defineProperty(Index$c, "displayName", getDisplayName('Tabs'));

_defineProperty(Index$c, "defaultProps", {});

_defineProperty(Index$c, "propTypes", {
  value: PropTypes__default["default"].any,
  onChange: PropTypes__default["default"].func
});

var CacheFetch$1 = [];

var getCacheFetch$1 = function getCacheFetch(remoteConfig) {
  var item = lodash.find(CacheFetch$1, {
    remoteConfig: remoteConfig
  });

  if (item) {
    return item.request;
  }

  var requestInstance = remoteConfig.fetch();
  CacheFetch$1.push({
    remoteConfig: remoteConfig,
    request: requestInstance
  });
  return requestInstance;
};

var Index$b = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);
    _this.state = {
      options: lodash.cloneDeep(props.options)
    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var props, remoteConfig, _remoteConfig$process, processFunc, responseData, options;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                props = this.props;
                remoteConfig = props.remoteConfig;

                if (lodash.isObject(remoteConfig)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                _remoteConfig$process = remoteConfig.process, processFunc = _remoteConfig$process === void 0 ? lodash.noop : _remoteConfig$process;
                _context.next = 7;
                return getCacheFetch$1(remoteConfig);

              case 7:
                responseData = _context.sent;
                options = tools.convertDataToEnum(processFunc(responseData) || responseData, remoteConfig);
                this.setState({
                  options: options
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props,
          state = this.state;
      var value = props.value,
          _onChange = props.onChange,
          loadData = props.loadData;
      var options = state.options;
      var componentProps = lodash.omit(props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'options', 'remoteConfig', 'loadData']);

      if (loadData) {
        componentProps.loadData = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(selectedOptions) {
            var remoteConfig, targetOption, fetchFunc, _remoteConfig$process2, processFunc, responseData;

            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    remoteConfig = props.loadData;
                    targetOption = lodash.last(selectedOptions);
                    targetOption.loading = true;
                    fetchFunc = remoteConfig.fetch, _remoteConfig$process2 = remoteConfig.process, processFunc = _remoteConfig$process2 === void 0 ? lodash.noop : _remoteConfig$process2;
                    _context2.next = 6;
                    return fetchFunc(selectedOptions, targetOption);

                  case 6:
                    responseData = _context2.sent;
                    targetOption.loading = false;
                    targetOption.children = tools.convertDataToEnum(processFunc(responseData) || responseData, remoteConfig);

                    _this2.setState(function (prevState) {
                      return {
                        options: _toConsumableArray(prevState.options)
                      };
                    });

                  case 10:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }();
      }

      return /*#__PURE__*/React__default["default"].createElement(antd.Cascader, _extends({}, componentProps, {
        value: value,
        options: options,
        onChange: function onChange(val) {
          _onChange(val);

          if (props.onCustomChange) {
            props.onCustomChange();
          }
        }
      }));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$b, "displayName", getDisplayName('Cascader'));

_defineProperty(Index$b, "defaultProps", {
  options: []
});

_defineProperty(Index$b, "propTypes", {
  value: PropTypes__default["default"].any,
  onChange: PropTypes__default["default"].func,
  loadData: PropTypes__default["default"].object,
  options: PropTypes__default["default"].array,
  remoteConfig: PropTypes__default["default"].object
});

var CacheFetch = [];

var getCacheFetch = function getCacheFetch(remoteConfig) {
  var item = lodash.find(CacheFetch, {
    remoteConfig: remoteConfig
  });

  if (item) {
    return item.request;
  }

  var requestInstance = remoteConfig.fetch();
  CacheFetch.push({
    remoteConfig: remoteConfig,
    request: requestInstance
  });
  return requestInstance;
};

var Index$a = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);
    _this.state = {
      treeData: lodash.cloneDeep(props.treeData)
    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var props, remoteConfig, _remoteConfig$process, processFunc, responseData, treeData;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                props = this.props;
                remoteConfig = props.remoteConfig;

                if (lodash.isObject(remoteConfig)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                remoteConfig.fetch, _remoteConfig$process = remoteConfig.process, processFunc = _remoteConfig$process === void 0 ? lodash.noop : _remoteConfig$process;
                _context.next = 7;
                return getCacheFetch(remoteConfig);

              case 7:
                responseData = _context.sent;
                treeData = processFunc(responseData) || responseData;
                this.setState({
                  treeData: treeData
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
          state = this.state;
      var value = props.value,
          _onChange = props.onChange;
      var treeData = state.treeData;
      var componentProps = lodash.omit(props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'treeData', 'remoteConfig']);
      return /*#__PURE__*/React__default["default"].createElement(antd.TreeSelect, _extends({}, componentProps, {
        value: value,
        treeData: treeData,
        onChange: function onChange(val) {
          _onChange(val);

          if (props.onCustomChange) {
            props.onCustomChange();
          }
        }
      }));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$a, "displayName", getDisplayName('TreeSelect'));

_defineProperty(Index$a, "defaultProps", {});

_defineProperty(Index$a, "propTypes", {
  value: PropTypes__default["default"].any,
  onChange: PropTypes__default["default"].func,
  remoteConfig: PropTypes__default["default"].object
});

var Index$9 = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(_props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "onSearch", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(searchText) {
        var _assertThisInitialize, props, remoteConfig, query, fetchFunc, _remoteConfig$process, processFunc, responseData, options;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _assertThisInitialize = _assertThisInitialized(_this), props = _assertThisInitialize.props;
                remoteConfig = props.remoteConfig;
                query = searchText.trim();

                if (query) {
                  _context.next = 6;
                  break;
                }

                _this.setState({
                  options: []
                });

                return _context.abrupt("return");

              case 6:
                fetchFunc = remoteConfig.fetch, _remoteConfig$process = remoteConfig.process, processFunc = _remoteConfig$process === void 0 ? lodash.noop : _remoteConfig$process;
                _context.next = 9;
                return fetchFunc(query);

              case 9:
                responseData = _context.sent;
                options = tools.convertDataToEnum(processFunc(responseData) || responseData, lodash.pick(remoteConfig, ['path', 'valueKey', 'labelKey']));

                _this.setState({
                  options: options
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _this.state = {
      inputValue: _props.value || '',
      options: _props.options || []
    };
    _this.formRef = /*#__PURE__*/React__default["default"].createRef();
    _this.onDebounceSearch = lodash.debounce(_this.onSearch, _props.debounce);
    return _this;
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props,
          state = this.state;
      var onChange = props.onChange;
      var inputValue = state.inputValue,
          options = state.options;
      var componentProps = lodash.omit(props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'options', 'remoteConfig']);

      if (isAntdV3$1) {
        componentProps.dataSource = options.map(function (v) {
          return {
            value: v.value,
            text: v.label
          };
        });
      } else {
        componentProps.options = options;
      }

      return /*#__PURE__*/React__default["default"].createElement(antd.AutoComplete, _extends({}, componentProps, {
        ref: this.formRef,
        value: inputValue,
        onChange: function onChange(text) {
          _this2.setState({
            inputValue: String(text).trim()
          });
        },
        onSearch: this.onDebounceSearch,
        onSelect: function onSelect(val) {
          onChange(val);

          if (props.onCustomChange) {
            props.onCustomChange();
          }

          _this2.formRef.current.blur();
        }
      }));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$9, "displayName", getDisplayName('AutoComplete'));

_defineProperty(Index$9, "defaultProps", {
  debounce: 200
});

_defineProperty(Index$9, "propTypes", {
  value: PropTypes__default["default"].any,
  onChange: PropTypes__default["default"].func,
  remoteConfig: PropTypes__default["default"].object.isRequired,
  debounce: PropTypes__default["default"].number
});

var Index$8 = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index() {
    var _this;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (checked, event) {
      if (!lodash.isFunction(_this.props.onChange)) {
        return;
      }

      _this.props.onChange(checked, event);

      if (_this.props.onCustomChange) {
        _this.props.onCustomChange();
      }
    });

    return _this;
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          defaultValue = _this$props.defaultValue,
          value = _this$props.value,
          style = _this$props.style;
      var onChange = this.onChange;
      var componentProps = lodash.omit(this.props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'style']);
      return /*#__PURE__*/React__default["default"].createElement("div", {
        style: style
      }, /*#__PURE__*/React__default["default"].createElement(antd.Switch, _extends({
        checked: value,
        defaultChecked: defaultValue,
        onChange: onChange
      }, componentProps)));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$8, "displayName", 'DynamicFormSwitch');

_defineProperty(Index$8, "defaultProps", {});

_defineProperty(Index$8, "propTypes", {
  value: PropTypes__default["default"].bool,
  onChange: PropTypes__default["default"].func
});

var Index$7 = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index() {
    var _this;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      _this.props.onChange(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onAfterChange", function (value) {
      _this.props.onChange(value);

      if (_this.props.onCustomChange) {
        _this.props.onCustomChange();
      }
    });

    return _this;
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var props = this.props,
          onChange = this.onChange,
          onAfterChange = this.onAfterChange;
      var value = props.value,
          style = props.style,
          InputNumberWidth = props.InputNumberWidth;
      var componentProps = lodash.omit(props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'style', 'InputNumberWidth']);
      return /*#__PURE__*/React__default["default"].createElement("div", {
        style: _objectSpread2({
          display: 'flex',
          justifyContent: 'space-between'
        }, style)
      }, /*#__PURE__*/React__default["default"].createElement(antd.Slider, _extends({
        style: {
          width: style.width - InputNumberWidth - 15
        },
        value: value,
        onChange: onChange,
        onAfterChange: onAfterChange
      }, componentProps)), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, _extends({
        style: {
          width: InputNumberWidth
        },
        value: value,
        onChange: onAfterChange
      }, componentProps)));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$7, "displayName", 'DynamicFormSlider');

_defineProperty(Index$7, "defaultProps", {
  InputNumberWidth: 65
});

_defineProperty(Index$7, "propTypes", {
  value: PropTypes__default["default"].number,
  onChange: PropTypes__default["default"].func,
  InputNumberWidth: PropTypes__default["default"].number
});

var getBase64 = function getBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };
  });
};

var getFileList = function getFileList(value) {
  return lodash.flatten([value]).filter(Boolean).map(function (v) {
    if (lodash.isString(v)) {
      return {
        url: v,
        name: v
      };
    }

    return _objectSpread2({
      name: v.url
    }, v);
  });
};

var Index$6 = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(_props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (_ref) {
      var fileList = _ref.fileList;

      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      var maxCount = props.maxCount,
          onChange = props.onChange;

      _this.setState({
        fileList: fileList
      });

      if (lodash.isFunction(onChange)) {
        if (maxCount === 1) {
          onChange(fileList[0]);
        } else {
          onChange(fileList);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePreview", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!file.url && !file.preview)) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return getBase64(file.originFileObj);

              case 3:
                file.preview = _context.sent;

              case 4:
                _this.setState({
                  previewImage: file.url || file.preview,
                  previewVisible: true
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "getUploadButton", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          props = _assertThisInitialize2.props,
          state = _assertThisInitialize2.state;

      var _props$disabled = props.disabled,
          disabled = _props$disabled === void 0 ? false : _props$disabled,
          maxCount = props.maxCount,
          listType = props.listType;
      var fileList = state.fileList;

      var disabledFunc = function disabledFunc(e) {
        if (fileList.length >= maxCount) {
          antd.message.error("\u6700\u591A\u4E0A\u4F20".concat(maxCount, "\u4E2A\u6587\u4EF6, \u53EF\u5148\u5220\u9664\u5176\u4ED6\u6587\u4EF6!"));
          e.stopPropagation();
        }
      };

      if (listType === 'picture-card') {
        return /*#__PURE__*/React__default["default"].createElement("div", {
          onClick: disabledFunc,
          className: getClassNames$1('upload-button')
        }, /*#__PURE__*/React__default["default"].createElement(PlusOutlined, null), /*#__PURE__*/React__default["default"].createElement("div", {
          style: {
            marginTop: 8
          }
        }, "\u4E0A\u4F20"));
      }

      return /*#__PURE__*/React__default["default"].createElement(antd.Button, _extends({
        disabled: disabled,
        onClick: disabledFunc
      }, getIconButtonProps('upload')), "\u4E0A\u4F20");
    });

    _this.state = {
      fileList: getFileList(_props.value),
      previewVisible: false,
      previewImage: ''
    };
    return _this;
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props,
          state = this.state;
      var fileList = state.fileList,
          previewVisible = state.previewVisible,
          previewImage = state.previewImage;
      var UploadProps = lodash.omit(props, ['value', 'onChange']);
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(antd.Upload, _extends({
        fileList: fileList,
        onChange: this.handleChange,
        onPreview: props.onPreview || this.handlePreview
      }, UploadProps), this.getUploadButton()), /*#__PURE__*/React__default["default"].createElement(antd.Image, {
        width: 200,
        style: {
          display: 'none'
        },
        src: previewImage,
        preview: {
          visible: previewVisible,
          src: previewImage,
          onVisibleChange: function onVisibleChange(value) {
            _this2.setState({
              previewVisible: value
            });
          }
        }
      }));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$6, "displayName", 'DynamicFormUpload');

_defineProperty(Index$6, "defaultProps", {
  maxCount: 1 // 文件数量

});

_defineProperty(Index$6, "propTypes", {
  maxCount: PropTypes__default["default"].number,
  value: PropTypes__default["default"].any,
  onChange: PropTypes__default["default"].func
});

var Index$5 = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(props) {
    _classCallCheck(this, Index);

    return _super.call(this, props);
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      this.state;
          var props = this.props;
      var value = props.value,
          _onChange = props.onChange,
          type = props.type,
          valueType = props.valueType,
          trigger = props.trigger,
          style = props.style;

      var getOverlay = function getOverlay(type) {
        var ColorPicker = ColorsPicker__namespace[type];
        return /*#__PURE__*/React__default["default"].createElement(ColorPicker, {
          color: value,
          onChange: function onChange(color) {
            _onChange(color[valueType], color);
          }
        });
      };

      return /*#__PURE__*/React__default["default"].createElement(antd.Dropdown, {
        overlay: getOverlay(type),
        className: getClassNames$1('color-picker'),
        trigger: trigger
      }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
        style: {
          width: (style === null || style === void 0 ? void 0 : style.width) || 200,
          background: value,
          textAlign: 'right'
        }
      }, /*#__PURE__*/React__default["default"].createElement(DownOutlined, null)));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$5, "displayName", getDisplayName('ColorPicker'));

_defineProperty(Index$5, "defaultProps", {
  type: 'SwatchesPicker',
  valueType: 'hex'
});

_defineProperty(Index$5, "propTypes", {
  type: PropTypes__default["default"].oneOf(Object.keys(ColorsPicker__namespace)),
  trigger: PropTypes__default["default"].array,
  valueType: PropTypes__default["default"].oneOf(['hex', 'rgb', 'hsl'])
});

var BuiltInComponents = {
  input: Index$g,
  number: antd.InputNumber,
  'number-range': Index$f,
  radio: antd.Radio.Group,
  checkbox: Index$d,
  tabs: Index$c,
  select: Index$e,
  cascader: Index$b,
  'tree-select': Index$a,
  'date-picker': antd.DatePicker,
  'date-range-picker': antd.DatePicker.RangePicker,
  'time-picker': antd.TimePicker,
  'time-range-picker': antd.TimePicker.RangePicker,
  'auto-complete': Index$9,
  "switch": Index$8,
  rate: antd.Rate,
  slider: Index$7,
  upload: Index$6,
  'color-picker': Index$5
};

var Index$4 = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(_props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "setFields", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      var columns = props.columns,
          getFieldsValue = props.getFieldsValue;
      var formData = getFieldsValue();
      var data = [];
      lodash.sortBy(Object.entries(formData), function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            k = _ref2[0];

        return columns.findIndex(function (v2) {
          return v2.name === k;
        });
      }).filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            v = _ref4[1];

        return tools.isEveryFalsy(tools.isEmptyValue(v), tools.isEmptyArray(v));
      }).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            key = _ref6[0],
            value = _ref6[1];

        var column = lodash.find(columns, {
          name: key
        });
        var name = column.name,
            label = column.label,
            template = column.template;
        var tpl = template.tpl,
            options = template.options;

        if (!['select', 'radio', 'checkbox', 'date-picker', 'date-range-picker'].includes(tpl)) {
          return;
        } // 日期


        if (['date-picker', 'date-range-picker'].includes(tpl)) {
          var format = template.format;
          var valueText = tools.formatTime(value, format);

          if (['date-range-picker'].includes(tpl)) {
            valueText = [tools.formatTime(value[0], format), tools.formatTime(value[1], format)].join(' - ');
          }

          data.push({
            name: name,
            value: value,
            label: label,
            valueText: valueText
          });
          return;
        } // 枚举类


        if (['select', 'radio', 'checkbox'].includes(tpl)) {
          lodash.sortBy(lodash.flatten([value]), function (v) {
            return options.findIndex(function (v2) {
              return v2.value === v;
            });
          }).forEach(function (item) {
            var valueText = tools.getLabelByValue(item, options);
            data.push({
              name: name,
              value: item,
              label: label,
              valueText: valueText
            });
          });
        }
      });

      _this.setState({
        data: data
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRemove", function (item, i) {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          props = _assertThisInitialize2.props;

      var onChange = props.onChange,
          columns = props.columns,
          getFieldsValue = props.getFieldsValue;
      var formData = getFieldsValue();
      var name = item.name,
          value = item.value;
      var column = lodash.find(columns, {
        name: name
      });
      var template = column.template;
      var tpl = template.tpl;

      _this.setState(function (prevState) {
        var oldData = lodash.cloneDeep(prevState.data);
        oldData.splice(i, 1);
        return {
          data: oldData
        };
      });

      var newValue = lodash.cloneDeep(formData[name]);

      if (Array.isArray(newValue)) {
        if (tpl === 'date-range-picker') {
          newValue = '';
        } else {
          lodash.remove(newValue, function (v) {
            return v === value;
          });
        }
      } else if (tpl === 'select') {
        newValue = undefined;
      } else {
        newValue = '';
      }

      if (isAntdV3$1) {
        onChange(_defineProperty({}, name, {
          value: newValue
        }));
      } else {
        onChange([{
          name: name,
          value: newValue
        }]);
      }
    });

    _this.state = {
      data: []
    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {} // 给外部调用

  }, {
    key: "render",
    value: function render() {
      var state = this.state,
          onRemove = this.onRemove;
      var data = state.data;

      if (tools.isEmptyArray(data)) {
        return null;
      }

      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: getClassNames$1('filter-panel')
      }, /*#__PURE__*/React__default["default"].createElement(antd.Divider, {
        orientation: "left"
      }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u5DF2\u9009"), /*#__PURE__*/React__default["default"].createElement(antd.Badge, {
        count: data.length,
        offset: [5, -3],
        size: "small"
      })), /*#__PURE__*/React__default["default"].createElement("div", {
        className: getClassNames$1('filter-panel-tags')
      }, data.map(function (v, i) {
        var label = v.label,
            value = v.value,
            valueText = v.valueText;
        var tagText = "".concat(label, "(").concat(valueText, ")");
        return /*#__PURE__*/React__default["default"].createElement(antd.Tag, {
          color: "blue",
          closable: true,
          key: [i, value].join(),
          onClose: function onClose() {
            onRemove(v, i);
          }
        }, tagText);
      })));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$4, "displayName", getDisplayName('FilterPanel'));

_defineProperty(Index$4, "defaultProps", {});

_defineProperty(Index$4, "propTypes", {
  columns: PropTypes__default["default"].array.isRequired,
  getFieldsValue: PropTypes__default["default"].func.isRequired,
  onChange: PropTypes__default["default"].func.isRequired
});

var Index$3 = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(_props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "getFormRefNode", function () {
      return _this.formRef.current;
    });

    _defineProperty(_assertThisInitialized(_this), "getFormData", function () {
      var columns = _this.state.columns;

      var formRefNode = _this.getFormRefNode();

      var validateFields = formRefNode.validateFields;
      return new Promise(function (reslove) {
        validateFields().then(function (values) {
          reslove(getSearchValues(values, columns));
        })["catch"](function () {
          reslove(null);
          antd.message.error('表单项填写存在错误！请检查', 2);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "forceUpdateColumns", function (callback) {
      var columns = _this.state.columns;
      var updatedColumns = callback(columns) || columns;

      _this.setState({
        columns: updatedColumns
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldsValue", function () {
      var formRefNode = _this.getFormRefNode();

      return formRefNode.getFieldsValue();
    });

    _defineProperty(_assertThisInitialized(_this), "onImmediateSearch", function (column) {
      var immediate = column.immediate,
          template = column.template;
      var tpl = template.tpl;

      _this.debounceFilterPanelSetFields();

      if (!immediate) {
        return;
      }

      if (['input', 'slider'].includes(tpl)) {
        return;
      }

      _this.onSearch();
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", lodash.debounce(function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          state = _assertThisInitialize.state,
          props = _assertThisInitialize.props;

      var columns = state.columns;

      var formRefNode = _this.getFormRefNode();

      if (!formRefNode) {
        return;
      }

      var params = formRefNode.getFieldsValue();
      var searchValues = getSearchValues(params, columns);

      if (lodash.isFunction(props.onSubmit)) {
        props.onSubmit(searchValues, params);
      }

      _this.debounceFilterPanelSetFields();
    }, 300));

    _defineProperty(_assertThisInitialized(_this), "debounceFilterPanelSetFields", lodash.debounce(function () {
      var visibleFilterPanel = _this.props.visibleFilterPanel;

      if (visibleFilterPanel) {
        _this.filterPanelRef.current.setFields();
      }
    }, 300 + 10));

    _defineProperty(_assertThisInitialized(_this), "onReset", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var columns, formRefNode, values, updatedColumns;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              columns = _this.state.columns;
              formRefNode = _this.getFormRefNode();
              values = formRefNode.getFieldsValue(true);
              formRefNode.resetFields();
              columns.forEach(function (column) {
                var name = column.name,
                    tpl = column.template.tpl;

                if (tpl === 'tabs') {
                  formRefNode.setFieldsValue(_defineProperty({}, name, values[name]));
                }
              });

              if (!_this.props.onReset) {
                _context.next = 12;
                break;
              }

              _context.next = 8;
              return _this.props.onReset(columns);

            case 8:
              updatedColumns = _context.sent;

              if (!updatedColumns) {
                _context.next = 12;
                break;
              }

              _context.next = 12;
              return tools.setAsyncState(_assertThisInitialized(_this), {
                columns: lodash.cloneDeep(updatedColumns)
              });

            case 12:
              _this.onSearch();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "getFormItemNode", function (v) {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          state = _assertThisInitialize2.state;

      var columns = state.columns;
      var name = v.name,
          template = v.template;
      var tpl = template.tpl;
      var formItemNodeProps = getFormItemNodeProps(v);
      formItemNodeProps.onChange = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var onChange, formRefNode, setFieldsValue, allFields, updatedColumns;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.onImmediateSearch(v);

                onChange = template.onChange; // 额外的 onChange 事件

                if (!onChange) {
                  _context2.next = 10;
                  break;
                }

                formRefNode = _this.getFormRefNode();
                setFieldsValue = formRefNode.setFieldsValue;
                allFields = formRefNode.getFieldsValue();
                _context2.next = 8;
                return onChange(allFields[name], {
                  columns: lodash.cloneDeep(columns),
                  setFieldsValue: setFieldsValue,
                  allFields: allFields,
                  forceUpdateColumns: function forceUpdateColumns$1(fields) {
                    return forceUpdateColumns({
                      columns: columns,
                      setFieldsValue: setFieldsValue,
                      fields: fields
                    });
                  }
                });

              case 8:
                updatedColumns = _context2.sent;

                _this.setState({
                  columns: lodash.cloneDeep(updatedColumns) || columns
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      var formItemNode = null;

      if (Object.keys(BuiltInComponents).includes(tpl)) {
        var BuiltInComponent = BuiltInComponents[tpl];

        if (tpl === 'input') {
          formItemNodeProps.onSearch = _this.onSearch;
        }

        if (tpl === 'tabs') {
          var _formItemNodeProps$em = formItemNodeProps.emitReset,
              emitReset = _formItemNodeProps$em === void 0 ? false : _formItemNodeProps$em;

          formItemNodeProps.onCustomChange = function () {
            // 触发重置, 清空其他条件
            if (emitReset) {
              _this.onReset();
            }
          };
        }

        if (tpl === 'slider') {
          formItemNodeProps.onCustomChange = function () {
            _this.onSearch();
          };
        }

        formItemNode = /*#__PURE__*/React__default["default"].createElement(BuiltInComponent, formItemNodeProps);
      } // 自定义组件


      if (lodash.isFunction(tpl)) {
        var DynamicComponent = tpl;
        formItemNode = /*#__PURE__*/React__default["default"].createElement(DynamicComponent, formItemNodeProps);
      }

      return formItemNode;
    });

    _defineProperty(_assertThisInitialized(_this), "renderColumns", function () {
      var _assertThisInitialize3 = _assertThisInitialized(_this),
          props = _assertThisInitialize3.props,
          state = _assertThisInitialize3.state;

      var children = props.children;
      var columns = state.columns;
      var labelWidth = props.labelWidth || getFormItemLabelWidth(columns);
      var columnsNode = columns.filter(function (v) {
        return Boolean(v.visible);
      }).map(function (v, i) {
        var name = v.name,
            label = v.label,
            formListConfig = v.formListConfig,
            template = v.template;
        var formItemProps = getFormItemProps(v, {
          index: i,
          labelWidth: labelWidth
        }); // Form.List

        if (formListConfig) {
          var _ref3 = formListConfig || {},
              _ref3$min = _ref3.min,
              min = _ref3$min === void 0 ? 1 : _ref3$min,
              _ref3$max = _ref3.max,
              max = _ref3$max === void 0 ? 3 : _ref3$max,
              _ref3$record = _ref3.record,
              record = _ref3$record === void 0 ? null : _ref3$record,
              _ref3$rules = _ref3.rules,
              rules = _ref3$rules === void 0 ? [] : _ref3$rules;

          var formItemNode = _this.getFormItemNode(v);

          var emptyLabelNode = /*#__PURE__*/React__default["default"].createElement("span", {
            style: {
              width: labelWidth
            }
          });
          return /*#__PURE__*/React__default["default"].createElement(antd.Form.List, {
            name: name,
            key: formItemProps.key,
            rules: rules.map(function (v2) {
              if (lodash.isFunction(v2)) {
                return v2(label);
              }

              return v2;
            })
          }, function (fields, action, _ref4) {
            var errors = _ref4.errors;
            var add = action.add,
                remove = action.remove;
            return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, fields.map(function (field, index) {
              return /*#__PURE__*/React__default["default"].createElement(antd.Form.Item, _extends({}, lodash.omit(formItemProps, ['name']), {
                key: field.key,
                label: index === 0 ? formItemProps.label : emptyLabelNode,
                colon: index === 0
              }), /*#__PURE__*/React__default["default"].createElement(antd.Form.Item, _extends({}, field, {
                rules: formItemProps.rules,
                validateTrigger: ['onChange', 'onBlur'],
                noStyle: true
              }), formItemNode), /*#__PURE__*/React__default["default"].createElement("span", {
                className: getClassNames$1('list-operation')
              }, fields.length < max && /*#__PURE__*/React__default["default"].createElement(antd.Tooltip, {
                title: "\u590D\u5236\u6B64\u884C"
              }, /*#__PURE__*/React__default["default"].createElement(CopyOutlined, {
                onClick: function onClick() {
                  var formRefNode = _this.getFormRefNode();

                  var value = formRefNode.getFieldValue([name, field.name]);
                  add(value, index + 1);
                }
              })), fields.length > min && /*#__PURE__*/React__default["default"].createElement(antd.Tooltip, {
                title: "\u5220\u9664\u6B64\u884C"
              }, /*#__PURE__*/React__default["default"].createElement(DeleteOutlined, {
                onClick: function onClick() {
                  remove(field.name);
                }
              }))));
            }), /*#__PURE__*/React__default["default"].createElement(antd.Form.Item, {
              key: formItemProps.key,
              label: emptyLabelNode,
              colon: false
            }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
              type: "dashed",
              icon: /*#__PURE__*/React__default["default"].createElement(PlusOutlined, null),
              disabled: fields.length >= max,
              onClick: function onClick() {
                add(record);
              },
              style: {
                width: template.width + 48
              }
            }, "\u6DFB\u52A0\u4E00\u884C\u6570\u636E"), /*#__PURE__*/React__default["default"].createElement(antd.Form.ErrorList, {
              errors: errors
            })));
          });
        }

        return /*#__PURE__*/React__default["default"].createElement(antd.Form.Item, formItemProps, _this.getFormItemNode(v));
      });

      if (children) {
        var childrenNode = /*#__PURE__*/React__default["default"].createElement(antd.Form.Item, {
          colon: false,
          label: /*#__PURE__*/React__default["default"].createElement("div", {
            style: {
              width: labelWidth
            }
          }),
          key: "-1"
        }, props.children);
        columnsNode.push(childrenNode);
      }

      return columnsNode;
    });

    _defineProperty(_assertThisInitialized(_this), "renderSearchReset", function () {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          props = _assertThisInitialize4.props,
          state = _assertThisInitialize4.state,
          onReset = _assertThisInitialize4.onReset;

      var columns = state.columns;
      var showSearchBtn = props.showSearchBtn,
          showResetBtn = props.showResetBtn,
          extraConfig = props.extraConfig;

      if (tools.isEveryFalsy(showSearchBtn, showResetBtn)) {
        return null;
      }

      var showSearch = showSearchBtn;
      var showReset = showResetBtn; // 只有一项

      if (columns.length === 1) {
        var template = columns[0].template;
        var tpl = template.tpl,
            inputType = template.inputType; // 只有一个输入框

        if (tpl === 'input' && inputType === 'input') {
          showSearch = true;
        }

        showReset = false;
      }

      var labelWidth = props.labelWidth || getFormItemLabelWidth(columns);

      var _defaultExtraConfig$e = _objectSpread2(_objectSpread2({}, defaultExtraConfig$1), extraConfig),
          submitText = _defaultExtraConfig$e.submitText,
          resetText = _defaultExtraConfig$e.resetText,
          submitLabelWidth = _defaultExtraConfig$e.submitLabelWidth;

      return /*#__PURE__*/React__default["default"].createElement(antd.Form.Item, {
        colon: false,
        label: submitLabelWidth === 0 ? null : /*#__PURE__*/React__default["default"].createElement("div", {
          style: {
            width: lodash.isNull(submitLabelWidth) ? labelWidth : submitLabelWidth
          }
        }),
        className: getClassNames$1('form-item')
      }, showSearch && /*#__PURE__*/React__default["default"].createElement(antd.Button, {
        type: "primary",
        htmlType: "submit",
        key: "submit"
      }, submitText), showReset && /*#__PURE__*/React__default["default"].createElement(antd.Button, {
        onClick: onReset,
        key: "reset"
      }, resetText));
    });

    _this.state = {
      columns: [],
      initialValues: {}
    };
    _this.formRef = /*#__PURE__*/React__default["default"].createRef();
    _this.filterPanelRef = /*#__PURE__*/React__default["default"].createRef();
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this$props, disabled, columns, autoSubmit, innerColumns, initialValues;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$props = this.props, disabled = _this$props.disabled, columns = _this$props.columns, autoSubmit = _this$props.autoSubmit;
                innerColumns = mergeColumns$2(columns, {
                  disabled: disabled
                });
                validateColumns(innerColumns); // 初始值

                initialValues = getInitialValues(innerColumns);
                _context3.next = 6;
                return tools.setAsyncState(this, {
                  columns: innerColumns,
                  initialValues: initialValues
                });

              case 6:
                if (!tools.isEmptyArray(innerColumns)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return");

              case 8:
                if (autoSubmit) {
                  this.onSearch();
                }

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }() // 获取 formNode

  }, {
    key: "render",
    value: function render() {
      var _this2 = this,
          _classNames;

      var props = this.props,
          state = this.state,
          onSearch = this.onSearch,
          renderColumns = this.renderColumns,
          renderSearchReset = this.renderSearchReset;
      var columns = state.columns,
          initialValues = state.initialValues;
      var disabled = props.disabled,
          visibleFilterPanel = props.visibleFilterPanel;

      if (tools.isEmptyArray(columns)) {
        return null;
      }

      var cardProps = lodash.merge({}, defaulCardProps, props.cardProps);
      var formProps = lodash.merge({}, defaulFormProps, props.formProps);
      formProps.onFinish = onSearch;
      formProps.initialValues = initialValues;
      formProps.ref = this.formRef;

      if (props.onValuesChange) {
        formProps.onValuesChange = function (changedFields, allFields) {
          var formRefNode = _this2.getFormRefNode();

          var _Object$entries = Object.entries(changedFields),
              _Object$entries2 = _slicedToArray(_Object$entries, 1),
              _Object$entries2$ = _slicedToArray(_Object$entries2[0], 2),
              key = _Object$entries2$[0],
              value = _Object$entries2$[1];

          props.onValuesChange({
            key: key,
            value: value,
            changedFields: lodash.cloneDeep(changedFields),
            allFields: lodash.cloneDeep(allFields)
          }, _objectSpread2({
            columns: lodash.cloneDeep(columns),
            updateColumns: function updateColumns(list) {
              _this2.setState({
                columns: list
              });
            }
          }, formRefNode));
        };
      }

      return /*#__PURE__*/React__default["default"].createElement(antd.Card, _extends({
        className: tools.classNames(getClassNames$1(), (_classNames = {}, _defineProperty(_classNames, getClassNames$1('disabled'), disabled), _defineProperty(_classNames, getClassNames$1('antd-v3'), isAntdV3$1), _classNames))
      }, cardProps), /*#__PURE__*/React__default["default"].createElement(antd.Form, formProps, renderColumns(), renderSearchReset()), visibleFilterPanel && /*#__PURE__*/React__default["default"].createElement(Index$4, {
        ref: this.filterPanelRef,
        columns: columns,
        getFieldsValue: function getFieldsValue() {
          var formRefNode = _this2.getFormRefNode();

          return formRefNode.getFieldsValue();
        },
        onChange: function onChange(fields) {
          var formRefNode = _this2.getFormRefNode();

          formRefNode.setFields(fields);

          _this2.onSearch();
        }
      }));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$3, "displayName", componentName$1);

_defineProperty(Index$3, "defaultProps", {
  disabled: false,
  // false: 编辑模式; true: 详情模式
  autoSubmit: true,
  showSearchBtn: false,
  showResetBtn: true,
  cardProps: {},
  formProps: {},
  labelWidth: 0,
  visibleFilterPanel: false,
  extraConfig: defaultExtraConfig$1
});

_defineProperty(Index$3, "propTypes", {
  disabled: PropTypes__default["default"].bool,
  columns: PropTypes__default["default"].array.isRequired,
  // 自动触发搜索
  autoSubmit: PropTypes__default["default"].bool,
  // 展示搜索按钮
  showSearchBtn: PropTypes__default["default"].bool,
  // 展示重置按钮
  showResetBtn: PropTypes__default["default"].bool,
  // 事件: 提交 (submitData, formData) => {}
  onSubmit: PropTypes__default["default"].func,
  // 事件: 重置 (columns)
  onReset: PropTypes__default["default"].func,
  // Card 的属性 https://ant.design/components/card-cn/#API
  cardProps: PropTypes__default["default"].object,
  // Form 的属性 https://ant.design/components/form-cn/#API
  formProps: PropTypes__default["default"].object,
  // Form.Item label 的宽度
  labelWidth: PropTypes__default["default"].number,
  // 是否显示 筛选区
  visibleFilterPanel: PropTypes__default["default"].bool,
  // 额外配置
  extraConfig: PropTypes__default["default"].object
});

Object.entries(BuiltInComponents).forEach(function (_ref5) {
  var _ref6 = _slicedToArray(_ref5, 2),
      k = _ref6[0],
      v = _ref6[1];

  var name = tools.pascalCase(k);
  Index$3[name] = v;
});

var defaultSvgProps = {
  viewBox: '64 64 896 896',
  focusable: 'false',
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'currentColor',
  width: '1em',
  height: '1em'
};

var getSvgProps = function getSvgProps(props) {
  return _objectSpread2(_objectSpread2({}, defaultSvgProps), lodash.omit(props, 'className'));
};

var QuestionCircleOutlined = function QuestionCircleOutlined(props) {
  var svgProps = getSvgProps(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", _extends({
    viewBox: "64 64 896 896",
    focusable: "false",
    xmlns: "http://www.w3.org/2000/svg"
  }, svgProps), /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
  })));
};
var CloseCircleFilled = function CloseCircleFilled(props) {
  var svgProps = getSvgProps(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
  })));
};
var EllipsisOutlined = function EllipsisOutlined(props) {
  var svgProps = getSvgProps(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"
  })));
};
var FileImageOutlined = function FileImageOutlined(props) {
  var svgProps = getSvgProps(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M553.1 509.1l-77.8 99.2-41.1-52.4a8 8 0 00-12.6 0l-99.8 127.2a7.98 7.98 0 006.3 12.9H696c6.7 0 10.4-7.7 6.3-12.9l-136.5-174a8.1 8.1 0 00-12.7 0zM360 442a40 40 0 1080 0 40 40 0 10-80 0zm494.6-153.4L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"
  })));
};
var FilterFilled = function FilterFilled(props) {
  var svgProps = getSvgProps(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z"
  })));
};
var MenuOutlined = function MenuOutlined(props) {
  var svgProps = getSvgProps(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"
  })));
};
var SettingOutlined = function SettingOutlined(props) {
  var svgProps = getSvgProps(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"
  })));
};
var FullscreenOutlined = function FullscreenOutlined(props) {
  var svgProps = getSvgProps(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"
  })));
};
var FullscreenExitOutlined = function FullscreenExitOutlined(props) {
  var svgProps = getSvgProps(props);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: tools.classNames('anticon', props.className)
  }, /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"
  })));
};

var isAntdV3 = lodash.inRange(parseInt(antd.version, 10), 3, 4);
lodash.inRange(parseInt(antd.version, 10), 4, 5);
var componentName = 'DynamicTable';
var prefixClassName = lodash.kebabCase(componentName);
var getComponentName = function getComponentName() {
  var compName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return [componentName, compName].join('');
};
var getClassNames = function getClassNames() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return tools.classNames(args).split(' ').map(function (v) {
    return [prefixClassName, v].join('-');
  }).join(' ');
}; // Tooltip 支持链接的写法

var getTooltipTitleNode = function getTooltipTitleNode(tooltip) {
  return tools.getTooltipHtml(tooltip).map(function (v, i) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      key: [i].join(),
      dangerouslySetInnerHTML: {
        __html: v
      }
    });
  });
};

var EditableContext = /*#__PURE__*/React__default["default"].createContext(null);
var SortableItem = reactSortableHoc.SortableElement(function (props) {
  return /*#__PURE__*/React__default["default"].createElement("tr", props);
});
var DragType = getComponentName('DraggableBodyRow');

var getTabeTrNode = function getTabeTrNode(trNode) {
  var _Form$useForm = antd.Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  return /*#__PURE__*/React__default["default"].createElement(antd.Form, {
    form: form,
    component: false
  }, /*#__PURE__*/React__default["default"].createElement(EditableContext.Provider, {
    value: form
  }, trNode));
};

var EditableDraggableRow = function EditableDraggableRow(props) {
  var record = props.record,
      index = props.index,
      handleMoveRow = props.handleMoveRow,
      rowDraggable = props.rowDraggable,
      cellDraggable = props.cellDraggable,
      disabledSort = props.disabledSort,
      className = props.className,
      style = props.style;
  var resetProps = lodash.omit(props, ['record', 'handleMoveRow', 'rowDraggable', 'cellDraggable', 'disabledSort']); // 拖拽-整行

  if (rowDraggable) {
    // 禁止拖拽
    var disabled = lodash.isFunction(disabledSort) ? disabledSort(record, index) : false;

    if (disabled) {
      return getTabeTrNode( /*#__PURE__*/React__default["default"].createElement("tr", resetProps));
    }

    var dragRef = React.useRef();

    var _useDrop = reactDnd.useDrop({
      accept: DragType,
      collect: function collect(monitor) {
        var _ref = monitor.getItem() || {},
            dragIndex = _ref.index;

        if (dragIndex === index) {
          return {};
        }

        return {
          isOver: monitor.isOver(),
          dropClassName: getClassNames(dragIndex < index ? 'drop-over-downward' : 'drop-over-upward')
        };
      },
      drop: function drop(item) {
        handleMoveRow(item.index, index);
      }
    }),
        _useDrop2 = _slicedToArray(_useDrop, 2),
        _useDrop2$ = _useDrop2[0],
        isOver = _useDrop2$.isOver,
        dropClassName = _useDrop2$.dropClassName,
        drop = _useDrop2[1];

    var _useDrag = reactDnd.useDrag({
      type: DragType,
      item: {
        index: index
      },
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging()
        };
      }
    }),
        _useDrag2 = _slicedToArray(_useDrag, 2),
        drag = _useDrag2[1];

    drop(drag(dragRef));
    style.cursor = 'move';
    return getTabeTrNode( /*#__PURE__*/React__default["default"].createElement("tr", _extends({
      ref: dragRef,
      className: "".concat(className, " ").concat(isOver ? dropClassName : ''),
      style: _objectSpread2({}, style)
    }, resetProps)));
  } // 拖拽-单元格


  if (cellDraggable) {
    return getTabeTrNode( /*#__PURE__*/React__default["default"].createElement(SortableItem, _extends({
      index: index
    }, resetProps)));
  }

  return getTabeTrNode( /*#__PURE__*/React__default["default"].createElement("tr", resetProps));
};

var getEditableCell = function getEditableCell(_ref2) {
  var size = _ref2.size,
      columns = _ref2.columns;
  return function (props) {
    var editable = props.editable,
        children = props.children,
        index = props.index,
        dataIndex = props.dataIndex,
        record = props.record,
        rules = props.rules,
        handleEditRow = props.handleEditRow;
    var restProps = lodash.omit(props, ['editable', 'children', 'index', 'dataIndex', 'record', 'rules', 'handleEditRow']);

    if (!record) {
      return /*#__PURE__*/React__default["default"].createElement("td", restProps, children);
    }

    var form = React.useContext(EditableContext);
    var computedRules = lodash.flatten([rules]).filter(Boolean);
    var value = lodash.get(record, dataIndex);
    React.useEffect(function () {
      form.setFieldsValue(_defineProperty({}, dataIndex, value));
    });

    var save = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var values, tempValue;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return form.validateFields();

              case 3:
                values = _context.sent;
                tempValue = lodash.get(values, dataIndex);
                tempValue = lodash.isString(tempValue) ? tempValue.trim() : tempValue;
                handleEditRow({
                  index: index,
                  dataIndex: dataIndex,
                  value: tempValue
                });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                // eslint-disable-next-line no-console
                console.error('保存失败:', _context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function save() {
        return _ref3.apply(this, arguments);
      };
    }();

    var childNode = children;

    if (editable) {
      var column = lodash.find(columns, {
        dataIndex: dataIndex
      });
      var template = column.template;
      var tpl = template.tpl;
      var FormItemNode;
      var FormItemNodeProps = {
        onChange: save,
        size: size,
        style: {
          width: '100%'
        }
      };
      Object.assign(FormItemNodeProps, lodash.omit(template, ['emptyText'])); // 内置组件

      if (Object.keys(BuiltInComponents).includes(tpl)) {
        var BuiltInComponent = BuiltInComponents[tpl];

        if (tpl === 'input') {
          delete FormItemNodeProps.onChange;
          FormItemNodeProps.onPressEnter = save;
          FormItemNodeProps.onBlur = save;
          FormItemNodeProps.inputWidth = '100%';
        }

        if (tpl === 'number-range') {
          var _dataIndex$split = dataIndex.split(','),
              _dataIndex$split2 = _slicedToArray(_dataIndex$split, 2),
              key1 = _dataIndex$split2[0],
              key2 = _dataIndex$split2[1];

          if (tools.isEveryTruthy(lodash.get(record, key1), lodash.get(record, key2))) {
            value = [lodash.get(record, key1), lodash.get(record, key2)];
          } else {
            value = [];
          }
        }

        if (tpl === 'date-picker' && value) {
          value = moment__default["default"](value);
        }

        if (tpl === 'date-range-picker') {
          var _dataIndex$split3 = dataIndex.split(','),
              _dataIndex$split4 = _slicedToArray(_dataIndex$split3, 2),
              _key = _dataIndex$split4[0],
              _key2 = _dataIndex$split4[1];

          if (tools.isEveryTruthy(lodash.get(record, _key), lodash.get(record, _key2))) {
            value = [moment__default["default"](lodash.get(record, _key)), moment__default["default"](lodash.get(record, _key2))];
          }
        }

        if (tpl === 'time-picker') {
          var _template$format = template.format,
              format = _template$format === void 0 ? 'HH:mm:ss' : _template$format;

          if (value) {
            value = moment__default["default"](value, format);
          }
        }

        if (tpl === 'time-range-picker') {
          var _template$format2 = template.format,
              _format = _template$format2 === void 0 ? 'HH:mm:ss' : _template$format2;

          var _dataIndex$split5 = dataIndex.split(','),
              _dataIndex$split6 = _slicedToArray(_dataIndex$split5, 2),
              _key3 = _dataIndex$split6[0],
              _key4 = _dataIndex$split6[1];

          if (tools.isEveryTruthy(lodash.get(record, _key3), lodash.get(record, _key4))) {
            value = [moment__default["default"](lodash.get(record, _key3), _format), moment__default["default"](lodash.get(record, _key4), _format)];
          }
        }

        FormItemNode = /*#__PURE__*/React__default["default"].createElement(BuiltInComponent, FormItemNodeProps);
      }

      childNode = /*#__PURE__*/React__default["default"].createElement(antd.Form.Item, {
        noStyle: true,
        name: dataIndex,
        initialValue: value,
        rules: computedRules
      }, FormItemNode);
    }

    return /*#__PURE__*/React__default["default"].createElement("td", restProps, childNode);
  };
};

var SortableBody = reactSortableHoc.SortableContainer(function (props) {
  return /*#__PURE__*/React__default["default"].createElement("tbody", props);
});

var getDraggableContainer = function getDraggableContainer(handleMoveRow) {
  return function (props) {
    return /*#__PURE__*/React__default["default"].createElement(SortableBody, _extends({
      useDragHandle: true,
      disableAutoscroll: true,
      helperClass: getClassNames('row-dragging'),
      onSortEnd: function onSortEnd(_ref4) {
        var oldIndex = _ref4.oldIndex,
            newIndex = _ref4.newIndex;
        handleMoveRow(oldIndex, newIndex);
      }
    }, props));
  };
};

var getTableComponents = (function (config) {
  var size = config.size,
      columns = config.columns,
      cellDraggable = config.cellDraggable,
      handleMoveRow = config.handleMoveRow;
  var components = {
    body: {
      row: EditableDraggableRow,
      cell: getEditableCell({
        size: size,
        columns: columns
      })
    }
  };

  if (cellDraggable) {
    components.body.wrapper = getDraggableContainer(handleMoveRow);
  }

  return components;
});

var Paragraph = antd.Typography.Paragraph;

var getValue = function getValue(dataIndex, emptyText, record) {
  var value = lodash.get(record, dataIndex);
  return tools.isEmptyValue(value) ? emptyText : value;
};

var renderButtonList = function renderButtonList(list, context) {
  return list.map(function (v) {
    var text = v.text,
        key = v.key,
        visible = v.visible,
        query = v.query,
        tooltip = v.tooltip,
        PopconfirmConfig = v.PopconfirmConfig,
        ModalConfirmConfig = v.ModalConfirmConfig;
    var props = lodash.omit(v, ['key', 'text', 'visible', 'query', 'tooltip', 'isMore', 'PopconfirmConfig', 'ModalConfirmConfig']);
    var defaultProps = {
      type: 'link',
      size: 'small',
      children: text
    };

    if (!tools.isEmptyObject(query)) {
      props.href = tools.stringifyUrl(props.href || '', query);
    }

    if (!visible) {
      return null;
    }

    var getButtonNode = function getButtonNode() {
      var extraProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var buttonNode = /*#__PURE__*/React__default["default"].createElement(antd.Button, _extends({
        key: key,
        type: "link",
        size: "small"
      }, _objectSpread2(_objectSpread2(_objectSpread2({}, defaultProps), props), extraProps)));

      if (tooltip) {
        return /*#__PURE__*/React__default["default"].createElement(antd.Tooltip, {
          title: getTooltipTitleNode(tooltip),
          key: key
        }, buttonNode);
      }

      return buttonNode;
    };

    if (PopconfirmConfig) {
      return /*#__PURE__*/React__default["default"].createElement(antd.Popconfirm, _extends({}, PopconfirmConfig, {
        key: key,
        onConfirm: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return PopconfirmConfig.onConfirm();

                case 2:
                  if (context && context.handleSearch) {
                    context.handleSearch({}, false);
                  }

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))
      }), getButtonNode());
    }

    if (ModalConfirmConfig) {
      var handleClick = function handleClick() {
        antd.Modal.confirm(_objectSpread2(_objectSpread2({}, ModalConfirmConfig), {}, {
          onOk: function () {
            var _onOk = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return ModalConfirmConfig.onOk();

                    case 2:
                      if (context && context.handleSearch) {
                        context.handleSearch({}, false);
                      }

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

            function onOk() {
              return _onOk.apply(this, arguments);
            }

            return onOk;
          }()
        }));
      };

      return getButtonNode({
        onClick: handleClick
      });
    }

    return getButtonNode();
  });
};

var DragHandle = reactSortableHoc.SortableHandle(function (props) {
  return props.children;
});
var getRender = (function (_ref2, context) {
  var dataIndex = _ref2.dataIndex,
      transform = _ref2.transform,
      template = _ref2.template;

  if (!template) {
    return lodash.noop;
  }

  return function (text, record, index) {
    var tpl = template.tpl,
        emptyText = template.emptyText;
    var value;

    if (lodash.isFunction(transform)) {
      value = transform(text, record, index);

      if (tools.isEmptyValue(value)) {
        value = emptyText;
      }
    } else {
      value = getValue(dataIndex, emptyText, record);
    } // 行号


    if (tpl === 'sort') {
      var _template$handler = template.handler,
          handler = _template$handler === void 0 ? /*#__PURE__*/React__default["default"].createElement(MenuOutlined, null) : _template$handler,
          _template$disabledSor = template.disabledSort,
          disabledSort = _template$disabledSor === void 0 ? null : _template$disabledSor;
      var disabled = lodash.isFunction(disabledSort) ? disabledSort(record, index) : false;
      var wrapClassName = tools.classNames(getClassNames('render-sort'), _defineProperty({}, getClassNames('render-sort-disabled'), disabled));
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: wrapClassName
      }, disabled ? handler : /*#__PURE__*/React__default["default"].createElement(DragHandle, null, handler));
    } // 行号


    if (tpl === 'numbering') {
      return index + 1;
    } // 普通文本


    if (tpl === 'text') {
      if (value === emptyText) {
        return emptyText;
      }

      var props = lodash.omit(template, ['tpl', 'emptyText', 'separator']);

      if (Array.isArray(value)) {
        if (tools.isEmptyArray(value)) {
          return emptyText;
        } // 分隔符


        var _template$separator = template.separator,
            separator = _template$separator === void 0 ? '' : _template$separator;

        if (separator === 'div') {
          return value.map(function (v, i) {
            return /*#__PURE__*/React__default["default"].createElement("div", {
              key: [i].join()
            }, v);
          });
        }

        return value.join(separator);
      }

      if (props.ellipsis) {
        props.ellipsis = _objectSpread2({
          tooltip: /*#__PURE__*/React__default["default"].createElement("div", {
            style: {
              maxHeight: 400,
              overflowY: 'auto'
            }
          }, value)
        }, props.ellipsis);
      }

      return /*#__PURE__*/React__default["default"].createElement(Paragraph, props, value);
    } // 枚举


    if (tpl === 'enum') {
      var _template$options = template.options,
          options = _template$options === void 0 ? [] : _template$options,
          _template$shape = template.shape,
          shape = _template$shape === void 0 ? 'text' : _template$shape;
      var valueText = tools.getLabelByValue(value, options, emptyText);

      if (valueText === emptyText) {
        return valueText;
      }

      var itemProps = lodash.omit(lodash.find(options, {
        value: value
      }), ['value', 'label']);

      if (shape === 'tag') {
        return /*#__PURE__*/React__default["default"].createElement(antd.Tag, _extends({
          className: getClassNames('render-tag')
        }, itemProps), valueText);
      }

      if (shape === 'circle') {
        var _itemProps$color = itemProps.color,
            color = _itemProps$color === void 0 ? 'rgba(0, 0, 0, 0.65)' : _itemProps$color;
        var style = {
          color: color,
          border: "1px solid ".concat(color)
        };
        return /*#__PURE__*/React__default["default"].createElement("span", {
          style: style,
          className: getClassNames(['render-enum', shape].join('-'))
        }, valueText);
      }

      if (['dot', 'square'].includes(shape)) {
        var _itemProps$color2 = itemProps.color,
            _color = _itemProps$color2 === void 0 ? 'rgba(0, 0, 0, 0.85)' : _itemProps$color2;

        return /*#__PURE__*/React__default["default"].createElement("span", {
          className: getClassNames(['render-enum', shape].join('-'))
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: getClassNames('render-enum-badge'),
          style: {
            backgroundColor: _color
          }
        }), /*#__PURE__*/React__default["default"].createElement("span", {
          className: getClassNames('render-enum-text'),
          style: {
            color: _color
          }
        }, valueText));
      }

      return valueText;
    } // 图片


    if (tpl === 'image') {
      var _template$width = template.width,
          width = _template$width === void 0 ? 50 : _template$width,
          _template$height = template.height,
          height = _template$height === void 0 ? 50 : _template$height;

      var _props = lodash.omit(template, ['tpl', 'emptyText']);

      if (value) {
        var ImageProps = _objectSpread2({
          src: value,
          alt: '',
          width: width,
          height: height
        }, _props);

        return /*#__PURE__*/React__default["default"].createElement(antd.Image, ImageProps);
      }

      return /*#__PURE__*/React__default["default"].createElement(FileImageOutlined, {
        style: {
          fontSize: width
        }
      });
    } // 日期


    if (tpl === 'date') {
      if (value === emptyText) {
        return emptyText;
      }

      var _template$format = template.format,
          format = _template$format === void 0 ? 'YYYY-MM-DD' : _template$format;
      return tools.formatTime(value, format, emptyText);
    } // 链接


    if (tpl === 'link') {
      var render = template.render;
      var list = lodash.flatten([render(value, record, index)]).map(function (v, i) {
        var icon = v.icon,
            tooltip = v.tooltip;
        var iconName = '';

        if (lodash.isString(icon)) {
          iconName = icon;
        }

        if (lodash.isObject(icon)) {
          iconName = lodash.get(icon, 'type.render.displayName');
        }

        var key = [i, v.text, iconName, tooltip].join();
        return lodash.merge({}, {
          key: key,
          visible: true,
          query: {},
          tooltip: '',
          isMore: false
        }, v);
      });
      var dropdownList = lodash.filter(list, {
        isMore: true
      });
      var menu = /*#__PURE__*/React__default["default"].createElement(antd.Menu, null, dropdownList.map(function (v) {
        return /*#__PURE__*/React__default["default"].createElement(antd.Menu.Item, {
          key: v.key
        }, renderButtonList([v], context));
      }));
      return [].concat(_toConsumableArray(renderButtonList(lodash.filter(list, {
        isMore: false
      }), context)), [!tools.isEmptyArray(dropdownList) && /*#__PURE__*/React__default["default"].createElement(antd.Dropdown, {
        key: "Dropdown",
        overlayClassName: getClassNames('render-link-dropdown'),
        overlay: menu,
        placement: "bottomRight",
        arrow: true
      }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
        icon: isAntdV3 ? 'ellipsis' : /*#__PURE__*/React__default["default"].createElement(EllipsisOutlined, null),
        type: "link",
        size: "small"
      }))]);
    } // 代码


    if (tpl === 'code') {
      if (value === emptyText) {
        return emptyText;
      }

      var language = template.language;

      if (language === 'json') {
        return /*#__PURE__*/React__default["default"].createElement("pre", {
          className: getClassNames('render-code')
        }, /*#__PURE__*/React__default["default"].createElement("code", null, JSON.stringify(value, '', 2)));
      }

      return /*#__PURE__*/React__default["default"].createElement("pre", {
        className: getClassNames('render-code')
      }, /*#__PURE__*/React__default["default"].createElement("code", null, value));
    } // 数字 - 千分位


    if (tpl === 'digit') {
      if (value === emptyText) {
        return emptyText;
      }

      var prefix = template.prefix,
          suffix = template.suffix;
      return [prefix, tools.thousands(value), suffix].join(' ');
    } // 百分比


    if (tpl === 'percent') {
      if (value === emptyText) {
        return emptyText;
      }

      var _template$precision = template.precision,
          precision = _template$precision === void 0 ? 2 : _template$precision,
          _template$times = template.times,
          times = _template$times === void 0 ? 2 : _template$times,
          _template$suffix = template.suffix,
          _suffix = _template$suffix === void 0 ? '%' : _template$suffix;

      var temp = Number(tools.mul(value, Math.pow(10, times)).toFixed(precision));
      return [temp, _suffix].join('');
    } // 评分


    if (tpl === 'rate') {
      if (value === emptyText) {
        return emptyText;
      }

      var _props2 = lodash.omit(template, ['tpl', 'emptyText']);

      return /*#__PURE__*/React__default["default"].createElement(antd.Rate, _extends({
        value: value,
        disabled: true
      }, _props2));
    } // 进度条


    if (tpl === 'progress') {
      if (value === emptyText) {
        return emptyText;
      }

      var _props3 = lodash.omit(template, ['tpl', 'emptyText']);

      return /*#__PURE__*/React__default["default"].createElement(antd.Progress, _extends({
        percent: value
      }, _props3));
    } // 表单


    if (Object.keys(BuiltInComponents).includes(tpl)) {
      var BuiltInComponent = BuiltInComponents[tpl];

      var _props4 = lodash.omit(template, ['tpl', 'emptyText']);

      return /*#__PURE__*/React__default["default"].createElement(BuiltInComponent, _extends({
        value: value
      }, _props4));
    }

    return null;
  };
});

var RenderTplList = [].concat(_toConsumableArray(Object.keys(BuiltInComponents)), ['sort', 'numbering', 'text', 'enum', 'image', 'date', 'link', 'code', 'digit', 'percent', 'rate', 'progress']);
var defaultExtraConfig = {
  showTotal: false,
  // 是否在表头展示总数据 false / true / (totalNum) => ReactNode
  storageKey: '',
  // 存储的key
  fullScreen: false,
  // 展示全屏按钮
  disabledSort: null // 禁止拖拽排序

};
var getStorageKey = function getStorageKey(storageKey) {
  var _window$location = window.location,
      pathname = _window$location.pathname,
      hash = _window$location.hash;
  var hashEndIndex = hash.includes('?') ? hash.indexOf('?') : Infinity;
  var hashPath = hash.slice(1, hashEndIndex);
  return [componentName, 'ColumnsSetting', pathname, hashPath, storageKey].filter(Boolean).join('_');
}; // 总条数

var renderTotalNum = function renderTotalNum(totalNum) {
  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, "\u603B\u8BA1", /*#__PURE__*/React__default["default"].createElement("span", {
    className: getClassNames('total')
  }, totalNum), "\u6761\u6570\u636E");
}; // 表格头部的总数据展示

var getRenderTotalNum = function getRenderTotalNum(totalNum, showTotal) {
  if (!showTotal) {
    return null;
  }

  if (lodash.isFunction(showTotal)) {
    return showTotal(totalNum);
  }

  return renderTotalNum(totalNum);
};
var defaultColumn$1 = {
  dataIndex: '',
  visible: true,
  // 显示|隐藏
  filters: [],
  // 筛选项 {label, value}[]
  filterMultiple: true,
  // 单选|多选
  editable: false,
  // 是否可编辑
  rules: [],
  // 交易规则 编辑态
  tooltip: '',
  // 表头提示文案
  transform: null,
  // 数据转换器
  template: {
    tpl: 'text',
    emptyText: '--'
  }
}; // 处理 props.columns

var mergeColumns$1 = function mergeColumns() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var context = arguments.length > 1 ? arguments[1] : undefined;
  var onFilterChange = context.onFilterChange,
      onFilterReset = context.onFilterReset,
      changeTreeSelect = context.changeTreeSelect,
      onFilterConfirm = context.onFilterConfirm,
      handleEditRow = context.handleEditRow;
  var innerColumns = lodash.cloneDeep(columns).map(function (v) {
    var column = lodash.merge({}, defaultColumn$1, v);
    var dataIndex = column.dataIndex,
        filters = column.filters,
        filterMultiple = column.filterMultiple,
        transform = column.transform,
        render = column.render,
        template = column.template; // 远端排序

    if (tools.isEmptyArray(filters)) {
      delete column.filters;
    } else {
      column.filterIcon = function () {
        var value = context.state.filterParams[dataIndex];
        var filtered = tools.isEveryFalsy(tools.isEmptyValue(value), tools.isEmptyArray(value));
        return /*#__PURE__*/React__default["default"].createElement(FilterFilled, {
          style: {
            color: filtered ? '#1890ff' : undefined
          }
        });
      };

      column.filterDropdown = function (props) {
        // 选中的值
        var value = context.state.filterParams[dataIndex];
        var confirm = props.confirm;
        var dropdownNode;
        var isTreeSelect = lodash.flatten(filters.map(function (v2) {
          return Object.keys(v2);
        })).includes('children');

        if (isTreeSelect) {
          dropdownNode = /*#__PURE__*/React__default["default"].createElement(antd.TreeSelect, {
            value: value,
            treeData: filters,
            onChange: function onChange(val) {
              onFilterChange(dataIndex, val);
            },
            style: {
              width: 200
            },
            dropdownMatchSelectWidth: 200,
            showSearch: true,
            treeNodeFilterProp: "label",
            treeNodeLabelProp: "label",
            maxTagCount: 1,
            dropdownStyle: {
              maxHeight: 400,
              overflowY: 'auto'
            },
            treeDefaultExpandAll: true,
            multiple: filterMultiple,
            treeCheckable: filterMultiple,
            open: context.state.treeSelectOpens[dataIndex] || false
          });
        } else {
          // 多选 / 单选
          if (filterMultiple) {
            dropdownNode = /*#__PURE__*/React__default["default"].createElement(antd.Checkbox.Group, {
              value: value,
              options: filters,
              onChange: function onChange(val) {
                onFilterChange(dataIndex, val);
              }
            });
          } else {
            dropdownNode = /*#__PURE__*/React__default["default"].createElement(antd.Radio.Group, {
              value: value,
              options: filters,
              onChange: function onChange(e) {
                onFilterChange(dataIndex, e.target.value);
              }
            });
          }
        }

        var disabledReset;

        if (filterMultiple) {
          disabledReset = lodash.isUndefined(value) || lodash.isEqual(value, []);
        } else {
          disabledReset = lodash.isUndefined(value) || lodash.isEqual(value, '');
        }

        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: tools.classNames(getClassNames('filter-dropdown'), _defineProperty({}, getClassNames('filter-dropdown-has-tree-select'), isTreeSelect))
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: getClassNames('filter-dropdown-options')
        }, dropdownNode), /*#__PURE__*/React__default["default"].createElement("div", {
          className: tools.classNames(getClassNames('filter-dropdown-footer'), _defineProperty({}, getClassNames('filter-dropdown-footer-hide'), isTreeSelect))
        }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
          size: "small",
          type: "text",
          disabled: disabledReset,
          onClick: function onClick() {
            onFilterReset(dataIndex, filterMultiple);
            confirm({
              closeDropdown: true
            });
          }
        }, "\u91CD\u7F6E"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
          size: "small",
          type: "primary",
          onClick: function onClick() {
            onFilterConfirm();
            confirm({
              closeDropdown: true
            });
          }
        }, "\u786E\u5B9A")));
      };

      column.onFilterDropdownVisibleChange = function (visible) {
        changeTreeSelect(visible, dataIndex);

        if (visible) {
          context.prevFilterValue = lodash.cloneDeep(context.state.filterParams);
        } else {
          if (lodash.isEqual(context.prevFilterValue, context.state.filterParams)) {
            return;
          }

          onFilterConfirm();
        }
      };
    } // 注入 transform


    if (lodash.isFunction(render)) {
      if (lodash.isFunction(transform)) {
        column.render = function (text, record, index) {
          var value = lodash.get(record, dataIndex);
          return render(transform(value, record, index), record, index);
        };
      } else {
        column.render = function (text, record, index) {
          var value = lodash.get(record, dataIndex);
          return render(value, record, index);
        };
      }
    } else {
      var tpl = template.tpl;

      if (RenderTplList.includes(tpl)) {
        // 行号 默认宽度
        if (tpl === 'numbering') {
          column.width = column.width || 55;
        } // 图片 默认宽度;默认值


        if (tpl === 'image') {
          column.width = column.width || 70;
          column.template.emptyText = '';
        }

        column.render = getRender({
          dataIndex: dataIndex,
          transform: transform,
          template: template
        }, context);
      }
    }

    return column;
  }).map(function (v) {
    var editable = v.editable,
        dataIndex = v.dataIndex,
        rules = v.rules;

    if (!editable) {
      return v;
    }

    return _objectSpread2(_objectSpread2({}, v), {}, {
      onCell: function onCell(record, index) {
        return {
          index: index,
          record: record,
          editable: editable,
          dataIndex: dataIndex,
          rules: rules,
          handleEditRow: handleEditRow
        };
      }
    });
  });
  return lodash.filter(innerColumns, {
    visible: true
  });
};
var getTitleNode = function getTitleNode(_ref, getPopupContainer) {
  var title = _ref.title,
      tooltip = _ref.tooltip;

  if (!(tooltip || '').length) {
    return title;
  }

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, title, /*#__PURE__*/React__default["default"].createElement(antd.Tooltip, {
    title: getTooltipTitleNode(tooltip),
    getPopupContainer: getPopupContainer
  }, /*#__PURE__*/React__default["default"].createElement(QuestionCircleOutlined, {
    className: getClassNames('column-title-tooltip')
  })));
}; // 显示|隐藏

var getRenderColumns = function getRenderColumns(columns, columnsTitleList, getPopupContainer) {
  return columns.filter(function (v, i) {
    // 不允许全都隐藏
    if (tools.isEmptyArray(columnsTitleList)) {
      return i === 0;
    }

    return columnsTitleList.includes(v.title);
  }).map(function (v) {
    return _objectSpread2(_objectSpread2({}, v), {}, {
      title: getTitleNode(v, getPopupContainer)
    });
  });
};

var injectPropsNode = function injectPropsNode(node) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!reactIs.isElement(node)) {
    return node;
  }

  return _objectSpread2(_objectSpread2({}, node), {}, {
    props: _objectSpread2(_objectSpread2({}, props), node.props)
  });
};

var injectPropsReactElement = function injectPropsReactElement(ReactNode) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!lodash.isObject(ReactNode)) {
    return ReactNode;
  }

  if (reactIs.isFragment(ReactNode)) {
    var children = ReactNode.props.children;
    return lodash.flatten([children]).map(function (v) {
      return injectPropsNode(v, props);
    });
  }

  if (reactIs.isElement(ReactNode)) {
    return injectPropsNode(ReactNode, props);
  }

  if (Array.isArray(ReactNode)) {
    return ReactNode.map(function (v) {
      return injectPropsNode(v, props);
    });
  }

  return ReactNode;
}; // 编辑 数据处理

var formatDataSource = function formatDataSource(_ref2) {
  var dataSource = _ref2.dataSource,
      index = _ref2.index,
      dataIndex = _ref2.dataIndex,
      value = _ref2.value,
      column = _ref2.column;
  var data = lodash.cloneDeep(dataSource);
  var template = column.template;
  var tpl = template.tpl;

  if (tpl === 'date-picker') {
    var _template$format = template.format,
        format = _template$format === void 0 ? 'YYYY-MM-DD' : _template$format;
    lodash.set(data[index], dataIndex, tools.formatTime(value, format, ''));
    return data;
  }

  if (tpl === 'date-range-picker') {
    var _dataIndex$split = dataIndex.split(','),
        _dataIndex$split2 = _slicedToArray(_dataIndex$split, 2),
        key1 = _dataIndex$split2[0],
        key2 = _dataIndex$split2[1];

    var _template$format2 = template.format,
        _format = _template$format2 === void 0 ? 'YYYY-MM-DD' : _template$format2;

    var _map = (value || ['', '']).map(function (v) {
      return tools.formatTime(v, _format, null);
    }),
        _map2 = _slicedToArray(_map, 2),
        value1 = _map2[0],
        value2 = _map2[1];

    lodash.set(data[index], key1, value1);
    lodash.set(data[index], key2, value2);
    return data;
  }

  if (tpl === 'time-picker') {
    var _template$format3 = template.format,
        _format2 = _template$format3 === void 0 ? 'HH:mm:ss' : _template$format3;

    lodash.set(data[index], dataIndex, tools.formatTime(value, _format2, ''));
    return data;
  }

  if (tpl === 'time-range-picker') {
    var _dataIndex$split3 = dataIndex.split(','),
        _dataIndex$split4 = _slicedToArray(_dataIndex$split3, 2),
        _key = _dataIndex$split4[0],
        _key2 = _dataIndex$split4[1];

    var _template$format4 = template.format,
        _format3 = _template$format4 === void 0 ? 'HH:mm:ss' : _template$format4;

    var _map3 = (value || ['', '']).map(function (v) {
      return tools.formatTime(v, _format3, null);
    }),
        _map4 = _slicedToArray(_map3, 2),
        _value = _map4[0],
        _value2 = _map4[1];

    lodash.set(data[index], _key, _value);
    lodash.set(data[index], _key2, _value2);
    return data;
  }

  if (tpl === 'number-range') {
    var _dataIndex$split5 = dataIndex.split(','),
        _dataIndex$split6 = _slicedToArray(_dataIndex$split5, 2),
        _key3 = _dataIndex$split6[0],
        _key4 = _dataIndex$split6[1];

    var _ref3 = value || [null, null],
        _ref4 = _slicedToArray(_ref3, 2),
        _value3 = _ref4[0],
        _value4 = _ref4[1];

    lodash.set(data[index], _key3, _value3);
    lodash.set(data[index], _key4, _value4);
    return data;
  }

  lodash.set(data[index], dataIndex, value);
  return data;
};
var getRowKeyData = function getRowKeyData() {
  var rowKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'key';
  var record = arguments.length > 1 ? arguments[1] : undefined;
  return lodash.isFunction(rowKey) ? rowKey(record) : record[rowKey];
}; // 移动数组

var arrayMove = function arrayMove(array, fromIndex, toIndex) {
  var immutable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  if (immutable) {
    array = lodash.cloneDeep(array);
  }

  var startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    var endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    var _array$splice = array.splice(fromIndex, 1),
        _array$splice2 = _slicedToArray(_array$splice, 1),
        item = _array$splice2[0];

    array.splice(endIndex, 0, item);
  }

  return array;
};

var Index$2 = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(_props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      var columns = _this.props.columns;
      var storageKey = getStorageKey(_this.props.storageKey);
      var checkedList = value;

      _this.setState({
        checkedList: checkedList,
        indeterminate: !!value.length && value.length < columns.length,
        checkAll: value.length === columns.length
      });

      _this.props.onColumnsChange(checkedList);

      window.localStorage.setItem(storageKey, JSON.stringify(checkedList));
    });

    _defineProperty(_assertThisInitialized(_this), "onCheckAllChange", function (e) {
      var columns = _this.props.columns;
      var storageKey = getStorageKey(_this.props.storageKey);
      var checked = e.target.checked;
      var checkedList = checked ? lodash.map(columns, 'title') : [];

      _this.setState({
        checkedList: checkedList,
        indeterminate: false,
        checkAll: checked
      });

      _this.props.onColumnsChange(checkedList);

      window.localStorage.setItem(storageKey, JSON.stringify(checkedList));
    });

    _defineProperty(_assertThisInitialized(_this), "getPopoverTitle", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          state = _assertThisInitialize.state,
          onCheckAllChange = _assertThisInitialize.onCheckAllChange;

      var indeterminate = state.indeterminate,
          checkAll = state.checkAll;
      return /*#__PURE__*/React__default["default"].createElement(antd.Checkbox, {
        indeterminate: indeterminate,
        onChange: onCheckAllChange,
        checked: checkAll
      }, "\u8868\u5934\u8BBE\u7F6E");
    });

    _defineProperty(_assertThisInitialized(_this), "getPopoverContent", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          state = _assertThisInitialize2.state,
          props = _assertThisInitialize2.props,
          onChange = _assertThisInitialize2.onChange;

      var columns = props.columns,
          getPopupContainer = props.getPopupContainer;
      var checkedList = state.checkedList;
      return /*#__PURE__*/React__default["default"].createElement(antd.Checkbox.Group, {
        value: checkedList,
        options: columns.map(function (v) {
          var title = v.title,
              tooltip = v.tooltip;
          return {
            label: getTitleNode({
              title: title,
              tooltip: tooltip
            }, getPopupContainer),
            value: title
          };
        }),
        onChange: onChange
      });
    });

    _this.state = {
      checkedList: [],
      // 选中的
      indeterminate: false,
      // 半角
      checkAll: true,
      // 全选
      fullscreened: false // 全屏

    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var columns = this.props.columns;
      var storageKey = getStorageKey(this.props.storageKey);

      if (storageKey) {
        var value = JSON.parse(window.localStorage.getItem(storageKey)); // 未设置

        if (lodash.isNull(value)) {
          this.setState({
            checkedList: lodash.map(columns, 'title'),
            indeterminate: false,
            checkAll: true
          });
          return;
        }

        this.setState({
          checkedList: value,
          indeterminate: !!value.length && value.length < columns.length,
          checkAll: value.length === columns.length
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props,
          state = this.state,
          getPopoverTitle = this.getPopoverTitle,
          getPopoverContent = this.getPopoverContent;
      var storageKey = props.storageKey,
          fullScreen = props.fullScreen,
          getPopupContainer = props.getPopupContainer;
      var fullscreened = state.fullscreened;
      var FullscreenIcon = fullscreened ? FullscreenExitOutlined : FullscreenOutlined;
      return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, !!fullScreen && /*#__PURE__*/React__default["default"].createElement(antd.Tooltip, {
        title: fullscreened ? '退出全屏' : '全屏',
        placement: fullscreened ? 'bottomRight' : 'topRight',
        arrowPointAtCenter: true,
        getPopupContainer: getPopupContainer
      }, /*#__PURE__*/React__default["default"].createElement(FullscreenIcon, {
        className: getClassNames('toolbar-icon'),
        onClick: function onClick() {
          _this2.setState(function (prevState) {
            return {
              fullscreened: !prevState.fullscreened
            };
          }, function () {
            props.onFullscreenonChange(!fullscreened);
          });
        }
      })), !!storageKey && /*#__PURE__*/React__default["default"].createElement(antd.Popover, {
        title: getPopoverTitle(),
        trigger: "click",
        content: getPopoverContent(),
        placement: "bottomRight",
        arrowPointAtCenter: true,
        overlayClassName: getClassNames('columns-setting-popover'),
        getPopupContainer: getPopupContainer
      }, /*#__PURE__*/React__default["default"].createElement(antd.Tooltip, {
        title: "\u8868\u5934\u8BBE\u7F6E",
        placement: fullscreened ? 'bottomRight' : 'topRight',
        arrowPointAtCenter: true,
        getPopupContainer: getPopupContainer
      }, /*#__PURE__*/React__default["default"].createElement(SettingOutlined, {
        className: getClassNames('toolbar-icon')
      }))));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$2, "displayName", getComponentName('Toolbar'));

_defineProperty(Index$2, "propTypes", {
  storageKey: PropTypes__default["default"].string,
  fullScreen: PropTypes__default["default"].bool,
  columns: PropTypes__default["default"].array,
  onColumnsChange: PropTypes__default["default"].func.isRequired
});

var Index$1 = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(_props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "getDataSource", function () {
      return lodash.cloneDeep(_this.state.dataSource);
    });

    _defineProperty(_assertThisInitialized(_this), "isLocalData", function () {
      var fetchFunc = lodash.get(_this.props, 'remoteConfig.fetch');
      return !lodash.isFunction(fetchFunc);
    });

    _defineProperty(_assertThisInitialized(_this), "getFilterParams", function () {
      return _this.state.filterParams;
    });

    _defineProperty(_assertThisInitialized(_this), "onFilterChange", function (dataIndex, value) {
      _this.setState(function (prevState) {
        return {
          filterParams: _objectSpread2(_objectSpread2({}, prevState.filterParams), {}, _defineProperty({}, dataIndex, value))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeTreeSelect", function (visible, dataIndex) {
      _this.setState(function (prevState) {
        var treeSelectOpens = prevState.treeSelectOpens;
        treeSelectOpens[dataIndex] = visible;
        return {
          treeSelectOpens: treeSelectOpens
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFilterConfirm", lodash.debounce( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return tools.setAsyncState(_assertThisInitialized(_this), {
                current: 1
              });

            case 2:
              _this.handleSearch({}, false);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })), 10));

    _defineProperty(_assertThisInitialized(_this), "onFilterReset", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dataIndex, filterMultiple) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return tools.setAsyncState(_assertThisInitialized(_this), function (prevState) {
                  return {
                    filterParams: _objectSpread2(_objectSpread2({}, prevState.filterParams), {}, _defineProperty({}, dataIndex, filterMultiple ? [] : ''))
                  };
                });

              case 2:
                _this.onFilterConfirm();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onChange", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(page) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return tools.setAsyncState(_assertThisInitialized(_this), {
                  current: page
                });

              case 2:
                _this.handleSearch({}, false);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onShowSizeChange", function (current, size) {
      setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return tools.setAsyncState(_assertThisInitialized(_this), {
                  pageSize: size,
                  current: 1
                });

              case 2:
                _this.handleSearch({}, false);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })), 0);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearch", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var _paginationParams;

      var searchParams,
          isReset,
          _assertThisInitialize,
          props,
          state,
          pagination,
          _props$remoteConfig,
          fetchFunc,
          _props$remoteConfig$p,
          process,
          dataSourceKey,
          path,
          _props$remoteConfig$t,
          totalKey,
          _props$remoteConfig$p2,
          pageSizeKey,
          _props$remoteConfig$c,
          currentPageKey,
          current,
          pageSize,
          paginationParams,
          filterParams,
          fetchParams,
          resOrigin,
          res,
          dataSource,
          total,
          _args5 = arguments;

      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              searchParams = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
              isReset = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : true;

              if (!_this.isLocalData()) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return");

            case 4:
              if (!isReset) {
                _context5.next = 7;
                break;
              }

              _context5.next = 7;
              return tools.setAsyncState(_assertThisInitialized(_this), {
                current: 1,
                filterParams: {}
              });

            case 7:
              _assertThisInitialize = _assertThisInitialized(_this), props = _assertThisInitialize.props, state = _assertThisInitialize.state;
              pagination = props.pagination;
              _props$remoteConfig = props.remoteConfig, fetchFunc = _props$remoteConfig.fetch, _props$remoteConfig$p = _props$remoteConfig.process, process = _props$remoteConfig$p === void 0 ? function (v) {
                return v;
              } : _props$remoteConfig$p, dataSourceKey = _props$remoteConfig.dataSourceKey, path = _props$remoteConfig.path, _props$remoteConfig$t = _props$remoteConfig.totalKey, totalKey = _props$remoteConfig$t === void 0 ? 'total' : _props$remoteConfig$t, _props$remoteConfig$p2 = _props$remoteConfig.pageSizeKey, pageSizeKey = _props$remoteConfig$p2 === void 0 ? 'pageSize' : _props$remoteConfig$p2, _props$remoteConfig$c = _props$remoteConfig.currentPageKey, currentPageKey = _props$remoteConfig$c === void 0 ? 'currentPage' : _props$remoteConfig$c;
              current = state.current, pageSize = state.pageSize;
              paginationParams = (_paginationParams = {}, _defineProperty(_paginationParams, pageSizeKey, pageSize), _defineProperty(_paginationParams, currentPageKey, current), _paginationParams);
              filterParams = _this.getFilterParams();
              fetchParams = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, paginationParams), filterParams), _this.cacheSearchParams), searchParams);

              if (!pagination) {
                delete fetchParams[pageSizeKey];
                delete fetchParams[currentPageKey];
              }

              _this.setState({
                loading: true,
                fetchError: false
              });

              _context5.next = 18;
              return fetchFunc(fetchParams)["catch"](function () {
                _this.setState({
                  fetchError: true
                });
              });

            case 18:
              resOrigin = _context5.sent;

              _this.setState({
                loading: false
              });

              res = process(lodash.cloneDeep(resOrigin)) || resOrigin;
              dataSource = lodash.get(res, dataSourceKey || path || 'list', []);
              total = lodash.get(res, totalKey, 0);

              _this.setState({
                dataSource: dataSource,
                total: total
              });

              if (isReset) {
                _this.cacheSearchParams = _objectSpread2({}, searchParams);
              }

            case 25:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));

    _defineProperty(_assertThisInitialized(_this), "handleEditRow", /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref6) {
        var index, dataIndex, value, _assertThisInitialize2, state, isLocalData, columns, dataSource, current, pageSize, column, pivot, computedIndex, record, oldDataSource, newDataSource, onEditableCellSave;

        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                index = _ref6.index, dataIndex = _ref6.dataIndex, value = _ref6.value;
                _assertThisInitialize2 = _assertThisInitialized(_this), state = _assertThisInitialize2.state, isLocalData = _assertThisInitialize2.isLocalData;
                columns = state.columns, dataSource = state.dataSource, current = state.current, pageSize = state.pageSize;
                column = lodash.find(columns, {
                  dataIndex: dataIndex
                });
                pivot = isLocalData() ? (current - 1) * pageSize : 0;
                computedIndex = pivot + index;
                record = dataSource[computedIndex];
                oldDataSource = lodash.cloneDeep(dataSource);
                newDataSource = formatDataSource({
                  dataSource: dataSource,
                  index: computedIndex,
                  dataIndex: dataIndex,
                  value: value,
                  column: column
                }); // 未变化

                if (!lodash.isEqual(value, lodash.get(record, dataIndex))) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt("return");

              case 11:
                onEditableCellSave = _this.props.onEditableCellSave;

                if (onEditableCellSave) {
                  _context6.next = 15;
                  break;
                }

                _this.setState({
                  dataSource: newDataSource
                });

                return _context6.abrupt("return");

              case 15:
                _context6.next = 17;
                return tools.setAsyncState(_assertThisInitialized(_this), {
                  loading: true,
                  dataSource: newDataSource
                });

              case 17:
                _context6.prev = 17;
                _context6.next = 20;
                return onEditableCellSave({
                  index: computedIndex,
                  dataIndex: dataIndex,
                  value: value
                }, lodash.cloneDeep(_this.state));

              case 20:
                _this.handleSearch({}, false);

                _this.setState({
                  loading: false
                });

                _context6.next = 28;
                break;

              case 24:
                _context6.prev = 24;
                _context6.t0 = _context6["catch"](17);
                antd.message.error(['数据保存失败', _context6.t0].filter(Boolean).join(': '));

                _this.setState({
                  loading: false,
                  dataSource: oldDataSource
                });

              case 28:

              case 29:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[17, 24]]);
      }));

      return function (_x4) {
        return _ref7.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "handleRemoveRow", function (key) {
      _this.setState(function (prevState) {
        return {
          dataSource: prevState.dataSource.filter(function (v) {
            return getRowKeyData(_this.props.rowKey, v) !== key;
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMoveRow", function (fromIndex, toIndex) {
      if (fromIndex === toIndex) {
        return;
      }

      var _assertThisInitialize3 = _assertThisInitialized(_this),
          props = _assertThisInitialize3.props,
          state = _assertThisInitialize3.state,
          isLocalData = _assertThisInitialize3.isLocalData;

      var onDragSortEnd = props.onDragSortEnd;
      var current = state.current,
          pageSize = state.pageSize,
          dataSource = state.dataSource;
      var pivot = isLocalData() ? (current - 1) * pageSize : 0;
      var newDataSource = arrayMove(dataSource, pivot + fromIndex, pivot + toIndex);

      _this.setState({
        dataSource: newDataSource
      });

      onDragSortEnd({
        newDataSource: newDataSource,
        dataSource: dataSource,
        fromIndex: pivot + fromIndex,
        toIndex: pivot + toIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeader", function () {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          props = _assertThisInitialize4.props,
          state = _assertThisInitialize4.state;

      var size = props.size,
          prependHeader = props.prependHeader,
          appendHeader = props.appendHeader;
      var dataSource = state.dataSource,
          total = state.total,
          columns = state.columns;

      var _defaultExtraConfig$p = _objectSpread2(_objectSpread2({}, defaultExtraConfig), props.extraConfig),
          showTotal = _defaultExtraConfig$p.showTotal,
          storageKey = _defaultExtraConfig$p.storageKey,
          fullScreen = _defaultExtraConfig$p.fullScreen;

      var hideHeader = tools.isEveryFalsy(showTotal, prependHeader, appendHeader, storageKey, fullScreen);
      var totalNum = total || dataSource.length;

      if (hideHeader) {
        return null;
      }

      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: getClassNames('header')
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: getClassNames('header-left')
      }, !!totalNum && showTotal && /*#__PURE__*/React__default["default"].createElement("div", null, getRenderTotalNum(totalNum, showTotal)), injectPropsReactElement(prependHeader, {
        size: size
      })), /*#__PURE__*/React__default["default"].createElement("div", {
        className: getClassNames('header-right')
      }, injectPropsReactElement(appendHeader, {
        size: size
      }), !tools.isEveryFalsy(storageKey, fullScreen) && /*#__PURE__*/React__default["default"].createElement(Index$2, {
        storageKey: storageKey,
        fullScreen: fullScreen,
        getPopupContainer: function getPopupContainer() {
          return _this.tableRef.current;
        },
        columns: columns,
        onColumnsChange: function onColumnsChange(value) {
          _this.setState({
            columnsTitleList: _toConsumableArray(value)
          });
        },
        onFullscreenonChange: function onFullscreenonChange(fullscreened) {
          if (fullscreened) {
            _this.tableRef.current.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }
      })));
    });

    var _ref8 = _props.pagination || {},
        defaultCurrent = _ref8.defaultCurrent,
        defaultPageSize = _ref8.defaultPageSize;

    _this.state = {
      fetchError: false,
      // 接口出错
      loading: false,
      columns: [],
      dataSource: [],
      columnsTitleList: [],
      // 显示|隐藏
      total: 0,
      current: defaultCurrent || 1,
      pageSize: defaultPageSize || 10,
      filterParams: {},
      // 筛选的数据
      treeSelectOpens: {} // TreeSelect 的显示状态

    };
    _this.tableRef = /*#__PURE__*/React__default["default"].createRef();
    _this.search = lodash.debounce(_this.handleSearch, 100); // 缓存 filterParams

    _this.prevFilterValue = {}; // 缓存 searchParams

    _this.cacheSearchParams = {};
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _defaultExtraConfig$t = _objectSpread2(_objectSpread2({}, defaultExtraConfig), this.props.extraConfig),
          storageKey = _defaultExtraConfig$t.storageKey;

      var columns = mergeColumns$1(this.props.columns, this);
      var columnsTitleList = lodash.map(columns, 'title');

      if (storageKey) {
        var storageCompleteKey = getStorageKey(storageKey);
        var titleList = JSON.parse(window.localStorage.getItem(storageCompleteKey));

        if (!lodash.isNull(titleList)) {
          columnsTitleList = titleList.filter(function (v) {
            return lodash.map(columns, 'title').includes(v);
          });
        }
      }

      this.setState({
        columns: columns,
        columnsTitleList: columnsTitleList
      });

      if (this.isLocalData()) {
        this.setState({
          dataSource: lodash.cloneDeep(this.props.dataSource)
        });
      }
    } // 外部获取数据

  }, {
    key: "render",
    value: function render() {
      var _classNames,
          _this2 = this;

      var props = this.props,
          state = this.state,
          onChange = this.onChange,
          onShowSizeChange = this.onShowSizeChange,
          renderHeader = this.renderHeader;
      var size = props.size,
          pagination = props.pagination,
          extraConfig = props.extraConfig;
      var columns = state.columns,
          columnsTitleList = state.columnsTitleList,
          dataSource = state.dataSource,
          total = state.total,
          current = state.current,
          pageSize = state.pageSize;
      var tableProps = lodash.omit(props, ['class', 'className', 'style', 'columns', 'dataSource', 'remoteConfig', 'pagination']);

      if (tools.isEmptyArray(columns)) {
        return null;
      }

      var loadingConfig = {
        spinning: state.loading,
        size: 'large',
        tip: '数据加载中...'
      };

      if (state.fetchError) {
        loadingConfig.wrapperClassName = getClassNames('fetch-error');
        loadingConfig.spinning = true;
        loadingConfig.tip = /*#__PURE__*/React__default["default"].createElement("span", {
          style: {
            color: colors.red.primary
          }
        }, "\u6570\u636E\u52A0\u8F7D\u51FA\u9519!");
        loadingConfig.indicator = /*#__PURE__*/React__default["default"].createElement(CloseCircleFilled, {
          style: {
            color: colors.red.primary
          }
        });
      } // 拖拽-单元格


      var cellDraggable = columns.some(function (v) {
        return v.template.tpl === 'sort';
      }); // 拖拽-整行

      var rowDraggable = !cellDraggable && tableProps.draggable;

      var _defaultExtraConfig$e = _objectSpread2(_objectSpread2({}, defaultExtraConfig), extraConfig),
          disabledSort = _defaultExtraConfig$e.disabledSort;

      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: tools.classNames('dynamic-table', props["class"], props.className, getClassNames(size), (_classNames = {}, _defineProperty(_classNames, getClassNames('bordered'), !!props.bordered), _defineProperty(_classNames, getClassNames('disable-pagination'), !props.pagination), _classNames)),
        ref: this.tableRef
      }, renderHeader(), /*#__PURE__*/React__default["default"].createElement(reactDnd.DndProvider, {
        backend: reactDndHtml5Backend.HTML5Backend
      }, /*#__PURE__*/React__default["default"].createElement(antd.Table, _extends({
        loading: loadingConfig
      }, tableProps, {
        columns: getRenderColumns(columns, columnsTitleList, function () {
          return _this2.tableRef.current;
        }),
        dataSource: dataSource,
        components: getTableComponents({
          size: size,
          columns: columns,
          cellDraggable: cellDraggable,
          rowDraggable: rowDraggable,
          handleMoveRow: this.handleMoveRow
        }),
        onRow: function onRow(record, index) {
          return {
            record: record,
            index: index,
            handleMoveRow: _this2.handleMoveRow,
            cellDraggable: cellDraggable,
            rowDraggable: rowDraggable,
            disabledSort: disabledSort
          };
        },
        rowClassName: function rowClassName() {
          return getClassNames('editable-row');
        },
        pagination: pagination && _objectSpread2(_objectSpread2({}, pagination), {}, {
          style: {
            padding: '16px 10px',
            margin: 0
          },
          onChange: onChange,
          onShowSizeChange: onShowSizeChange,
          showSizeChanger: true,
          total: total,
          current: current,
          pageSize: pageSize,
          showTotal: renderTotalNum
        })
      }))));
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index$1, "displayName", componentName);

_defineProperty(Index$1, "defaultProps", {
  size: 'default',
  pagination: {},
  extraConfig: defaultExtraConfig,
  draggable: false,
  onDragSortEnd: lodash.noop
});

_defineProperty(Index$1, "propTypes", {
  remoteConfig: PropTypes__default["default"].object,
  columns: PropTypes__default["default"].array.isRequired,
  dataSource: PropTypes__default["default"].array,
  size: PropTypes__default["default"].string,
  pagination: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].bool]),
  // 分页
  draggable: PropTypes__default["default"].bool,
  // 拖拽排序
  onDragSortEnd: PropTypes__default["default"].func,
  // 拖动排序完成回调
  extraConfig: PropTypes__default["default"].object // 额外配置, 方便管理扩展

});

var defaultColumn = {
  key: '',
  label: '',
  name: '',
  visible: true,
  tooltip: '',
  transform: null,
  // 数据转换器
  render: null,
  // 自定义渲染函数
  template: {
    tpl: 'text',
    emptyText: '--'
  }
};

var mergeColumns = function mergeColumns() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return lodash.cloneDeep(columns).map(function (v) {
    return lodash.merge({}, defaultColumn, v);
  });
};

var Index = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);
    _this.state = {
      loading: true
    };
    return _this;
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var props = this.props,
          state = this.state;
      var columns = props.columns,
          data = props.data;
      var loading = state.loading;
      var DescriptionsProps = lodash.omit(props, ['columns', 'data']);

      if (isAntdV3) {
        var title = DescriptionsProps.title,
            extra = DescriptionsProps.extra;

        if (DescriptionsProps.extra) {
          DescriptionsProps.title = /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
            className: getClassNames('descriptions-title')
          }, title), /*#__PURE__*/React__default["default"].createElement("div", {
            className: getClassNames('descriptions-extra')
          }, extra));
        }
      }

      return /*#__PURE__*/React__default["default"].createElement(antd.Spin, {
        spinning: loading,
        tip: "\u6570\u636E\u52A0\u8F7D\u4E2D..."
      }, /*#__PURE__*/React__default["default"].createElement(antd.Descriptions, _extends({}, DescriptionsProps, {
        className: tools.classNames(getClassNames('descriptions'), _defineProperty({}, getClassNames('antd-v3'), isAntdV3))
      }), mergeColumns(columns).filter(function (v) {
        return Boolean(v.visible);
      }).map(function (v, i) {
        var name = v.name,
            label = v.label,
            tooltip = v.tooltip,
            render = v.render,
            transform = v.transform,
            template = v.template;
        var value = lodash.get(data, name);
        var key = [label, name, v.key, i].join('__');

        var DescriptionsItemProps = _objectSpread2(_objectSpread2({}, lodash.omit(v, ['name'])), {}, {
          key: key
        });

        if (tooltip) {
          DescriptionsItemProps.label = /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, label, /*#__PURE__*/React__default["default"].createElement(antd.Tooltip, {
            title: getTooltipTitleNode(tooltip),
            overlayClassName: getClassNames('descriptions')
          }, /*#__PURE__*/React__default["default"].createElement(QuestionCircleOutlined, {
            className: getClassNames('descriptions-item-label-tooltip')
          })));
        }

        var content;

        if (render) {
          content = render(value, data, i);
        } else {
          content = getRender({
            dataIndex: name,
            transform: transform,
            template: template
          })(value, data, i);
        }

        return /*#__PURE__*/React__default["default"].createElement(antd.Descriptions.Item, DescriptionsItemProps, content);
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (!lodash.isEqual(nextProps.data, prevState.data)) {
        return {
          data: nextProps.data,
          loading: tools.isEmptyObject(nextProps.data) || tools.isEmptyValue(nextProps.data)
        };
      }

      return null;
    }
  }]);

  return Index;
}(React.Component);

_defineProperty(Index, "displayName", getComponentName('Descriptions'));

_defineProperty(Index, "defaultProps", {});

_defineProperty(Index, "propTypes", {});

exports.Descriptions = Index;
exports.Form = Index$3;
exports.Table = Index$1;
