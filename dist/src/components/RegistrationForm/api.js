"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompany = exports.searchCompaniesByName = exports.getOrder = exports.getJurisdictions = exports.createBillingPortalSession = exports.confirmOrder = exports.placeOrder = void 0;

var _frisbee = _interopRequireDefault(require("frisbee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ref = typeof document !== 'undefined' ? document.location : {},
    host = _ref.host,
    protocol = _ref.protocol;

var client = new _frisbee["default"]({
  baseURI: "".concat(host ? "".concat(protocol).concat(host) : '', "/.netlify/functions"),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

var placeOrder = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
    var _yield$client$post, body;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.post('/placeOrder', {
              body: payload
            });

          case 2:
            _yield$client$post = _context.sent;
            body = _yield$client$post.body;

            if (!body.error) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", Promise.reject(body.error));

          case 6:
            return _context.abrupt("return", body.order);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function placeOrder(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.placeOrder = placeOrder;

var confirmOrder = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload) {
    var _yield$client$post2, body;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return client.post('/confirm', {
              body: payload
            });

          case 2:
            _yield$client$post2 = _context2.sent;
            body = _yield$client$post2.body;

            if (!body.error) {
              _context2.next = 6;
              break;
            }

            throw new Error(body.error);

          case 6:
            return _context2.abrupt("return", body);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function confirmOrder(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.confirmOrder = confirmOrder;

var createBillingPortalSession = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(payload) {
    var _yield$client$post3, body;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return client.post('/createBillingPortalSession', {
              body: payload
            });

          case 2:
            _yield$client$post3 = _context3.sent;
            body = _yield$client$post3.body;

            if (!body.error) {
              _context3.next = 6;
              break;
            }

            throw new Error(body.error);

          case 6:
            return _context3.abrupt("return", body);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createBillingPortalSession(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createBillingPortalSession = createBillingPortalSession;

var getJurisdictions = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var _yield$client$get, body;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return client.get('/jurisdictions');

          case 2:
            _yield$client$get = _context4.sent;
            body = _yield$client$get.body;
            return _context4.abrupt("return", body);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getJurisdictions() {
    return _ref5.apply(this, arguments);
  };
}();

exports.getJurisdictions = getJurisdictions;

var getOrder = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(orderTrackingCode) {
    var _yield$client$get2, body;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return client.get("/order", {
              params: {
                orderTrackingCode: orderTrackingCode
              }
            });

          case 2:
            _yield$client$get2 = _context5.sent;
            body = _yield$client$get2.body;
            return _context5.abrupt("return", body);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getOrder(_x4) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getOrder = getOrder;

var searchCompaniesByName = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref7) {
    var jurisdiction, name, _yield$client$get3, body;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            jurisdiction = _ref7.jurisdiction, name = _ref7.name;
            _context6.next = 3;
            return client.get("/search", {
              params: {
                jurisdiction: jurisdiction,
                name: name
              }
            });

          case 3:
            _yield$client$get3 = _context6.sent;
            body = _yield$client$get3.body;
            return _context6.abrupt("return", body);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function searchCompaniesByName(_x5) {
    return _ref8.apply(this, arguments);
  };
}();

exports.searchCompaniesByName = searchCompaniesByName;

var getCompany = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref9) {
    var jurisdiction, number, _yield$client$get4, body;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            jurisdiction = _ref9.jurisdiction, number = _ref9.number;
            _context7.next = 3;
            return client.get("/company", {
              params: {
                jurisdiction: jurisdiction,
                number: number
              }
            });

          case 3:
            _yield$client$get4 = _context7.sent;
            body = _yield$client$get4.body;
            return _context7.abrupt("return", body);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getCompany(_x6) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getCompany = getCompany;

//# sourceMappingURL=api.js.map