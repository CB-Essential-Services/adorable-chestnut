"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LeiRecord;

var _react = _interopRequireWildcard(require("react"));

var _LookupFormModule = _interopRequireDefault(require("./LookupForm.module.css"));

var _dateFns = require("date-fns");

var _useApi2 = _interopRequireDefault(require("./useApi"));

var _LookupForm = _interopRequireDefault(require("./LookupForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Address = function Address(_ref) {
  var address = _ref.address;
  return /*#__PURE__*/_react["default"].createElement("pre", null, [].concat(_toConsumableArray(address.addressLines), [address.city, address.region, address.country, address.postalCode]).join('\n'));
};

var ManagingLou = function ManagingLou(_ref2) {
  var record = _ref2.record;
  var entity = record.attributes.entity;
  var legalName = entity.legalName;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", null, "Managing LOU"), /*#__PURE__*/_react["default"].createElement("div", null, legalName.name));
};

function LeiRecord(_ref3) {
  var record = _ref3.record;

  if (!record) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _LookupFormModule["default"].emptyDetails
    }, "Select an entity to see more details");
  }

  var attributes = record.attributes,
      relationships = record.relationships;
  var lei = attributes.lei,
      entity = attributes.entity,
      registration = attributes.registration,
      bic = attributes.bic;
  var legalName = entity.legalName,
      legalAddress = entity.legalAddress,
      otherNames = entity.otherNames,
      headquartersAddress = entity.headquartersAddress,
      registeredAt = entity.registeredAt,
      registeredAs = entity.registeredAs,
      legalForm = entity.legalForm,
      associatedEntity = entity.associatedEntity,
      status = entity.status,
      expiration = entity.expiration;

  var _useApi = (0, _useApi2["default"])({
    key: relationships['managing-lou'].links.related
  }),
      _useApi$data = _useApi.data,
      managingLouResponse = _useApi$data === void 0 ? {} : _useApi$data;

  var managingLou = managingLouResponse.data;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _LookupFormModule["default"].leiRecord
  }, /*#__PURE__*/_react["default"].createElement("h1", null, entity.legalName.name), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("small", null, lei, " - ", status)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", null, "Other Names"), /*#__PURE__*/_react["default"].createElement("pre", null, otherNames.map(function (x) {
    return x.name;
  }).join('\n'))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", null, "Registration"), /*#__PURE__*/_react["default"].createElement("pre", null, ['Initial Date: ' + (0, _dateFns.format)(new Date(registration.initialRegistrationDate), 'PPPppp'), 'Last Update: ' + (0, _dateFns.format)(new Date(registration.lastUpdateDate), 'PPPppp'), 'Status: ' + registration.status, 'Next Renewal Date: ' + (0, _dateFns.format)(new Date(registration.nextRenewalDate), 'PPPppp'), 'Corroboration Level: ' + registration.corroborationLevel].join('\n'))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", null, "Address"), /*#__PURE__*/_react["default"].createElement(Address, {
    address: legalAddress
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", null, "Headquarters Address"), /*#__PURE__*/_react["default"].createElement(Address, {
    address: headquartersAddress
  })), managingLou && /*#__PURE__*/_react["default"].createElement(ManagingLou, {
    record: managingLou
  }));
}

//# sourceMappingURL=LeiRecord.js.map