"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return console.log("what");

				case 2:
					_context.next = 4;
					return console.log("is");

				case 4:
					_context.next = 6;
					return console.log("going");

				case 6:
					_context.next = 8;
					return console.log("on");

				case 8:
				case "end":
					return _context.stop();
			}
		}
	}, _callee, undefined);
}))();