import { DataTypes } from "sequelize";
import { sequelize } from '../config/sequelize.config.js';

export const Client = sequelize.define("Client", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    baseUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'base_url'
    }
    
}, {
    underscored: true,
    tableName: 'clients',
    timestamps: true
});
