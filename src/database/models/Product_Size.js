module.exports = (sequelize, dataTypes) => {
    let alias = "Product_Size";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        size_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        isActive: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
    };
    
    let config = {
        tableName: "product_has_size",
        timestamps: false
    }

    const Product_Size = sequelize.define(alias, cols, config);

    return Product_Size;
};