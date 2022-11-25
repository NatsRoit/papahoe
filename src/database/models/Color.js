module.exports = (sequelize, dataTypes) => {
    let alias = "Color";
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
        image: {
            type: dataTypes.STRING(255),
        },
    };
    let config = {
        tableName: "colors",
        timestamps: false
    };

    const Color = sequelize.define(alias, cols, config);

    Color.associate = function (models) {
        Color.belongsToMany(models.Product, {
            as: "productos",
            through: "product_has_color",
            foreignKey: "color_id",
            otherKey: "product_id",
            timestamps: false
        });
    };

    return Color;
};