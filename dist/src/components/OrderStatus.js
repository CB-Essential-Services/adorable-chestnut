"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactQuery = require("react-query");

var _reactUse = require("react-use");

var _api = require("./RegistrationForm/api");

var _dateFns = require("date-fns");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Row = function Row(_ref) {
  var label = _ref.label,
      value = _ref.value;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, label), /*#__PURE__*/_react["default"].createElement("div", null, value || 'N/A'));
};

var Address = function Address(_ref2) {
  var title = _ref2.title,
      data = _ref2.data;
  return /*#__PURE__*/_react["default"].createElement("section", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react["default"].createElement("h3", null, title), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "First Address Line",
    value: data.firstAddressLine
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "Additional Address Line 1",
    value: data.addressLine1
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "City/Town",
    value: data.city
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "State/Region",
    value: data.state
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "Country",
    value: data.country
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "Postal Code",
    value: data.postalCode
  }));
};

var ReferenceData = function ReferenceData(_ref3) {
  var data = _ref3.data;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("section", {
    style: {
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Legal Entity Reference Data (LE-RD)"), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(Row, {
    label: "Legal Name",
    value: data.legalName
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "Legal Jurisdiction",
    value: data.legalJurisdiction
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "Entity Legal Form",
    value: "".concat(data.entityLegalFormCode, " - ").concat(data.entityLegalForm)
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(Row, {
    label: "Registration Authority Entity ID",
    value: data.registrationAuthorityEntityId
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "Registration Authority",
    value: "".concat(data.registrationAuthorityId, " - ").concat(data.registrationAuthority)
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    label: "Entity Legal Status",
    value: data.entityStatus
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/_react["default"].createElement(Address, {
    title: "Legal Address",
    data: data.legalAddress
  }), /*#__PURE__*/_react["default"].createElement(Address, {
    title: "Headquarters Address",
    data: data.headquartersAddress
  })));
};

var ConfirmReferenceData = function ConfirmReferenceData(_ref4) {
  var _confirmationState$va, _confirmationState$er;

  var status = _ref4.status,
      orderTrackingCode = _ref4.orderTrackingCode,
      data = _ref4.data;

  var _useAsyncFn = (0, _reactUse.useAsyncFn)(function (approved) {
    return (0, _api.confirmOrder)({
      orderTrackingCode: orderTrackingCode,
      confirm: approved
    });
  }, [orderTrackingCode]),
      _useAsyncFn2 = _slicedToArray(_useAsyncFn, 2),
      confirmationState = _useAsyncFn2[0],
      confirm = _useAsyncFn2[1];

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginBottom: '1rem'
    }
  }, confirmationState.loading && 'Loading...', (_confirmationState$va = confirmationState.value) === null || _confirmationState$va === void 0 ? void 0 : _confirmationState$va.message, (_confirmationState$er = confirmationState.error) === null || _confirmationState$er === void 0 ? void 0 : _confirmationState$er.message, !confirmationState.value && !confirmationState.loading && !confirmationState.error && /*#__PURE__*/_react["default"].createElement("div", null, "Please verify the information below.", /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return confirm(true);
    }
  }, "Verify"), ' ', /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return confirm(false);
    },
    className: "button secondary"
  }, "Reject")))), data && /*#__PURE__*/_react["default"].createElement(ReferenceData, {
    data: data
  }));
};

var OrderStatus = function OrderStatus() {
  var orderTrackingCode = (0, _reactUse.useSearchParam)('orderTrackingCode');

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFulfilled = _useState2[0],
      setIsFulfilled = _useState2[1];

  var MINUTE = 60 * 1000;

  var _useQuery = (0, _reactQuery.useQuery)(orderTrackingCode, _api.getOrder, {
    refetchOnWindowFocus: !isFulfilled,
    refetchInterval: !isFulfilled && 1 * MINUTE,
    onSuccess: function onSuccess(data) {
      if ((data === null || data === void 0 ? void 0 : data.orderStatus) === 'complete') {
        setIsFulfilled(true);
      }
    }
  }),
      order = _useQuery.data,
      error = _useQuery.error;

  var openBillingSession = function openBillingSession() {
    (0, _api.createBillingPortalSession)({
      orderTrackingCode: orderTrackingCode
    }).then(function (session) {
      window.open(session.url);
    });
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "inner",
    style: {
      maxWidth: 700
    }
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "Order Status"), error && /*#__PURE__*/_react["default"].createElement("div", null, "An error occurred."), !order && /*#__PURE__*/_react["default"].createElement("div", null, "Loading..."), (order === null || order === void 0 ? void 0 : order.orderStatus) === 'in_progress' && !order.preAuthorityCheckLeiNumber && /*#__PURE__*/_react["default"].createElement("div", null, "Thank you for your order! It's currently in progress. You'll receive an email with updates soon."), (order === null || order === void 0 ? void 0 : order.orderStatus) === 'in_progress' && order.preAuthorityCheckLeiNumber && /*#__PURE__*/_react["default"].createElement("div", null, order.message), (order === null || order === void 0 ? void 0 : order.orderStatus) === 'complete' && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: openBillingSession
  }, "Manage Subscription")), /*#__PURE__*/_react["default"].createElement("p", null, order.message), /*#__PURE__*/_react["default"].createElement("p", null, "Your LEI is ", order.leiNumber, "."), order.nextRenewalDate && /*#__PURE__*/_react["default"].createElement("p", null, "The next renewal date is ", (0, _dateFns.format)(new Date(order.nextRenewalDate), 'PPP'), ".")), (order === null || order === void 0 ? void 0 : order.orderStatus) === 'stopped' && /*#__PURE__*/_react["default"].createElement("div", null, "Your application has been cancelled."), (order === null || order === void 0 ? void 0 : order.orderStatus) === 'pending_gui' && /*#__PURE__*/_react["default"].createElement("div", null, "You rejected the reference data for your order. Please contact us if you'd like to resume your application."), (order === null || order === void 0 ? void 0 : order.referenceData) && /*#__PURE__*/_react["default"].createElement(ConfirmReferenceData, {
    status: order.orderStatus,
    orderTrackingCode: orderTrackingCode,
    data: order.referenceData
  }));
};

var _default = OrderStatus;
exports["default"] = _default;

//# sourceMappingURL=OrderStatus.js.map