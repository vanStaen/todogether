const List = sequelize.define(
  "List",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    shareWith: {
      type: [DataTypes.STRING],
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(List === sequelize.models.List);
