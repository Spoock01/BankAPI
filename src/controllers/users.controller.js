import models from '../models';
import bcrypt from 'bcrypt';


export async function compareUserPassword(user_password, cpf) {

    var user = await models.User.findOne({
        where: { cpf }
    });

    if (user != null) {
        return await bcrypt.compare(user_password, user.password);
    }
    return false;
}

export async function registerUser(req, res) {

    const { full_name, cpf, password } = req.query;

    try {
        await models.User.create({
            full_name,
            cpf,
            password,
        }, {
                fields: ['full_name', 'cpf', 'password']
            });
        res.status(201).json({success: "User successfully registered!"});
    } catch (error) {
        
        res.json({
            Message: error.errors[0].message
        });
    }
}

