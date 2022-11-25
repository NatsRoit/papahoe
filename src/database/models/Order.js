module.exports = (sequelize, dataTypes) => {
    let alias = "Order";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        tax: {
            type: dataTypes.DECIMAL,
        },
        total: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
       
    };
    let config = {
        tableName: "orders",
        timestamps: false
    }

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function (models) {
        Order.belongsTo(models.Shipping, {
            as: "shipping_methods",
            foreignKey: "shipping_method_id"
        });
    };

    Order.associate = function (models) {
        Order.belongsTo(models.Payment, {
            as: "payment_methods",
            foreignKey: "payment_method_id"
        });
    };

    Order.associate = function (models) {
        Order.belongsToMany(models.Product, {
            as: "products",
            through: "order_has_product",
            foreignKey: "order_id",
            otherKey: "product_id",
            timestamps: false,
        });
    };

    Order.associate = function (models) {
        Order.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        });
    };


    return Order;
}; 