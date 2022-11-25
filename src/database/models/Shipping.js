module.exports = (sequelize, dataTypes) => {
    let alias = "Shipping";
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
    };
    let config = {
        tableName: "shipping_methods",
        timestamps: false
    }

    const Shipping = sequelize.define(alias, cols, config);

    Shipping.associate = function (models) {
        Shipping.hasMany(models.Order, {
            as: "orders",
            foreignKey: "shipping_method_id"
        });
    };

    return Shipping;
};