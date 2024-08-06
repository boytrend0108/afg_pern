import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  company: {
    type: DataTypes.STRING,
  },
  lang: {
    type: DataTypes.STRING,
    defaultValue: 'English',
  },
  activationToken: {
    type: DataTypes.STRING,
  },
});

export const Role = sequelize.define('role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  description: {
    type: DataTypes.STRING,
  },
});

export const UserRole = sequelize.define('user_role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

export const Refresh = sequelize.define('refresh', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  refresh: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export const Basket = sequelize.define('basket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

export const BasketProduct = sequelize.define('basket_product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

export const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
  },
});

export const ProductImage = sequelize.define('product_image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  productId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const ProductImageInter = sequelize.define('product_image_inter', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  productId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const ProductInfo = sequelize.define('product_info', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  productId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export const Favorite = sequelize.define('favorite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Product',
      key: 'id',
    },

    onDelete: 'CASCADE',
  },
});

export const Brand = sequelize.define('brand', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export const Category = sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const BrandCategory = sequelize.define('brand_category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

export const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

export const Reserve = sequelize.define('reserve', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Product',
      key: 'id',
    },

    onDelete: 'CASCADE',
  },

  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },

  expireAt: {
    type: DataTypes.DATE,
    primaryKey: true,
    defaultValue: () => {
      const currentDate = new Date();
      const oneMonthLater = new Date(
        currentDate.setMonth(currentDate.getMonth() + 1)
      );
      return oneMonthLater;
    },
  },
});

export const Subscribe = sequelize.define('subscribe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.belongsToMany(Role, { through: 'user_role', foreignKey: 'userId' });
Role.belongsToMany(User, { through: 'user_role', foreignKey: 'roleId' });

User.hasOne(Refresh);
Refresh.belongsTo(User);

User.belongsToMany(Product, { through: 'order' });
Product.belongsToMany(User, { through: 'order' });

Basket.belongsToMany(Product, { through: 'basket_product' });
Product.belongsToMany(Basket, { through: 'basket_product' });

Category.hasMany(Product);
Product.belongsTo(Category);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Product.hasMany(ProductImage, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});

ProductImage.belongsTo(Product, {
  foreignKey: 'productId',
});

Product.hasMany(ProductImageInter, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});

ProductImageInter.belongsTo(Product, {
  foreignKey: 'productId',
});

Product.hasMany(ProductInfo, {
  foreignKey: { name: 'productId', allowNull: false },
  onDelete: 'CASCADE',
});

ProductInfo.belongsTo(Product, {
  foreignKey: 'productId',
});

User.hasMany(Order, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'CASCADE',
});
Order.belongsTo(Product);

//------------------
User.hasMany(Favorite, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  hooks: true,
});

Product.hasMany(Favorite, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});

Favorite.belongsTo(User, {
  foreignKey: 'userId',
});

Favorite.belongsTo(Product, {
  foreignKey: 'productId',
});
//------------------------

//------------------
User.hasMany(Reserve, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  hooks: true,
});

Product.hasMany(Reserve, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});

Reserve.belongsTo(User, {
  foreignKey: 'userId',
});

Reserve.belongsTo(Product, {
  foreignKey: 'productId',
});
//------------------------

Brand.belongsToMany(Category, { through: 'brand_category' });
Category.belongsToMany(Brand, { through: 'brand_category' });

export default {
  User,
  Role,
  UserRole,
  Refresh,
  Basket,
  BasketProduct,
  Product,
  ProductInfo,
  Favorite,
  Brand,
  Category,
  BrandCategory,
  Order,
  Reserve,
  Subscribe,
};
