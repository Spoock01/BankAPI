'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var router = (0, _express.Router)();

router.get('/operation', function (req, res, next) {
    res.send("Operation route");
});

router.get('/transactions', function (req, res, next) {
    res.send("Transactions route");
});

exports.default = router;
//# sourceMappingURL=transactions.js.map