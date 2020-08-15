"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Field = _react["default"].forwardRef(function (_ref, ref) {
  var label = _ref.label,
      name = _ref.name,
      children = _ref.children,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type,
      props = _objectWithoutProperties(_ref, ["label", "name", "children", "type"]);

  var childProps = {
    id: name,
    name: name
  };

  if (ref) {
    childProps.ref = ref;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: name
  }, label), /*#__PURE__*/_react["default"].createElement("div", null, children ? _react["default"].cloneElement(children, childProps) : /*#__PURE__*/_react["default"].createElement("input", _extends({
    id: name,
    name: name,
    ref: ref,
    type: type
  }, props))));
});

var _default = Field;
exports["default"] = _default;

//# sourceMappingURL=Field.js.map