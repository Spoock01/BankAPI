import models from '../models'


export async function compareUserPassword(user_password, cpf){
    var user = await models.User.findOne({
        where: { cpf }
    });

    if(user != null){
        const { password } = user;
        return user_password === password ? true : false;
    }else
        return false; 

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
            res.status(200).send("User successfully registered.");
        }

    } catch (error) {
        
        res.json({
            Message: error
        })
    }
}

