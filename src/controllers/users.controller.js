import models from '../models'


export async function registerUser(req, res) {

    const { full_name, cpf, password } = req.query;

    try {

        let newUser = await models.User.create({
            full_name,
            cpf,
            password //falta codificar
        },{
            fields: ['full_name', 'cpf', 'password']
        });

        if (newUser) {

            // res.send("User successfully created! Sending Token...");
            res.json(newUser);
        }

    } catch (error) {
        
        res.json({
            Message: error.errors[0].message
        })
    }
}

