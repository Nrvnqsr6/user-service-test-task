export function createAction (sequelize, Sequelize) {
    const action = sequelize.define(
      "action", 
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        action_type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps : true,
        updatedAt: false,
        createdAt: true
      },
    );
    
    return action;
  };