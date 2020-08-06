module.exports= ( sequelize , DataTypes ) => {

    const Producto = sequelize.define( 'Productos' , {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        discount: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'productos',
        timestamps: false,
    })

    return Producto;

}