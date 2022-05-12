const { sequelize } = require("./db")
const { Sequelize, DataTypes } = require("sequelize")

const Inspection = sequelize.define(
  "inspections",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    v: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keyLS: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tprp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    measur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DL: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
)

module.exports = { Inspection }
