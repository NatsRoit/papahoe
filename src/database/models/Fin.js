module.exports = (sequelize, dataTypes) => {
    let alias = "Fin";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
        },
        conditions: {
            type: dataTypes.STRING,
        },
        pros: {
            type: dataTypes.STRING,
        },
        cons: {
            type: dataTypes.STRING,
        },
        
    };
    let config = {
        tableName: "fins",
        timestamps: false
    };

    const Fin = sequelize.define(alias, cols, config);

    Fin.associate = function (models) {
        Fin.hasMany(models.Product, {
            as: "products",
            foreignKey: "fin_id"
        });
    };

    return Fin;
};