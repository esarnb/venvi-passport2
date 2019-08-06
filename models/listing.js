module.exports = function(sequelize, DataTypes) {
  var Listing = sequelize.define("Listing", {

  price:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

     image:{
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1],
      }
    },

     make: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
      model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
     year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [4]
      }
    }  
  },
  {
  freezeTableName: true, 
  timestamps: false
});


  Listing.associate = function (models) {
    Listing.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Listing.hasOne(models.Bookmark, 
      {
        foreignKey: 'ListingId' 
      });
  };

    //   Listing.belongsTo(models.Vehicle, {
    //   onDelete: "cascade"
    // });

  return Listing;
};