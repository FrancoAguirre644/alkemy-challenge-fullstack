import { DataTypes, Model } from 'sequelize';
import db from '../database/config';

export interface IOperation extends Model {
    id?: number;
    description: string;
    amount: number;
    type: string;
}

const Operation = db.define<IOperation>('operation', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

export default Operation;