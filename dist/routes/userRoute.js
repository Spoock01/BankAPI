'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _Utils = require('../Utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// TODO Mudar query to Body

router.post('/register', [(0, _expressValidator.check)('full_name').exists().withMessage("Full name is required").not().isEmpty().withMessage("Full name cannot be empty").not().isNumeric().withMessage("Full name must be a string.").matches(_Utils2.default).withMessage("Full name must be characters only"), (0, _expressValidator.check)('cpf').exists().withMessage("CPF is required.").not().isEmpty().withMessage("CPF cannot be empty").matches(_Utils2.default).withMessage("Invalid cpf format."), (0, _expressValidator.check)('password').exists().withMessage("Password is required.").not().isEmpty().isLength({ min: 5 }).withMessage("Password must be at least 5 chars long.").isString().withMessage("Password must be a string.")], function (req, res, next) {

    console.log(req.query);

    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) res.send(errors);else res.send(req.query);
});

router.get('/login', [(0, _expressValidator.check)('cpf').exists().withMessage("CPF is required.").not().isEmpty().matches(_Utils2.default).withMessage("Invalid cpf format.").not().isAlphanumeric().withMessage("CPF must be a string."), (0, _expressValidator.check)('password').exists().withMessage("Password is required.").not().isEmpty().isLength({ min: 5 }).withMessage('Password must be at least 5 chars long.').isString().withMessage("Password must be a string.")], function (req, res, next) {

    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) res.send(errors);else res.send("Validated");
});

exports.default = router;
//# sourceMappingURL=userRoute.js.map