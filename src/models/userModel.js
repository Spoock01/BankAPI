export default (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
    
        full_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        cpf: {
            type: DataTypes.TEXT,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        wallet:{
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    
        }, 
        {
            timestamps: false
        });

    return User;
}
