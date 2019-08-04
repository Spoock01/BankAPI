import User from '../models/userModel';

export async function registerUser(req, res) {

    const { full_name, cpf, password } = req.query;

    try {

        let newUser = await User.create({
            full_name,
            cpf,
            password //falta codificar
        },{
            fields: ['full_name', 'cpf', 'password']
        });

        if (newUser) {
            res.status(200).send("User successfully created! Sending Token...");
        }

    } catch (error) {

        res.status(500).json({
            message: "Something goes wrong.",
            data: {}
        })
    }
}

