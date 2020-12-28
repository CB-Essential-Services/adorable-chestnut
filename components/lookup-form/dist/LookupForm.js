"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactUse = require("react-use");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _LeiRecord = _interopRequireDefault(require("./LeiRecord"));

var _LookupFormModule = _interopRequireDefault(require("./LookupForm.module.css"));

var _useApi2 = _interopRequireDefault(require("./useApi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function LookupForm() {
  var searchOptions = [{
    label: 'Any',
    value: 'fulltext'
  }, {
    label: 'LEI',
    value: 'lei'
  }, {
    label: 'Entity Name',
    value: 'entity.names'
  }];

  var _useSetState = (0, _reactUse.useSetState)({
    searchBy: searchOptions[0].value,
    query: null
  }),
      _useSetState2 = _slicedToArray(_useSetState, 2),
      _useSetState2$ = _useSetState2[0],
      searchBy = _useSetState2$.searchBy,
      query = _useSetState2$.query,
      setState = _useSetState2[1];

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      params = _useState2[0],
      setParams = _useState2[1];

  var submit = function submit(e) {
    e.preventDefault();
    setParams({
      searchBy: searchBy,
      query: query
    });
  };

  var _useApi = (0, _useApi2["default"])(params ? _objectSpread({
    key: '/lei-records'
  }, params) : null),
      response = _useApi.data,
      error = _useApi.error;

  var _ref = response || {},
      data = _ref.data,
      meta = _ref.meta;

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      activeEntry = _useState4[0],
      setActiveEntry = _useState4[1];

  return /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: submit,
    className: _LookupFormModule["default"].form
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _LookupFormModule["default"].field
  }, /*#__PURE__*/_react["default"].createElement("label", null, "Field: "), /*#__PURE__*/_react["default"].createElement("select", {
    value: searchBy,
    onChange: function onChange(e) {
      return setState({
        searchBy: e.target.value
      });
    }
  }, searchOptions.map(function (_ref2) {
    var label = _ref2.label,
        value = _ref2.value;
    return /*#__PURE__*/_react["default"].createElement("option", {
      value: value,
      key: value
    }, label);
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _LookupFormModule["default"].field
  }, /*#__PURE__*/_react["default"].createElement("textarea", {
    onChange: function onChange(e) {
      return setState({
        query: e.target.value
      });
    },
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === 13 && e.ctrlKey) {
        submit(e);
      }
    },
    placeholder: "Paste a list of search terms (comma separated or one per line)",
    value: query,
    autoFocus: true,
    style: {
      width: '100%',
      fontFamily: 'inherit'
    }
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit"
  }, "Search"), " ", /*#__PURE__*/_react["default"].createElement("small", null, "(Ctrl + Enter)")), params && !data && /*#__PURE__*/_react["default"].createElement("div", {
    className: _LookupFormModule["default"].emptyDetails
  }, "Loading..."), data && data.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: _LookupFormModule["default"].results
  }, /*#__PURE__*/_react["default"].createElement("table", {
    className: _LookupFormModule["default"].results
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", null, "LEI"), /*#__PURE__*/_react["default"].createElement("th", null, "Name"), /*#__PURE__*/_react["default"].createElement("th", null, "Status"))), /*#__PURE__*/_react["default"].createElement("tbody", null, data.map(function (row) {
    var _row$attributes = row.attributes,
        lei = _row$attributes.lei,
        entity = _row$attributes.entity,
        registration = _row$attributes.registration;
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: lei,
      onClick: function onClick() {
        return setActiveEntry(row);
      },
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/_react["default"].createElement("td", null, lei), /*#__PURE__*/_react["default"].createElement("td", null, entity.legalName.name), /*#__PURE__*/_react["default"].createElement("td", null, registration.status));
  })))), data && /*#__PURE__*/_react["default"].createElement(_LeiRecord["default"], {
    record: activeEntry
  }));
}

var _default = LookupForm;
exports["default"] = _default;

//# sourceMappingURL=LookupForm.js.map