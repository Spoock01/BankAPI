import bcrypt from 'bcrypt';
import { SALT, CPF_REGEX } from '../Utils/Utils';

export default (sequelize, DataTypes) => {

    const User = sequelize.define('user', {

        full_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-z]+$/i,
                    msg: "Only letters are allowed"
                }
            }
        },
        cpf: {
            type: DataTypes.TEXT,
            primaryKey: true,
            allowNull: false,
            validate: {
                isCpf(cpf) {
                    if (!cpf.match(CPF_REGEX)) {
                        throw new Error('Cpf is not valid!');
                    }
                }
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: 5,
                    msg: "Password must be at least 5 chars long."
                }
            }
        },
        wallet: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            validate: {
                isFloat: true
            }
        }
    },
        {
            hooks: {
                beforeSave: (User) => {
                    var hash = bcrypt.hashSync(User.password, SALT);
                    User.password = hash;
                }
            }
        },
        {
            timestamps: false
        });

    return User;
}