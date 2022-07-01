import { DataTypes, Model } from 'sequelize';
import db from '../database/config';

export interface IUser extends Model {
    id?: number;
    fullname: string;
    email: string;
    password: string;
}

const User = db.define<IUser>('user', {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

export default User;