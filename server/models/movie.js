'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, {
        foreignKey: 'authorId'
      })
      Movie.belongsToMany(models.Genre, {
        through: 'MovieGenres',
        foreignKey: 'movieId'
      })
      Movie.belongsToMany(models.Cast, {
        through: 'MovieCasts',
        foreignKey: 'movieId'
      })
    }

    convertSlug(instance) {
      return `${instance.title.toLowerCase().split(' ').join('-')}`
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Slug is required'
        }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Synopsis is required'
        },
        notEmpty: {
          msg: 'Synopsis is required'
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Rating is required'
        },
        min: {
          args: [1],
          msg: 'Min. rating is 1'
        },
        max: {
          args: [10],
          msg: 'Max. rating is 10'
        }
      }
    },
    authorId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.slug = instance.convertSlug(instance)
      },
      beforeUpdate: (instance) => {
        instance.slug = instance.convertSlug(instance)
      },
    },
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};