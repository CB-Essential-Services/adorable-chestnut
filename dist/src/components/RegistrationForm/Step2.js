"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHookForm = require("react-hook-form");

var _reactStripeJs = require("@stripe/react-stripe-js");

var _gatsby = require("gatsby");

var _api = require("./api");

var _Field = _interopRequireDefault(require("./Field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Step2(_ref) {
  var _error$type;

  var state = _ref.state,
      onComplete = _ref.onComplete;
  var company = state.company,
      jurisdiction = state.jurisdiction;
  var officers = company.officers;
  var stripe = (0, _reactStripeJs.useStripe)();
  var elements = (0, _reactStripeJs.useElements)();

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      stripeError = _useState2[0],
      setStripeError = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useForm = (0, _reactHookForm.useForm)({
    mode: 'onChange',
    defaultValues: {}
  }),
      handleSubmit = _useForm.handleSubmit,
      register = _useForm.register,
      control = _useForm.control,
      errors = _useForm.errors,
      setValue = _useForm.setValue,
      getValues = _useForm.getValues,
      watch = _useForm.watch,
      _useForm$formState = _useForm.formState,
      isSubmitting = _useForm$formState.isSubmitting,
      isSubmitted = _useForm$formState.isSubmitted,
      isValid = _useForm$formState.isValid;

  var _watch = watch(),
      officer = _watch.officer;

  (0, _react.useEffect)(function () {
    if (officer) {
      var _officer$split = officer.split(' '),
          _officer$split2 = _toArray(_officer$split),
          firstName = _officer$split2[0],
          nameParts = _officer$split2.slice(1);

      setValue([{
        firstName: firstName
      }, {
        lastName: nameParts.join(' ')
      }]);
    }
  }, [officer, setValue]);

  var onSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values) {
      var _yield$stripe$createP, paymentMethod, newStripeError, payload, _yield$placeOrder, orderTrackingCode;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setError();
              setStripeError();

              if (!(!stripe || !elements)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              _context.next = 6;
              return stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(_reactStripeJs.CardElement),
                billing_details: {
                  name: "".concat(values.firstName, " ").concat(values.lastName),
                  email: values.email
                }
              });

            case 6:
              _yield$stripe$createP = _context.sent;
              paymentMethod = _yield$stripe$createP.paymentMethod;
              newStripeError = _yield$stripe$createP.error;

              if (!newStripeError) {
                _context.next = 13;
                break;
              }

              setStripeError(newStripeError);
              elements.getElement('card').focus();
              return _context.abrupt("return", Promise.resolve({
                success: false
              }));

            case 13:
              payload = _objectSpread({}, state, {}, values, {
                companyName: state.company.name,
                companyNumber: state.company.companyNumber,
                paymentMethod: paymentMethod.id,
                jurisdiction: jurisdiction
              });
              _context.prev = 14;
              _context.next = 17;
              return (0, _api.placeOrder)(payload);

            case 17:
              _yield$placeOrder = _context.sent;
              orderTrackingCode = _yield$placeOrder.orderTrackingCode;
              (0, _gatsby.navigate)("/status?orderTrackingCode=".concat(orderTrackingCode));
              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](14);
              setError(_context.t0);
              return _context.abrupt("return", Promise.resolve({
                success: false
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[14, 22]]);
    }));

    return function onSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/_react["default"].createElement("section", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Applicant Information"), /*#__PURE__*/_react["default"].createElement(_Field["default"], {
    name: "officer",
    label: "Officers",
    ref: register
  }, /*#__PURE__*/_react["default"].createElement("select", null, /*#__PURE__*/_react["default"].createElement("option", {
    value: ""
  }, "Find your name or add it below"), officers.map(function (_ref3) {
    var officer = _ref3.officer;
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: officer.id,
      value: officer.name
    }, officer.name);
  }))), /*#__PURE__*/_react["default"].createElement(_Field["default"], {
    name: "firstName",
    label: "First Name",
    ref: register({
      required: true
    })
  }), /*#__PURE__*/_react["default"].createElement(_Field["default"], {
    name: "lastName",
    label: "Last Name",
    ref: register({
      required: true
    })
  }), /*#__PURE__*/_react["default"].createElement(_Field["default"], {
    name: "email",
    label: "Email",
    type: "email",
    ref: register({
      required: true
    })
  })), /*#__PURE__*/_react["default"].createElement("section", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Payment Method"), /*#__PURE__*/_react["default"].createElement(_Field["default"], null, /*#__PURE__*/_react["default"].createElement(_reactStripeJs.CardElement, null))), /*#__PURE__*/_react["default"].createElement("section", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Submit Request"), /*#__PURE__*/_react["default"].createElement(_Field["default"], null, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "terms"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "terms",
    name: "terms",
    type: "checkbox",
    ref: register({
      required: true
    })
  }), ' ', "I hereby accept the Terms & Conditions and Privacy Policy and give permission to apply for an LEI."))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    disabled: isSubmitting
  }, isSubmitting ? 'Submitting...' : 'Submit')), error && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginTop: '1rem',
      color: 'red'
    }
  }, error.failureReason || ((_error$type = error.type) === null || _error$type === void 0 ? void 0 : _error$type.startsWith('StripeCardError')) && 'There was an error with your card.'), stripeError && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginTop: '1rem',
      color: 'red'
    }
  }, stripeError.message));
}

var _default = Step2;
exports["default"] = _default;

//# sourceMappingURL=Step2.js.map