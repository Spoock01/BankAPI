'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../database/database');

var _Utils = require('../Utils/Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _database.sequelize.define('user', {

    full_name: {
        type: _sequelize2.default.STRING
    },
    cpf: {
        type: _sequelize2.default.STRING,
        primaryKey: true
    },
    password: {
        type: _sequelize2.default.STRING
    }

});

exports.default = User;
//# sourceMappingURL=userModel.js.map