'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userRoute = require('./routes/userRoute');

var _userRoute2 = _interopRequireDefault(_userRoute);

var _transactions = require('./routes/transactions');

var _transactions2 = _interopRequireDefault(_transactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = 9999;

app.use(_express2.default.json());

app.use('/user', _userRoute2.default);
app.use('/transaction', _transactions2.default);

app.listen(port, function () {
    console.log('Started on port ' + port);
});

exports.default = app;
//# sourceMappingURL=index.js.map