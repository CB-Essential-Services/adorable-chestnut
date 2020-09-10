"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useApi;

var _swr = _interopRequireDefault(require("swr"));

var _unfetch = _interopRequireDefault(require("unfetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const BASE = new URL('https://leilookup.gleif.org/api/v2/leirecords')
var BASE = 'https://api.gleif.org/api/v1';

var fetchLei = function fetchLei(path) {
  var searchBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var url = new URL("".concat(BASE).concat(path));
  var params = {};

  if (searchBy) {
    params["filter[".concat(searchBy, "]")] = query.trim().replace(/\n/g, ',');
  }

  url.search = new URLSearchParams(params).toString();
  return (0, _unfetch["default"])(url).then(function (r) {
    return r.json();
  });
};

function useApi(options) {
  var _ref = options || {},
      key = _ref.key,
      searchBy = _ref.searchBy,
      query = _ref.query;

  var params = key ? [key.replace(BASE, ''), searchBy, query].filter(function (x) {
    return x;
  }) : null;
  return (0, _swr["default"])(params, fetchLei);
}

//# sourceMappingURL=useApi.js.map