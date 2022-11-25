module.exports = (sequelize, dataTypes) => {
    let alias = "Product_Color";
    let cols = {
        // id: {
        //     type: dataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     allowNull: false
        // },
        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        color_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        isActive: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
    };
    
    let config = {
        tableName: "product_has_color",
        timestamps: false
    }

    const Product_Color = sequelize.define(alias, cols, config);

    return Product_Color;
};