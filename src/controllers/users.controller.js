import models from '../models'


export async function compareUserPassword(user_password, cpf){
    var user = await models.User.findOne({
        where: { cpf }
    });

    const { password } = user;

    console.log("___" + password + "_____" + user_password);
    console.log(user_password === password);

    return user_password === password ? true : false;

}

export async function registerUser(req, res) {

    const { full_name, cpf, password } = req.query;

    try {

        let newUser = await models.User.create({
            full_name,
            cpf,
            password, //falta codificar

        },{
            fields: ['full_name', 'cpf', 'password']
        });

        if (newUser) {
            res.json(newUser);
        }

    } catch (error) {
        
        res.json({
            Message: error
        })
    }
}

