"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _async = _interopRequireDefault(require("react-select/async"));

var _reactHookForm = require("react-hook-form");

var _reactQuery = require("react-query");

var _debouncePromise = _interopRequireDefault(require("debounce-promise"));

var _api = require("./api");

var _Field = _interopRequireDefault(require("./Field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CompanySearchByName = function CompanySearchByName(_ref) {
  var jurisdiction = _ref.jurisdiction,
      props = _objectWithoutProperties(_ref, ["jurisdiction"]);

  var loadOptions = (0, _react.useMemo)(function () {
    var searchByName = function searchByName(name) {
      return (0, _api.searchCompaniesByName)({
        jurisdiction: jurisdiction,
        name: name
      }).then(function (results) {
        return results.map(function (result) {
          return {
            value: result,
            label: result.name
          };
        });
      });
    };

    return (0, _debouncePromise["default"])(searchByName, 300, {
      trailing: true
    });
  }, [jurisdiction]);
  return /*#__PURE__*/_react["default"].createElement(_async["default"], _extends({
    cacheOptions: true,
    loadOptions: loadOptions
  }, props, {
    key: jurisdiction
  }));
};

function Step1(_ref2) {
  var onComplete = _ref2.onComplete;
  var jurisdictionList = (0, _reactQuery.useQuery)('jurisdictions', _api.getJurisdictions, {
    refetchOnWindowFocus: false
  });

  var _useForm = (0, _reactHookForm.useForm)({
    mode: 'onChange',
    defaultValues: {
      searchType: 'name'
    }
  }),
      handleSubmit = _useForm.handleSubmit,
      register = _useForm.register,
      control = _useForm.control,
      errors = _useForm.errors,
      getValues = _useForm.getValues,
      setValue = _useForm.setValue,
      watch = _useForm.watch,
      _useForm$formState = _useForm.formState,
      isSubmitting = _useForm$formState.isSubmitting,
      isSubmitted = _useForm$formState.isSubmitted,
      isValid = _useForm$formState.isValid;

  var _watch = watch(),
      searchType = _watch.searchType,
      legalJurisdiction = _watch.legalJurisdiction;

  var jurisdiction = legalJurisdiction === null || legalJurisdiction === void 0 ? void 0 : legalJurisdiction.value;
  (0, _react.useEffect)(function () {
    setValue('company', null, true);
  }, [jurisdiction, setValue]);

  var onSubmit = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
      var company, legalJurisdiction, values, jurisdiction, companyNumber, companyRecord;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              company = _ref3.company, legalJurisdiction = _ref3.legalJurisdiction, values = _objectWithoutProperties(_ref3, ["company", "legalJurisdiction"]);
              jurisdiction = legalJurisdiction.value;
              companyNumber = company ? company.value.companyNumber : values.companyNumber;
              _context.next = 5;
              return (0, _api.getCompany)({
                jurisdiction: jurisdiction,
                number: companyNumber
              });

            case 5:
              companyRecord = _context.sent;
              onComplete(_objectSpread({}, values, {
                jurisdiction: jurisdiction,
                company: companyRecord
              }));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onSubmit(_x) {
      return _ref4.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/_react["default"].createElement("section", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Company Information"), /*#__PURE__*/_react["default"].createElement(_Field["default"], {
    label: "Legal Jurisdiction",
    name: "legalJurisdiction"
  }, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
    as: /*#__PURE__*/_react["default"].createElement(_reactSelect["default"], {
      options: jurisdictionList.data || [],
      isLoading: jurisdictionList.isValidating
    }),
    name: "legalJurisdiction",
    rules: {
      required: true
    },
    control: control,
    onChange: function onChange(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          selected = _ref6[0];

      return selected;
    },
    defaultValue: null
  })), jurisdiction && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Field["default"], {
    label: "Find Company By",
    name: "searchType"
  }, /*#__PURE__*/_react["default"].createElement("select", {
    ref: register({
      required: true
    }, {
      defaultValue: 'name'
    })
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "name"
  }, "Name"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "number"
  }, "Number"))), searchType === 'name' && /*#__PURE__*/_react["default"].createElement(_Field["default"], {
    name: "company",
    label: "Company Name"
  }, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
    as: /*#__PURE__*/_react["default"].createElement(CompanySearchByName, {
      jurisdiction: jurisdiction
    }),
    rules: {
      required: true
    },
    control: control,
    onChange: function onChange(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 1),
          selected = _ref8[0];

      return selected;
    }
  })), searchType === 'number' && /*#__PURE__*/_react["default"].createElement(_Field["default"], {
    name: "companyNumber",
    label: "Company Number",
    ref: register({
      required: true
    })
  }), /*#__PURE__*/_react["default"].createElement("section", null, /*#__PURE__*/_react["default"].createElement(_Field["default"], null, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "isLevel2DataAvailable"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox",
    id: "isLevel2DataAvailable",
    name: "isLevel2DataAvailable",
    ref: register
  }), ' ', "This company is owned by another company (at least 50%)")))))), isValid && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    disabled: isSubmitting
  }, "Continue")));
}

var _default = Step1;
exports["default"] = _default;

//# sourceMappingURL=Step1.js.map