module.exports = (sequelize, dataTypes) => {
    let alias = "Payment";
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
        tableName: "payment_methods",
        timestamps: false
    }

    const Payment = sequelize.define(alias, cols, config);

    Payment.associate = function (models) {
        Payment.hasMany(models.Order, {
            as: "orders",
            foreignKey: "payment_method_id"
        });
    };

    return Payment;
};