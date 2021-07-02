const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    listId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    positionInList: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    favorited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    subTaskIds: {
      type: [DataTypes.STRING],
      allowNull: true,
    },
    recurring: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(Task === sequelize.models.Task);
