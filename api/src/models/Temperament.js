const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperament', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
      // unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
      // unique: true
    }
  },
    {
      initialAutoIncrement: 1000,
      timestamps: false
    });
};
