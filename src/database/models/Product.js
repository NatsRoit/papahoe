module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        price:  {
            type: dataTypes.DECIMAL(10,0),
            allowNull: false
        },
        discount:{
            type: dataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },  
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        features: {
            type: dataTypes.STRING,
            allowNull: false
        },  
        active: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        image1: {
            type: dataTypes.STRING(255),
            allowNull: false
        }, 
        image2: {
            type: dataTypes.STRING(255),
        }, 
        image3: {
            type: dataTypes.STRING(255),
        },
        image4: {
            type: dataTypes.STRING(255),
        },
        image5: {
            type: dataTypes.STRING(255)
        },
    };
    
    let config = {
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Brand, {
            as: "marca",
            foreignKey: "brand_id",
        });
    
        Product.belongsTo(models.Category, {
            as: "categoria",
            foreignKey: "category_id"
        });

        Product.belongsTo(models.Subcategory, {
            as: "subcategoria",
            foreignKey: "subcategory_id"
        });
        
        Product.belongsTo(models.Fin, {
            as: "fin",
            foreignKey: "fin_id"
        });

        Product.belongsToMany(models.Size, {
            as: "dimensiones",
            through: "Product_Size",
            foreignKey: "product_id",  // "SourceModel" Key!!!! in the "Through Relation"
            otherKey: "size_id",  // TargetModel" Key!!!! in the "Through Relation"
            timestamps: false
        });

        Product.belongsToMany(models.Color, {
            as: "colores",
            through: "product_has_color",
            foreignKey: "product_id",
            otherKey: "color_id",
            timestamps: false
        });

        Product.belongsToMany(models.Order, {
            as: "ordenes",
            through: "order_has_product",
            foreignKey: "product_id",
            otherKey: "order_id",
            timestamps: false
        });
    };

    return Product;
};


